import {Role} from "./Role";

export interface Session {
    userId: string
    createdAt: Date
    last_access: Date
    access_token?: string
    role: Role
}
