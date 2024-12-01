import { context } from "../../../context"

export async function changeNickName(newName:string, userId:string) {
    if(!newName ||  userId){
        throw new Error('Not new nickName or userId')
    }
    const user =  await context.prisma.user.findUnique({
        where:{
            id: userId
        }
    })   
   if(!user){
    throw new Error(' User not found ')
   }
   await  context.prisma.user.update({
       data: {
           name: newName
       },
       where:{
        id: user.id
       }
   })
   return true;
}