"use strict";
exports.__esModule = true;
var config = {
    GUEST_ACCOUNT_ID: 0,
    PROTECTED_ACCOUNTS: [0],
    PASTE: {
        FRAGMENT_LIMITS: {
            guest: 5,
            loggedIn: 500
        },
        DAILY_CONTENT_LIMITS: {
            guest: 3,
            loggedIn: 30
        }
    }
};
exports["default"] = config;
