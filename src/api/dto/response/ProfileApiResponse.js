export class ProfileRes {
    constructor(id, email, fullName, phone, birthday, gender, hobbies, occupation) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.phone = phone;
        this.birthday = birthday;
        this.gender = gender;
        this.hobbies = hobbies;
        this.occupation = occupation;
    }

    static fromJson(json) {
        return new ProfileRes(
            json.id,
            json.email,
            json.fullName,
            json.phone,
            json.birthday,
            json.gender,
            json.hobbies,
            json.occupation
        );
    }
}
