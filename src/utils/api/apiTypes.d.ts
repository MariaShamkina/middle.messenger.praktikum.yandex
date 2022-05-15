type ApiModelData = FormData | {
    [propName: string]: unknown;
}

type BadRequestError = {
    reason: string,
}

type IdData = {
    id: number,
}

type PasswordData = {
    password: string,
}

type AvatarData = {
    avatar: string,
}

type BasicUserData = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    phone: string,
}

type AdditionalUserData = {
    display_name: string,
}

type SignUpData = BasicUserData & PasswordData;

type ProfileData = BasicUserData & AdditionalUserData;

type UserData = IdData & BasicUserData & AvatarData & AdditionalUserData;

type SearchData = {
    login: string,
}

type LogInData = {
    login: string,
    password: string,
}

type ChangePasswordData = {
    oldPassword: string,
    newPassword: string,
}

type ChatsResponse = {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: {
        user: UserData,
    },
}
