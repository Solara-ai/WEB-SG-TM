export class AuthenticateResponse {
    constructor(token, refreshToken, userId, rememberMe) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.userId = userId;
        this.rememberMe = rememberMe;
    }

    static fromJson(json) {
        return new AuthenticateResponse(
            json.token,
            json.refreshToken,
            json.userId,
            json.rememberMe
        );
    }
}