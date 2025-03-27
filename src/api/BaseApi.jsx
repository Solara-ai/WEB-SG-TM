import {getToken} from "../utils/auth";

const BASE_URL = "https://api.time-flow.io.vn/api/v1/solara/admin";

function showErrorPopup(message) {
    alert(`❌ Error: ${message}`);
}

export async function callApi(endpoint, method = "GET", bodyData = null) {
    try {
        const headers = { "Content-Type": "application/json" };
        const token = getToken();

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const options = {
            method,
            headers,
            mode: "cors",
        };

        if (bodyData) {
            options.body = JSON.stringify(bodyData);
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                console.warn("Unauthorized! Redirecting to login...");
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
            showErrorPopup(data.message || "API request failed! Please try again.");
            return null;
        }

        return data;
    } catch (error) {
        console.error(`API Error [${method} ${endpoint}]:`, error.message);
        showErrorPopup("Something went wrong! Please check your connection.");
        return null;
    }
}