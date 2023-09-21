export interface UserModelType {
    id: number;
    username: string;
    email: string;
    password: string;
}

export interface MessageItemType {
    id: number;
    type: "post" | "update";
    sender: string;
    text?: string;
}
