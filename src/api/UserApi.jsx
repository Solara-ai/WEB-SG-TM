import { callApi } from "./BaseApi.jsx";
import { BaseResponse } from "./dto/BaseResponse.js";
import { UserListRes } from "./dto/response/UserApiResponse.js";

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

export { getAllUsers };