
import jwt from "jsonwebtoken";


import { v4 as uuidv4 } from 'uuid';


import {createRefreshToken} from "../../Services/RefreshToken/RefreshTokenService";
import {Role} from "../../Roles/Role";
import {getEnv} from "../../utils/JwtSecret";



export const issueJwtPair = async  (userId: string, role: Role = Role.USER) => {
    const RefreshToken = uuidv4()
    await createRefreshToken({userId, token: RefreshToken, role})
    return {
        token :  jwt.sign({userId: userId,role}, getEnv("JWT_SECRET"), {expiresIn: '15m'}),
        RefreshToken
    }

}
