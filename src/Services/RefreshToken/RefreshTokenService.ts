
import {context, Context} from "../../context";
import {RefreshTokenInput} from "../../RefreshToken/RefreshTokenI";


export const findRefreshToken = async (token: string) => {
  return await context.prisma.refreshTokens.findUnique({
        where:{
            token: token
        }

    })
}

export const createRefreshToken = async ({userId, token, role}: RefreshTokenInput) => {
    if(!userId || !token || !role) throw new Error('Invalid input')
    return await context.prisma.refreshTokens.create({
        data: {
            token,
            role,
            userId
        }
    })
}

export const deleteRefreshToken = async(token: string) => {
    return await context.prisma.refreshTokens.delete({
        where: {
            token
        }
    })
}
