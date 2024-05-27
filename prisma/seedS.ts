import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

// const allAnimes = async ( ) => {
//     const res = await prisma.anime.findMany({
//         include: {
//             genres: true,
//             poster: true,
//             studios: true
//         }
//     })
//     console.log(1)
//     console.log(res)
//     return res
// }
// allAnimes();


const anime = async ( ) => {
    const res = await prisma.anime.findUnique({
        where: {
            slug: 'sousou-no-frieren'
        },
        include: {
            genres: true,
            poster: true,
            studios: true
        }
    })

    return res
}
anime();
