import { v4 as uuid } from 'uuid'
import { context } from '../../context'
export const getVerificationTokenByEmail = async(email:string)=>{
    try {
        return context.prisma.verificationToken.findFirst({
            where:{
                email:email
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const getVerificationTokenByToken = async(token:string)=>{
    try {
        return context.prisma.verificationToken.findUnique({
            where:{
                token:token
            }
        })
    } catch (error) {
        console.log(error)
    }
}
const ONE_HOUR = 1000 * 60 * 60
export const generateVerificationToken = async(email:string)=>{
const token = uuid()
const expirationDate = new Date(new Date().getTime() + ONE_HOUR)

try {
    const existingToken = await getVerificationTokenByEmail(email)
if(existingToken){
    await context.prisma.verificationToken.delete({
        where:{
          id:existingToken.id
        }
    })
}
const verificationToken = await context.prisma.verificationToken.create({
    data:{
        email:email,
        token:token,
        expires:expirationDate
    }
})
return verificationToken
} catch (error) {
    console.log(error)
}
}