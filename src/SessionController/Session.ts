import {Role} from "../Roles/Role";

export interface Session {
    userId: string
    createdAt: Date
    last_access: Date
    access_token?: string
    role: Role
}
