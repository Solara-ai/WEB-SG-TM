
export class FeedBackRes {
    constructor(id, userId, message, createdAt) {
        this.id = id;
        this.userId = userId;
        this.message = message;
        this.createdAt = createdAt;
    }

    static fromJson(json) {
        return new FeedBackRes(
            json.id,
            json.userId,
            json.message || [],
            json.createdAt
        );
    }
}
