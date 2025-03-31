export class UserListRes {
    constructor(id, name, email, phone, createdAt, password, gender, birthday) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.createdAt = createdAt;
        this.password = password;
        this.gender = gender;
        this.birthday = birthday;
    }

    static fromJson(json) {
        return new UserListRes(
            json.id,
            json.name,
            json.email,
            json.phone,
            json.createdAt,
            json.password,
            json.gender,
            json.birthday
        );
    }
}