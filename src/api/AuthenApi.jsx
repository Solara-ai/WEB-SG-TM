import {callApi} from "./BaseApi.jsx";
import {BaseResponse} from "./dto/BaseResponse";
import {AuthenticateResponse} from "./dto/response/AuthenApiResponse";

const END_POINT = '/auth';

async function  login(email, password, rememberMe) {
    const response = await  callApi(`${END_POINT}`, 'POST', { email, password, rememberMe});
    const baseResponse = BaseResponse.fromJson(response);

    if (baseResponse.isSuccess() && baseResponse.data) {
        return new BaseResponse(baseResponse.httpStatus,
            baseResponse.resultCode,
            baseResponse.resultMsg,
            baseResponse.resourceId,
            AuthenticateResponse.fromJson(baseResponse.data));
    } else {
        console.error(baseResponse.resultMsg);
    }
}

async function register(fullName, email, password, phone, gender, hobbies, occupation, birthday) {
    const response = callApi(`${END_POINT}/create`, 'POST', {
        fullName,
        email,
        password,
        phone,
        gender: gender.toUpperCase(),
        hobbies,
        occupation,
        birthday, // Format: yyyy-mm-dd
    });
    const baseResponse = BaseResponse.fromJson(response);

    if (baseResponse.isSuccess() && baseResponse.data) {
        return baseResponse.httpStatus;
    } else {
        console.error(baseResponse.resultMsg);
    }
}

export { login, register };
