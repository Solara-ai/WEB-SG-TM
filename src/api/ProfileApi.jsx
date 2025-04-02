import { callApi } from "./BaseApi.jsx";
import { BaseResponse } from "./dto/BaseResponse.js";
import { ProfileRes } from "./dto/response/ProfileApiResponse.js";

const END_POINT = "/profile";

async function getProfile() {
    const response = await callApi(`${END_POINT}/details`, "GET");

    if (!response) {
        return new BaseResponse(500, "ERROR", "Failed to fetch profile", null, null);
    }

    const baseResponse = BaseResponse.fromJson(response);

    if (baseResponse.isSuccess() && baseResponse.data) {
        const profile = ProfileRes.fromJson(baseResponse.data);
        return new BaseResponse(
            baseResponse.httpStatus,
            baseResponse.resultCode,
            baseResponse.resultMsg,
            baseResponse.resourceId,
            profile
        );
    } else {
        console.error(baseResponse.resultMsg);
        return baseResponse;
    }
}

export { getProfile };
