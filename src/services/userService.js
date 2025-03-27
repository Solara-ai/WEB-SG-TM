export const usersData = [
    {
        "id": 1,
        "username": "trananh",
        "firstname": "Tran",
        "lastname": "Anh",
        "gender": "Male",
        "email": "trananh@gmail.com",
        "password": "hashed_password_1",
        "phone": "0981111111",
        "createdAt": "2025-01-01"
    },
    {
        "id": 2,
        "username": "lethithu",
        "firstname": "Le",
        "lastname": "Thi Thu",
        "gender": "Female",
        "email": "lethithu@gmail.com",
        "password": "hashed_password_2",
        "phone": "0982222222",
        "createdAt": "2025-01-05"
    },
    {
        "id": 3,
        "username": "nguyenhoang",
        "firstname": "Nguyen",
        "lastname": "Hoang",
        "gender": "Male",
        "email": "nguyenhoang@gmail.com",
        "password": "hashed_password_3",
        "phone": "0983333333",
        "createdAt": "2025-01-10"
    },
    {
        "id": 4,
        "username": "phamthanh",
        "firstname": "Pham",
        "lastname": "Thanh",
        "gender": "Male",
        "email": "phamthanh@gmail.com",
        "password": "hashed_password_4",
        "phone": "0984444444",
        "createdAt": "2025-01-15"
    },
    {
        "id": 5,
        "username": "dangminh",
        "firstname": "Dang",
        "lastname": "Minh",
        "gender": "Male",
        "email": "dangminh@gmail.com",
        "password": "hashed_password_5",
        "phone": "0985555555",
        "createdAt": "2025-01-20"
    },
    {
        "id": 6,
        "username": "hoangvan",
        "firstname": "Hoang",
        "lastname": "Van",
        "gender": "Male",
        "email": "hoangvan@gmail.com",
        "password": "hashed_password_6",
        "phone": "0986666666",
        "createdAt": "2025-01-25"
    },
    {
        "id": 7,
        "username": "tranthithuy",
        "firstname": "Tran",
        "lastname": "Thi Thuy",
        "gender": "Female",
        "email": "tranthithuy@gmail.com",
        "password": "hashed_password_7",
        "phone": "0987777777",
        "createdAt": "2025-02-01"
    },
    {
        "id": 8,
        "username": "phamhuu",
        "firstname": "Pham",
        "lastname": "Huu",
        "gender": "Male",
        "email": "phamhuu@gmail.com",
        "password": "hashed_password_8",
        "phone": "0988888888",
        "createdAt": "2025-02-10"
    },
    {
        "id": 9,
        "username": "nguyenthivan",
        "firstname": "Nguyen",
        "lastname": "Thi Van",
        "gender": "Female",
        "email": "nguyenthivan@gmail.com",
        "password": "hashed_password_9",
        "phone": "0989999999",
        "createdAt": "2025-02-18"
    },
    {
        "id": 10,
        "username": "ledinh",
        "firstname": "Le",
        "lastname": "Dinh",
        "gender": "Male",
        "email": "ledinh@gmail.com",
        "password": "hashed_password_10",
        "phone": "0970000000",
        "createdAt": "2025-02-25"
    },
    {
        "id": 11,
        "username": "buihuong",
        "firstname": "Bui",
        "lastname": "Huong",
        "gender": "Female",
        "email": "buihuong@gmail.com",
        "password": "hashed_password_11",
        "phone": "0971111111",
        "createdAt": "2025-03-05"
    },
    {
        "id": 12,
        "username": "nguyenthanh",
        "firstname": "Nguyen",
        "lastname": "Thanh",
        "gender": "Male",
        "email": "nguyenthanh@gmail.com",
        "password": "hashed_password_12",
        "phone": "0972222222",
        "createdAt": "2025-03-12"
    },
    {
        "id": 13,
        "username": "maithu",
        "firstname": "Mai",
        "lastname": "Thu",
        "gender": "Female",
        "email": "maithu@gmail.com",
        "password": "hashed_password_13",
        "phone": "0973333333",
        "createdAt": "2025-03-18"
    },
    {
        "id": 14,
        "username": "dothanh",
        "firstname": "Do",
        "lastname": "Thanh",
        "gender": "Male",
        "email": "dothanh@gmail.com",
        "password": "hashed_password_14",
        "phone": "0974444444",
        "createdAt": "2025-03-25"
    },
    {
        "id": 15,
        "username": "trinhly",
        "firstname": "Trinh",
        "lastname": "Ly",
        "gender": "Female",
        "email": "trinhly@gmail.com",
        "password": "hashed_password_15",
        "phone": "0975555555",
        "createdAt": "2025-04-01"
    }
];

export const getUserStats = () => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const totalUsers = usersData.length;
    
    const usersByGender = usersData.reduce((acc, user) => {
        acc[user.gender] = (acc[user.gender] || 0) + 1;
        return acc;
    }, {});

    const usersThisWeek = usersData.filter(user => new Date(user.createdAt) >= oneWeekAgo).length;
    const usersThisMonth = usersData.filter(user => new Date(user.createdAt) >= oneMonthAgo).length;

    const userRegistrationsByMonth = {};
    usersData.forEach(user => {
        const registeredDate = new Date(user.createdAt);
        const monthKey = `${registeredDate.getFullYear()}-${String(registeredDate.getMonth() + 1).padStart(2, '0')}`;
        
        if (!userRegistrationsByMonth[monthKey]) {
            userRegistrationsByMonth[monthKey] = 0;
        }
        userRegistrationsByMonth[monthKey]++;
    });

    return {
        totalUsers,
        usersByGender,
        usersThisWeek,
        usersThisMonth,
        userRegistrationsByMonth: Object.entries(userRegistrationsByMonth).map(([month, count]) => ({ month, count }))
    };
};