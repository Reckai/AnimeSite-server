    import { PrismaClient, Prisma } from '@prisma/client'
    import {create} from "node:domain";

    const prisma = new PrismaClient()


    const animeData: Prisma.AnimeCreateInput[] = [
      {

        "licenseNameRu": 'Что-то там фрирен',
        "name": "Sousou no Frieren",
        "description": "Одержав победу над Королём демонов, отряд героя [character=186854]Химмеля[/character] вернулся домой. Приключение, растянувшееся на десятилетие, подошло к завершению. Волшебница-эльф [character=184947]Фрирен[/character] и её отважные товарищи принесли людям мир и разошлись в разные стороны, чтобы спокойно прожить остаток жизни. Однако не всех членов отряда ждёт одинаковая участь. Для эльфов время течёт иначе, поэтому [character=184947]Фрирен[/character] вынужденно становится свидетелем того, как её спутники один за другим постепенно уходят из жизни. Девушка осознала, что годы, проведённые в отряде героя, пронеслись в один миг, как падающая звезда в бескрайнем космосе её жизни, и столкнулась с сожалениями об упущенных возможностях. Сможет ли она смириться со смертью друзей и понять, что значит жизнь для окружающих её людей? [character=184947]Фрирен[/character] начинает новое путешествие, чтобы найти ответ.",
        "slug": "sousou-no-frieren",
        "poster": {
          create:
            {

              "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/52991/dc841cc9fce2aa1e9907a4b61c5d1d92.jpeg",
              "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/52991/preview-28cde2ca2872d414e42f772750490e4c.webp"
            }

        },

        "genres": {
         create: [
             {

                 "name": "Shounen",
                 "russian": "Сёнен"
             },
             {

                 "name": "Action",
                 "russian": "Экшен"
             },
             {

                 "name": "Adventure",
                 "russian": "Приключения"
             },
             {

                 "name": "Drama",
                 "russian": "Драма"
             },
             {

                 "name": "Fantasy",
                 "russian": "Фэнтези"
             },
             {

                 "name": "Military",
                 "russian": "Военное"
             }
         ]
        },


        "studios": {
            create: [
                {

                    "name": "Madhouse"
                }
                ]
        }
      },
      {
          "slug" : 'asdasd',
        "licenseNameRu": "Стальной алхимик: Братство",
        "name": "Fullmetal Alchemist: Brotherhood",
        "description": "Ремейк одноимённого аниме-сериала «[anime=121]Стальной алхимик[/anime]» 2003 года, более строго следующий событиям, описанным в манге.\r\n\r\nВ этом мире существуют алхимики — люди, владеющие искусством алхимии, способностью манипулировать материей и преобразовывать вещество. Все они ограничены основным Законом алхимии: нельзя алхимическим путём получить что-то, не пожертвовав чем-то равноценным полученному. Лишь с помощью легендарного философского камня, способ создания которого утерян, можно обойти этот Закон.\r\nГлавные герои, братья Эдвард [エドワード・エルリック] и Альфонс [アルフォンス・エルリック] Элрики, пострадали в детстве при попытке вернуть к жизни свою мать, умершую от болезни. Они забыли основной Закон алхимии и жестоко поплатились за это: Альфонс потерял всё своё тело, а Эдвард — руку и ногу. Эдвард сумел спасти лишь душу Альфонса, запечатав её в старинных доспехах.\r\nСпустя много лет Эдвард сдаёт государственный экзамен на звание алхимика и получает прозвище «Стальной Алхимик». Братья начинают путешествие с целью найти философский камень и вернуть с его помощью утраченное много лет назад.",
        "poster": {
            create: {
                "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/5114/40c4cba552dc60ebf02f8fc373b9a503.jpeg",
                "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/5114/preview-d57bfc92100292f6ff394cad384ba2f3.webp"
            }
        },
        "genres": {
            create: [
                {

                    "name": "Shounen",
                    "russian": "Сёнен"
                },
                {

                    "name": "Action",
                    "russian": "Экшен"
                },
                {

                    "name": "Adventure",
                    "russian": "Приключения"
                },
                {

                    "name": "Drama",
                    "russian": "Драма"
                },
                {

                    "name": "Fantasy",
                    "russian": "Фэнтези"
                },
                {

                    "name": "Military",
                    "russian": "Военное"
                }
            ]
        },
        "studios": {
            create: [
                {

                    "name": "Bones"
                }
            ]
        }
      },
    ]
    async function main() {
      console.log(`Start seeding ...`)
      for (const a of animeData) {
           a.slug = a.name?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || ' '
        const anime = await prisma.anime.create({
          data: a,
        })
        console.log(`Created user with id: ${anime.id}`)
      }
      console.log(`Seeding finished.`)
    }

    main()
      .then(async () => {
        await prisma.$disconnect()
      })
      .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
      })
