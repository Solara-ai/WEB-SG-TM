import axios from "axios";

const API_BASE_URL = "https://api.time-flow.io.vn/api/v1/solara/ai"; 

export const getTotalUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/stats/users/count`);
        // Kiểm tra dữ liệu trả về
        console.log("Dữ liệu API trả về:", response.data);

        // Đảm bảo đúng format { "total_users": 7 }
        return response.data.total_users ?? "N/A";
    } catch (error) {
        console.error("Lỗi khi lấy tổng số người dùng:", error?.response?.data || error.message);
        return "N/A";
    }
};

export const getUsersWithSchedules = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/stats/users/with_schedule`);
        // Trả về số lượng người dùng có lịch trình
        return response.data.users_with_schedules ?? "N/A";
    } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng có lịch trình:", error?.response?.data || error.message);
        return "N/A";
    }
};

// API: Get Users With Conversation Percentage
export const getUsersWithConversationPercentage = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/stats/users/conversation-percentage`);
        console.log("Dữ liệu API trả về:", response.data);

        // Đảm bảo đúng format { "conversation_percentage": 75 }
        return response.data.users_with_conversation ?? "N/A";
    } catch (error) {
        console.error("Lỗi khi lấy phần trăm người dùng có hội thoại:", error?.response?.data || error.message);
        return "N/A";
    }
};

// API: Get Chat Count Last 7 Days
export const getChatCountLast7Days = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/stats/chats/last-7-days`);
        console.log("Dữ liệu API trả về:", response.data);

        // Đảm bảo đúng format { "chat_count_last_7_days": 123 }
        return response.data.chat_count_last_7_days ?? "N/A";
    } catch (error) {
        console.error("Lỗi khi lấy số lượng chat trong 7 ngày qua:", error?.response?.data || error.message);
        return "N/A";
    }
};

// API: Get Schedules Count Last 3 Months
export const getSchedulesCountLast3Months = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/stats/schedules/last-3-months`);
        console.log("Dữ liệu API trả về:", response.data);

        // Đảm bảo đúng format { "schedules_count_last_3_months": 45 }
        return response.data.schedules_last_3_months ?? "N/A";
    } catch (error) {
        console.error("Lỗi khi lấy số lịch trình trong 3 tháng qua:", error?.response?.data || error.message);
        return "N/A";
    }
};

// API: Get New Users Last 3 Months
export const getNewUsersLast3Months = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/stats/users/new-last-3-months`);
        console.log("Dữ liệu API trả về:", response.data);

        // Đảm bảo đúng format { "new_users_last_3_months": [user1, user2,...] }
        return response.data.new_users_last_3_months ?? "N/A";
    } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng mới trong 3 tháng qua:", error?.response?.data || error.message);
        return "N/A";
    }
};