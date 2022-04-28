type BadRequestError = {
    reason: string,
}

type SignUpData = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string,
}

type IdData = {
    id: number,
}

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

type LogInData = {
    login: string,
    password: string,
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
