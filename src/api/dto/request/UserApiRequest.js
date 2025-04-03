export class UserApiRequest {
    constructor(fullName, email, password, phoneNumber, authority = ["USER"], birthday, gender, hobbies, occupation) {
      this.fullName = fullName;
      this.email = email;
      this.password = password;
      this.phoneNumber = phoneNumber;
      this.authority = Array.isArray(authority) ? authority : [authority];
      this.birthday = birthday;
      this.gender = gender;
      this.hobbies = hobbies;
      this.occupation = occupation;
    }
  
    static fromJson(json) {
      return new UserApiRequest(
        json.fullName,
        json.email,
        json.password,
        json.phoneNumber,
        json.authority && Array.isArray(json.authority) ? json.authority : ["USER"],
        json.birthday,
        json.gender,
        json.hobbies,
        json.occupation
      );
    }
  
    toJson() {
      return {
        fullName: this.fullName,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
        authority: this.authority,
        birthday: this.birthday,
        gender: this.gender,
        hobbies: this.hobbies,
        occupation: this.occupation
      };
    }
  }
  