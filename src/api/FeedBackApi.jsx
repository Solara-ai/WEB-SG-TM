import { callApi } from "./BaseApi.jsx";
import { BaseResponse } from "./dto/BaseResponse.js";
import {FeedBackDetailRes} from "./dto/response/FeedBackDetailRes";

const END_POINT = "/feedback";

async function getFeedBack(page = 0, size = 25, sort = "updatedAt") {
    const response = await callApi(`${END_POINT}?page=${page}&size=${size}&sort=${sort}`, "GET");
    const baseResponse = BaseResponse.fromJson(response);

    if (baseResponse.isSuccess() && baseResponse.data) {
        return new BaseResponse(baseResponse.httpStatus,
            baseResponse.resultCode,
            baseResponse.resultMsg,
            baseResponse.resourceId,
            FeedBackDetailRes.fromJson(baseResponse.data));
    } else {
        console.error(baseResponse.resultMsg);
    }
}

async function getFeedBackDetail(id) {
    const response = await callApi(`${END_POINT}/${id}`, "GET");
    const baseResponse = BaseResponse.fromJson(response);

    if (baseResponse.isSuccess() && baseResponse.data) {
        return new BaseResponse(baseResponse.httpStatus,
            baseResponse.resultCode,
            baseResponse.resultMsg,
            baseResponse.resourceId,
            FeedBackDetailRes.fromJson(baseResponse.data));
    } else {
        console.error(baseResponse.resultMsg);
    }
}

async function sendFeedBack(userId, message) {
    const response = await callApi(`${END_POINT}/reply`, "POST", { userId, message });
    const baseResponse = BaseResponse.fromJson(response);

    if (baseResponse.isSuccess() && baseResponse.data) {
        return new BaseResponse(baseResponse.httpStatus,
            baseResponse.resultCode,
            baseResponse.resultMsg,
            baseResponse.resourceId,
            FeedBackDetailRes.fromJson(baseResponse.data));
    } else {
        console.error(baseResponse.resultMsg);
    }
}

export { getFeedBack, getFeedBackDetail, sendFeedBack };
