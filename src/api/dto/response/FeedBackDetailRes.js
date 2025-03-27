
export class FeedBackDetailRes {
    constructor(id, userId, messages, createdAt) {
        this.id = id;
        this.userId = userId;
        this.messages = messages;
        this.createdAt = createdAt;
    }

    static fromJson(json) {
        return new FeedBackDetailRes(
            json.id,
            json.userId,
            json.messages || [],
            json.createdAt
        );
    }
}
