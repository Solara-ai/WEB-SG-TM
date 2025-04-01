export const usersData = [
    {
        "id": 6,
        "name": "Pham Minh F",
        "email": "phamminhf@gmail.com",
        "phoneNumber": "0981234567",
        "registeredAt": "2025-02-10",
        "createdSchedules": 5
    },
    {
        "id": 7,
        "name": "Dang Thi G",
        "email": "dangthig@gmail.com",
        "phoneNumber": "0923456789",
        "registeredAt": "2025-01-22",
        "createdSchedules": 10
    },
    {
        "id": 8,
        "name": "Bui Van H",
        "email": "buivanh@gmail.com",
        "phoneNumber": "0918765432",
        "registeredAt": "2025-02-28",
        "createdSchedules": 14
    },
    {
        "id": 9,
        "name": "Hoang Thi I",
        "email": "hoangthii@gmail.com",
        "phoneNumber": "0932109876",
        "registeredAt": "2025-03-05",
        "createdSchedules": 6
    },
    {
        "id": 10,
        "name": "Nguyen Van J",
        "email": "nguyenvanj@gmail.com",
        "phoneNumber": "0975432109",
        "registeredAt": "2025-02-18",
        "createdSchedules": 13
    },
    {
        "id": 11,
        "name": "Le Thi K",
        "email": "lethik@gmail.com",
        "phoneNumber": "0956784321",
        "registeredAt": "2025-01-15",
        "createdSchedules": 9
    },
    {
        "id": 12,
        "name": "Trinh Van L",
        "email": "trinhvanl@gmail.com",
        "phoneNumber": "0902345678",
        "registeredAt": "2025-03-02",
        "createdSchedules": 11
    },
    {
        "id": 13,
        "name": "Dao Thi M",
        "email": "daothim@gmail.com",
        "phoneNumber": "0919876543",
        "registeredAt": "2025-02-07",
        "createdSchedules": 7
    },
    {
        "id": 14,
        "name": "Luong Van N",
        "email": "luongvann@gmail.com",
        "phoneNumber": "0936543210",
        "registeredAt": "2025-01-30",
        "createdSchedules": 15
    },
    {
        "id": 15,
        "name": "Vu Thi O",
        "email": "vuthio@gmail.com",
        "phoneNumber": "0978765432",
        "registeredAt": "2025-03-10",
        "createdSchedules": 8
    },
    {
        "id": 16,
        "name": "Phan Van P",
        "email": "phanvanp@gmail.com",
        "phoneNumber": "0987651234",
        "registeredAt": "2025-02-12",
        "createdSchedules": 12
    },
    {
        "id": 17,
        "name": "Ho Thi Q",
        "email": "hothiq@gmail.com",
        "phoneNumber": "0912348765",
        "registeredAt": "2025-03-08",
        "createdSchedules": 10
    },
    {
        "id": 18,
        "name": "Dinh Van R",
        "email": "dinhvanr@gmail.com",
        "phoneNumber": "0923459876",
        "registeredAt": "2025-01-28",
        "createdSchedules": 6
    },
    {
        "id": 19,
        "name": "Nguyen Thi S",
        "email": "nguyenthis@gmail.com",
        "phoneNumber": "0934567890",
        "registeredAt": "2025-02-15",
        "createdSchedules": 13
    },
    {
        "id": 20,
        "name": "Lam Van T",
        "email": "lamvant@gmail.com",
        "phoneNumber": "0967890123",
        "registeredAt": "2025-03-12",
        "createdSchedules": 9
    },
    {
        "id": 21,
        "name": "Tran Thi U",
        "email": "tranthiu@gmail.com",
        "phoneNumber": "0976540987",
        "registeredAt": "2025-01-10",
        "createdSchedules": 11
    },
    {
        "id": 22,
        "name": "Nguyen Van V",
        "email": "nguyenvanv@gmail.com",
        "phoneNumber": "0981203948",
        "registeredAt": "2025-02-05",
        "createdSchedules": 7
    },
    {
        "id": 23,
        "name": "Do Thi W",
        "email": "dothiw@gmail.com",
        "phoneNumber": "0912039485",
        "registeredAt": "2025-03-18",
        "createdSchedules": 10
    },
    {
        "id": 24,
        "name": "Pham Van X",
        "email": "phamvanx@gmail.com",
        "phoneNumber": "0923450129",
        "registeredAt": "2025-02-22",
        "createdSchedules": 14
    },
    {
        "id": 25,
        "name": "Vu Thi Y",
        "email": "vuthiy@gmail.com",
        "phoneNumber": "0938765432",
        "registeredAt": "2025-01-25",
        "createdSchedules": 5
    }
];

export const getUserStats = () => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const totalUsers = usersData.length;
    const usersWithSchedules = usersData.filter(user => user.createdSchedules > 0).length;
    const usersWithoutSchedules = totalUsers - usersWithSchedules;

    const schedulesByDate = {};
    const schedulesByMonth = {};
    const userGrowthByMonth = {};

    usersData.forEach(user => {
        const registeredDate = new Date(user.registeredAt);
        const monthKey = `${registeredDate.getFullYear()}-${String(registeredDate.getMonth() + 1).padStart(2, '0')}`;

        // Tính số lịch trình theo ngày
        if (!schedulesByDate[user.registeredAt]) {
            schedulesByDate[user.registeredAt] = 0;
        }
        schedulesByDate[user.registeredAt] += user.createdSchedules;

        // Tính số lịch trình theo tháng
        if (!schedulesByMonth[monthKey]) {
            schedulesByMonth[monthKey] = 0;
        }
        schedulesByMonth[monthKey] += user.createdSchedules;

        // Tính tăng trưởng người dùng theo tháng
        if (!userGrowthByMonth[monthKey]) {
            userGrowthByMonth[monthKey] = 0;
        }
        userGrowthByMonth[monthKey]++;
    });

    return {
        totalUsers,
        usersWithSchedules,
        usersWithoutSchedules,
        schedulesByDate,
        schedulesByMonth,
        userGrowthByMonth: Object.entries(userGrowthByMonth).map(([month, growth]) => ({ month, growth })),
    };
};
