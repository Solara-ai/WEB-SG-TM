import { callApi } from "./BaseApi.jsx";
import { postData } from "./BaseApi.jsx";
import { BaseResponse } from "./dto/BaseResponse.js";
import { UserListRes } from "./dto/response/UserApiResponse.js";
import { UserApiRequest } from "./dto/request/UserApiRequest.js";

const END_POINT = "/user";

async function getAllUsers() {
    const response = await callApi(`${END_POINT}/all`, "GET");

    if (!response) {
        return new BaseResponse(500, "ERROR", "Failed to fetch users", null, null);
    }

    const baseResponse = BaseResponse.fromJson(response);

    if (baseResponse.isSuccess() && baseResponse.data) {
        const users = baseResponse.data.map(userData => UserListRes.fromJson(userData));
        return new BaseResponse(
            baseResponse.httpStatus,
            baseResponse.resultCode,
            baseResponse.resultMsg,
            baseResponse.resourceId,
            users
        );
    } else {
        console.error(baseResponse.resultMsg);
        return baseResponse;
    }
}

async function createUser(userData) {
    const userRequest = new UserApiRequest(
        userData.fullName,
        userData.email,
        userData.password,
        userData.phoneNumber,
        userData.authority,
        userData.birthday,
        userData.gender,
        userData.hobbies,
        userData.occupation
    ).toJson();

    const response = await postData(END_POINT, "POST", userRequest);

    if (!response) {
        return new BaseResponse(500, "ERROR", "Failed to create user", null, null);
    }

    const baseResponse = BaseResponse.fromJson(response);

    if (baseResponse.isSuccess() && baseResponse.data) {
        const newUser = UserListRes.fromJson(baseResponse.data);
        return new BaseResponse(
            baseResponse.httpStatus,
            baseResponse.resultCode,
            baseResponse.resultMsg,
            baseResponse.resourceId,
            newUser
        );
    } else {
        console.error(baseResponse.resultMsg);
        return baseResponse;
    }
}

export { getAllUsers, createUser };