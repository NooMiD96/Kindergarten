using Model.UI.Chat;

using System.Collections.Concurrent;

namespace Web.Services.ChatHelper
{
    public static class ChatHelper
    {
        static readonly int CountOfMessageCashed = 10;

        public static void AddNewMessage(this ConcurrentQueue<MessageModel> messages, MessageModel message)
        {
            if (messages.Count >= CountOfMessageCashed)
            {
                var isDequeueue = false;
                while (!isDequeueue)
                    isDequeueue = messages.TryDequeue(out _);
            }

            messages.Enqueue(message);
        }
    }
}
