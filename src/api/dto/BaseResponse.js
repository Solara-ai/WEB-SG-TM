export class BaseResponse {
    constructor(httpStatus, resultCode, resultMsg, resourceId, data) {
        this.httpStatus = httpStatus;
        this.resultCode = resultCode;
        this.resultMsg = resultMsg;
        this.resourceId = resourceId;
        this.data = data;
    }

    static fromJson(json) {
        return new BaseResponse(json.httpStatus,json.resultCode, json.resultMsg, json.resourceId, json.data);
    }
 
    isSuccess() {
        return this.httpStatus === 200 || this.resultCode === 201;
    }
}
