﻿namespace Kindergarten.Database.Service.Controllers.Api
{
    public class AccountService
    {
        public object SuccessUserAuth(string userName, string userType) => new
        {
            userName,
            userType
        };

        public string SuccessLogOut(string userName) => $"{userName} is logouted";
    }
}
