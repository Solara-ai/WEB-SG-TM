// User data service to share data between components
export const usersData = [
    {
        id: 1,
        name: "Nguyen Van A",
        email: "nguyenvana@gmail.com",
        status: "Active",
        registeredAt: "2025-03-20",
        createdSchedules: 15,
        usesAI: true,
      },
      {
        id: 2,
        name: "Tran Thi B",
        email: "tranthib@gmail.com",
        status: "Inactive",
        registeredAt: "2025-03-20",
        createdSchedules: 8,
        usesAI: true,
      },
      {
        id: 3,
        name: "Le Duc C",
        email: "leducc@gmail.com",
        status: "Active",
        registeredAt: "2025-03-20",
        createdSchedules: 7,
        usesAI: false,
      },
      {
        id: 4,
        name: "Ha Thi D",
        email: "hathid@gmail.com",
        status: "Active",
        registeredAt: "2025-03-20",
        createdSchedules: 9,
        usesAI: true,
      },
      {
        id: 5,
        name: "Vu Van E",
        email: "vuvane@gmail.com",
        status: "Inactive",
        registeredAt: "2025-03-20",
        createdSchedules: 12,
        usesAI: true,
      },
      {
        id: 6,
        name: "Pham Van F",
        email: "phamvanf@gmail.com",
        status: "Active",
        registeredAt: "2025-03-21",
        createdSchedules: 5,
        usesAI: false,
      },
      {
        id: 7,
        name: "Hoang Thi G",
        email: "hoangthig@gmail.com",
        status: "Inactive",
        registeredAt: "2025-03-22",
        createdSchedules: 11,
        usesAI: true,
      },
      {
        id: 8,
        name: "Dang Minh H",
        email: "dangminhh@gmail.com",
        status: "Active",
        registeredAt: "2025-03-23",
        createdSchedules: 14,
        usesAI: false,
      },
      {
        id: 9,
        name: "Bui Van I",
        email: "buivani@gmail.com",
        status: "Inactive",
        registeredAt: "2025-03-24",
        createdSchedules: 6,
        usesAI: true,
      },
      {
        id: 10,
        name: "Nguyen Thi J",
        email: "nguyenthij@gmail.com",
        status: "Active",
        registeredAt: "2025-03-25",
        createdSchedules: 9,
        usesAI: false,
      },
      {
        id: 11,
        name: "Tran Van K",
        email: "tranvank@gmail.com",
        status: "Inactive",
        registeredAt: "2025-03-26",
        createdSchedules: 10,
        usesAI: true,
      },
      {
        id: 12,
        name: "Le Thi L",
        email: "lethil@gmail.com",
        status: "Active",
        registeredAt: "2025-03-27",
        createdSchedules: 7,
        usesAI: true,
      },
      {
        id: 13,
        name: "Pham Duc M",
        email: "phamducm@gmail.com",
        status: "Inactive",
        registeredAt: "2025-03-28",
        createdSchedules: 12,
        usesAI: false,
      },
      {
        id: 14,
        name: "Dang Thi N",
        email: "dangthin@gmail.com",
        status: "Active",
        registeredAt: "2025-03-29",
        createdSchedules: 5,
        usesAI: true,
      },
      {
        id: 15,
        name: "Bui Van O",
        email: "buivano@gmail.com",
        status: "Inactive",
        registeredAt: "2025-03-30",
        createdSchedules: 14,
        usesAI: false,
      },
      {
        id: 16,
        name: "Hoang Duc P",
        email: "hoangducp@gmail.com",
        status: "Active",
        registeredAt: "2025-03-31",
        createdSchedules: 6,
        usesAI: true,
      },
      {
        id: 17,
        name: "Nguyen Thi Q",
        email: "nguyenthiq@gmail.com",
        status: "Inactive",
        registeredAt: "2025-04-01",
        createdSchedules: 8,
        usesAI: true,
      },
      {
        id: 18,
        name: "Tran Van R",
        email: "tranvanr@gmail.com",
        status: "Active",
        registeredAt: "2025-04-02",
        createdSchedules: 10,
        usesAI: false,
      },
      {
        id: 19,
        name: "Le Thi S",
        email: "lethis@gmail.com",
        status: "Inactive",
        registeredAt: "2025-04-03",
        createdSchedules: 7,
        usesAI: true,
      },
      {
        id: 20,
        name: "Pham Van T",
        email: "phamvant@gmail.com",
        status: "Active",
        registeredAt: "2025-04-04",
        createdSchedules: 13,
        usesAI: false,
      }
  ];
  
  export const getUserStats = () => {
    const totalSchedules = usersData.reduce((acc, user) => acc + user.createdSchedules, 0);
    const aiUsers = usersData.filter(user => user.usesAI).length;
    const activeUsers = usersData.filter(user => user.status === "Active").length;
  
    const schedulesByDate = usersData.reduce((acc, user) => {
      const date = user.registeredAt;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += user.createdSchedules;
      return acc;
    }, {});
  
    return {
      totalSchedules,
      aiUsage: {
        used: aiUsers,
        notUsed: usersData.length - aiUsers
      },
      accountStatus: {
        active: activeUsers,
        inactive: usersData.length - activeUsers
      },
      schedulesByDate
    };
  };