enum TokenTypes {
    PERMA = "perma",
    TMP = "tmp",
    GUEST = "guest"
}

interface Token {
    type: TokenTypes
}

interface UserToken extends Token {
    u_id: number
}

export {
    TokenTypes
};

export type { UserToken, Token };
