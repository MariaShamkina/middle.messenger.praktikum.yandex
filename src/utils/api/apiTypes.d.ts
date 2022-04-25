type UserData = {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string,
};

type ChatsResponse = {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: {
        user: UserData,
    },
};

type SignInData = {
    login: string,
    password: string,
};
