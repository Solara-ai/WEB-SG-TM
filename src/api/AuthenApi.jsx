const BASE_URL = 'https://api.time-flow.io.vn/api/v1/solara/admin/auth'; // Replace with your actual base URL

// Hàm gọi API
async function callApi(endpoint, method, bodyData) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData),
            mode: 'cors'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error(`API Error [${method} ${endpoint}]:`, error.message);
        throw error;
    }
}

// Hàm đăng nhập
async function login(email, password) {
    return callApi('', 'POST', { email, password });
}

// Hàm đăng ký
async function register(fullName, email, password, phone, gender, hobbies, occupation, birthday) {
    return callApi('/create', 'POST', {
        fullName,
        email,
        password,
        phone,
        gender: gender.toUpperCase(), // Chuyển đổi enum
        hobbies,
        occupation,
        birthday, // Format: yyyy-mm-dd
    });
}

// Xuất các hàm để sử dụng bên ngoài
export { login, register };
