﻿using Core.Helpers;

using Microsoft.AspNetCore.Http;

using Model.UI.Chat;

using Newtonsoft.Json;

using System;
using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

using Web.Services.ChatHelper;


namespace Web.Middlewares
{
    public class ChatMiddleware
    {
        private static ConcurrentDictionary<string, WebSocket> _sockets = new ConcurrentDictionary<string, WebSocket>();
        private static ConcurrentQueue<MessageModel> messages = new ConcurrentQueue<MessageModel>();
        private static DateTime DateLastUpdate = DateTime.UtcNow;
        private readonly RequestDelegate _next;

        public ChatMiddleware(RequestDelegate next)
        {
            _next = next;
            Task.Factory.StartNew(CounterUpdater);
        }

        public async Task Invoke(HttpContext context)
        {
            if (!context.WebSockets.IsWebSocketRequest || context.Request.Path != "/wschat")
            {
                await _next.Invoke(context);
                return;
            }

            var ct = context.RequestAborted;
            var currentSocket = await context.WebSockets.AcceptWebSocketAsync();
            var socketId = Guid.NewGuid().ToString();

            _sockets.TryAdd(socketId, currentSocket);
            Console.WriteLine($"info: chat socket connected.");

            while (true)
            {
                if (ct.IsCancellationRequested)
                    break;

                var response = "";
                try
                {
                    response = await currentSocket.ReceiveStringAsync(ct);
                }
                catch (Exception exp)
                {
                    Console.WriteLine($"info: socket aborted.\nMore info: {exp.Message}");
                    break;
                }

                if (String.IsNullOrEmpty(response))
                {
                    if (currentSocket.State != WebSocketState.Open)
                        break;
                    continue;
                }

                MessageModel message;
                try
                {
                    if (response == "GetMessages")
                    {
                        var savedMessages = messages.ToArray();
                        if (savedMessages.Length > 0)
                            foreach (var ms in savedMessages)
                                await _sockets[socketId].SendStringAsync(ms, ct);
                        await _sockets[socketId].SendStringAsync(_sockets.Count, ct);
                        continue;
                    }
                    else
                    {
                        message = JsonConvert.DeserializeObject<MessageModel>(response);
                        messages.AddNewMessage(message);
                    }
                }
                catch
                {
                    continue;
                }

                foreach (var socket in _sockets)
                {
                    if (socket.Value.State != WebSocketState.Open)
                        continue;
                    await socket.Value.SendStringAsync(message, _sockets.Count, ct);
                }
            }

            _sockets.TryRemove(socketId, out _);

            if (currentSocket.State != WebSocketState.Aborted)
                await currentSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", ct);

            currentSocket.Dispose();
            Console.WriteLine($"WebSocket disconnect from chat: {socketId}");
        }

        private async void CounterUpdater()
        {
            while (true)
            {
                Thread.Sleep(60000);

                if (!_sockets.IsEmpty)
                    foreach (var socket in _sockets)
                        if (socket.Value.State == WebSocketState.Open)
                            await socket.Value.SendStringAsync(_sockets.Count);
            }

        }
    }
}
