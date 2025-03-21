const BASE_URL = 'https://api.time-flow.io.vn/admin/auth'; // Replace with your actual base URL

// Function to handle user login
async function login(email, password) {
    const requestBody = {
        email: email,
        password: password
    };

    try {
        const response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error('Failed to authenticate user');
        }

        const data = await response.json();
        return data; // Return the response data (e.g., AuthenticateResponse)

    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// Function to handle user registration
async function register(fullName, email, password, phone, gender, hobbies, occupation, birthday) {
    const requestBody = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone,
        gender: gender, // This should be an enum, e.g., 'MALE', 'FEMALE'
        hobbies: hobbies,
        Occupation: occupation,
        birthday: birthday, // Format: yyyy-mm-dd
    };

    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error('Failed to register user');
        }

        const data = await response.json();
        return data; // Return the response data (e.g., BaseResponse)

    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

// Export the functions for use in other parts of your application
export { login, register };
