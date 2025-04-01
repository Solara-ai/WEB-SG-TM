import {callApi} from "./BaseApi.jsx";
import {BaseResponse} from "./dto/BaseResponse.js";
import {FeedBackDetailRes} from "./dto/response/FeedBackDetailRes";
import {FeedBackRes} from "./dto/response/FeedBackRes";
import {PageData} from "./dto/response/PageData";

const END_POINT = "/feedback";

async function getFeedBack(page = 0, size = 25, sort = "updatedAt") {
    const response = await callApi(`${END_POINT}?page=${page}&size=${size}&sort=${sort}`, "GET");
    const baseResponse = BaseResponse.fromJson(response);

    if (baseResponse.isSuccess() && baseResponse.data) {
        const { pageNo, elementPerPage, totalElements, totalPages, elementList } = baseResponse.data;

        // Chuyển đổi dữ liệu về dạng PageData
        const pageData = new PageData(pageNo, elementPerPage, totalElements, totalPages, elementList.map(element => FeedBackRes.fromJson(element)));

        return new BaseResponse(
            baseResponse.httpStatus,
            baseResponse.resultCode,
            baseResponse.resultMsg,
            baseResponse.resourceId,
            pageData
        );
    } else {
        console.error(baseResponse.resultMsg);
        return baseResponse;
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

async function sendFeedBack(message, feedBackId) {
    const response = await callApi(`${END_POINT}/reply`, "POST", {
        feedBackId: feedBackId,
        message: message
    });
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

export {getFeedBack, getFeedBackDetail, sendFeedBack};
