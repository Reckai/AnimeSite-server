    import { PrismaClient, Prisma } from '@prisma/client'
    function generateSlug(name: string, year: number): string {
      const baseSlug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      return `${baseSlug}-${year}`;
    }
    const prisma = new PrismaClient()
    function prepareAnimeData(animeList: any[]): Prisma.AnimeCreateInput[] {
      return animeList.map(anime => ({
        licenseNameRu: anime.russian || anime.licenseNameRu,
        name: anime.name,
        english: anime.english,
        description: anime.description,
        slug: generateSlug(anime.name, anime.season ? parseInt(anime.season.split('_')[1]) : 0),
        poster: {
          create: {
            originalUrl: anime.poster.originalUrl,
            previewUrl: anime.poster.previewUrl
          }
        },
        genres: {
          create: anime.genres.map((genre: any) => ({
            name: genre.name,
            russian: genre.russian
          }))
        },
        studios: {
          create: anime.studios.map((studio: any) => ({
            name: studio.name
          }))
        }
      }));
    }
    const animeList  = [
      {
        "id": "52991",
        "name": "Sousou no Frieren",
        "russian": "Провожающая в последний путь Фрирен",
        "season": "fall_2023",
        "poster": {
          "id": "712058",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/52991/dc841cc9fce2aa1e9907a4b61c5d1d92.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/52991/preview-28cde2ca2872d414e42f772750490e4c.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "2",
            "name": "Adventure",
            "russian": "Приключения",
            "kind": "genre"
          },
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "10",
            "name": "Fantasy",
            "russian": "Фэнтези",
            "kind": "genre"
          }
        ],
        "studios": [
          {
            "id": "11",
            "name": "Madhouse",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/11.png?1457607773"
          }
        ],
        "description": "Одержав победу над Королём демонов, отряд героя [character=186854]Химмеля[/character] вернулся домой. Приключение, растянувшееся на десятилетие, подошло к завершению. Волшебница-эльф [character=184947]Фрирен[/character] и её отважные товарищи принесли людям мир и разошлись в разные стороны, чтобы спокойно прожить остаток жизни. Однако не всех членов отряда ждёт одинаковая участь. Для эльфов время течёт иначе, поэтому [character=184947]Фрирен[/character] вынужденно становится свидетелем того, как её спутники один за другим постепенно уходят из жизни. Девушка осознала, что годы, проведённые в отряде героя, пронеслись в один миг, как падающая звезда в бескрайнем космосе её жизни, и столкнулась с сожалениями об упущенных возможностях. Сможет ли она смириться со смертью друзей и понять, что значит жизнь для окружающих её людей? [character=184947]Фрирен[/character] начинает новое путешествие, чтобы найти ответ."
      },
      {
        "id": "5114",
        "name": "Fullmetal Alchemist: Brotherhood",
        "russian": "Стальной алхимик: Братство",
        "season": "spring_2009",
        "poster": {
          "id": "500107",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/5114/40c4cba552dc60ebf02f8fc373b9a503.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/5114/preview-d57bfc92100292f6ff394cad384ba2f3.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "2",
            "name": "Adventure",
            "russian": "Приключения",
            "kind": "genre"
          },
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "10",
            "name": "Fantasy",
            "russian": "Фэнтези",
            "kind": "genre"
          },
          {
            "id": "38",
            "name": "Military",
            "russian": "Военное",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "4",
            "name": "Bones",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/4.png?1311292711"
          }
        ],
        "description": "Ремейк одноимённого аниме-сериала «[anime=121]Стальной алхимик[/anime]» 2003 года, более строго следующий событиям, описанным в манге.\r\n\r\nВ этом мире существуют алхимики — люди, владеющие искусством алхимии, способностью манипулировать материей и преобразовывать вещество. Все они ограничены основным Законом алхимии: нельзя алхимическим путём получить что-то, не пожертвовав чем-то равноценным полученному. Лишь с помощью легендарного философского камня, способ создания которого утерян, можно обойти этот Закон.\r\nГлавные герои, братья Эдвард [エドワード・エルリック] и Альфонс [アルフォンス・エルリック] Элрики, пострадали в детстве при попытке вернуть к жизни свою мать, умершую от болезни. Они забыли основной Закон алхимии и жестоко поплатились за это: Альфонс потерял всё своё тело, а Эдвард — руку и ногу. Эдвард сумел спасти лишь душу Альфонса, запечатав её в старинных доспехах.\r\nСпустя много лет Эдвард сдаёт государственный экзамен на звание алхимика и получает прозвище «Стальной Алхимик». Братья начинают путешествие с целью найти философский камень и вернуть с его помощью утраченное много лет назад."
      },
      {
        "id": "9253",
        "name": "Steins;Gate",
        "russian": "Врата Штейна",
        "season": "spring_2011",
        "poster": {
          "id": "456774",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/9253/475db7c6df0f11d567138322aebf411b.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/9253/preview-aadd2448a04c337b38c563c40f32c1db.webp"
        },
        "genres": [
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "24",
            "name": "Sci-Fi",
            "russian": "Фантастика",
            "kind": "genre"
          },
          {
            "id": "117",
            "name": "Suspense",
            "russian": "Триллер",
            "kind": "genre"
          },
          {
            "id": "40",
            "name": "Psychological",
            "russian": "Психологическое",
            "kind": "theme"
          },
          {
            "id": "111",
            "name": "Time Travel",
            "russian": "Путешествие во времени",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "314",
            "name": "White Fox",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/314.jpg?1311292714"
          }
        ],
        "description": "Сняв в Акихабаре квартиру, самопровозглашённый сумасшедший учёный [character=35252]Окабэ Ринтаро[/character] устроил там «лабораторию» и в компании своей подруги детства [character=35253]Сины Маюри[/character] и хакера-отаку [character=35258]Хасиды Итару[/character] изобретает «гаджеты будущего». Троица отлично проводит время вместе, работая над совместным проектом — «мобиловолновкой», которой можно управлять с помощью текстовых сообщений.\r\nВскоре «сотрудники лаборатории» сталкиваются с чередой загадочных инцидентов, которые приводят к открытию, изменившему правила игры: «мобиловолновка» может отправлять электронные письма в прошлое и таким образом изменять историю."
      },
      {
        "id": "28977",
        "name": "Gintama°",
        "russian": "Гинтама 4",
        "season": "spring_2015",
        "poster": {
          "id": "682699",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/28977/22e8b06a4dbbacb7b6ae409412389464.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/28977/preview-3c17ffd9ba06562864f22a9cf3208750.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "4",
            "name": "Comedy",
            "russian": "Комедия",
            "kind": "genre"
          },
          {
            "id": "24",
            "name": "Sci-Fi",
            "russian": "Фантастика",
            "kind": "genre"
          },
          {
            "id": "112",
            "name": "Gag Humor",
            "russian": "Гэг-юмор",
            "kind": "theme"
          },
          {
            "id": "13",
            "name": "Historical",
            "russian": "Исторический",
            "kind": "theme"
          },
          {
            "id": "20",
            "name": "Parody",
            "russian": "Пародия",
            "kind": "theme"
          },
          {
            "id": "21",
            "name": "Samurai",
            "russian": "Самураи",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "1258",
            "name": "Bandai Namco Pictures",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/1258.png?1589293619"
          }
        ],
        "description": "Никто этого уже не ждал и не надеялся, но...\r\n«Простите, что сняли четвертый сезон!», — возвестила студия [i]Sunrise[/i] и вернула любимых героев, по которым все уже успели соскучиться, на экраны. Гинтама снова с нами, и она лучше, чем когда-либо прежде! В ролях: Ёродзуя, Шинсенгуми, Джои, пришельцы — все наши старые-добрые и новые-злые герои. В Эдо, как обычно, случаются катастрофы местного и вселенского масштаба, а предотвращать их и спасать мир вновь придется нашим веселым и бесшабашным героям.\r\nВ основе аниме юмор самого разного калибра: от туалетных шуток до изысканных острот, а кроме того куча отсылок и пародий. Мысль «Как всю съемочную группу в полном составе до сих пор не засудили?» сломает ваш мозг. Так что приготовьтесь! Ваши стереотипы об аниме будут разрушены навсегда. А сами вы будете рыдать от смеха, наблюдая за невероятными приключениями самурая с серебряными волосами и его необыкновенными соседями!"
      },
      {
        "id": "38524",
        "name": "Shingeki no Kyojin Season 3 Part 2",
        "russian": "Атака титанов 3. Часть 2",
        "season": "spring_2019",
        "poster": {
          "id": "727584",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/38524/6e47d9541f0a77b994c1f487408121e6.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/38524/preview-a14296e6ce2ed8d2d51eed827c3f9d01.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "117",
            "name": "Suspense",
            "russian": "Триллер",
            "kind": "genre"
          },
          {
            "id": "105",
            "name": "Gore",
            "russian": "Жестокость",
            "kind": "theme"
          },
          {
            "id": "38",
            "name": "Military",
            "russian": "Военное",
            "kind": "theme"
          },
          {
            "id": "141",
            "name": "Survival",
            "russian": "Выживание",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "858",
            "name": "Wit Studio",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/858.png?1366652107"
          }
        ],
        "description": "Прямое продолжение аниме «[anime=35760]Атака титанов 3[/anime]». Экранизация седьмой по счёту сюжетной арки манги за авторством [person=11705]Хадзимэ Исаямы[/person].\r\n\r\nВнутри стен снова настали мирные времена, и разведотряд готовится к новой вылазке за стену «Роза», прямиком в Шиганшину. Благодаря [character=71121]Ханджи[/character] разработка нового оружия для убийства титанов почти без участия людей идёт полным ходом, а к солдатам вернулась давно утраченная надежда на спасение всего человечества. Но в Шиганшине наших героев подстерегает невиданная опасность, способная уничтожить все планы [character=46496]Эрвина[/character] на возвращение стены «Мария» и разрушить все мечты узнать, что же таится в секретном подвале старого дома [character=40882]Эрена[/character] и [character=40881]Микасы[/character]."
      },
      {
        "id": "39486",
        "name": "Gintama: The Final",
        "russian": "Гинтама: Финал",
        "season": null,
        "poster": {
          "id": "682710",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/39486/3e17ca2a5605461dae3a824cc3cfcecc.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/39486/preview-1dd94df2a40eaeeb81b1c2df08172a46.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "4",
            "name": "Comedy",
            "russian": "Комедия",
            "kind": "genre"
          },
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "24",
            "name": "Sci-Fi",
            "russian": "Фантастика",
            "kind": "genre"
          },
          {
            "id": "112",
            "name": "Gag Humor",
            "russian": "Гэг-юмор",
            "kind": "theme"
          },
          {
            "id": "13",
            "name": "Historical",
            "russian": "Исторический",
            "kind": "theme"
          },
          {
            "id": "20",
            "name": "Parody",
            "russian": "Пародия",
            "kind": "theme"
          },
          {
            "id": "21",
            "name": "Samurai",
            "russian": "Самураи",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "1258",
            "name": "Bandai Namco Pictures",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/1258.png?1589293619"
          }
        ],
        "description": "Два года минуло с последних событий. Пути Ёродзуи разошлись: [character=672]Гинтоки[/character] исследует Альтану, [character=674]Кагура[/character] по всему космосу ищет способ вернуть прежнее состояние [character=2651]Садахару[/character], а [character=673]Шинпачи[/character] пытается сохранить то немногое, что осталось от их общего дома. \r\nНо тучи сгущаются, остатки Тендошу, благодаря банановой атаке [character=2943]Гориллы[/character], падают на Центральный терминал и собираются вновь использовать Альтану в своих целях.\r\nПришла пора друзьям в последний раз встать на защиту Эдо, чтобы исполнить желание [character=28144]Шоё Йошиды[/character] и заодно спасти своё будущее."
      },
      {
        "id": "11061",
        "name": "Hunter x Hunter (2011)",
        "russian": "Охотник х Охотник (2011)",
        "season": "fall_2011",
        "poster": {
          "id": "706548",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/11061/09a4196c062532ec7a6a0a74ca201fda.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/11061/preview-45fcd960a4c8211c343e913c865662a6.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "2",
            "name": "Adventure",
            "russian": "Приключения",
            "kind": "genre"
          },
          {
            "id": "10",
            "name": "Fantasy",
            "russian": "Фэнтези",
            "kind": "genre"
          }
        ],
        "studios": [
          {
            "id": "11",
            "name": "Madhouse",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/11.png?1457607773"
          }
        ],
        "description": "Охотник — это тот, кто путешествует по миру, выполняя различные опасные миссии: от поимки преступников до поиска сокровищ в неизведанных землях. Главный герой — мальчик по имени Гон [ゴン＝フリークス]. Его отец [character=26]Джин[/character] был охотником, но исчез много лет назад. Гон считает, что если пойдёт по стопам отца и станет охотником, то рано или поздно вновь встретится с ним. Мальчик надеется, что, повстречав отца, наконец сможет задать ему один-единственный вопрос: почему он предпочёл жизнь охотника своему маленькому сынишке.\r\nКогда ему исполняется двенадцать, Гон, как в своё время и его отец, покидает родной остров с целью сдать официальный экзамен на охотника. Но экзамен очень сложен, и каждый год множество людей погибают, пытаясь получить это звание. Во время своего путешествия Гон знакомится с [character=28]Курапикой[/character], [character=29]Леорио[/character] и [character=27]Киллуа[/character], вместе с которыми ступает на тернистый путь охотника.\r\n[i]Ремейк аниме-сериала «[anime=136]Охотник х Охотник[/anime]» 1999 года.[/i]"
      },
      {
        "id": "9969",
        "name": "Gintama'",
        "russian": "Гинтама 2",
        "season": "spring_2011",
        "poster": {
          "id": "715558",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/9969/66c315230c81f14202f76ba049a0f79a.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/9969/preview-ce2ffe5f2516cc833ca3a063d7909042.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "4",
            "name": "Comedy",
            "russian": "Комедия",
            "kind": "genre"
          },
          {
            "id": "24",
            "name": "Sci-Fi",
            "russian": "Фантастика",
            "kind": "genre"
          },
          {
            "id": "112",
            "name": "Gag Humor",
            "russian": "Гэг-юмор",
            "kind": "theme"
          },
          {
            "id": "13",
            "name": "Historical",
            "russian": "Исторический",
            "kind": "theme"
          },
          {
            "id": "20",
            "name": "Parody",
            "russian": "Пародия",
            "kind": "theme"
          },
          {
            "id": "21",
            "name": "Samurai",
            "russian": "Самураи",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "14",
            "name": "Sunrise",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/14.jpg?1630137154"
          }
        ],
        "description": "Продолжение приключений Гинтоки [Gintoki Sakata] и его команды из агентства «Мастера на все руки» в окружении альтернативно-исторической феодальной Японии."
      },
      {
        "id": "820",
        "name": "Ginga Eiyuu Densetsu",
        "russian": "Легенда о героях Галактики",
        "season": null,
        "poster": {
          "id": "770374",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/820/d577f746baddd37742668d7643e693b5.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/820/preview-7c0f76d8b566536e4f68187d42424158.webp"
        },
        "genres": [
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "24",
            "name": "Sci-Fi",
            "russian": "Фантастика",
            "kind": "genre"
          },
          {
            "id": "104",
            "name": "Adult Cast",
            "russian": "Взрослые персонажи",
            "kind": "theme"
          },
          {
            "id": "38",
            "name": "Military",
            "russian": "Военное",
            "kind": "theme"
          },
          {
            "id": "29",
            "name": "Space",
            "russian": "Космос",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "1269",
            "name": "K-Factory",
            "imageUrl": null
          },
          {
            "id": "2256",
            "name": "Kitty Film Mitaka Studio",
            "imageUrl": null
          }
        ],
        "description": "Десятилетиями Галактическая Империя воюет в межзвездной войне против Альянса Свободных Планет. В конфликте участвуют тысячи космических кораблей и миллионы солдат с обеих сторон.\r\nПроходит время, появляются молодые и амбициозные офицеры: Райнхард фон Лоэнграмм в Галактической Империи и Вэньли Ян в Альянсе Свободных Планет. Им предстоит пройти через множество испытаний, преодолевать сопротивление начальства и подчиненных, маневрировать в сложнейших политических ситуациях, выигрывать битвы и в конце концов полностью изменить облик современной космической войны."
      },
      {
        "id": "15417",
        "name": "Gintama': Enchousen",
        "russian": "Гинтама 3",
        "season": "fall_2012",
        "poster": {
          "id": "715559",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/15417/42af66eae166e9537d07590967d5f565.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/15417/preview-327a3b825bf4e8e4bc75d120dcbc4b16.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "4",
            "name": "Comedy",
            "russian": "Комедия",
            "kind": "genre"
          },
          {
            "id": "24",
            "name": "Sci-Fi",
            "russian": "Фантастика",
            "kind": "genre"
          },
          {
            "id": "112",
            "name": "Gag Humor",
            "russian": "Гэг-юмор",
            "kind": "theme"
          },
          {
            "id": "13",
            "name": "Historical",
            "russian": "Исторический",
            "kind": "theme"
          },
          {
            "id": "20",
            "name": "Parody",
            "russian": "Пародия",
            "kind": "theme"
          },
          {
            "id": "21",
            "name": "Samurai",
            "russian": "Самураи",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "14",
            "name": "Sunrise",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/14.jpg?1630137154"
          }
        ],
        "description": "Третье пришествие знаменитой троицы мастеров на все руки [[Ёродзуя]]. Гинтоки [坂田銀時] по-прежнему ленив и кучеряв, у малышки Кагуры [神楽] остался прежний взрывной характер (и бездонный желудок тоже), а Шинпачи [志村新八] всё так же выступает в команде голосом разума. Почему всё осталось по-прежнему? Потому что сериал представляет из себя повторный показ избранных эпизодов из предыдущих сезонов, однако не обойдётся и без новых серий. Восстав аки феникс из пепла, сериал вновь раздаст пинки здравому смыслу, поиздевается над моралью и порвёт не один шаблон. Приготовьтесь, театр абсурда в декорациях футуристически-средневекового Эдо ещё никогда не был таким весёлым!"
      },
      {
        "id": "41467",
        "name": "Bleach: Sennen Kessen-hen",
        "russian": "Блич: Тысячелетняя кровавая война",
        "season": "fall_2022",
        "poster": {
          "id": "456070",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/41467/3eebd4f1219e0e8c3c06fa335a65cdea.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/41467/preview-1bb3aed9c98eb9253babd8c2d65ddce7.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "2",
            "name": "Adventure",
            "russian": "Приключения",
            "kind": "genre"
          },
          {
            "id": "10",
            "name": "Fantasy",
            "russian": "Фэнтези",
            "kind": "genre"
          }
        ],
        "studios": [
          {
            "id": "1",
            "name": "Pierrot",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/1.png?1378753179"
          }
        ],
        "description": "Сообщество душ получает множество сообщений о тревоге: число пустых, уничтоженных в мире живых, растёт с каждой минутой; всё больше жителей района Руконгай числятся пропавшими; грань между миром живых и Сообществом душ под угрозой исчезновения. Вскоре и само Сообщество подвергается нападению группы людей, которые называют себя «Ванденрейх». Во главе с [character=68537]Яхве[/character], отцом всех квинси, который был запечатан много лет, «Ванденрейх» объявляет войну всем синигами и грозится через пять дней стереть Сообщество душ в порошок.\r\n\r\n[character=5]Ичиго Куросаки[/character], временно исполняющему обязанности синигами, предстоит вновь взять в руки меч и стать на защиту мира людей и Сообщества душ. Враг будет силён, но верные друзья [character=5]Ичиго[/character], [character=564]Урю Исида[/character], [character=7]Орихимэ Иноуэ[/character] и [character=575]Ясутора Садо[/character], не останутся в стороне, они готовы дать отпор в любой момент!"
      },
      {
        "id": "43608",
        "name": "Kaguya-sama wa Kokurasetai: Ultra Romantic",
        "russian": "Госпожа Кагуя: в любви как на войне 3",
        "season": "spring_2022",
        "poster": {
          "id": "717031",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/43608/1a267ded89ab0ec3e0d88652c5498016.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/43608/preview-88b36059bfebb01f97d57015f26638a0.webp"
        },
        "genres": [
          {
            "id": "42",
            "name": "Seinen",
            "russian": "Сэйнэн",
            "kind": "demographic"
          },
          {
            "id": "4",
            "name": "Comedy",
            "russian": "Комедия",
            "kind": "genre"
          },
          {
            "id": "22",
            "name": "Romance",
            "russian": "Романтика",
            "kind": "genre"
          },
          {
            "id": "23",
            "name": "School",
            "russian": "Школа",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "56",
            "name": "A-1 Pictures",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/56.?1434707196"
          }
        ],
        "description": "«Любовь — это война!»\r\n[character=136685]Миюки Сироганэ[/character] и [character=136359]Кагуя Синомия[/character] знают об этом не понаслышке. И пусть за время, проведённое вместе в студенческом совете академии Сютин, они стали ближе, уступать никто не желает, ведь признание равносильно поражению!\r\nВыборы главы совета позади, и весь прошлый состав вернулся к своим привычным должностям, обзаведясь новым членом — десятиклассницей [character=152052]Мико Иино[/character]. Однако время неумолимо, и школьная пора рано или поздно закончится, а что будет дальше — неизвестно никому. [character=136685]Миюки[/character] и [character=136359]Кагуя[/character] понимают это, и чем раньше они раскроют свои чувства друг другу, тем больше времени смогут провести вместе. Но как отбросить гордость и сделать первый шаг?"
      },
      {
        "id": "42938",
        "name": "Fruits Basket: The Final",
        "russian": "Корзинка фруктов: Финал",
        "season": "spring_2021",
        "poster": {
          "id": "682895",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/42938/4dd182ba89f9fa394aa3193e7963583e.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/42938/preview-e37fda77184ce139843bfd3cfac1f40c.webp"
        },
        "genres": [
          {
            "id": "25",
            "name": "Shoujo",
            "russian": "Сёдзё",
            "kind": "demographic"
          },
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "22",
            "name": "Romance",
            "russian": "Романтика",
            "kind": "genre"
          },
          {
            "id": "37",
            "name": "Supernatural",
            "russian": "Сверхъестественное",
            "kind": "genre"
          }
        ],
        "studios": [
          {
            "id": "73",
            "name": "TMS Entertainment",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/73.?1413190852"
          }
        ],
        "description": "Сотни лет назад китайские духи Зодиака и их бог поклялись вечно оставаться вместе. Объединенные этим обещанием, одержимые члены семьи Сома должны всегда и при любых обстоятельствах возвращаться друг к другу. Однако, когда эти узы сковывают их свободу, это становится нежелательным бременем — проклятием. Будучи главой клана, [character=374]Акито[/character] убеждён, что у него есть особая связь с другими Сома. Пока он отчаянно цепляется за эту фантазию, остальные члены семьи остаются изолированными и подавленными из-за страха наказания.\r\n\r\n[character=207]Тору Хонда[/character], которая привязалась к Сомам, полна решимости разорвать связывающие их цепи. Общение с семьёй и друзьями побуждает её двигаться вперёд к снятию проклятия, однако из-за сбивающих с толку откровений ей с трудом удаётся найти в себе силы продолжать свои начинания. Время медленно уходит, [character=207]Тору[/character] борется с неопределённым будущим в надежде достичь спокойствия, которое может находиться за пределами всей этой суматохи."
      },
      {
        "id": "34096",
        "name": "Gintama.",
        "russian": "Гинтама 5",
        "season": "winter_2017",
        "poster": {
          "id": "682713",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/34096/d039d611be65a1e226be796992c80b7a.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/34096/preview-c357015a717e6e2fe4a8ad50d0e9bd24.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "4",
            "name": "Comedy",
            "russian": "Комедия",
            "kind": "genre"
          },
          {
            "id": "24",
            "name": "Sci-Fi",
            "russian": "Фантастика",
            "kind": "genre"
          },
          {
            "id": "112",
            "name": "Gag Humor",
            "russian": "Гэг-юмор",
            "kind": "theme"
          },
          {
            "id": "13",
            "name": "Historical",
            "russian": "Исторический",
            "kind": "theme"
          },
          {
            "id": "20",
            "name": "Parody",
            "russian": "Пародия",
            "kind": "theme"
          },
          {
            "id": "21",
            "name": "Samurai",
            "russian": "Самураи",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "1258",
            "name": "Bandai Namco Pictures",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/1258.png?1589293619"
          }
        ],
        "description": "В Японии эпохи Эдо, захваченной пришельцами, небоскрёбы, скоростные поезда и шумные мотоциклы, казалось бы, давно стёрли из умов землян воспоминания об обычной жизни. Единственный человек, в котором сохранился дух самурая, — Гинтоки Саката. Как обычно, в своей неторопливой манере, Гинтоки продолжает, валяясь на диване, читать [url=http://ru.wikipedia.org/wiki/Weekly_Shonen_Jump]Jump[/url], бродить по кабакам, прятать остатки денег от [character=5970]Отосэ[/character] и спасать мир в перерывах между ковырянием в носу.\r\n\r\nНеизвестно, что готовит ему судьба на этот раз, но верные Кагура и Шинпачи [志村 新八] всегда рядом."
      },
      {
        "id": "57864",
        "name": "Monogatari Series: Off & Monster Season",
        "russian": "Цикл историй: Межсезонье и сезон монстров",
        "season": null,
        "poster": {
          "id": "726337",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/57864/e6ead200722db87c5750ae0aa4ad6118.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/57864/preview-98b5356e6ff29dcb524792aaca082bfc.webp"
        },
        "genres": [
          {
            "id": "4",
            "name": "Comedy",
            "russian": "Комедия",
            "kind": "genre"
          },
          {
            "id": "7",
            "name": "Mystery",
            "russian": "Тайна",
            "kind": "genre"
          },
          {
            "id": "37",
            "name": "Supernatural",
            "russian": "Сверхъестественное",
            "kind": "genre"
          },
          {
            "id": "32",
            "name": "Vampire",
            "russian": "Вампиры",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "44",
            "name": "Shaft",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/44.png?1503215283"
          }
        ],
        "description": "«[i]Это прекрасно — время от времени спасать девушек, которые не имеют к тебе никакого отношения[/i]».\r\nСтранности всегда были частью людского бытия. Некоторые рассказы о них датируются шестисотлетней давностью. Истории о вампирах, обезьяньей лапе, фамильярах, странниках в горном тумане, кровожадных кошках, волках, русалках и, что самое страшное, о людях, собраны так называемыми «специалистами по странностям». Задача специалистов — бороться, регулировать и, самое главное, разгадывать множество тайн, к которым приводят обстоятельства, созданные этими самыми странностями.\r\n[character=22036]Коёми Арараги[/character], который уже стал студентом университета, предстоит столкнуться с очередной странностью и обнаружить её источник, используя накопленный опыт. Ученицы старшей школы «Наоэцу» стали неожиданно исчезать одна за другой, а похититель не оставляет за собой никаких улик. Когда выясняется, что тела всех пропавших девушек мумифицируют, Коёми решает, что не может оставаться в стороне и отправляется на поиски преступника!"
      },
      {
        "id": "918",
        "name": "Gintama",
        "russian": "Гинтама",
        "season": "spring_2006",
        "poster": {
          "id": "715557",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/918/5b04621235daaa6f1ecae243f01019fe.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/918/preview-31731dfe9eff47fff39efc9d9c5a62dc.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "4",
            "name": "Comedy",
            "russian": "Комедия",
            "kind": "genre"
          },
          {
            "id": "24",
            "name": "Sci-Fi",
            "russian": "Фантастика",
            "kind": "genre"
          },
          {
            "id": "112",
            "name": "Gag Humor",
            "russian": "Гэг-юмор",
            "kind": "theme"
          },
          {
            "id": "13",
            "name": "Historical",
            "russian": "Исторический",
            "kind": "theme"
          },
          {
            "id": "20",
            "name": "Parody",
            "russian": "Пародия",
            "kind": "theme"
          },
          {
            "id": "21",
            "name": "Samurai",
            "russian": "Самураи",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "14",
            "name": "Sunrise",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/14.jpg?1630137154"
          }
        ],
        "description": "Жить в феодальной Японии непросто... особенно если вас завоевали инопланетяне. Да, конечно, новая система здравоохранения хороша, но запрет на ношение меча ставит истинных самураев в безвыходное положение. Вдвойне это относится к Гинтоки Сакате [坂田 銀時], последнему самураю, в ком ещё жив истинно японский дух.\r\nГинтоки живёт с Кагурой [神楽], представительницей одной из сильнейших рас во вселенной, и очкариком Шинпачи Шимурой [志村新八]. Втроём они создают агентство под названием «Мастера на все руки [[Гинтоки]]-сана» и берутся за любые странные и нелепые поручения, с которыми к ним приходят, будь то поиск пропавшей кошки или спасение мира. Ведь платить им нечем не только за аренду жилья, но и за еду."
      },
      {
        "id": "4181",
        "name": "Clannad: After Story",
        "russian": "Кланнад: Продолжение истории",
        "season": "fall_2008",
        "poster": {
          "id": "682690",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/4181/cfe465ca4382aea8a64b11672d6de84e.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/4181/preview-ff7800a53bfa2950207f61c824b90fae.webp"
        },
        "genres": [
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "22",
            "name": "Romance",
            "russian": "Романтика",
            "kind": "genre"
          },
          {
            "id": "37",
            "name": "Supernatural",
            "russian": "Сверхъестественное",
            "kind": "genre"
          }
        ],
        "studios": [
          {
            "id": "2",
            "name": "Kyoto Animation",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/2.png?1522422929"
          }
        ],
        "description": "События второго сезона разворачиваются сразу за первым, после летних каникул в последнем семестре обучения Томоя в старшей школе.\r\nТомоя [岡崎 朋也] признался в любви Нагисе [古河 渚], и теперь у них началась совместная жизнь. Но как не бывает света без тени, так не бывает и счастья без горя. Впереди героев ждут тяжелые испытания и потрясения..."
      },
      {
        "id": "28851",
        "name": "Koe no Katachi",
        "russian": "Форма голоса",
        "season": null,
        "poster": {
          "id": "706552",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/28851/a98ffda9b7409d610aae10147d35658a.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/28851/preview-2042ba436893f5c0feac2f8315d78cf9.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "114",
            "name": "Award Winning",
            "russian": "Удостоено наград",
            "kind": "theme"
          },
          {
            "id": "151",
            "name": "Romantic Subtext",
            "russian": "Романтический подтекст",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "2",
            "name": "Kyoto Animation",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/2.png?1522422929"
          }
        ],
        "description": "Подобно миру взрослых, мир детей не терпит различий, выделяющих кого-то на фоне других, коих принято считать нормальными. Этот мир жесток, поскольку его обитатели, в отличие от обитателей мира взрослых, еще не успели научиться скрывать мерзкие мысли за напускной улыбкой. Многие вещи им непонятны, более того — неведомы. Дети прямолинейны. И поэтому очень жестоки.\r\nОднако все дети когда-нибудь вырастают. И оглядываясь назад, во времена школьной рутины, некоторым из них становится стыдно за свою юность.\r\nСложно представить, сколько лет должно пройти, пока до примерного задиры и разгильдяя дойдет, каким глупцом он был, когда веселья ради издевался над инвалидом. Кто-то об этом даже не вспомнит. А кто-то вроде Сёи [Shouya Ishida] возненавидит себя крепкой ненавистью. В младшей школе он умудрился превратить жизнь одноклассницы по имени Сёко [Shouko Nishimiya] в ад. Только потому, что та была глухая, не как все. И теперь, несколько лет спустя, хоть и запоздало, но мальчишка понял: чтобы сказать нечто важное тому, кто не может тебя услышать, вовсе не обязательно использовать голос."
      },
      {
        "id": "35180",
        "name": "3-gatsu no Lion 2nd Season",
        "russian": "Мартовский лев 2",
        "season": "fall_2017",
        "poster": {
          "id": "725568",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/35180/38f579d826a4cf718bd3991ea0b58873.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/35180/preview-26099dbf6f54e35f4889354189d10d1c.webp"
        },
        "genres": [
          {
            "id": "42",
            "name": "Seinen",
            "russian": "Сэйнэн",
            "kind": "demographic"
          },
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "134",
            "name": "Childcare",
            "russian": "Забота о детях",
            "kind": "theme"
          },
          {
            "id": "11",
            "name": "Strategy Game",
            "russian": "Стратегические игры",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "44",
            "name": "Shaft",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/44.png?1503215283"
          }
        ],
        "description": "Мир сёги — «игры генералов» — непрост. В этом мире живут люди поистине потрясающие. Каждый день они с фанатизмом сражаются друг с другом на поле боя, которым выступает небольшая деревянная доска, проигрывают и побеждают. И боль от поражения подчас похожа на боль — ту далёкую и обидную — как от удара настоящим мечом.\r\nСтолько игр позади, столько эмоций, а [character=21044]Рэй[/character], кажется, едва изменился. Он всё тот же угрюмый парень, поглощённый противоречивыми мыслями и иногда наведывающийся в уютный дом семьи Кавамото. Но одновременно и воин, неистово сражающийся за победу. В мире триумфаторов и поверженных «генералов» он ещё не догадывается, кем в конце концов станет. Всё, чего ему хочется — это играть в сёги и каждый новый день встречать вместе с людьми, похожими на него самого — стремящимися, кто осознанно, а кто нет, к яркому свету победы."
      },
      {
        "id": "2904",
        "name": "Code Geass: Hangyaku no Lelouch R2",
        "russian": "Код Гиас: Восставший Лелуш 2",
        "season": "spring_2008",
        "poster": {
          "id": "496674",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/2904/0b5d2c31efae13e936a60b6a30bfc979.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/2904/preview-dfe8a3d9aaa91e735ddc36e2fb9e7b7f.webp"
        },
        "genres": [
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "24",
            "name": "Sci-Fi",
            "russian": "Фантастика",
            "kind": "genre"
          },
          {
            "id": "114",
            "name": "Award Winning",
            "russian": "Удостоено наград",
            "kind": "theme"
          },
          {
            "id": "18",
            "name": "Mecha",
            "russian": "Меха",
            "kind": "theme"
          },
          {
            "id": "38",
            "name": "Military",
            "russian": "Военное",
            "kind": "theme"
          },
          {
            "id": "31",
            "name": "Super Power",
            "russian": "Супер сила",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "14",
            "name": "Sunrise",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/14.jpg?1630137154"
          }
        ],
        "description": "Прошёл год со дня разгрома «Чёрного восстания». Остатки «Ордена Чёрных рыцарей» скрываются от Империи, рассеявшись по стране, их лидер Зеро казнён Британией, а жители Сектора-11 угнетены ещё сильнее. Основные силы Империи теперь сконцентрированы на Европейском фронте.\r\nВпрочем, для самих британцев в Одиннадцатом Секторе жизнь наладилась. В один прекрасный день британский студент, прогуливая занятия, отправляется играть партию шахмат на деньги. Незримо для него за ним наблюдают... Вскоре ему предстоит вернуть утраченную память и продолжить подавленное Империей восстание Зеро."
      },
      {
        "id": "54492",
        "name": "Kusuriya no Hitorigoto",
        "russian": "Монолог фармацевта",
        "season": "fall_2023",
        "poster": {
          "id": "727849",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/54492/283fbef180e72bacfadc5a3d64ca4c2e.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/54492/preview-685707eb5d014e53a70b701478eb64c2.webp"
        },
        "genres": [
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "7",
            "name": "Mystery",
            "russian": "Тайна",
            "kind": "genre"
          },
          {
            "id": "13",
            "name": "Historical",
            "russian": "Исторический",
            "kind": "theme"
          },
          {
            "id": "147",
            "name": "Medical",
            "russian": "Медицина",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "28",
            "name": "OLM",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/28.png?1523482474"
          },
          {
            "id": "2705",
            "name": "TOHO animation STUDIO",
            "imageUrl": null
          }
        ],
        "description": "Уже полгода прошло с того момента, как 17-летнюю Маомао похитили и заставили трудиться в императорском дворце обычной служанкой. Работа тяжёлая, но девушка решила не сдаваться, не унывать и честно вкалывать, пока её не отпустят на покой. Планы изменились, когда до Маомао дошли вести о том, что детей императора одолел серьёзный недуг. Девушка решила тайком попробовать разобраться и помочь, рассчитывая на свой опыт в фармацевтике, которой она занималась раньше, когда проживала в Квартале красных фонарей.\r\nНесмотря на то, что Маомао не хотела привлекать к себе внимания, её вмешательство и талант не остались незамеченными. Вскоре Маомао оказалась вхожа во внутренние покои и вступила в круг приближённых императора. Благодаря своим знаниям и эксцентричному характеру Маомао произведёт фурор во дворце!"
      },
      {
        "id": "15335",
        "name": "Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare",
        "russian": "Гинтама: Финальная арка — Ёродзуя навсегда!",
        "season": null,
        "poster": {
          "id": "716132",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/15335/21526aed9fce8c4fd132eaf301bf084b.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/15335/preview-b06208d7bf2b05460f80b733249c13c3.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "4",
            "name": "Comedy",
            "russian": "Комедия",
            "kind": "genre"
          },
          {
            "id": "24",
            "name": "Sci-Fi",
            "russian": "Фантастика",
            "kind": "genre"
          },
          {
            "id": "112",
            "name": "Gag Humor",
            "russian": "Гэг-юмор",
            "kind": "theme"
          },
          {
            "id": "13",
            "name": "Historical",
            "russian": "Исторический",
            "kind": "theme"
          },
          {
            "id": "20",
            "name": "Parody",
            "russian": "Пародия",
            "kind": "theme"
          },
          {
            "id": "21",
            "name": "Samurai",
            "russian": "Самураи",
            "kind": "theme"
          },
          {
            "id": "111",
            "name": "Time Travel",
            "russian": "Путешествие во времени",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "14",
            "name": "Sunrise",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/14.jpg?1630137154"
          }
        ],
        "description": "Интересно, что бы случилось, если бы Белого Демона никогда не существовало?\r\nВ один прекрасный день мир сошёл с ума, и теперь Эдо ввергнут в настоящий хаос. Гинтоки Саката отныне живёт в альтернативной реальности, будущем, в котором ему места не нашлось. Но что же случилось с Ёродзуей? А с остальными? Но важнее всего: кто за всем этим стоит?\r\nПохоже, Гинтоки снова предстоит стать демоном во плоти, чтобы защитить своих друзей. Ему в одиночку придётся управляться с грандиознейшим поручением в истории Ёродзуи и постараться, чтобы оно не стало последним."
      },
      {
        "id": "51535",
        "name": "Shingeki no Kyojin: The Final Season - Kanketsu-hen",
        "russian": "Атака титанов: Финал — Заключительная глава",
        "season": "spring_2023",
        "poster": {
          "id": "716461",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/51535/b120c9658bf6725b963b055cd5d1bab4.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/51535/preview-0cdd0fee5a3a1834a251ff9b5e9e15af.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "117",
            "name": "Suspense",
            "russian": "Триллер",
            "kind": "genre"
          },
          {
            "id": "105",
            "name": "Gore",
            "russian": "Жестокость",
            "kind": "theme"
          },
          {
            "id": "38",
            "name": "Military",
            "russian": "Военное",
            "kind": "theme"
          },
          {
            "id": "141",
            "name": "Survival",
            "russian": "Выживание",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "569",
            "name": "MAPPA",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/569.png?1351013196"
          }
        ],
        "description": "Противостояние титанов и людей достигло апогея. Однако теперь человечество вынуждено сражаться не только с огромными созданиями, но и друг с другом. Попытка захватить первенство в этой кровавой гонке влечёт за собой цепь событий, которые способны привести мир к гибели. В один миг враг может стать союзником, а товарищ по оружию превратиться в недруга, ведь в этом жестоком мире сила и коварство решают всё, а люди, чтобы выжить и защитить то, что им дорого, не гнушаются любыми методами. \r\n\r\nСумеет ли человечество выжить в этой борьбе?"
      },
      {
        "id": "37491",
        "name": "Gintama.: Shirogane no Tamashii-hen - Kouhan-sen",
        "russian": "Гинтама 8",
        "season": "summer_2018",
        "poster": {
          "id": "437084",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/37491/3ad7aefe8a60d60fd49c696553b9c584.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/37491/preview-e59f0b0646afecc8295907800576e84c.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "4",
            "name": "Comedy",
            "russian": "Комедия",
            "kind": "genre"
          },
          {
            "id": "24",
            "name": "Sci-Fi",
            "russian": "Фантастика",
            "kind": "genre"
          },
          {
            "id": "112",
            "name": "Gag Humor",
            "russian": "Гэг-юмор",
            "kind": "theme"
          },
          {
            "id": "13",
            "name": "Historical",
            "russian": "Исторический",
            "kind": "theme"
          },
          {
            "id": "20",
            "name": "Parody",
            "russian": "Пародия",
            "kind": "theme"
          },
          {
            "id": "21",
            "name": "Samurai",
            "russian": "Самураи",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "1258",
            "name": "Bandai Namco Pictures",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/1258.png?1589293619"
          }
        ],
        "description": "Пока [character=672]Гинтоки[/character] с друзьями пытается освободить Эдо от Армии освобождения, в космосе [character=1533]Котаро[/character] и [character=2945]Тацума[/character] вместе со своими верными союзниками пытаются объединить силы с [character=158097]Шиджаку[/character] и [character=7929]Принцем Хатой[/character]. Некоторые, уже знакомые нам ранее герои, тоже не останутся в стороне и присоединятся к сражению. Впереди ждёт ещё много трудностей и испытаний, но наши герои выложатся на полную катушку! Ведь на кону, без преувеличения, целая планета.\r\n[i]Вторая часть экранизации арки «Серебряная душа» из манги «[manga=44]Гинтама[/manga]».[/i]"
      },
      {
        "id": "19",
        "name": "Monster",
        "russian": "Монстр",
        "season": "spring_2004",
        "poster": {
          "id": "715448",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/19/36188a48a97dca98000eb23a938bf955.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/19/preview-b33dd9536293a8cb029679d362601bfc.webp"
        },
        "genres": [
          {
            "id": "42",
            "name": "Seinen",
            "russian": "Сэйнэн",
            "kind": "demographic"
          },
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "7",
            "name": "Mystery",
            "russian": "Тайна",
            "kind": "genre"
          },
          {
            "id": "117",
            "name": "Suspense",
            "russian": "Триллер",
            "kind": "genre"
          },
          {
            "id": "104",
            "name": "Adult Cast",
            "russian": "Взрослые персонажи",
            "kind": "theme"
          },
          {
            "id": "40",
            "name": "Psychological",
            "russian": "Психологическое",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "11",
            "name": "Madhouse",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/11.png?1457607773"
          }
        ],
        "description": "Действие происходит в Германии, в Дюссельдорфе. Неизвестный проникает в дом семьи Либертов, убивает родителей и простреливает их сыну голову, не трогает лишь его сестру, которая забывает всё от шока. В том же городе работает гениальный японский нейрохирург Кэндзо Тэмма, сумевший спасти жизнь мальчика.\r\nСпустя много лет раненого человека привозят в госпиталь. Спасши ему жизнь, Кэндзо узнаёт, что тот причастен к продолжающимся в Германии серийным убийствам. Вскоре и Кэндзо оказывается замешан в этом деле, когда у него на глазах тот самый спасённый ребёнок, выросший теперь в юношу, хладнокровно убивает спасённого человека.\r\nКэндзо предстоит очистить своё имя, узнать о спасённом им много лет назад ребёнке и переосмыслить саму ценность жизней, которые он спасает, работая хирургом."
      },
      {
        "id": "35247",
        "name": "Owarimonogatari 2nd Season",
        "russian": "История финала 2",
        "season": "summer_2017",
        "poster": {
          "id": "682691",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/35247/0e6731cbf4b676888386dc999d4f91b3.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/35247/preview-0355d6c64759ef6fee5cbe39a60f78b9.webp"
        },
        "genres": [
          {
            "id": "4",
            "name": "Comedy",
            "russian": "Комедия",
            "kind": "genre"
          },
          {
            "id": "7",
            "name": "Mystery",
            "russian": "Тайна",
            "kind": "genre"
          },
          {
            "id": "37",
            "name": "Supernatural",
            "russian": "Сверхъестественное",
            "kind": "genre"
          },
          {
            "id": "32",
            "name": "Vampire",
            "russian": "Вампиры",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "44",
            "name": "Shaft",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/44.png?1503215283"
          }
        ],
        "description": "После некоторых событий, показанных в «[anime=32268]Историях Коёми[/anime]», [character=22036]Арараги[/character] вновь встречается с [character=22052]Маёй Хатикудзи[/character], хотя, казалось бы, он уже и не думал, что когда-нибудь ещё увидит эту непоседливую и милую младшеклассницу. Но на этот раз роли поменялись местами — и именно [character=22052]Хатикудзи[/character] теперь придётся вытаскивать [character=22036]Коёми[/character] из передряги, в которую тот угодил. В конце концов, до выпуска из школы нужно ещё так много сделать! Например, окончательно разобраться в своих отношениях с [character=22037]Сэндзёгахарой[/character] и узнать тайну [character=90393]Оги Осино[/character]. Странности! Странности! И вновь странности! Наша история подходит к своему финалу."
      },
      {
        "id": "37987",
        "name": "Violet Evergarden Movie",
        "russian": "Вайолет Эвергарден. Фильм",
        "season": null,
        "poster": {
          "id": "778401",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/37987/56162d8986e2eb203031bb25c821b5c7.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/37987/preview-b3c540d1b48e952809883497bee13937.webp"
        },
        "genres": [
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "10",
            "name": "Fantasy",
            "russian": "Фэнтези",
            "kind": "genre"
          },
          {
            "id": "114",
            "name": "Award Winning",
            "russian": "Удостоено наград",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "2",
            "name": "Kyoto Animation",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/2.png?1522422929"
          }
        ],
        "description": "[character=141354]Вайолет[/character] продолжает помогать другим людям писать письма, выражая все чувства клиентов на бумаге. Однако она всё никак не может забыть о майоре [character=152271]Гилберте Бугенвиллее[/character], который однажды дал ей возможность понять, что же значит «Я люблю тебя» и шанс начать жизнь с чистого листа.\r\nОднажды она встречает старшего брата [character=152271]Гилберта[/character] — [character=158277]Дитфрида[/character], который всё твердит ей позабыть о прошлом, связанным с майором, и идти навстречу будущему, но она, конечно же, понимает, что это крайне трудно смириться с потерей дорогого человека и подавить огромную боль в душе. Вскоре после этого поступает заказ от очередного клиента, а на складе почтового отделения оказывается письмо без адреса получателя. Достигнет ли [character=141354]Вайолет[/character] цели, и что ждёт девушку в дальнейшем?"
      },
      {
        "id": "32281",
        "name": "Kimi no Na wa.",
        "russian": "Твоё имя",
        "season": null,
        "poster": {
          "id": "682684",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/32281/352683fba3eecd53ec82ec73d9ff7874.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/32281/preview-480b69e3ab50f55f4e5f2495691e21ec.webp"
        },
        "genres": [
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "37",
            "name": "Supernatural",
            "russian": "Сверхъестественное",
            "kind": "genre"
          },
          {
            "id": "114",
            "name": "Award Winning",
            "russian": "Удостоено наград",
            "kind": "theme"
          },
          {
            "id": "151",
            "name": "Romantic Subtext",
            "russian": "Романтический подтекст",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "291",
            "name": "CoMix Wave Films",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/291.png?1456439666"
          }
        ],
        "description": "[character=137467]Мицуха Миямидзу[/character] — обычная девушка, уставшая от жизни в провинции. Её отец, мэр города, ведёт избирательную кампанию, а в семейном синтоистском храме ей приходится прилюдно исполнять древние ритуалы. И она мечтает перебраться из тесного провинциального мирка в большой город.\r\n[character=136805]Таки Татибана[/character] — увлекающийся архитектурой старшеклассник, вынужденный работать на полставки, чтобы обеспечивать свою жизнь в Токио. Изнурённый темпом большого города, [character=136805]Татибана[/character] мечтает о беззаботной жизни где-нибудь в горах.\r\nОднажды герои обнаруживают, что между ними существует странная и необъяснимая связь. Во сне они меняются телами и проживают жизни друг друга. Но однажды эта способность исчезает так же внезапно, как появилась. [character=136805]Таки[/character] решает во что бы то ни стало отыскать [character=137467]Мицуху[/character], но способны ли они узнать друг друга в реальной жизни?"
      },
      {
        "id": "55690",
        "name": "Boku no Kokoro no Yabai Yatsu 2nd Season",
        "russian": "Опасность в моём сердце 2",
        "season": "winter_2024",
        "poster": {
          "id": "725418",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/55690/49d51b1c556632d0214a49831575b5e0.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/55690/preview-f1dec97a1e624f19809cfee725e93ea7.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "4",
            "name": "Comedy",
            "russian": "Комедия",
            "kind": "genre"
          },
          {
            "id": "22",
            "name": "Romance",
            "russian": "Романтика",
            "kind": "genre"
          },
          {
            "id": "23",
            "name": "School",
            "russian": "Школа",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "247",
            "name": "Shin-Ei Animation",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/247.png?1510312671"
          }
        ],
        "description": "Ещё недавно интроверт [character=185229]Кётаро Итикава[/character] воображал, как избавляется от надоедливых одноклассников, а сейчас он дружит с первой красавицей школы [character=182379]Анной Ямадой[/character]. За спиной у ребят остались зимние каникулы, полные приключений и неловких встреч. За прошедшее время изменились не только отношения между ребятами, изменились и они сами. [character=185229]Кётаро[/character] начал постигать себя в эмоциональном плане, а  [character=182379]Ямада[/character] стала браться  за более сложные фотосессии. Им предстоит пережить много новых событий и провести вместе больше времени, как в школе, так и вне её. Их дружба всё укрепляется, они становятся ближе друг другу, и скоро им придётся решать, хотят они остаться друзьями или всё же стать парой."
      },
      {
        "id": "40682",
        "name": "Kingdom 3rd Season",
        "russian": "Царство 3",
        "season": "spring_2020",
        "poster": {
          "id": "469346",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/40682/2ff5266c4158ef23f1103f71e1fb4089.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/40682/preview-e91be1d36983de91afe769e7f8ccfefa.webp"
        },
        "genres": [
          {
            "id": "42",
            "name": "Seinen",
            "russian": "Сэйнэн",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "13",
            "name": "Historical",
            "russian": "Исторический",
            "kind": "theme"
          },
          {
            "id": "38",
            "name": "Military",
            "russian": "Военное",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "1",
            "name": "Pierrot",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/1.png?1378753179"
          },
          {
            "id": "1998",
            "name": "Studio Signpost",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/1998.png?1592731885"
          }
        ],
        "description": "Война — это страшное время в истории мира, во время которого отнимаются жизни у невинных людей. Так приключилось и с главным героем. Синь Ли [李信] потерял родителей в борьбе с другим государством, поэтому парня взял к себе на попечение здешний землевладелец. Со временем парень встречает [character=65409]Пяо[/character]. У ребят была одна мечта, стать великими генералами. Но как всегда бывает, мечте не суждено было осуществиться в том виде, в каком они себе представляли. Из-за того, что [character=65409]Пяо[/character] был вовлечён в дела королевства Цин, он погибает. У Синь Ли всё больше мотивации изменить порядок в стране и исполнить мечту, что хотел разделить с другом.\r\nОн решает присоединиться к правителю Чжэн Ину [嬴政]. Вследствие нападения вражеской страны на Цинь погибает один из генералов. На смену ему избирают Синь Ли, на которого предыдущий генерал возлагал большие надежды. Теперь в его распоряжении находится отряд из трёхста воинов. Сможет ли он добиться объединения царства и преодолеть все препятствия на своём пути?"
      },
      {
        "id": "51009",
        "name": "Jujutsu Kaisen 2nd Season",
        "russian": "Магическая битва 2",
        "season": "summer_2023",
        "poster": {
          "id": "708371",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/51009/11ae4aeb0046c9587150e3982c8da446.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/51009/preview-7db08256ffb645a49c8cb777ed48f8f4.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "10",
            "name": "Fantasy",
            "russian": "Фэнтези",
            "kind": "genre"
          },
          {
            "id": "105",
            "name": "Gore",
            "russian": "Жестокость",
            "kind": "theme"
          },
          {
            "id": "23",
            "name": "School",
            "russian": "Школа",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "569",
            "name": "MAPPA",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/569.png?1351013196"
          }
        ],
        "description": "Тридцать первое октября 2018 года, район Сибуя. Множество простых людей заключены под магической завесой и взяты в заложники союзом проклятых духов под началом [character=164481]Махито[/character] и [character=175542]Гэто[/character]. Всех гражданских обещают выпустить невредимыми только с одним условием: сильнейший маг современности [character=164471]Сатору Годзё[/character] должен явиться в Сибую и принять бой.\r\nУченики и преподаватели Магического техникума разбиваются на группы, чтобы быстрее эвакуировать мирных жителей перед началом масштабной битвы. Вместе с тем, сам Сатору Годзё прибывает на место действия и отправляется прямиком к станции. События развиваются согласно плану Сугуру Гэто."
      },
      {
        "id": "49387",
        "name": "Vinland Saga Season 2",
        "russian": "Сага о Винланде 2",
        "season": "winter_2023",
        "poster": {
          "id": "701402",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/49387/1770e442cbce434da85f7c9a0cb9b33e.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/49387/preview-9d366db3d2bf18216dd1375f0d8a8057.webp"
        },
        "genres": [
          {
            "id": "42",
            "name": "Seinen",
            "russian": "Сэйнэн",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "2",
            "name": "Adventure",
            "russian": "Приключения",
            "kind": "genre"
          },
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "105",
            "name": "Gore",
            "russian": "Жестокость",
            "kind": "theme"
          },
          {
            "id": "13",
            "name": "Historical",
            "russian": "Исторический",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "569",
            "name": "MAPPA",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/569.png?1351013196"
          }
        ],
        "description": "Одиннадцатый век. Далёкая и холодная Исландия, окутанная морской гладью. Страна, для которой характерно не только обилие снега и северное сияние, завораживающее своей красой, но и место проживания великих воинов — викингов. Эти отважные люди, верующие в своих могущественных богов, были очень сильны, не боялись смерти, всегда стремились к познанию неизведанных земель и их завоеванию. [character=10138]Торфинн[/character] — сын великого [character=13021]Торса[/character], не был исключением. Слушая рассказы [character=19486]Лейфа Эрикссона[/character], старого друга его отца, о великих сражениях и путешествиях родителя, мальчик мечтал отправиться далеко за пределы родного дома. \r\n\r\nВскоре череда событий вынудила великого [character=13021]Торса[/character] оставить дом и вновь взять меч в руки. Юный [character=10138]Торфинн[/character] всеми силами пытался отправиться с отцом в столь желанное приключение, но в ответ слышал только твёрдое «нет». Не желая мириться с таким положением дел, мальчик тайно пробрался на драккар, и отец с опозданием обнаружил «безбилетника», пути назад уже не было. Так, юный Торфинн отправился в путь, и в скором времени корабль наткнулся на отряд [character=13020]Аскеладда[/character]. Мальчику с ужасом пришлось наблюдать за кровавым сражением с отрядом могучего [character=13020]Аскеладда[/character], но настоящим шоком стала потеря родного отца. Чудом выбравшись из жестокой бойни, [character=10138]Торфинн[/character] поклялся не только себе, но и своему врагу, отомстить за смерть [character=13021]Торса[/character]. \r\nТаким образом он примкнул к отряду [character=13020]Аскеладда[/character]. Не зря же говорят держать друзей близко, а врагов ещё ближе. Мальчик рос, становился всё крепче и постоянно пытался убить Аскеллада, но тщетно. А воин лишь манипулировал мальцом. Проходили годы, Торфинн стал замкнут, ожесточился, многое повидал и многих убил. Повстречал на своём пути разных людей: [character=17438]Кнуда[/character], претендующего на трон, [character=17440]Торкеля[/character], влюблённого в битвы, коварного [character=82537]Флоки[/character], преданного [character=82533]Рагнара[/character] и многих других, но цель его оставалась прежней — убить [character=13020]Аскеладда[/character].\r\n\r\nЧто же произойдёт, если Торфинн потеряет эту цель? Как повернётся судьба? Даст ли она ему новую цель, чтобы продолжать сражаться и путешествовать, или безвозвратно погубит?"
      },
      {
        "id": "36838",
        "name": "Gintama.: Shirogane no Tamashii-hen",
        "russian": "Гинтама 7",
        "season": "winter_2018",
        "poster": {
          "id": "467248",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/36838/fe2246267c2f7b0039f1dc2d44fa5216.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/36838/preview-2659b09e43467f362601e9331b43137f.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "4",
            "name": "Comedy",
            "russian": "Комедия",
            "kind": "genre"
          },
          {
            "id": "24",
            "name": "Sci-Fi",
            "russian": "Фантастика",
            "kind": "genre"
          },
          {
            "id": "112",
            "name": "Gag Humor",
            "russian": "Гэг-юмор",
            "kind": "theme"
          },
          {
            "id": "13",
            "name": "Historical",
            "russian": "Исторический",
            "kind": "theme"
          },
          {
            "id": "20",
            "name": "Parody",
            "russian": "Пародия",
            "kind": "theme"
          },
          {
            "id": "21",
            "name": "Samurai",
            "russian": "Самураи",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "1258",
            "name": "Bandai Namco Pictures",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/1258.png?1589293619"
          }
        ],
        "description": "[i]Первая часть экранизации арки «Серебряная душа».[/i]\r\nДанная арка является прямым продолжением событий «[anime=34096]Гинтамы 5[/anime]» и знаменует собой начало последней битвы за возвращение земель самураев. Наших героев ждут невероятные и масштабные сражения, как в знакомом нам квартале Кабуки, так и, неожиданно, в космосе! Но и без абсурдного юмора, конечно же, не обойдётся! Смогут ли [character=672]Гинтоки[/character], [character=674]Кагура[/character], [character=673]Шинпачи[/character] и их союзники, оказавшиеся под перекрестным огнём внушительных вражеских сил, отбросить свои разногласия и объединиться, чтобы защитить то, что им дорого?"
      },
      {
        "id": "47917",
        "name": "Bocchi the Rock!",
        "russian": "Одинокий рокер!",
        "season": "fall_2022",
        "poster": {
          "id": "456216",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/47917/6e3b8fb4ca6076ace20b6629bb88f302.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/47917/preview-6d68a47c2881fcc8132e12ac94badbf8.webp"
        },
        "genres": [
          {
            "id": "4",
            "name": "Comedy",
            "russian": "Комедия",
            "kind": "genre"
          },
          {
            "id": "119",
            "name": "CGDCT",
            "russian": "CGDCT",
            "kind": "theme"
          },
          {
            "id": "19",
            "name": "Music",
            "russian": "Музыка",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "1835",
            "name": "CloverWorks",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/1835.png?1545379956"
          }
        ],
        "description": "Мечтающая в будущем играть в музыкальной группе, старшеклассница Хитори Гото взялась за уроки игры на гитаре. Ничего не мешает исполнению её мечты, кроме самой Хитори, которая настолько застенчива и зажата, что не смогла завести ни одного друга, чего уж говорить о создании собственного музыкального коллектива. Сама судьба решает помочь Хитори, и та, на своё счастье, встречает [character=206277]Нидзику Идзити[/character], которая играет на ударных в собственной группе и как раз подыскивает гитаристку!"
      },
      {
        "id": "37510",
        "name": "Mob Psycho 100 II",
        "russian": "Моб Психо 100 2",
        "season": "winter_2019",
        "poster": {
          "id": "715773",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/37510/f1a017bd671f8f18ddec8e1baf8e4fe8.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/37510/preview-c5e58999ba37b5d4399c77de35f1cbc0.webp"
        },
        "genres": [
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "4",
            "name": "Comedy",
            "russian": "Комедия",
            "kind": "genre"
          },
          {
            "id": "37",
            "name": "Supernatural",
            "russian": "Сверхъестественное",
            "kind": "genre"
          },
          {
            "id": "31",
            "name": "Super Power",
            "russian": "Супер сила",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "4",
            "name": "Bones",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/4.png?1311292711"
          }
        ],
        "description": "Казалось бы, иметь сверхспособности — мечта едва ли не каждого человека на Земле, однако главный герой этой истории такой ход мыслей не поддерживает. Ах да, знакомьтесь, это [character=109929]Шигэо Кагэяма[/character], он же Моб, всего лишь восьмиклассник, с детства обладающий экстрасенсорными способностями.\r\n\r\nС большой силой приходит большая ответственность, и [character=109929]Моб[/character], как никто другой, это понимает, ведь когда шкала его раздражённости достигнет отметки в 100, он впадает в неконтролируемое состояние, в котором способен разрушить всё, что находится поблизости. Но в мире, полном различных раздражителей, есть и любовь. У [character=109929]Шигэо[/character] её зовут [character=124789]Цубоми[/character]. И она, пожалуй, самая красивая девушка не только в классе, но и во всей школе. Пытаясь привлечь внимание одноклассницы, [character=109929]Моб[/character] постоянно использует различные трюки, которые скоро надоедают девушке из-за своей однообразности.\r\n\r\nЮный [character=109929]Моб[/character] примыкает к [character=109931]Аратаке Рэйгэну[/character], экстрасенсу-мошеннику, который пообещал добиться контроля над способностями. Теперь изгнание злых духов стало частью повседневной, монотонной жизни [character=109929]Моба[/character]. Однако вся та энергия, которую он скрывает, едва ли является верхушкой айсберга: если его огромный потенциал и безудержные эмоции будут высвобождены, произойдёт катастрофическое событие, способное сделать [character=109929]Шигэо Кагэяму[/character] неузнаваемо опасным экстрасенсом. Прогрессия к взрыву [character=109929]Моба[/character] возрастает, и попытка остановить его становится невыполнимой миссией.\r\n\r\nНовый сезон, а [character=109929]Моб[/character] вместе с наставником всё так же продолжают ловить злых духов и различного рода нечисть. В этот раз им предстоит встретиться с куда более опасными противниками. Не стоит забывать и о клубе по улучшению физического здоровья, в котором состоит [character=109929]Моб[/character] и который получит ещё больше экранного времени."
      },
      {
        "id": "40028",
        "name": "Shingeki no Kyojin: The Final Season",
        "russian": "Атака титанов: Финал",
        "season": "winter_2021",
        "poster": {
          "id": "458465",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/40028/a8ef5365595d684a594b3a65b02e01fc.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/40028/preview-d3b24b8222f89e61fde84baf42e58b20.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "117",
            "name": "Suspense",
            "russian": "Триллер",
            "kind": "genre"
          },
          {
            "id": "105",
            "name": "Gore",
            "russian": "Жестокость",
            "kind": "theme"
          },
          {
            "id": "38",
            "name": "Military",
            "russian": "Военное",
            "kind": "theme"
          },
          {
            "id": "141",
            "name": "Survival",
            "russian": "Выживание",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "569",
            "name": "MAPPA",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/569.png?1351013196"
          }
        ],
        "description": "Минуло три года с тех пор, как члены Разведкорпуса достигли моря. Четыре же года назад из дневников [character=62477]Гриши Йегера[/character] люди узнали, что всё это время противостояли не только титанам, но и другой нации.\r\n\r\nЗа морем, Марлия заканчивает длительную войну с войсками Средневосточного Альянса. Нация, всегда полагавшаяся на титанов в войне, осознаёт, что постепенно теряет первенство в военном противостоянии из-за наращивания другими государствами военной мощи и развития оружия, способного противостоять титанам. Чтобы удержать лидирующую позицию на мировой арене, Марлии необходима сила титана Основателя, сильнейшего из девяти изначальных титанов, способного контролировать других титанов. К несчастью для Марлии, эта сила всё ещё находится на острове Парадиз в руках Эрена [エレン・イェーガー]. Райнеру Брауну [ライナー・ブラウン], единственному воину, вернувшемуся после провальной операции по захвату Основателя, вновь предстоит столкнуться с бывшими товарищами.\r\n\r\nЭкранизация восьмой и девятой по счёту сюжетных арок одноимённой манги за авторством Хадзимэ Исаямы [諫山 創]."
      },
      {
        "id": "45649",
        "name": "The First Slam Dunk",
        "russian": "Первый слэм-данк",
        "season": null,
        "poster": {
          "id": "769769",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/45649/e25661ced16b056e47918a867ddfb3aa.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/45649/preview-dc226165a9acf786e85d60b123815121.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "30",
            "name": "Sports",
            "russian": "Спорт",
            "kind": "genre"
          },
          {
            "id": "114",
            "name": "Award Winning",
            "russian": "Удостоено наград",
            "kind": "theme"
          },
          {
            "id": "23",
            "name": "School",
            "russian": "Школа",
            "kind": "theme"
          },
          {
            "id": "102",
            "name": "Team Sports",
            "russian": "Командный спорт",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "18",
            "name": "Toei Animation",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/18.?1446981470"
          },
          {
            "id": "1111",
            "name": "DandeLion Animation Studio",
            "imageUrl": null
          }
        ],
        "description": "Говорят, что плохие парни привлекают девушек, однако хулиган [character=310]Ханамичи Сакураги[/character] явно к таковым не относится. Повстречав [character=8485]Харуко[/character], первую девушку, которая проявила к нему хотя бы минимальный интерес, он соврал о том, что любит баскетбол. А когда попытался доказать свои умения — сел в лужу. Тем не менее, пораженная невероятной атлетичностью парня, [character=8485]Харуко[/character] пригласила его вступить в школьную баскетбольную команду."
      },
      {
        "id": "32935",
        "name": "Haikyuu!! Karasuno Koukou vs. Shiratorizawa Gakuen Koukou",
        "russian": "Волейбол!! 3",
        "season": "fall_2016",
        "poster": {
          "id": "772935",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/32935/24a437dd2247c71e8de9e0a3ce28b30c.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/32935/preview-0ac35371e43039d8b9039f2a9da05042.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "30",
            "name": "Sports",
            "russian": "Спорт",
            "kind": "genre"
          },
          {
            "id": "23",
            "name": "School",
            "russian": "Школа",
            "kind": "theme"
          },
          {
            "id": "102",
            "name": "Team Sports",
            "russian": "Командный спорт",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "10",
            "name": "Production I.G",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/10.png?1312165069"
          }
        ],
        "description": "Продолжение событий второго сезона аниме «[anime=28891]Волейбол!![/anime]».\r\nС трудом взятый реванш Карасуно над Аоба Дзёсай даёт команде последний шанс в нынешнем составе попасть на весенний турнир. Теперь перед героями стоит не менее сложная задача: им придётся завоевать победу в решающем матче. Играть Карасуно предстоит с сильнейшей командой — Академией Сираторидзава.\r\nСмогут ли Сёё Хината [日向 翔陽] и Тобио Кагэяма [影山 飛雄] одолеть самого сильного игрока префектуры Мияги — Вакатоси Усидзиму [牛島 若利], показав присущие Карасуно настрой и сплочённость? Пройдет ли команда старшей школы Карасуно на турнир? Об этом зрители и узнают в новом сезоне."
      },
      {
        "id": "52198",
        "name": "Kaguya-sama wa Kokurasetai: First Kiss wa Owaranai",
        "russian": "Госпожа Кагуя: в любви как на войне — Первый поцелуй никогда не заканчивается",
        "season": null,
        "poster": {
          "id": "772926",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/52198/85bd1b1c1919611ca9fbf46d2d404558.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/52198/preview-cdd0474dbae4286b221c390dcf841829.webp"
        },
        "genres": [
          {
            "id": "42",
            "name": "Seinen",
            "russian": "Сэйнэн",
            "kind": "demographic"
          },
          {
            "id": "4",
            "name": "Comedy",
            "russian": "Комедия",
            "kind": "genre"
          },
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "22",
            "name": "Romance",
            "russian": "Романтика",
            "kind": "genre"
          },
          {
            "id": "23",
            "name": "School",
            "russian": "Школа",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "56",
            "name": "A-1 Pictures",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/56.?1434707196"
          }
        ],
        "description": "После долгожданного поцелуя [character=136685]Миюки Сироганэ[/character] и [character=136359]Кагуи Синомии[/character] на праздновании школьного фестиваля культуры могло показаться, что затянувшаяся любовная битва наконец подошла к своему логичному завершению. Однако, как это и бывает в реальной жизни, счастливый конец не приходит так внезапно!\r\nУже у себя дома [character=136359]Кагуя[/character] вспоминает прошедший вечер и с ужасом понимает, что сильно оплошала, и теряет своё самообладание. Неожиданно для уже облегчившего душу [character=136685]Миюки[/character] его возлюбленная холодеет и почти совсем закрывается от него. Теперь-то грядёт судьбоносный переломный момент, в ходе которого пара должна будет не только полностью изменить своё отношение к самим себе, но и закончить начатое и признаться в своих чувствах друг другу правильным способом."
      },
      {
        "id": "31758",
        "name": "Kizumonogatari III: Reiketsu-hen",
        "russian": "Истории ран. Часть 3: Холодная кровь",
        "season": null,
        "poster": {
          "id": "464786",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/31758/97a98ed680f76cf064a178e312eb7dd0.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/31758/preview-23ecad31cd728ce646121ec74ed12eb4.webp"
        },
        "genres": [
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "7",
            "name": "Mystery",
            "russian": "Тайна",
            "kind": "genre"
          },
          {
            "id": "37",
            "name": "Supernatural",
            "russian": "Сверхъестественное",
            "kind": "genre"
          },
          {
            "id": "32",
            "name": "Vampire",
            "russian": "Вампиры",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "44",
            "name": "Shaft",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/44.png?1503215283"
          }
        ],
        "description": "Заключительная часть из серии полнометражных фильмов «Истории ран».\r\n\r\nПосле боёв с тремя специалистами ([Драматург], [Эпизод], [Guillotinecutter]) Арараги [阿良々木 暦] получил все части тела Киссшот [忍野 忍] и готов их ей вернуть, чтобы снова стать человеком. Но остаётся много вопросов: как Киссшот сделает его человеком? Как трое специалистов победили Киссшот на пике её силы? Зачем на самом деле приехал Мэмэ Осино? И как в итоге продолжатся отношения Арараги и Ханэкавы [羽川 翼]?"
      },
      {
        "id": "199",
        "name": "Sen to Chihiro no Kamikakushi",
        "russian": "Унесённые призраками",
        "season": null,
        "poster": {
          "id": "677266",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/199/8fffb098b0dfa011cd8431d46425d989.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/199/preview-cce0ef2941fd590437005e681bd2c8b8.webp"
        },
        "genres": [
          {
            "id": "2",
            "name": "Adventure",
            "russian": "Приключения",
            "kind": "genre"
          },
          {
            "id": "37",
            "name": "Supernatural",
            "russian": "Сверхъестественное",
            "kind": "genre"
          },
          {
            "id": "114",
            "name": "Award Winning",
            "russian": "Удостоено наград",
            "kind": "theme"
          },
          {
            "id": "6",
            "name": "Mythology",
            "russian": "Мифология",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "21",
            "name": "Studio Ghibli",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/21.png?1311292709"
          }
        ],
        "description": "Десятилетняя [character=384]Тихиро Огино[/character] вместе с родителями садится в машину, чтобы добраться до нового дома, расположенного где-то в глубинке Японии. Решив срезать путь, они попадают в необычный лес, выбравшись из которого, оказываются на прогалине, откуда можно выйти лишь сквозь мощёный тоннель. Пройдя по нему, они оказываются в пустующем заброшенном городке, в котором нет ни души, зато прилавки ломятся от деликатесов. Родители [character=384]Тихиро[/character] решают перекусить, а расплатиться, когда появятся хозяева. Любопытная, как все дети, [character=384]Тихиро[/character] отправляется побродить и вскоре натыкается на мальчика [character=385]Хаку[/character], потребовавшего, чтобы она немедленно ушла. Уже смеркается, и город наводняют странные звуки и тени. Вернувшись к родителям, [character=384]Тихиро[/character] в ужасе видит, как те полнеют на глазах и в итоге превращаются в свиней.\r\nЧерез некоторое время [character=385]Хаку[/character] находит [character=384]Тихиро[/character] и объясняет ей суть происходящего: они в волшебном мире, где людям не место, а правит здесь колдунья Юбаба, превращающая людей в животных. Исключения делаются лишь для гостей и работников. И если [character=384]Тихиро[/character] хочет вернуть родителей, ей нужно прийти к колдунье и попросить дать ей работу — в этом та не имеет права отказать."
      },
      {
        "id": "48583",
        "name": "Shingeki no Kyojin: The Final Season Part 2",
        "russian": "Атака титанов: Финал. Часть 2",
        "season": "winter_2022",
        "poster": {
          "id": "458466",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/48583/5d9b3195a01cb0cc21d26d829f72b9c8.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/48583/preview-bd39e7109e49cef792ed809a109c20f2.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "117",
            "name": "Suspense",
            "russian": "Триллер",
            "kind": "genre"
          },
          {
            "id": "105",
            "name": "Gore",
            "russian": "Жестокость",
            "kind": "theme"
          },
          {
            "id": "38",
            "name": "Military",
            "russian": "Военное",
            "kind": "theme"
          },
          {
            "id": "141",
            "name": "Survival",
            "russian": "Выживание",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "569",
            "name": "MAPPA",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/569.png?1351013196"
          }
        ],
        "description": "Многострадальный остров Парадиз вновь погружается в войну... После разрушительных действий [character=40882]Эрена Йегера[/character] марлийцы начинают вторжение на остров, и на их стороне без малого весь мир. Эрену вновь предстоит столкнуться в безжалостной схватке с марлийскими воинами, в том числе с [character=46484]Райнером Брауном[/character]. И это в разгар нового государственного переворота на Парадизе, учинённого радикальными сторонниками действий Эрена. И вновь в некогда родной для Эрена Сигансине разворачивается поистине судьбоносная битва, исход которой может изменить весь мир.\r\n\r\nСможет ли Эрен, отвернувшийся от друзей и товарищей, добиться цели и достичь подлинной свободы? Готов ли он уничтожить всех своих врагов? Какой выбор придётся в этой схватке сделать [character=40881]Микасе[/character], [character=46494]Армину[/character] и всем товарищам и друзьям Эрена? И каковы будут последствия для них самих и для всего мира? Эпическая драма достигнет своей кульминации."
      },
      {
        "id": "263",
        "name": "Hajime no Ippo",
        "russian": "Первый шаг",
        "season": "fall_2000",
        "poster": {
          "id": "680705",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/263/ac5d529c3a6bcecf4bc33951ec5e2adc.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/263/preview-57873a624f66197fa05a3c6acf7784ab.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "30",
            "name": "Sports",
            "russian": "Спорт",
            "kind": "genre"
          },
          {
            "id": "118",
            "name": "Combat Sports",
            "russian": "Спортивные единоборства",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "11",
            "name": "Madhouse",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/11.png?1457607773"
          }
        ],
        "description": "Над Иппо Макуноучи [幕之内 一歩] издевались всю его жизнь: постоянно на побегушках, избиваемый одноклассниками, он мечтает измениться, но ему не хватает решимости. Однажды, в разгар очередного издевательства, Иппо спасает боксёр Мамору Такамура [鷹村 守] и приносит потерявшего от побоев сознание парня в спортивный зал. Очнувшись, тот поражён обстановкой в тренажерном зале, но не решается ступить и шагу. Такамура вешает фотографию одноклассника Макуноучи на боксёрскую грушу и заставляет Иппо ударить её. В конце концов юноша решается и просит Мамору научить его боксу, но последний, не веря в способности парня, поручает Иппо за неделю сделать невыполнимую задачу... Так и начинается восхождение Иппо к вершинам мира бокса."
      },
      {
        "id": "47778",
        "name": "Kimetsu no Yaiba: Yuukaku-hen",
        "russian": "Клинок, рассекающий демонов: Квартал красных фонарей",
        "season": "winter_2022",
        "poster": {
          "id": "668324",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/47778/689f69ee3fcc8ec4a3794d7815eb307e.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/47778/preview-bf25d7995fb480ba504164502dc13942.webp"
        },
        "genres": [
          {
            "id": "27",
            "name": "Shounen",
            "russian": "Сёнен",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "10",
            "name": "Fantasy",
            "russian": "Фэнтези",
            "kind": "genre"
          },
          {
            "id": "13",
            "name": "Historical",
            "russian": "Исторический",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "43",
            "name": "ufotable",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/43.png?1311292714"
          }
        ],
        "description": "Продолжение приключений [character=146156 тандзиро-камадо]Тандзиро[/character] и его неизменных спутников: сестры-демона [character=146157 нэдзуко-камадо]Нэдзуко[/character], вечно ноющего [character=146158 дзэнъицу-агацума]Дзэнъицу[/character] и сорвиголовы [character=146159 иносукэ-хасибира]Иносукэ[/character]. На этот раз «столп звука» [character=151144 тэнгэн-удзуй] берёт их с собой на задание в Квартал красных фонарей, где в последнее время стали пропадать люди. Причиной этого скорее всего служат демоны. Так кто же стоит за всеми исчезновениями, и смогут ли наши герои с ним справиться?"
      },
      {
        "id": "17074",
        "name": "Monogatari Series: Second Season",
        "russian": "Цикл историй: Второй сезон",
        "season": "summer_2013",
        "poster": {
          "id": "715777",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/17074/55c90a1a938b4d88e0e72dbd829d1684.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/17074/preview-5c66232740c64b9fabdd7b3d00826b53.webp"
        },
        "genres": [
          {
            "id": "4",
            "name": "Comedy",
            "russian": "Комедия",
            "kind": "genre"
          },
          {
            "id": "7",
            "name": "Mystery",
            "russian": "Тайна",
            "kind": "genre"
          },
          {
            "id": "22",
            "name": "Romance",
            "russian": "Романтика",
            "kind": "genre"
          },
          {
            "id": "37",
            "name": "Supernatural",
            "russian": "Сверхъестественное",
            "kind": "genre"
          },
          {
            "id": "32",
            "name": "Vampire",
            "russian": "Вампиры",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "44",
            "name": "Shaft",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/44.png?1503215283"
          }
        ],
        "description": "События второго сезона стартуют сразу после завершения сюжетной арки «Феникс Цукихи». Много чего произошло в жизни Арараги Коёми [Koyomi Araragi] за последние полгода. Его несколько раз разрывали на части, пили его кровь, бесстыдно коверкали имя и фамилию, обзывали лоликонщиком и извращенцем, угрожали канцелярскими принадлежностями... А ведь главные мучения и трудности только начинаются! \r\nНа личном фронте у Арараги сплошная неразбериха. [character=22037]Сэндзёгахара Хитаги[/character] начала вести себя, мягко говоря, странно. Любовные прозвища, многочисленные «смайлы» в SMS-сообщениях, беззаботное хихиканье. Парень в настоящей панике, ведь понятия не имеет, как на всё это реагировать. И куда, спрашивается, подевалось её холодное выражение лица и язвительные упрёки? Наслаждаться повседневной жизнью у нашего полувампира тоже особо не получается. Какое тут наслаждение, когда невыполненная домашняя работа на лето в конечном итоге оборачивается зомби-апокалипсисом? Мало того, его подруги вновь сталкиваются со сверхъестественным, а кто же им, интересно, должен помогать, рискуя собственной шкурой? Арараги-сэмпай, братик Коёми, Арараги-кун — да-да, ответ весьма предсказуем.\r\n\r\nНа сей раз экранизации подверглись сразу пять из шести новелл ранобэ «[ranobe=23751]Цикл историй: Второй сезон[/ranobe]»: Shiro, Kabukimonogatari, Otorimonogatari, Onimonogatari & Koimonogatari."
      },
      {
        "id": "39894",
        "name": "Hibike! Euphonium 3",
        "russian": "Звучи, эуфониум! 3",
        "season": "spring_2024",
        "poster": {
          "id": "769685",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/39894/5f300d6f55ebad57bb1146d80257bc04.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/39894/preview-ea0408b72e9ec97ee89bde00533420cb.webp"
        },
        "genres": [
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "19",
            "name": "Music",
            "russian": "Музыка",
            "kind": "theme"
          },
          {
            "id": "142",
            "name": "Performing Arts",
            "russian": "Исполнительское искусство",
            "kind": "theme"
          },
          {
            "id": "23",
            "name": "School",
            "russian": "Школа",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "2",
            "name": "Kyoto Animation",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/2.png?1522422929"
          }
        ],
        "description": "Репетиции, тренировочные лагеря, соревнования, фестивали, конкурсы. Каждый день был таким насыщенным, что [character=120015]Кумико Омаэ[/character] не заметила, как перешла на свой последний год обучения в старшей школе. Поколение, возглавляемое [character=127237]Юко Ёсикавой[/character] и [character=127235]Нацуки Накагавой[/character], выпустилось, и теперь уже на плечи [character=120015]Кумико[/character], ставшей новым президентом клуба, легла ответственность привести школьный оркестр старшей Китаудзи на национальный чемпионат. Для этого им нужно вновь получить золото на региональном соревновании, но в этот раз не «утешительное», а то самое, дарующее путёвку на встречу с ещё множеством потрясающих оркестров со всей страны.\r\nА вдобавок ко всему... весна ー пора новых встреч, и на третьем учебном году [character=120015]Кумико[/character] ожидает неожиданное знакомство."
      },
      {
        "id": "1",
        "name": "Cowboy Bebop",
        "russian": "Ковбой Бибоп",
        "season": "spring_1998",
        "poster": {
          "id": "715040",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/1/90606cb48e082f5ad34710822aa862ad.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/1/preview-26f3e4eaa5100e5355ccd317f26638ee.webp"
        },
        "genres": [
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "24",
            "name": "Sci-Fi",
            "russian": "Фантастика",
            "kind": "genre"
          },
          {
            "id": "114",
            "name": "Award Winning",
            "russian": "Удостоено наград",
            "kind": "theme"
          },
          {
            "id": "104",
            "name": "Adult Cast",
            "russian": "Взрослые персонажи",
            "kind": "theme"
          },
          {
            "id": "29",
            "name": "Space",
            "russian": "Космос",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "14",
            "name": "Sunrise",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/14.jpg?1630137154"
          }
        ],
        "description": "2071 год. Человечество колонизировало всю Солнечную Систему, основав колонии от Венеры до Юпитера. Но десятилетия тому назад из-за техногенной катастрофы была уничтожена Луна. Последствия оказались катастрофическими: непрерывные метеоритные дожди сделали жизнь на поверхности Земли невозможной, а в первые недели после катастрофы погибло 4,7 миллиарда человек. Большая часть выживших перебралась в колонии на другие планеты.\r\nСо временем по всей Солнечной Системе разрослись и набрали силу преступные синдикаты, для борьбы с которыми правительство возродило древнюю практику охоты за головами. Отныне охотники за головами разъезжают по всей Солнечной Системе в поисках целей.\r\nСпайк Шпигель [スパイク・スピーゲル] и Джет Блэк [ジェット・ブラック] — охотники. Волею судьбы они оказались на космическом корабле «Bebop 268710». Путешествуя вместе, они подбирают Фэй Валентайн [フェイ・バレンタイン] — очаровательную картёжницу с невероятно огромным долгом, Радикал Эдварда [エドワード・ウォン・ハウ・ペペル・チブルスキー4世] — компьютерного гения и генетически модифицированную собаку Эйн [アイン].\r\nНа борту «Bebop» судьба сводит четырёх человек и одну собаку, и так начинаются их совместные приключения..."
      },
      {
        "id": "37521",
        "name": "Vinland Saga",
        "russian": "Сага о Винланде",
        "season": "summer_2019",
        "poster": {
          "id": "701403",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/37521/7996a14eaf4a52d816f5bab92ea80e79.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/37521/preview-0e120e3f7169a410a641776159f04219.webp"
        },
        "genres": [
          {
            "id": "42",
            "name": "Seinen",
            "russian": "Сэйнэн",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "2",
            "name": "Adventure",
            "russian": "Приключения",
            "kind": "genre"
          },
          {
            "id": "8",
            "name": "Drama",
            "russian": "Драма",
            "kind": "genre"
          },
          {
            "id": "105",
            "name": "Gore",
            "russian": "Жестокость",
            "kind": "theme"
          },
          {
            "id": "13",
            "name": "Historical",
            "russian": "Исторический",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "858",
            "name": "Wit Studio",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/858.png?1366652107"
          }
        ],
        "description": "1002 год. Юный и энергичный Торфинн живёт на краю земли — в Исландии, мечтая об опасных приключениях и заморских странах. Эти мечты подогревает и друг его отца — [character=19486]Лейф[/character], известный путешественник и торговец, рассказывая детям о далёкой плодородной земле, называемой им Винландом. Мирная жизнь Торфинна и его семьи продолжалась бы и дальше, но всё меняется, когда его отец Торс спасает беглого раба.\r\nТем временем южнее разгорается война: англичане застают врасплох и убивают викингов в [url=http://ru.wikipedia.org/wiki/Нортумбрия]Нортумбрии[/url]. Её отголоски доходят и до Исландии: в море у деревни, где живёт Торфинн, появляется корабль йомсвикингов. Это дружина, которую возглавлял Торс до своего дезертирства в 987 году во время [url=http://ru.wikipedia.org/wiki/Битва при Хьёрунгаваге]битвы при Хьёрунгаваге[/url], и теперь они хотят, чтобы он вернулся на войну вновь. Под угрозой захвата и разорения мирной деревни викингами Торс отправляется в путешествие, чтобы защитить свою семью и деревню."
      },
      {
        "id": "50160",
        "name": "Kingdom 4th Season",
        "russian": "Царство 4",
        "season": "spring_2022",
        "poster": {
          "id": "585916",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/50160/9557d42e14e0d38275f5a544649bafd2.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/50160/preview-84c3daca3c45f226ba5f0fb815dafa54.webp"
        },
        "genres": [
          {
            "id": "42",
            "name": "Seinen",
            "russian": "Сэйнэн",
            "kind": "demographic"
          },
          {
            "id": "1",
            "name": "Action",
            "russian": "Экшен",
            "kind": "genre"
          },
          {
            "id": "13",
            "name": "Historical",
            "russian": "Исторический",
            "kind": "theme"
          },
          {
            "id": "38",
            "name": "Military",
            "russian": "Военное",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "1",
            "name": "Pierrot",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/1.png?1378753179"
          },
          {
            "id": "1998",
            "name": "Studio Signpost",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/1998.png?1592731885"
          }
        ],
        "description": "С окончанием коалиционной кампании, Китай охватило состояние экономического подъема, а политические партии [character=64109]Ин Чжэна [/character]и [character=66705]Люй Бувэя[/character] продолжили своё противостояние. [character=64109]Чжэн[/character] заполучил доверие народа после войны, однако [character=66705]Люй[/character] не собирается выбывать из борьбы: в планах срыв церемонии совершеннолетия [character=64109]Чжэна[/character].\r\nВ тоже время двадцать тысяч солдат вражеской армии двигаются к государству Цинь, и возникает потребность в генералах, способных реагировать на надвигающуюся угрозу. Вопреки прогнозам, командование принимает [character=65405]Чэн Цзяо[/character], сводный брат [character=64109]Чжэна[/character]."
      },
      {
        "id": "24701",
        "name": "Mushishi Zoku Shou 2nd Season",
        "russian": "Мастер муси: Следующая глава 2",
        "season": "fall_2014",
        "poster": {
          "id": "726953",
          "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/24701/cf7b891e6f455cfdcc79d8962de4d640.jpeg",
          "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/24701/preview-3886e4a3625686814146565318cde6f7.webp"
        },
        "genres": [
          {
            "id": "42",
            "name": "Seinen",
            "russian": "Сэйнэн",
            "kind": "demographic"
          },
          {
            "id": "2",
            "name": "Adventure",
            "russian": "Приключения",
            "kind": "genre"
          },
          {
            "id": "7",
            "name": "Mystery",
            "russian": "Тайна",
            "kind": "genre"
          },
          {
            "id": "36",
            "name": "Slice of Life",
            "russian": "Повседневность",
            "kind": "genre"
          },
          {
            "id": "37",
            "name": "Supernatural",
            "russian": "Сверхъестественное",
            "kind": "genre"
          },
          {
            "id": "104",
            "name": "Adult Cast",
            "russian": "Взрослые персонажи",
            "kind": "theme"
          },
          {
            "id": "13",
            "name": "Historical",
            "russian": "Исторический",
            "kind": "theme"
          },
          {
            "id": "140",
            "name": "Iyashikei",
            "russian": "Иясикэй",
            "kind": "theme"
          }
        ],
        "studios": [
          {
            "id": "8",
            "name": "Artland",
            "imageUrl": "https://desu.shikimori.one/system/studios/original/8.gif?1312165056"
          }
        ],
        "description": "Есть такая маленькая страна — Япония. Пока во всем мире идёт индустриализация, здесь всё так же остаются места, куда не ступала нога простого человека. Гора, хозяином которой является черепаха; пещера, настолько тёмная, что ее тьма поглотит солнце... Страшные бедствия и болезни, виновниками которых являются муси — создания, олицетворяющие жизнь и смерть. Гинко [ギンコ] — главный герой этой истории — один из немногих, кто видит этих мистических существ и может помочь избавиться от их влияния и спасти жизни множеству людей. Прикрыв белыми как снег волосами левый глаз, закурив сигарету, Гинко отправится в путь и поведает эту замечательную историю..."
      },
        {
          "id": "2921",
          "name": "Ashita no Joe 2",
          "russian": "Завтрашний Джо 2",
          "season": "fall_1980",
          "poster": {
            "id": "686026",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/2921/fe3c7e98286da69128d1acb7e230179e.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/2921/preview-81196411a2d7625d28f6cec96a9828f4.webp"
          },
          "genres": [
            {
              "id": "27",
              "name": "Shounen",
              "russian": "Сёнен",
              "kind": "demographic"
            },
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "30",
              "name": "Sports",
              "russian": "Спорт",
              "kind": "genre"
            },
            {
              "id": "118",
              "name": "Combat Sports",
              "russian": "Спортивные единоборства",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "65",
              "name": "Tokyo Movie Shinsha",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/65.?1521917245"
            }
          ],
          "description": "После одного весьма трагичного события [character=11804]Джо Ябуки[/character] отчаялся и потерял надежду. Пытаясь забыть о прошлом, главный герой покинул тренажёрный зал и ушёл странствовать, однако его путешествие подошло к концу, когда он встретил [character=46055]Вольфа Канагуши[/character] и [character=101933]Горомаки Гондо[/character], которые непреднамеренно мотивировали [character=11804]Джо[/character] вернуться. Согласившись, [character=11804]Ябуки[/character] вновь становится на путь бокса, но его начинают мучить вопросы, что находятся в самых глубинах души и которые сдерживают юношу. И именно для этого из Венесуэлы прилетает всемирно известный боксёр [character=46053]Карлос Ривера[/character] — с целью помочь [character=11804]Джо Ябуки[/character]."
        },
        {
          "id": "53223",
          "name": "Kingdom 5th Season",
          "russian": "Царство 5",
          "season": "winter_2024",
          "poster": {
            "id": "725772",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/53223/f68c9a9d72f80ad88e4ed74090708cae.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/53223/preview-c8c52d24bd9184bce98a686e734ad740.webp"
          },
          "genres": [
            {
              "id": "42",
              "name": "Seinen",
              "russian": "Сэйнэн",
              "kind": "demographic"
            },
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "13",
              "name": "Historical",
              "russian": "Исторический",
              "kind": "theme"
            },
            {
              "id": "38",
              "name": "Military",
              "russian": "Военное",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "1",
              "name": "Pierrot",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/1.png?1378753179"
            },
            {
              "id": "1998",
              "name": "Studio Signpost",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/1998.png?1592731885"
            }
          ],
          "description": null
        },
        {
          "id": "21",
          "name": "One Piece",
          "russian": "Ван-Пис",
          "season": "fall_1999",
          "poster": {
            "id": "716485",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/21/75a07947be55983ce14917f57e96555f.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/21/preview-6784488f1b487d2b19ee8f9ce42e7e85.webp"
          },
          "genres": [
            {
              "id": "27",
              "name": "Shounen",
              "russian": "Сёнен",
              "kind": "demographic"
            },
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "2",
              "name": "Adventure",
              "russian": "Приключения",
              "kind": "genre"
            },
            {
              "id": "10",
              "name": "Fantasy",
              "russian": "Фэнтези",
              "kind": "genre"
            }
          ],
          "studios": [
            {
              "id": "18",
              "name": "Toei Animation",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/18.?1446981470"
            }
          ],
          "description": "Легендарный [character=4883]Гол Д. Роджер[/character] был пиратским королём, он был единственным пиратом, проплывшим Гранд Лайн от начала и до конца. Захват Роджера 22 года тому назад всемирным правительством привёл к изменениям во всём мире. Последние слова пирата перед казнью открыли расположение величайшего сокровища мира Ван-Пис. Тот, кто добудет его, станет новым Королём пиратов, и именно это событие положило начало Великой эры пиратов.\r\n[character=40]Монки Д. Луффи[/character], 17-летний парень, бросает вызов Гранд Лайн. Он собирает команду и отправляется на поиски сокровища, мечтая о захватывающих приключениях и имея свои причины стать пиратом. Следуя по стопам своего героя детства, Короля пиратов, Луффи и его команда путешествуют по линии Великого моря навстречу безумным приключениям, сильным врагам, и всё для того, чтобы добыть великое сокровище мира — Ван-Пис."
        },
        {
          "id": "33095",
          "name": "Shouwa Genroku Rakugo Shinjuu: Sukeroku Futatabi-hen",
          "russian": "Сёва-Гэнроку: Двойное самоубийство по ракуго 2",
          "season": "winter_2017",
          "poster": {
            "id": "682725",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/33095/3a5fee9ad8a165ed33c4be0978a0de65.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/33095/preview-e61f38eb0004e00186f872ef0fc507e7.webp"
          },
          "genres": [
            {
              "id": "43",
              "name": "Josei",
              "russian": "Дзёсей",
              "kind": "demographic"
            },
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "104",
              "name": "Adult Cast",
              "russian": "Взрослые персонажи",
              "kind": "theme"
            },
            {
              "id": "13",
              "name": "Historical",
              "russian": "Исторический",
              "kind": "theme"
            },
            {
              "id": "107",
              "name": "Love Polygon",
              "russian": "Любовный многоугольник",
              "kind": "theme"
            },
            {
              "id": "142",
              "name": "Performing Arts",
              "russian": "Исполнительское искусство",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "37",
              "name": "Studio Deen",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/37.?1434707541"
            }
          ],
          "description": "Ётаро — всё тот же наивный добряк, как и прежде, но уже получил определённую известность среди людей и унаследовал профессиональное имя. Много всего утекло с первой встречи Ётаро и его многоуважаемого учителя Якумо [八代目 有楽亭 八雲], но многому ещё предстоит произойти сейчас. Мангэцу [円屋 萬月] больше не занимается ракуго, развиваются сложные отношения Ётаро и Конацу, внезапно появляется известный писатель Эйсукэ Хигути.\r\nЁтаро наконец-то входит в мир профессиональных ракугок, и его первое выступление в этом статусе открывает Якумо. Несмотря на яркий дебют, на его последующих выступлениях собирается совсем небольшое количество человек. Все люди вокруг смиренно ждут, когда закатится солнце искусства ракуго, чтобы больше никогда не взойти. Но всеобщее настроение не передаётся главному герою, и он по-прежнему полон оптимизма, поэтому внезапно предлагает своему учителю и его приёмной дочери снова «жить, как семья».\r\nЧто же ещё подстерегает нашего героя на новом отрезке жизненного пути?"
        },
        {
          "id": "50172",
          "name": "Mob Psycho 100 III",
          "russian": "Моб Психо 100 3",
          "season": "fall_2022",
          "poster": {
            "id": "715774",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/50172/1b42da93bde84ebac3dbcf5513067b4d.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/50172/preview-70621fd2051ee3b1a1fa2f98ef2c5fd5.webp"
          },
          "genres": [
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "4",
              "name": "Comedy",
              "russian": "Комедия",
              "kind": "genre"
            },
            {
              "id": "37",
              "name": "Supernatural",
              "russian": "Сверхъестественное",
              "kind": "genre"
            },
            {
              "id": "31",
              "name": "Super Power",
              "russian": "Супер сила",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "4",
              "name": "Bones",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/4.png?1311292711"
            }
          ],
          "description": "Много всего случилось и всякое произошло, но всё это не слишком повлияло на обычную жизнь [character=109929]Шигэо Кагэямы[/character]. Он, как и раньше, продолжает посещать среднюю школу «Соль», всё также подрабатывает у самопровозглашённого экстрасенса [character=109931]Аратаки Рэйгэна[/character], по-прежнему испытывает трудности в общении и осваивании социальных навыков. Как обычно, зачастую несправедливая и суровая реальность испытывает терпение [character=109929]Моба[/character] на прочность, подкидывая разные сложные ситуации и непростые задачки о взаимоотношениях с окружающими.\r\n\r\nПускай на поверхности ничего кардинально не изменилось, но изменился сам [character=109929]Моб[/character]: пережитый опыт заставил его повзрослеть, научиться самому брать ответственность за себя, свои поступки и свои экстрасенсорные силы. Жизнь, конечно, заставляет, но готов ли к этим переменам сам [character=109929]Шигэо[/character]?"
        },
        {
          "id": "44",
          "name": "Rurouni Kenshin: Meiji Kenkaku Romantan - Tsuioku-hen",
          "russian": "Бродяга Кэнсин: Воспоминания",
          "season": null,
          "poster": {
            "id": "707634",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/44/c5d9ab26474312f0af6188cba5b03b07.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/44/preview-c9bb9c560cf931bccb4551a2d43fa424.webp"
          },
          "genres": [
            {
              "id": "27",
              "name": "Shounen",
              "russian": "Сёнен",
              "kind": "demographic"
            },
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "22",
              "name": "Romance",
              "russian": "Романтика",
              "kind": "genre"
            },
            {
              "id": "104",
              "name": "Adult Cast",
              "russian": "Взрослые персонажи",
              "kind": "theme"
            },
            {
              "id": "13",
              "name": "Historical",
              "russian": "Исторический",
              "kind": "theme"
            },
            {
              "id": "21",
              "name": "Samurai",
              "russian": "Самураи",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "37",
              "name": "Studio Deen",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/37.?1434707541"
            }
          ],
          "description": "Незадолго до [[Реставрации Мэйдзи]] Сэйдзюро Хико [比古 清十郎], отшельник и мастер клинка, встречает бандитов, вырезающих караван работорговцев. В надежде спасти хоть кого-то, Хико убивает бандитов, однако не успевает вовремя и застаёт в живых лишь одного маленького мальчика. Хико уходит, оставив ребёнка с напутствием отправляться в ближайшую деревню и там просить крестьян о приюте.\r\nСпустя несколько дней Хико возвращается назад удостовериться, что мальчик поступил так, как ему было сказано. Однако, к своему удивлению, находит ребёнка неподалеку, где тот хоронит убитых: бывших рабов, бандитов и даже работорговцев. Видя потенциал в этом дитя, Хико усыновляет его, дав мальчику имя Кэнсин [緋村 剣心], что означает «сердце меча».\r\nОтныне Кэнсин — ученик Сэйдзюро Хико, последнего человека в Японии, владеющего стилем боя Хитэн Мицуруги."
        },
        {
          "id": "48569",
          "name": "86 Part 2",
          "russian": "Восемьдесят шесть. Часть 2",
          "season": "fall_2021",
          "poster": {
            "id": "704799",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/48569/734bd0b86b835027a533ae7179aa97c5.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/48569/preview-b55a1f6515336e2c922d5e147da9ed09.webp"
          },
          "genres": [
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "24",
              "name": "Sci-Fi",
              "russian": "Фантастика",
              "kind": "genre"
            },
            {
              "id": "18",
              "name": "Mecha",
              "russian": "Меха",
              "kind": "theme"
            },
            {
              "id": "38",
              "name": "Military",
              "russian": "Военное",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "56",
              "name": "A-1 Pictures",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/56.?1434707196"
            }
          ],
          "description": "Остатки отряда «Остриё копья» во главе с [character=150823]Синъэем Нодзэном[/character] были отправлены в последнюю специальную миссию, цель которой — продвигаться вглубь «Легиона», пока команда не будет уничтожена. И когда конец был уже близок, их неожиданно спасли от неминуемой смерти военные Федеративной Республики Гияд. \r\nВ новой стране у измождённых воинов появляется возможность забыть о войне, жить счастливой жизнью и быть не «свинками», а людьми. Но что-то не даёт им покоя, словно эта новая жизнь чужая и совсем не та, какую они хотели."
        },
        {
          "id": "1575",
          "name": "Code Geass: Hangyaku no Lelouch",
          "russian": "Код Гиас: Восставший Лелуш",
          "season": "fall_2006",
          "poster": {
            "id": "496560",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/1575/c1576bdcddd81781d600266245906989.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/1575/preview-e30252b91d3a7ae29d4f3005d70a5a2c.webp"
          },
          "genres": [
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "24",
              "name": "Sci-Fi",
              "russian": "Фантастика",
              "kind": "genre"
            },
            {
              "id": "114",
              "name": "Award Winning",
              "russian": "Удостоено наград",
              "kind": "theme"
            },
            {
              "id": "18",
              "name": "Mecha",
              "russian": "Меха",
              "kind": "theme"
            },
            {
              "id": "38",
              "name": "Military",
              "russian": "Военное",
              "kind": "theme"
            },
            {
              "id": "23",
              "name": "School",
              "russian": "Школа",
              "kind": "theme"
            },
            {
              "id": "31",
              "name": "Super Power",
              "russian": "Супер сила",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "14",
              "name": "Sunrise",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/14.jpg?1630137154"
            }
          ],
          "description": "История рассказывает о недалёком будущем, когда Британской Империей было захвачено полмира. Японии в этом варианте не существует — она завоёвана Британией годы назад и переименована в «11-й сектор», а сами японцы уничижительно зовутся «одиннадцатыми».\r\nГлавный герой истории, [character=417]Лелуш Ламперуж[/character], опальный отпрыск императорского рода, сослан с сестрой в 11-й сектор, где учится в академии для местных аристократов. Волею случая он оказывается втянут в атаку японских повстанцев на Британию. Империя же, не терпящая неповиновения, немедленно высылает карательные отряды солдат, уничтожающие всё на своём пути. Спасаясь от имперцев, [character=417]Лелуш[/character] пересекается с таинственной зеленоволосой девушкой, называющей себя [character=1111]С.С[/character]. Оказавшись загнанной в угол и окружённой солдатами, [character=1111]С.С.[/character] передаёт [character=417]Лелушу[/character] Великий дар, называемый гиасом...\r\nТеперь Империя заплатит за всё!"
        },
        {
          "id": "245",
          "name": "Great Teacher Onizuka",
          "russian": "Крутой учитель Онидзука",
          "season": "summer_1999",
          "poster": {
            "id": "708359",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/245/33dc76418c819bb63f18dead3596823a.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/245/preview-ed788c2a0519799593159f44d8d320b1.webp"
          },
          "genres": [
            {
              "id": "27",
              "name": "Shounen",
              "russian": "Сёнен",
              "kind": "demographic"
            },
            {
              "id": "4",
              "name": "Comedy",
              "russian": "Комедия",
              "kind": "genre"
            },
            {
              "id": "131",
              "name": "Delinquents",
              "russian": "Хулиганы",
              "kind": "theme"
            },
            {
              "id": "23",
              "name": "School",
              "russian": "Школа",
              "kind": "theme"
            },
            {
              "id": "139",
              "name": "Workplace",
              "russian": "Работа",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "1",
              "name": "Pierrot",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/1.png?1378753179"
            }
          ],
          "description": "Бывший член нагоняющей на горожан ужас банды «Онибаку», байкер Эйкити Онидзука [鬼塚 英吉], ставит перед собой цель стать самым крутым школьным учителем. Почему учителем? Да просто в школах полно сексуальных старшеклассниц! Ну... почти бывший член банды...\r\nОднако тирания школьной администрации и целый класс малолетних правонарушителей стоят между Онидзукой и его целью. И любыми средствами — неважно, законными или нет, — они хотят избавиться от нового учителя. Впрочем, самого Онидзуку это не сильно беспокоит — его способы воспитания учеников вы не найдёте ни в одном учебном пособии, законность и дозволенность методов его заботит ровно настолько же, насколько его заботит разница в возрасте между ним и вожделенными старшеклассницами."
        },
        {
          "id": "21939",
          "name": "Mushishi Zoku Shou",
          "russian": "Мастер муси: Следующая глава",
          "season": "spring_2014",
          "poster": {
            "id": "462466",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/21939/a17673ea347df76742ffb11c16e3ba76.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/21939/preview-d64bb58b0c1f7bf87b3c25c9440b89bf.webp"
          },
          "genres": [
            {
              "id": "42",
              "name": "Seinen",
              "russian": "Сэйнэн",
              "kind": "demographic"
            },
            {
              "id": "2",
              "name": "Adventure",
              "russian": "Приключения",
              "kind": "genre"
            },
            {
              "id": "7",
              "name": "Mystery",
              "russian": "Тайна",
              "kind": "genre"
            },
            {
              "id": "36",
              "name": "Slice of Life",
              "russian": "Повседневность",
              "kind": "genre"
            },
            {
              "id": "37",
              "name": "Supernatural",
              "russian": "Сверхъестественное",
              "kind": "genre"
            },
            {
              "id": "104",
              "name": "Adult Cast",
              "russian": "Взрослые персонажи",
              "kind": "theme"
            },
            {
              "id": "13",
              "name": "Historical",
              "russian": "Исторический",
              "kind": "theme"
            },
            {
              "id": "140",
              "name": "Iyashikei",
              "russian": "Иясикэй",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "8",
              "name": "Artland",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/8.gif?1312165056"
            }
          ],
          "description": "Давным-давно на земле были только [i]они[/i]. Возможно, [i]они[/i] существовали ещё до зарождения самой жизни, хотя [i]они[/i] — ни на что не похожие — и есть жизнь. Испокон веков люди почитали и боялись [i]их[/i] и называли не иначе как «муси». Они могут влиять на жизнь, а могут просто оставаться в стороне. Чтобы избежать их пагубного воздействия, появились люди, называемые «мусиси», — мастера муси.\r\nЭта история об одном из таких мастеров по имени [character=425]Гинко[/character], который, однако, сильно отличается от остальных. Спокойный и малоэмоциональный, он следует своим собственным воззрениям и старается не воздействовать на мир муси. Странствуя, он пытается найти ответы на вопросы, гложущие его с детства. Но удастся ли ему это?"
        },
        {
          "id": "53998",
          "name": "Bleach: Sennen Kessen-hen - Ketsubetsu-tan",
          "russian": "Блич: Тысячелетняя кровавая война — Прощание",
          "season": "summer_2023",
          "poster": {
            "id": "702915",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/53998/c401c0c012981dfd01ee1ab1f6c6bc61.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/53998/preview-9f3614d7e5a30bd72811325f207ffec2.webp"
          },
          "genres": [
            {
              "id": "27",
              "name": "Shounen",
              "russian": "Сёнен",
              "kind": "demographic"
            },
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "2",
              "name": "Adventure",
              "russian": "Приключения",
              "kind": "genre"
            },
            {
              "id": "10",
              "name": "Fantasy",
              "russian": "Фэнтези",
              "kind": "genre"
            }
          ],
          "studios": [
            {
              "id": "1",
              "name": "Pierrot",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/1.png?1378753179"
            }
          ],
          "description": "Пока Сообщество душ, понесшее колоссальные потери и разрушения в битве с «Ванденрейхом», пытается держаться на плаву, [character=68537]Яхве[/character] избирает преемника, чем вызывает недовольство некоторых штернриттеров. В это же время [character=5]Ичиго Куросаки[/character], который узнал о своём истинном происхождении и отправился во владения Короля душ, восстанавливает силы и старается стать сильнее для борьбы с неприятелем. \r\n\r\nВпереди назревает очередная битва, которая сулит новые потери, но сумеет ли [character=5]Ичиго[/character] набраться сил, чтобы противостоять врагу?"
        },
        {
          "id": "44074",
          "name": "Shiguang Dailiren",
          "russian": "Агент времени",
          "season": null,
          "poster": {
            "id": "724390",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/44074/baa99c8e01ff82bc19b548d9b3d501c9.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/44074/preview-4089feee130d12c87cf1094e63096cb1.webp"
          },
          "genres": [
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "7",
              "name": "Mystery",
              "russian": "Тайна",
              "kind": "genre"
            },
            {
              "id": "37",
              "name": "Supernatural",
              "russian": "Сверхъестественное",
              "kind": "genre"
            },
            {
              "id": "117",
              "name": "Suspense",
              "russian": "Триллер",
              "kind": "genre"
            },
            {
              "id": "104",
              "name": "Adult Cast",
              "russian": "Взрослые персонажи",
              "kind": "theme"
            },
            {
              "id": "111",
              "name": "Time Travel",
              "russian": "Путешествие во времени",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "1774",
              "name": "LAN Studio",
              "imageUrl": null
            }
          ],
          "description": "«Во-первых, у тебя лишь двенадцать часов. Во-вторых, делай, как я говорю, и не вздумай ничего менять. В-третьих, что бы ни было в прошлом, будущее тебя не касается», — именно эти слова [character=196253]Лу Гуан[/character] всегда говорит [character=196252]Чэн Сяоши[/character] перед очередной миссией, порученной небольшой фотостудии Time Photo Studio‎. Эта студия, помимо обычной работы с фотографиями, может предоставить особую услугу: с помощью фотографии [character=196252]Чэн Сяоши[/character] может вернуться в тот момент, когда снимок был сделан, и пробыть там до двенадцати часов. Однако существует одно железное правило: «Ни в коем случае нельзя менять исход событий», за выполнением которого тщательно следит [character=196253]Лу Гуан[/character]."
        },
        {
          "id": "5258",
          "name": "Hajime no Ippo: New Challenger",
          "russian": "Первый шаг: Новый вызов",
          "season": "winter_2009",
          "poster": {
            "id": "776347",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/5258/384a7d0b168b66f060737c5e53965f87.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/5258/preview-3d0851cacc981fdf94eae29d762b8132.webp"
          },
          "genres": [
            {
              "id": "27",
              "name": "Shounen",
              "russian": "Сёнен",
              "kind": "demographic"
            },
            {
              "id": "30",
              "name": "Sports",
              "russian": "Спорт",
              "kind": "genre"
            },
            {
              "id": "118",
              "name": "Combat Sports",
              "russian": "Спортивные единоборства",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "11",
              "name": "Madhouse",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/11.png?1457607773"
            }
          ],
          "description": "Иппо Макуноучи [幕之内 一歩] продолжает заниматься боксом, надеясь ещё раз сразиться со своим кумиром Ичиро Миятой [宮田 一郎].\r\nВместе с Иппо совершенствуются профессиональные боксёры Такамура [鷹村 守], Аоки [青木 勝] и Кимура [木村 達也], каждый из которых стремится к исполнению своей собственной мечты."
        },
        {
          "id": "45576",
          "name": "Mushoku Tensei: Isekai Ittara Honki Dasu Part 2",
          "russian": "Реинкарнация безработного: История о приключениях в другом мире. Часть 2",
          "season": "fall_2021",
          "poster": {
            "id": "457061",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/45576/0a98f6e5dbcc1d4c643c1b7b9874902e.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/45576/preview-b9566efdf73549ab63e84284bba74166.webp"
          },
          "genres": [
            {
              "id": "2",
              "name": "Adventure",
              "russian": "Приключения",
              "kind": "genre"
            },
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "10",
              "name": "Fantasy",
              "russian": "Фэнтези",
              "kind": "genre"
            },
            {
              "id": "9",
              "name": "Ecchi",
              "russian": "Этти",
              "kind": "genre"
            },
            {
              "id": "130",
              "name": "Isekai",
              "russian": "Исэкай",
              "kind": "theme"
            },
            {
              "id": "106",
              "name": "Reincarnation",
              "russian": "Реинкарнация",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "1993",
              "name": "Studio Bind",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/1993.png?1618485032"
            }
          ],
          "description": "Эта история расскажет об отаку-неудачнике, который погиб под колёсами автомобиля, а после пришёл в себя в теле новорождённого. Как оказалось, он переродился в другом мире, и теперь его зовут [character=111245]Рудеус Грейрат[/character]. Чтобы выжить и не повторять прошлых ошибок, [character=111245]Рудеус[/character] решил прилежно учиться магии и искусству владения мечом. Хотя внешний мир всё ещё пугал бывшего затворника, [character=111245]Рудеус[/character] нашёл в себе силы и завёл первого друга. А спустя время и сам, покинув стены родного дома, взялся за обучение несносной девчонки по имени [character=111335]Эрис Бореас Грейрат[/character]. Всё, казалось бы, шло как нельзя лучше, но его вместе с [character=111335]Эрис[/character] внезапно перебросило на другой континент. \r\n\r\nТеперь молодому магу предстоит дорога домой в компании своей ученицы [character=111335]Эрис[/character] и сильнейшего суперда по имени [character=111739]Руйджерд Супердия[/character]. Возвращение будет полным приключений, опасностей и новых знакомств, но для того, чтобы отыскать близких и выяснить, что произошло с его родным домом, [character=111245]Рудеус[/character] ни за что не свернёт с намеченного пути!"
        },
        {
          "id": "50399",
          "name": "Tian Guan Cifu Er",
          "russian": "Благословение небожителей 2",
          "season": null,
          "poster": {
            "id": "726352",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/50399/5204c052636273b9869027be3b0ed72b.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/50399/preview-9f3ef62dcbe276bc996b2b13e6a7e210.webp"
          },
          "genres": [
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "2",
              "name": "Adventure",
              "russian": "Приключения",
              "kind": "genre"
            },
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "10",
              "name": "Fantasy",
              "russian": "Фэнтези",
              "kind": "genre"
            },
            {
              "id": "13",
              "name": "Historical",
              "russian": "Исторический",
              "kind": "theme"
            },
            {
              "id": "6",
              "name": "Mythology",
              "russian": "Мифология",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "2126",
              "name": "Red Dog Culture House",
              "imageUrl": null
            }
          ],
          "description": "Народ Сяньлэ искренне почитал наследного принца государства, который не стремился к богатству и власти, а хотел помогать простым людям. Поэтому не только верноподданные [character=174773]Се Ляня[/character] ожидали, что тот вознесётся на Небеса, но и сами небожители. Вскоре это действительно произошло, и Его Высочество наследный принц занял место в пантеоне. Став богом войны, [character=174773]Се Лянь[/character], однако, допустил ошибку, вмешавшись в дела смертных, и был низвержен. Стремясь всё исправить, [character=174773]Се Лянь[/character] смог вознестись вновь, но и на это раз пробыл в небесных чертогах недолго.\r\n\r\nПрошло восемьсот лет, прежде чем [character=174773]Се Лянь[/character], который за это время стал свидетелем многих злодеяний, но так и не утратил веру в людей, взошёл на Небеса в третий раз. Вот только неожиданное вознесение повредило дворец одного из богов, так что [character=174773]Се Ляню[/character] необходимо возместить нанесённый урон благими деяниями. Он вновь спустился в мир смертных, где волею судьбы познакомился с загадочным юношей по имени [character=175937]Хуа Чэн[/character]. \r\nЕщё много трудностей и тайн поджидает [character=174773]Се Ляня[/character] на его тернистом пути. К сожалению, главным его открытием станет тот факт, что боги совсем не так идеальны, как кажется."
        },
        {
          "id": "52742",
          "name": "Haikyuu!! Movie: Gomisuteba no Kessen",
          "russian": "Волейбол!! Решающая игра на свалке",
          "season": null,
          "poster": {
            "id": "729042",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/52742/b36b9af5c1603a9fcbfd90245b02322d.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/52742/preview-51cb41d598220cf1507cdeb3ff20cb01.webp"
          },
          "genres": [
            {
              "id": "27",
              "name": "Shounen",
              "russian": "Сёнен",
              "kind": "demographic"
            },
            {
              "id": "30",
              "name": "Sports",
              "russian": "Спорт",
              "kind": "genre"
            },
            {
              "id": "23",
              "name": "School",
              "russian": "Школа",
              "kind": "theme"
            },
            {
              "id": "102",
              "name": "Team Sports",
              "russian": "Командный спорт",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "10",
              "name": "Production I.G",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/10.png?1312165069"
            }
          ],
          "description": null
        },
        {
          "id": "46102",
          "name": "Odd Taxi",
          "russian": "Случайное такси",
          "season": "spring_2021",
          "poster": {
            "id": "456508",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/46102/43e6753a65d080d1c3a234b05cc17c4e.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/46102/preview-01a2d64d30b571e4c3df81965ebc65ed.webp"
          },
          "genres": [
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "7",
              "name": "Mystery",
              "russian": "Тайна",
              "kind": "genre"
            },
            {
              "id": "117",
              "name": "Suspense",
              "russian": "Триллер",
              "kind": "genre"
            },
            {
              "id": "114",
              "name": "Award Winning",
              "russian": "Удостоено наград",
              "kind": "theme"
            },
            {
              "id": "104",
              "name": "Adult Cast",
              "russian": "Взрослые персонажи",
              "kind": "theme"
            },
            {
              "id": "143",
              "name": "Anthropomorphic",
              "russian": "Антропоморфизм",
              "kind": "theme"
            },
            {
              "id": "138",
              "name": "Organized Crime",
              "russian": "Организованная преступность",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "28",
              "name": "OLM",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/28.png?1523482474"
            },
            {
              "id": "1872",
              "name": "P.I.C.S.",
              "imageUrl": null
            }
          ],
          "description": "Таксист [character=191215]Одокава[/character] живёт серой однообразной жизнью. У него нет семьи, нет друзей, он чудаковатый, узко мыслящий и мало разговаривающий тип. Единственные его собеседники — это его врач [character=191217]Горики[/character] и его одноклассник из средней школы [character=191218]Какихана[/character].\r\n\r\nЕго клиенты и сами кажутся немного странными. [character=191228]Кабасава[/character] — студент колледжа, который хочет, чтобы мир заметил его в Интернете. [character=191216]Сиракава[/character] — загадочная медсестра, которая что-то скрывает. «Хомосапиенс» — комедийный дуэт, у которого не всё гладко с профессиональной деятельностью. Местный хулиган по имени [character=191230]Добу[/character]. Все они садятся в его такси, едут, ведут обычные разговоры, которые каким-то образом ведут к пропавшей девушке."
        },
        {
          "id": "33352",
          "name": "Violet Evergarden",
          "russian": "Вайолет Эвергарден",
          "season": "winter_2018",
          "poster": {
            "id": "465456",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/33352/4be98a6af5e313a74ab53412a69c5fb7.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/33352/preview-05ae70444279120e7382ee55f4d49a88.webp"
          },
          "genres": [
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "10",
              "name": "Fantasy",
              "russian": "Фэнтези",
              "kind": "genre"
            }
          ],
          "studios": [
            {
              "id": "2",
              "name": "Kyoto Animation",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/2.png?1522422929"
            }
          ],
          "description": "Вайолет Эвергарден, молодая девушка, чья жизнь — не что иное, как война, послушно служит под командованием майора Гилберта Бугенвиллеи [ギルベルト・ブーゲンビリア] из армии Ляйденшафтлиха.\r\nПосле серьёзных увечий, оставивших её без рук и разделивших с Гилбертом, она покинула поле боя и была взята под опеку бывшим командующим армии Клаудией Ходжинсом [クラウディア・ホッジンズ], который после окончания войны основал почтовую службу «C-H» в крупном портовом городе Ляйден. Эта компания осуществляет регулярные почтовые пересылки и предоставляет услуги «автозапоминающих кукол» — талантливых девушек, в чьи обязанности входит написание писем и корректировка текста для большей части неграмотного населения города.\r\nВ конечном итоге, тронутая работой автозапоминающих кукол, Вайолет решает присоединиться к команде, чтобы узнать судьбу майора Гилберта и смысл последних слов, сказанных им: «Я люблю тебя»."
        },
        {
          "id": "33050",
          "name": "Fate/stay night Movie: Heaven's Feel - III. Spring Song",
          "russian": "Судьба/Ночь схватки: Прикосновение небес 3",
          "season": null,
          "poster": {
            "id": "718477",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/33050/18c55002a0737788533dd44d36608f90.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/33050/preview-e2a905131f123c2d05959b3235f96cf5.webp"
          },
          "genres": [
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "10",
              "name": "Fantasy",
              "russian": "Фэнтези",
              "kind": "genre"
            },
            {
              "id": "37",
              "name": "Supernatural",
              "russian": "Сверхъестественное",
              "kind": "genre"
            }
          ],
          "studios": [
            {
              "id": "43",
              "name": "ufotable",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/43.png?1311292714"
            }
          ],
          "description": "Завершающий третий фильм аниме-адаптации «[manga=88110]Судьба/Ночь схватки: Прикосновение небес[/manga]»."
        },
        {
          "id": "431",
          "name": "Howl no Ugoku Shiro",
          "russian": "Ходячий замок",
          "season": null,
          "poster": {
            "id": "719300",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/431/1c54bd6cb3f7ca6a81617109fdff9ebc.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/431/preview-c4a5ef911541a6d0896001eb33334647.webp"
          },
          "genres": [
            {
              "id": "2",
              "name": "Adventure",
              "russian": "Приключения",
              "kind": "genre"
            },
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "10",
              "name": "Fantasy",
              "russian": "Фэнтези",
              "kind": "genre"
            },
            {
              "id": "22",
              "name": "Romance",
              "russian": "Романтика",
              "kind": "genre"
            },
            {
              "id": "114",
              "name": "Award Winning",
              "russian": "Удостоено наград",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "21",
              "name": "Studio Ghibli",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/21.png?1311292709"
            }
          ],
          "description": "Восемнадцатилетняя шляпница Софи [ソフィー・ハッター] ведёт тихую и ничем не примечательную городскую жизнь. Однако типичный её распорядок рушится, когда в окрестностях города объявляется Ходячий замок Хаула [ハウル] — колдуна, заключившего сделку с демоном огня Кальцифером [カルシファ] и носящего дурную славу «похитителя» девичьих сердец.\r\nВечером после работы очаровательный голубоглазый красавец, оказавшийся, как ни странно, самим Хаулом [ハウル], спасает Софи от приставаний двух солдафонов, и девушка тут же влюбляется в своего спасителя. Однако итогом их встречи становится проклятие Ведьмы Пустоши [荒地の魔女], превратившее Софи в девяностолетнюю старуху.\r\nТеперь Софи вынуждена покинуть родной дом и отправиться на поиски ведьмы, просить ту снять проклятие. Дорога же приводит «девушку» к тому самому Ходячему замку, где у неё и появляется шанс начать новую жизнь..."
        },
        {
          "id": "164",
          "name": "Mononoke Hime",
          "russian": "Принцесса Мононоке",
          "season": null,
          "poster": {
            "id": "698205",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/164/14aa48cc56b55626862a367e174bd845.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/164/preview-a48008189c9948da885455f5dbccd2b7.webp"
          },
          "genres": [
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "2",
              "name": "Adventure",
              "russian": "Приключения",
              "kind": "genre"
            },
            {
              "id": "10",
              "name": "Fantasy",
              "russian": "Фэнтези",
              "kind": "genre"
            },
            {
              "id": "114",
              "name": "Award Winning",
              "russian": "Удостоено наград",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "21",
              "name": "Studio Ghibli",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/21.png?1311292709"
            }
          ],
          "description": "Деревня народа [url=http://ru.wikipedia.org/wiki/Эмиси]эмиси[/url] затеряна где-то в горах средневековой Японии. Однажды на эту деревню нападает Наго, гигантский вепрь, одержимый ненавистью, превратившей его в демона.\r\nРади спасения деревни сыну вождя Аситаке приходится убить проклятое животное, но самого его в руку ранит зверь, и вместе с раной ему передаётся проклятие. И теперь, согласно традициям племени, он должен быть изгнан, дабы в изгнании найти путь к исцелению либо погибнуть.\r\nПутешествуя во внешнем мире, Аситака становится свидетелем и невольным участником противостояния людей Железного Города под предводительством Госпожи Эбоси [エボシ御前] и зверей Древнего [[Леса]], ведомых Духом Леса [シシ神] с богами Моро и Оккотононуси [乙事主]. Сторону леса также занимает и приёмная дочь Моро, человеческая девушка по имени Сан.\r\nОбитатели леса разгневаны поведением людей и не собираются больше сносить надругательств над их домом.\r\nАситака же обнаруживает, что вместе с проклятием он получил нечеловеческие физическую силу и выносливость. И теперь перед ним встаёт нелёгкий выбор: на чью сторону стать? Людей? [[Леса]]? Или, может быть, ему удастся разрешить этот конфликт мирным путём без кровопролития?"
        },
        {
          "id": "457",
          "name": "Mushishi",
          "russian": "Мастер муси",
          "season": "fall_2005",
          "poster": {
            "id": "459528",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/457/66a349bee619ecb47f270b7024216365.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/457/preview-d37409286b3c66468dd542dbb71a6522.webp"
          },
          "genres": [
            {
              "id": "42",
              "name": "Seinen",
              "russian": "Сэйнэн",
              "kind": "demographic"
            },
            {
              "id": "2",
              "name": "Adventure",
              "russian": "Приключения",
              "kind": "genre"
            },
            {
              "id": "7",
              "name": "Mystery",
              "russian": "Тайна",
              "kind": "genre"
            },
            {
              "id": "36",
              "name": "Slice of Life",
              "russian": "Повседневность",
              "kind": "genre"
            },
            {
              "id": "37",
              "name": "Supernatural",
              "russian": "Сверхъестественное",
              "kind": "genre"
            },
            {
              "id": "104",
              "name": "Adult Cast",
              "russian": "Взрослые персонажи",
              "kind": "theme"
            },
            {
              "id": "13",
              "name": "Historical",
              "russian": "Исторический",
              "kind": "theme"
            },
            {
              "id": "140",
              "name": "Iyashikei",
              "russian": "Иясикэй",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "8",
              "name": "Artland",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/8.gif?1312165056"
            }
          ],
          "description": "Муси — простейшая форма жизни в мире. Муси существуют повсюду и безо всякой цели. Они вне человеческих понятий о добре и зле. Муси могут существовать в бесчисленных формах: могут принимать облик живых существ, растений или даже таких явлений, как радуга.\r\nВсё это лишь туманная попытка описать этих существ, обитающих в нашем мире, ведь даже назвать их «формой жизни» было бы слишком просто. Информации о муси чрезвычайно мало, а большинство людей о них даже не подозревают.\r\nЧто же такое муси? И для чего они существуют? Этими вопросами мусиси Гинко [ギンコ] задаётся постоянно. Мусиси — это люди, занимающиеся изучением муси, пытающиеся понять их суть и предназначение.\r\nВ надежде найти ответы на свои вопросы Гинко следует за любыми слухами о событиях, которые могли бы быть вызваны муси. Ведь, кто знает, возможно, это приведёт к ответу на вопрос: «А что такое жизнь вообще?»"
        },
        {
          "id": "34599",
          "name": "Made in Abyss",
          "russian": "Созданный в Бездне",
          "season": "summer_2017",
          "poster": {
            "id": "677877",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/34599/27feaa368ca5e9035310d8d3d972d2cd.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/34599/preview-0d5e1a81d9bcc25f896fa166f3a8b3d6.webp"
          },
          "genres": [
            {
              "id": "2",
              "name": "Adventure",
              "russian": "Приключения",
              "kind": "genre"
            },
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "10",
              "name": "Fantasy",
              "russian": "Фэнтези",
              "kind": "genre"
            },
            {
              "id": "7",
              "name": "Mystery",
              "russian": "Тайна",
              "kind": "genre"
            },
            {
              "id": "24",
              "name": "Sci-Fi",
              "russian": "Фантастика",
              "kind": "genre"
            },
            {
              "id": "105",
              "name": "Gore",
              "russian": "Жестокость",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "290",
              "name": "Kinema Citrus",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/290.?1450691180"
            }
          ],
          "description": "Человечество всегда тяготело к изучению неизведанного. Даже если неизведанное хранило в себе безграничную опасность... Много сотен лет назад посреди южного моря был обнаружен остров, в основании которого зияло громадное отверстие. Вопрос, что же находится там, глубоко внизу, мгновенно отравил умы желающих заполучить предполагаемые богатства. Бесчисленные искатели приключений мало-помалу прибывали на этот клочок земли, спускались вниз, и вскоре выяснилось, что поживиться там и правда есть чем. Однако вместе с тем люди, отправлявшиеся всё ниже и ниже и возвращавшиеся обратно, рассказывали о необычайных и кровожадных существах, погубивших их товарищей, а также выдвигали теории, что у дыры на самом деле нет дна. И где-то глубоко внизу родилось название — Бездна.\r\nСо временем вокруг отверстия образовался город Орф, построенный потомками первых исследователей Бездны на костях своих отважных предков. Двенадцатилетняя [character=137239]Рико[/character], как и многие дети в городе, сирота, чьи родители сгинули в недрах прожорливой дыры. Дети с её судьбой вынуждены жить в приютах при гильдиях исследователей Бездны и работать на них, добывая Реликвии. Однако, храня воспоминания о своей легендарной матери, [character=137239]Рико[/character] не унывает и, наоборот, хочет как можно скорее набраться опыта и получить Белый Свисток, олицетворяющий высший ранг среди исследователей.\r\nНо пока она только ученик, вынужденный довольствоваться Красным Свистком новичка и безопасными вылазками на глубину не больше ста метров от поверхности. Где уж тут станешь великим?.. Однажды, отдавая всю себя работе, [character=137239]Рико[/character] чуть было не попадает в пасть грозному монстру, от которого её спасает странный мальчик — не то робот, не то человек, — прибывший, как считает девочка, с самого низа Бездны. Это событие рождает новую догадку: неужели, каждый день смотря в Бездну, Бездна в ответ пристально глядит на тебя?"
        },
        {
          "id": "41084",
          "name": "Made in Abyss: Retsujitsu no Ougonkyou",
          "russian": "Созданный в Бездне: Солнце, вспыхнувшее в Золотом городе",
          "season": "summer_2022",
          "poster": {
            "id": "456518",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/41084/2ab7cd332f93291322afd51b441cea5a.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/41084/preview-4ca7f041b39ace4635fb1f70645e6173.webp"
          },
          "genres": [
            {
              "id": "2",
              "name": "Adventure",
              "russian": "Приключения",
              "kind": "genre"
            },
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "10",
              "name": "Fantasy",
              "russian": "Фэнтези",
              "kind": "genre"
            },
            {
              "id": "7",
              "name": "Mystery",
              "russian": "Тайна",
              "kind": "genre"
            },
            {
              "id": "24",
              "name": "Sci-Fi",
              "russian": "Фантастика",
              "kind": "genre"
            },
            {
              "id": "105",
              "name": "Gore",
              "russian": "Жестокость",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "290",
              "name": "Kinema Citrus",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/290.?1450691180"
            }
          ],
          "description": "В компании [character=140060]Нанати[/character], [character=137239]Рико[/character] и [character=140046]Рэг[/character] продолжают свой спуск в Бездну. Теперь, когда [character=137239]Рико[/character] стала обладательницей Белого свистка, они решают спуститься на шестой уровень Бездны — Столицу Невернувшихся. Этот уровень таит в себе множество угроз, а опасности здесь поджидают на каждом шагу, но они не пугают [character=137239]Рико[/character], [character=140046]Рэга[/character] и [character=140060]Нанати[/character], и ребята продолжают путешествие.\r\n \r\nПо стечению обстоятельств они набредают на странную деревню под названием Илблу, которую населяют необычные существа — «пустышки». Познавая язык и обычаи этих существ, ребята узнают историю деревни и её жителей, а также получают возможность выяснить правду о группе авантюристов, много лет назад прибывших на остров в поисках Золотого города."
        },
        {
          "id": "11665",
          "name": "Natsume Yuujinchou Shi",
          "russian": "Тетрадь дружбы Нацумэ 4",
          "season": "winter_2012",
          "poster": {
            "id": "715780",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/11665/41e39a6fdfe86c599e748a04466c53b9.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/11665/preview-39c03550b07e93d30eed06fb42a8f3c7.webp"
          },
          "genres": [
            {
              "id": "25",
              "name": "Shoujo",
              "russian": "Сёдзё",
              "kind": "demographic"
            },
            {
              "id": "36",
              "name": "Slice of Life",
              "russian": "Повседневность",
              "kind": "genre"
            },
            {
              "id": "37",
              "name": "Supernatural",
              "russian": "Сверхъестественное",
              "kind": "genre"
            },
            {
              "id": "140",
              "name": "Iyashikei",
              "russian": "Иясикэй",
              "kind": "theme"
            },
            {
              "id": "6",
              "name": "Mythology",
              "russian": "Мифология",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "112",
              "name": "Brain's Base",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/112.png?1311292714"
            }
          ],
          "description": "В четвёртом сезоне Нацумэ (Takashi Natsume) продолжает возвращать имена ёкаям, которые записаны в «Тетради дружбы», а ленивый Нянко-сэнсэй (Madara) всё так же ворчит и балуется сакэ. И, хотя проблем у парня не убавляется, друзей становится всё больше. Многие духи теперь частенько выручают Нацумэ, памятуя о его добросердечности.\r\nИ это ставит перед Такаши (Takashi Natsume) неизбежный вопрос: чью сторону он примет? Ведь ёкаи и люди никогда не смогут ужиться. Или так только кажется?"
        },
        {
          "id": "23273",
          "name": "Shigatsu wa Kimi no Uso",
          "russian": "Твоя апрельская ложь",
          "season": "fall_2014",
          "poster": {
            "id": "680666",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/23273/7ebe47543e0ab64ec621f26317f53d05.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/23273/preview-a6a7815658e28756ea6f351cf53e73e1.webp"
          },
          "genres": [
            {
              "id": "27",
              "name": "Shounen",
              "russian": "Сёнен",
              "kind": "demographic"
            },
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "22",
              "name": "Romance",
              "russian": "Романтика",
              "kind": "genre"
            },
            {
              "id": "107",
              "name": "Love Polygon",
              "russian": "Любовный многоугольник",
              "kind": "theme"
            },
            {
              "id": "19",
              "name": "Music",
              "russian": "Музыка",
              "kind": "theme"
            },
            {
              "id": "23",
              "name": "School",
              "russian": "Школа",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "56",
              "name": "A-1 Pictures",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/56.?1434707196"
            }
          ],
          "description": "Косэй Арима — мальчик, профессионально играющий на фортепиано, — выигрывал все детские конкурсы, его имя было известно всем начинающим музыкантам. Мать Косэя была его учителем. После того, как она неожиданно скончалась, у Косэя случился нервный срыв во время выступления, в результате чего он больше не мог слышать своей музыки, несмотря на прекрасный слух и большой талант.\r\nСпустя несколько лет Косэй всё ещё не притрагивался к пианино; мир кажется ему серым и монотонным. Он рад, что у него ещё остались хорошие друзья такие, как Цубаки Савабэ и Рёта Ватари.\r\nВ один прекрасный день он встречает девушку по имени Каори [宮園 かをり], талантливую и свободную духом скрипачку, чей стиль игры отражает её личность и душу. Каори хочет помочь Косэю [有馬 公生] вернуться  в музыкальный мир и снова услышать музыку..."
        },
        {
          "id": "52034",
          "name": "\"Oshi no Ko\"",
          "russian": "Ребёнок идола",
          "season": "spring_2023",
          "poster": {
            "id": "715194",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/52034/6fe706b9a72df0c81da4c769d0e4ec1d.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/52034/preview-7c8c030a03bd0e46bf0a3e75448028f6.webp"
          },
          "genres": [
            {
              "id": "42",
              "name": "Seinen",
              "russian": "Сэйнэн",
              "kind": "demographic"
            },
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "37",
              "name": "Supernatural",
              "russian": "Сверхъестественное",
              "kind": "genre"
            },
            {
              "id": "114",
              "name": "Award Winning",
              "russian": "Удостоено наград",
              "kind": "theme"
            },
            {
              "id": "106",
              "name": "Reincarnation",
              "russian": "Реинкарнация",
              "kind": "theme"
            },
            {
              "id": "136",
              "name": "Showbiz",
              "russian": "Шоу-бизнес",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "95",
              "name": "Doga Kobo",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/95.png?1312164950"
            }
          ],
          "description": "Красная ковровая дорожка, яркие вспышки фотоаппаратов, восторженные вскрики поклонников! Наверняка каждый хоть раз в жизни мечтал прославиться: стать знаменитым музыкантом, востребованным актёром или популярным певцом. Только вот путь становления звездой тернист, и лишь немногим удаётся осуществить мечту. Но что, если двери в шоу-бизнес были бы открыты с самого начала?\r\n\r\n[character=185313]Аквамарин[/character] и [character=186921]Руби[/character] [[Хосино]] — дети популярной певицы [character=188037]Ай Хосино[/character]. Им не составило труда начать карьеру и влиться в развлекательную индустрию, ведь они с самого начала являлись её частью. Пускай близнецы с рождения принадлежат миру грёз и им суждено стать идолами, знают ли они, что главное оружие в этой сфере — ложь, а яркий свет софитов скрывает тёмные стороны шоу-бизнеса? Чтобы выжить в этом блистательном мире и раскрыть главную тайну их матери, [character=185313]Аквамарину[/character] и [character=186921]Руби[/character] тоже придётся надеть маски и смиренно играть свои роли."
        },
        {
          "id": "40591",
          "name": "Kaguya-sama wa Kokurasetai? Tensai-tachi no Renai Zunousen",
          "russian": "Госпожа Кагуя: в любви как на войне 2",
          "season": "spring_2020",
          "poster": {
            "id": "772925",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/40591/e74f604780f111be25622ccb92393ed1.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/40591/preview-565c5a0ead668a6e5f360e4dad0df543.webp"
          },
          "genres": [
            {
              "id": "42",
              "name": "Seinen",
              "russian": "Сэйнэн",
              "kind": "demographic"
            },
            {
              "id": "4",
              "name": "Comedy",
              "russian": "Комедия",
              "kind": "genre"
            },
            {
              "id": "40",
              "name": "Psychological",
              "russian": "Психологическое",
              "kind": "theme"
            },
            {
              "id": "151",
              "name": "Romantic Subtext",
              "russian": "Романтический подтекст",
              "kind": "theme"
            },
            {
              "id": "23",
              "name": "School",
              "russian": "Школа",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "56",
              "name": "A-1 Pictures",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/56.?1434707196"
            }
          ],
          "description": "[[Трудолюбивый]] Миюки Сироганэ [白銀 御行] и первая красавица Кагуя Синомия [四宮 かぐや] — два общепризнанных гения престижной академии Сютин, возглавляющие её студсовет. Они по-прежнему ведут свою любовную войну, отрицая чувства к друг другу, ведь признание в их романтическом поединке означает поражение!\n\nОднако для текущего студсовета год подходит к концу. Пути товарищей разойдутся по разным классам, почти не оставив точек для пересечения. К тому же на горизонте возникает новый соперник на должность президента студсовета. Что будут делать ребята? И кто же наконец выйдет победителем в этой любовной войне?"
        },
        {
          "id": "54898",
          "name": "Bungou Stray Dogs 5th Season",
          "russian": "Великий из бродячих псов 5",
          "season": "summer_2023",
          "poster": {
            "id": "703354",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/54898/f95a69e5d289d4ccd718815c58284dbf.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/54898/preview-7fba2e55a6cc590bc9927ead0a8f769a.webp"
          },
          "genres": [
            {
              "id": "42",
              "name": "Seinen",
              "russian": "Сэйнэн",
              "kind": "demographic"
            },
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "7",
              "name": "Mystery",
              "russian": "Тайна",
              "kind": "genre"
            },
            {
              "id": "37",
              "name": "Supernatural",
              "russian": "Сверхъестественное",
              "kind": "genre"
            },
            {
              "id": "104",
              "name": "Adult Cast",
              "russian": "Взрослые персонажи",
              "kind": "theme"
            },
            {
              "id": "39",
              "name": "Detective",
              "russian": "Детектив",
              "kind": "theme"
            },
            {
              "id": "138",
              "name": "Organized Crime",
              "russian": "Организованная преступность",
              "kind": "theme"
            },
            {
              "id": "31",
              "name": "Super Power",
              "russian": "Супер сила",
              "kind": "theme"
            },
            {
              "id": "32",
              "name": "Vampire",
              "russian": "Вампиры",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "4",
              "name": "Bones",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/4.png?1311292711"
            }
          ],
          "description": null
        },
        {
          "id": "2001",
          "name": "Tengen Toppa Gurren Lagann",
          "russian": "Гуррен-Лаганн, пронзающий небеса",
          "season": "spring_2007",
          "poster": {
            "id": "774939",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/2001/1aa7b34352d8c4f787311a9ac490b4b6.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/2001/preview-9842c07cccacd31e9dc060ecb5dd0f98.webp"
          },
          "genres": [
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "2",
              "name": "Adventure",
              "russian": "Приключения",
              "kind": "genre"
            },
            {
              "id": "24",
              "name": "Sci-Fi",
              "russian": "Фантастика",
              "kind": "genre"
            },
            {
              "id": "114",
              "name": "Award Winning",
              "russian": "Удостоено наград",
              "kind": "theme"
            },
            {
              "id": "18",
              "name": "Mecha",
              "russian": "Меха",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "6",
              "name": "Gainax",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/6.png?1452689573"
            }
          ],
          "description": "В далёком будущем человечество живёт общинами глубоко под землёй в пещерах, не зная о мире на поверхности, о небе и звёздах. В одной из таких общин живут Симон [シモン] и его друг Камина [カミナ]. Вместе они называют себя «Гуррен-Дан» (досл. «Бригада Гуррен»). Камина мечтает покинуть пещеры и выбраться на поверхность, в существование которой верят немногие.\r\nСтарейшина деревни не верит в подобную ерунду и сурово наказывает членов «Бригады». Но всё меняется, когда Симон находит ключ от странного устройства, и одновременно с этим происходит обвал пещеры над деревней — всё поселение оказывается в опасности. Теперь Симону, Камине и девушке Ёко [ヨーコ・リットナー], пришедшей с поверхности, предстоит спасти деревню.\r\nТак начинается история о приключениях Симона и Камины в мире под открытым небом."
        },
        {
          "id": "28891",
          "name": "Haikyuu!! Second Season",
          "russian": "Волейбол!! 2",
          "season": "fall_2015",
          "poster": {
            "id": "715571",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/28891/0aef2e97db5ced169fc4593d893cc3b2.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/28891/preview-59578da95f7e56141d52bd462a372d00.webp"
          },
          "genres": [
            {
              "id": "27",
              "name": "Shounen",
              "russian": "Сёнен",
              "kind": "demographic"
            },
            {
              "id": "30",
              "name": "Sports",
              "russian": "Спорт",
              "kind": "genre"
            },
            {
              "id": "23",
              "name": "School",
              "russian": "Школа",
              "kind": "theme"
            },
            {
              "id": "102",
              "name": "Team Sports",
              "russian": "Командный спорт",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "10",
              "name": "Production I.G",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/10.png?1312165069"
            }
          ],
          "description": "Высоко подлетевший мяч с оглушительным грохотом коснулся пола волейбольной площадки. Этот звук ознаменовал горькое поражение. Где-то там, далеко за высокой сеткой, старшая школа Аоба Дзёсай ликовала. Кому теперь интересно, что всего два очка отделяли команду Карасуно от желанной победы?\r\nПосле проигрыша Хината [Shouyou Hinata] и Кагэяма [Tobio Kageyama] совсем расклеились. Однако вместе с тем полностью посвятили себя упорным тренировкам. Но как бы ни старались ребята стать сильнее, драгоценный опыт, в первую очередь необходимый для этого, можно приобрести лишь одним способом — играя против других команд. \r\nИ вот, как внезапно в дверях спортивного зала старшей школы Карасуно появляется неуклюжий куратор волейбольного клуба, так же внезапно у его участников появляется шанс сыграть на площадке большой столицы. Ведь знаменитая академия Фукуродани приглашает принять участие в своих тренировочных матчах! Но что еще лучше — в перспективе предвидятся новые грозные соперники, которые ни за какие коврижки не позволят расслабиться.\r\nКарасуно просто не может упустить такой шанс!"
        },
        {
          "id": "1535",
          "name": "Death Note",
          "russian": "Тетрадь смерти",
          "season": "fall_2006",
          "poster": {
            "id": "680687",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/1535/a938fe8507a89332b35d71f6883b8e88.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/1535/preview-0a02252ead28e3d1c198ec9be199018e.webp"
          },
          "genres": [
            {
              "id": "27",
              "name": "Shounen",
              "russian": "Сёнен",
              "kind": "demographic"
            },
            {
              "id": "37",
              "name": "Supernatural",
              "russian": "Сверхъестественное",
              "kind": "genre"
            },
            {
              "id": "117",
              "name": "Suspense",
              "russian": "Триллер",
              "kind": "genre"
            },
            {
              "id": "40",
              "name": "Psychological",
              "russian": "Психологическое",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "11",
              "name": "Madhouse",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/11.png?1457607773"
            }
          ],
          "description": "Изнывающий от скуки [[Синигами]] Рюк [リューク] бросает одну из своих Тетрадей смерти в мир людей. Просто так, потехи ради, посмотреть, что из этого выйдет.\r\nМежду тем, в Японии на школьной лужайке эту самую тетрадь находит Лайт Ягами [夜神月] — лучший ученик школы, сын полицейского. Заинтригованный инструкцией на обложке, он забирает тетрадь домой и пробует её в деле, вписав туда имя преступника. А вдруг сработает?\r\nВскоре весь мир замечает странные массовые смерти преступников, а в сети загадочного убийцу окрещают [[Кирой]].\r\nДля поимки Киры [夜神月] Интерпол привлекает легендарного детектива [character=71]L[/character], в одиночку раскрывавшего наиболее сложные и запутанные преступления. Кто такой [character=71]L[/character] на самом деле — не знает никто.\r\nОтныне в противостоянии Киры и [character=71]L[/character] предстоит победить тому, кто первым раскроет истинную личность противника и раньше оппонента нанесёт удар."
        },
        {
          "id": "34591",
          "name": "Natsume Yuujinchou Roku",
          "russian": "Тетрадь дружбы Нацумэ 6",
          "season": "spring_2017",
          "poster": {
            "id": "715778",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/34591/2c4e56d7b5711f34567f8f8d589dc28a.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/34591/preview-ce03ab44169470364255f3a65db50443.webp"
          },
          "genres": [
            {
              "id": "25",
              "name": "Shoujo",
              "russian": "Сёдзё",
              "kind": "demographic"
            },
            {
              "id": "36",
              "name": "Slice of Life",
              "russian": "Повседневность",
              "kind": "genre"
            },
            {
              "id": "37",
              "name": "Supernatural",
              "russian": "Сверхъестественное",
              "kind": "genre"
            },
            {
              "id": "140",
              "name": "Iyashikei",
              "russian": "Иясикэй",
              "kind": "theme"
            },
            {
              "id": "6",
              "name": "Mythology",
              "russian": "Мифология",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "1119",
              "name": "Shuka",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/1119.png?1589290644"
            }
          ],
          "description": "Шестой сезон «Тетради дружбы [[Нацумэ]]». Такаши Нацумэ, с детства обладающий способностью видеть призраков, всё так же продолжает хранить тайну «Тетради дружбы», защищая своих близких от многочисленных опасностей мира духов, и вместе со своим ленивым телохранителем Мадарой [斑] всё так же продолжает помогать заблудшим ёкаям, желающим вернуть давно потерянные в битве с его бабушкой Рэйко [夏目 レイコ] имена."
        },
        {
          "id": "22135",
          "name": "Ping Pong the Animation",
          "russian": "Пинг-понг",
          "season": "spring_2014",
          "poster": {
            "id": "728208",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/22135/1981f5acb19b8a7c1e68ba57cd23f808.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/22135/preview-2dd4f2cd30144b7ca54b2175d931aa5b.webp"
          },
          "genres": [
            {
              "id": "42",
              "name": "Seinen",
              "russian": "Сэйнэн",
              "kind": "demographic"
            },
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "30",
              "name": "Sports",
              "russian": "Спорт",
              "kind": "genre"
            },
            {
              "id": "114",
              "name": "Award Winning",
              "russian": "Удостоено наград",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "103",
              "name": "Tatsunoko Production",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/103.jpg?1311292713"
            }
          ],
          "description": "Замкнутый и тихий старшеклассник Макото Цукимото, по прозвищу [[Смайл]], с самого детства дружит с шумным и неугомонным Ютакой Хошино [星野 裕], по прозвищу [[Пэко]]. Оба они состоят в местном клубе настольного тенниса, и у обоих к нему прирождённый талант, но малопритязательный нрав Смайла [月本 誠] не позволяет ему выигрывать у Пэко [星野 裕]. Школьный тренер, однако, замечает несомненный дар Макото и решает помочь ему обрести волю к победе."
        },
        {
          "id": "35760",
          "name": "Shingeki no Kyojin Season 3",
          "russian": "Атака титанов 3",
          "season": "summer_2018",
          "poster": {
            "id": "727585",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/35760/af4885c4fb469216ccbeefc6bd504758.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/35760/preview-30a0a24804b5375f899e71092abb049c.webp"
          },
          "genres": [
            {
              "id": "27",
              "name": "Shounen",
              "russian": "Сёнен",
              "kind": "demographic"
            },
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "117",
              "name": "Suspense",
              "russian": "Триллер",
              "kind": "genre"
            },
            {
              "id": "105",
              "name": "Gore",
              "russian": "Жестокость",
              "kind": "theme"
            },
            {
              "id": "38",
              "name": "Military",
              "russian": "Военное",
              "kind": "theme"
            },
            {
              "id": "141",
              "name": "Survival",
              "russian": "Выживание",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "858",
              "name": "Wit Studio",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/858.png?1366652107"
            }
          ],
          "description": "Несколько сотен лет назад человечество было почти уничтожено титанами — огромными человекоподобными существами, которые не обладают интеллектом, но пожирают людей и, что хуже всего, делают это ради удовольствия, а не от чувства голода. Небольшой процент человечества выжил, возведя три высокие стены, окружившие мир людей, через которые не пройдут даже ужасные гиганты. Прошло два сезона, а титанам всё нет конца. В третьем же сезоне будет экранизирована арка «Восстание» оригинальной манги за авторством [person=11705]Хадзимэ Исаямы[/person].\r\nНаши герои возвращаются после важной миссии по возвращению [character=40882]Эрена[/character]. Но приехав в город, они сталкиваются с новой угрозой — высшим правительством. После убийства пастора [character=71453]Ника[/character] ситуация внутри стен заметно накаляется. Зная, что действия монархии сильно угрожают человечеству, [character=46496]Эрвин Смит[/character] начинает подготовку к свержению старого правительства, а после — назначению [character=62481]Кристы[/character] новой королевой."
        },
        {
          "id": "40748",
          "name": "Jujutsu Kaisen",
          "russian": "Магическая битва",
          "season": "fall_2020",
          "poster": {
            "id": "715656",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/40748/af4f2db18f17de4d7c6491f6f92cd9d9.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/40748/preview-cbcfc59fea8807193f7b225b6a2d8c65.webp"
          },
          "genres": [
            {
              "id": "27",
              "name": "Shounen",
              "russian": "Сёнен",
              "kind": "demographic"
            },
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "10",
              "name": "Fantasy",
              "russian": "Фэнтези",
              "kind": "genre"
            },
            {
              "id": "114",
              "name": "Award Winning",
              "russian": "Удостоено наград",
              "kind": "theme"
            },
            {
              "id": "23",
              "name": "School",
              "russian": "Школа",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "569",
              "name": "MAPPA",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/569.png?1351013196"
            }
          ],
          "description": "Действие аниме происходит в мире, где люди оказались вовсе не последним звеном в пищевой цепи, и любой ничего не подозревающий обыватель при должной доле невезения может оказаться съеденным демонами, которые воплощают собой негативные человеческие эмоции. Таких созданий называют проклятиями. Пускай люди в большинстве своём не догадываются о существовании проклятий, те имеют уже давнюю историю, одним из эпизодов которой являются деяния легендарного демона [character=175198]Сукуны Рёмэна[/character], которого с большим трудом удалось одолеть. Его тело было поделено на двадцать частей, которые оказались разбросаны по миру. Если найдётся некто, кто поглотит все фрагменты его плоти, то он обретёт мощь, способную уничтожить современную цивилизацию.\r\nВот такая сложилась ситуация в мире, где в полном неведении о нависшей над человечеством угрозе проживает старшеклассник Юдзи Итадори. У Юдзи совершенно иные заботы: он каждый день навещает дедушку в больнице и отбрыкивается от спортивных кружков, которые мечтают заполучить его из-за выдающейся физической силы и выносливости. Юдзи предпочёл вступить в клуб оккультных наук, с которого и начались все неприятности, когда в руки членов клуба попал таинственный предмет, на который наложено проклятье. Не долго думая, школьники разбили запечатывающее заклинание и выпустили на свет ужасные силы."
        },
        {
          "id": "36862",
          "name": "Made in Abyss Movie 3: Fukaki Tamashii no Reimei",
          "russian": "Созданный в Бездне: Рассвет глубокой души",
          "season": null,
          "poster": {
            "id": "779582",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/36862/92663c1040b9f639f1bc7f7a2ecfb978.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/36862/preview-685d6cd78826dd82120d9ff8779e5e1f.webp"
          },
          "genres": [
            {
              "id": "2",
              "name": "Adventure",
              "russian": "Приключения",
              "kind": "genre"
            },
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "10",
              "name": "Fantasy",
              "russian": "Фэнтези",
              "kind": "genre"
            },
            {
              "id": "7",
              "name": "Mystery",
              "russian": "Тайна",
              "kind": "genre"
            },
            {
              "id": "24",
              "name": "Sci-Fi",
              "russian": "Фантастика",
              "kind": "genre"
            },
            {
              "id": "105",
              "name": "Gore",
              "russian": "Жестокость",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "290",
              "name": "Kinema Citrus",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/290.?1450691180"
            }
          ],
          "description": "Продолжение эпического приключения [character=137239]Рико[/character] и [character=140046]Рэга[/character], к которым присоединяется их новый друг [character=140060]Нанати[/character]. Вместе они спускаются на пятый уровень Бездны, именуемый Морем Трупов, и сталкиваются с таинственным [character=151195]Бондрюдом[/character], легендарным Белым Свистком, который оставил тёмный след в тяжёлом прошлом [character=140060]Нанати[/character]. [character=151195]Бондрюд[/character] заискивающе гостеприимен, но храбрые искатели приключений знают, что в загадочной Бездне вещи не всегда являются тем, чем кажутся..."
        },
        {
          "id": "7311",
          "name": "Suzumiya Haruhi no Shoushitsu",
          "russian": "Исчезновение Харухи Судзумии",
          "season": null,
          "poster": {
            "id": "688411",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/7311/49e25fad4786892d1b61e4de1d029b65.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/7311/preview-df8716ea5b408db4b7f9922e2d6b3926.webp"
          },
          "genres": [
            {
              "id": "7",
              "name": "Mystery",
              "russian": "Тайна",
              "kind": "genre"
            },
            {
              "id": "24",
              "name": "Sci-Fi",
              "russian": "Фантастика",
              "kind": "genre"
            },
            {
              "id": "37",
              "name": "Supernatural",
              "russian": "Сверхъестественное",
              "kind": "genre"
            },
            {
              "id": "114",
              "name": "Award Winning",
              "russian": "Удостоено наград",
              "kind": "theme"
            },
            {
              "id": "23",
              "name": "School",
              "russian": "Школа",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "2",
              "name": "Kyoto Animation",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/2.png?1522422929"
            }
          ],
          "description": "Наступает середина декабря, и глава бригады [[SOS]] Судзумия Харухи [涼宮 ハルヒ] объявляет о том, что Рождество они проведут в комнате клуба за рождественским ужином. Все члены SOS начинают приготовления. \r\nСпустя пару дней по дороге в школу Кён начинает замечать странности: не вяжется разговор с Танигути, тот внезапно заболел и не помнит вчерашнего разговора. В классе нет Харухи, а Рёко Асакура ожила и сидит на её месте, разговаривая с Кёном как ни в чём не бывало. Микуру Асахина не узнает Кёна, а Нагато [長門 有希] – обычная девушка и единственный член литературного клуба.\r\nНи бригады SOS, ни Харухи в этой школе никогда не существовало..."
        },
        {
          "id": "42310",
          "name": "Cyberpunk: Edgerunners",
          "russian": "Киберпанк: Бегущие по краю",
          "season": null,
          "poster": {
            "id": "716215",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/42310/1d11ffc9eb86573319f03ea5c2d5c726.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/42310/preview-bca3c249348ddee32ae897dddc9c4b17.webp"
          },
          "genres": [
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "24",
              "name": "Sci-Fi",
              "russian": "Фантастика",
              "kind": "genre"
            },
            {
              "id": "105",
              "name": "Gore",
              "russian": "Жестокость",
              "kind": "theme"
            },
            {
              "id": "138",
              "name": "Organized Crime",
              "russian": "Организованная преступность",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "803",
              "name": "Trigger",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/803.png?1356241771"
            }
          ],
          "description": "Найт-Сити — город будущего, оснащённый всевозможными новейшими технологиями. Город, где модификация тела не просто мечты безумных учёных, а реальность сродни обычной покупке. Именно там живёт наш юный герой, для которого этот город не является чем-то невообразимым, он знает всю его настоящую суть, где выживание не просто слово, а истинное лицо этого мира. В один миг потеряв всё, что имел, парень не опускает рук и в борьбе за выживание становится киберпанком — городским наёмником вне закона."
        },
        {
          "id": "52701",
          "name": "Dungeon Meshi",
          "russian": "Подземелье вкусностей",
          "season": "winter_2024",
          "poster": {
            "id": "724435",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/52701/f1f3c36cc1695a5adba4bf3477266f0d.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/52701/preview-68b0df9b2e7d0971094b18c6190a0c5d.webp"
          },
          "genres": [
            {
              "id": "42",
              "name": "Seinen",
              "russian": "Сэйнэн",
              "kind": "demographic"
            },
            {
              "id": "2",
              "name": "Adventure",
              "russian": "Приключения",
              "kind": "genre"
            },
            {
              "id": "4",
              "name": "Comedy",
              "russian": "Комедия",
              "kind": "genre"
            },
            {
              "id": "10",
              "name": "Fantasy",
              "russian": "Фэнтези",
              "kind": "genre"
            },
            {
              "id": "543",
              "name": "Gourmet",
              "russian": "Гурман",
              "kind": "genre"
            }
          ],
          "studios": [
            {
              "id": "803",
              "name": "Trigger",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/803.png?1356241771"
            }
          ],
          "description": "«Голод не тётка — пирожка не поднесёт» — эту истину не понаслышке знает любой авантюрист, бывающий в подземелье и вынужденный таскать с собой огромный запас провианта. Это довольно серьёзная проблема, ведь количество еды полностью диктует длительность путешествия. Мало того, в подземелье на каждом шагу встречаются опасности и кровожадные монстры, готовые слопать зазевавшегося искателя приключений вместе с потрохами, снаряжением и товарищами. В таких условиях чаще приходится беспокоиться не о еде, а о том, чтобы не стать ею.\r\n\r\nИменно эта напасть случилась с сестрой [character=134262]Лая Тордена[/character], [character=134266]Фалин[/character], угодившей в пасть дракона. К счастью, маги-воскресители работают исправно, так что [character=134266]Фалин[/character] вполне можно спасти, но действовать необходимо в большой спешке. Понимая, что нужно торопиться, [character=134262]Лай[/character], едва выведя свой отряд наружу, отправился назад, приняв решение не тратить время на закупку продовольствия.\r\n\r\nВполне логично, вот только сестроядный дракон обитает аж на третьем этаже подземелья. Путь туда неблизкий, а оздоровительное голодание в условиях постоянных сражений не вариант. Что же делать? Ответ прост: пора осознать, что необязательно любить монстров, главное — уметь их правильно готовить!"
        },
        {
          "id": "19647",
          "name": "Hajime no Ippo: Rising",
          "russian": "Первый шаг: Восхождение",
          "season": "fall_2013",
          "poster": {
            "id": "776384",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/19647/dfb7fd00fb451904beeb77737857d4e9.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/19647/preview-ed3ade4476ffb55bbc3e0f6ba88bb66a.webp"
          },
          "genres": [
            {
              "id": "27",
              "name": "Shounen",
              "russian": "Сёнен",
              "kind": "demographic"
            },
            {
              "id": "30",
              "name": "Sports",
              "russian": "Спорт",
              "kind": "genre"
            },
            {
              "id": "118",
              "name": "Combat Sports",
              "russian": "Спортивные единоборства",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "11",
              "name": "Madhouse",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/11.png?1457607773"
            },
            {
              "id": "569",
              "name": "MAPPA",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/569.png?1351013196"
            }
          ],
          "description": "[character=15]Иппо[/character] продолжает безустанно заниматься боксом, делая всё новые успехи. Противники становятся всё сильнее и сильнее, но юный боксёр не сдается. [character=15]Иппо[/character] ждут суровые испытания: приемом Дэмпси уже никого не удивишь, и это становится очевидным. Молодой герой зала Камогава выходит на ринг и дерется используя все, что у него есть: силу, выносливость и решительность. Останется ли он чемпионом, или найдется более достойный, покажет время.\r\nТакамура [Mamoru Takamura] наконец переходит в первый средний,стремясь стать чемпионом мира. Нынешним соперником становится, как водится, американец: Дэвид Игл[David Eagle]. Сумеет ли Такамура[Mamoru Takamura] получить второй пояс?\r\nАоки[Masaru Aoki] и Кимура [Tatsuya Kimura] тоже не сидят сложа руки и продолжают бороться за пояс, а Итагаки [Manabu Itagaki] участвует в своем первом турнире.\r\nСмогут ли добиться поставленных целей наши герои?"
        },
        {
          "id": "40456",
          "name": "Kimetsu no Yaiba Movie: Mugen Ressha-hen",
          "russian": "Клинок, рассекающий демонов: Бесконечный поезд. Фильм",
          "season": null,
          "poster": {
            "id": "668732",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/40456/a7e4b07face11a916fdc81ed7841080e.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/40456/preview-2221ffdaf90c6d811482eaaf97f40e58.webp"
          },
          "genres": [
            {
              "id": "27",
              "name": "Shounen",
              "russian": "Сёнен",
              "kind": "demographic"
            },
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "10",
              "name": "Fantasy",
              "russian": "Фэнтези",
              "kind": "genre"
            },
            {
              "id": "13",
              "name": "Historical",
              "russian": "Исторический",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "43",
              "name": "ufotable",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/43.png?1311292714"
            }
          ],
          "description": "Не успели герои восстановиться, как вновь получают задание. В этот раз под предводительством «столпа пламени» [character=151143]Кёдзюро Рэнгоку[/character] они попадают в поезд, в котором за короткий промежуток времени пропало более сорока человек и было убито несколько отправленных на разведку мечников. Какую тайну скрывает этот поезд и с чем придётся столкнуться новому отряду?"
        },
        {
          "id": "28957",
          "name": "Mushishi Zoku Shou: Suzu no Shizuku",
          "russian": "Мастер муси: Следующая глава — Капли колокольчиков",
          "season": null,
          "poster": {
            "id": "459529",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/28957/7925197aa202915b9b896b9900632e2c.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/28957/preview-9af9b5a8a359b3fd760c63a37d44ca90.webp"
          },
          "genres": [
            {
              "id": "42",
              "name": "Seinen",
              "russian": "Сэйнэн",
              "kind": "demographic"
            },
            {
              "id": "2",
              "name": "Adventure",
              "russian": "Приключения",
              "kind": "genre"
            },
            {
              "id": "7",
              "name": "Mystery",
              "russian": "Тайна",
              "kind": "genre"
            },
            {
              "id": "36",
              "name": "Slice of Life",
              "russian": "Повседневность",
              "kind": "genre"
            },
            {
              "id": "37",
              "name": "Supernatural",
              "russian": "Сверхъестественное",
              "kind": "genre"
            },
            {
              "id": "104",
              "name": "Adult Cast",
              "russian": "Взрослые персонажи",
              "kind": "theme"
            },
            {
              "id": "13",
              "name": "Historical",
              "russian": "Исторический",
              "kind": "theme"
            },
            {
              "id": "140",
              "name": "Iyashikei",
              "russian": "Иясикэй",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "8",
              "name": "Artland",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/8.gif?1312165056"
            }
          ],
          "description": "В местах, богатых урожаем, где пролегает Жила Света, необходимо присутствие хранителя горы — существа, которое поддерживает баланс. Хранителями обычно становятся животные, но бывают редкие случаи, когда хранителем выбирают человека. Жизнь таких людей коротка, и со временем они теряют разум, полностью поддаваясь зову муси.\r\nВ одном из путешествий Гинко [Ginko] сталкивается с этим необычным явлением. Он встречает хранителя-человека, девочку четырнадцати лет, жизнь которой уже подходит к концу. И её брата, который уже давно ищет свою сестру. Гинко придётся решить: спасёт ли он человека, нарушив естественный ход событий и подвергнет опасности гору и всех существ там обитающих, или же оставит всё как есть."
        },
        {
          "id": "38329",
          "name": "Seishun Buta Yarou wa Yumemiru Shoujo no Yume wo Minai",
          "russian": "Этот глупый свин не понимает мечту девочки-мечтательницы",
          "season": null,
          "poster": {
            "id": "716175",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/38329/e36e47fb091ca68325f9b2836b5f9177.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/38329/preview-94822703c1ea6c51ab5d3667295f704f.webp"
          },
          "genres": [
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "22",
              "name": "Romance",
              "russian": "Романтика",
              "kind": "genre"
            },
            {
              "id": "37",
              "name": "Supernatural",
              "russian": "Сверхъестественное",
              "kind": "genre"
            },
            {
              "id": "23",
              "name": "School",
              "russian": "Школа",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "1835",
              "name": "CloverWorks",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/1835.png?1545379956"
            }
          ],
          "description": "Фудзисава, яркое небо, блестящее на солнце море... Чего ещё может желать второкурсник старшей школы Сакута Адзусагава, проводящий блаженные дни в компании своей подруги Маи Сакурадзимы [桜島 麻衣]? Наверное, всё что угодно, но точно не встречи с Сёко Макинохарой [牧之原 翔子], своей первой любовью. Кроме того, странные обстоятельства сталкивают парня с двумя Сёко: школьницей и взрослой женщиной.\r\nПоскольку в жизни Сакута оказывается беспомощным с Сёко-школьницей, взрослая её версия начинает водить его за нос, тем самым внося разлад в его отношения с Маи.\r\nПосреди этих событий он обнаруживает, что Сёко в старшей школе страдает от тяжёлой болезни, и его рана вновь начинает кровоточить..."
        },
        {
          "id": "3786",
          "name": "Shin Evangelion Movie: ||",
          "russian": "Евангелион 3.0+1.01: Как-то раз",
          "season": null,
          "poster": {
            "id": "727537",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/3786/eb7e1ac5be7bed731bb682d61eac5f0c.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/3786/preview-d35a85711134b8df3f7e0583ce9ae188.webp"
          },
          "genres": [
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "24",
              "name": "Sci-Fi",
              "russian": "Фантастика",
              "kind": "genre"
            },
            {
              "id": "117",
              "name": "Suspense",
              "russian": "Триллер",
              "kind": "genre"
            },
            {
              "id": "114",
              "name": "Award Winning",
              "russian": "Удостоено наград",
              "kind": "theme"
            },
            {
              "id": "18",
              "name": "Mecha",
              "russian": "Меха",
              "kind": "theme"
            },
            {
              "id": "40",
              "name": "Psychological",
              "russian": "Психологическое",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "47",
              "name": "Khara",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/47.jpg?1311292710"
            }
          ],
          "description": "Оставшись после Четвёртого удара без своих Евангелионов, [character=89]Синдзи[/character], [character=94]Аска[/character] и [character=162259]Рей[/character] находят убежище в одном из редких очагов человечества, которые всё ещё существуют на полуразрушенной Земле. Там каждый из них живёт своей жизнью, совсем не похожей на ту, которая была у них, когда они были пилотами Евы. Однако опасность для мира не миновала. На горизонте маячит новый Удар — тот, который окажется истинным концом Евангелиона. Наконец, запущен проект совершенствования человечества, и теперь Wille предстоит финальный изнурительный бой, чтобы предотвратить Последний удар."
        },
        {
          "id": "33",
          "name": "Kenpuu Denki Berserk",
          "russian": "Берсерк",
          "season": "fall_1997",
          "poster": {
            "id": "683740",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/33/e2be8b25a1cf6b570a73826f66e23abb.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/33/preview-6b36df039dae49cac8fc715d019d6908.webp"
          },
          "genres": [
            {
              "id": "42",
              "name": "Seinen",
              "russian": "Сэйнэн",
              "kind": "demographic"
            },
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "2",
              "name": "Adventure",
              "russian": "Приключения",
              "kind": "genre"
            },
            {
              "id": "8",
              "name": "Drama",
              "russian": "Драма",
              "kind": "genre"
            },
            {
              "id": "10",
              "name": "Fantasy",
              "russian": "Фэнтези",
              "kind": "genre"
            },
            {
              "id": "14",
              "name": "Horror",
              "russian": "Ужасы",
              "kind": "genre"
            },
            {
              "id": "105",
              "name": "Gore",
              "russian": "Жестокость",
              "kind": "theme"
            },
            {
              "id": "38",
              "name": "Military",
              "russian": "Военное",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "28",
              "name": "OLM",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/28.png?1523482474"
            }
          ],
          "description": "Отважный молодой воин Гатс [ガッツ] испытывает судьбу в качестве наёмника на передовой. Роковая встреча сводит Гатса с харизматичным и беспощадным юношей по имени Гриффит [グリフィス]. Возглавляя непобедимый отряд, известный как «Банда Ястреба», Гриффит владеет грозной силой, несравнимой ни с чем. Движимые стремлением к статусу, «ястребы» проявляют невиданную доселе доблесть в военных делах и выдержку в делах политических. Армии Мидланда содрогнутся в страхе, когда Гриффит и Гатс вступят на путь, на котором им суждено поставить мир на колени."
        },
        {
          "id": "4565",
          "name": "Tengen Toppa Gurren Lagann Movie 2: Lagann-hen",
          "russian": "Гуррен-Лаганн: Звёздный свет",
          "season": null,
          "poster": {
            "id": "777587",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/4565/3e6ebff4dc853437fac812cf5a0af77b.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/4565/preview-8306b0491d7bf26f9266337f4bf085aa.webp"
          },
          "genres": [
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "24",
              "name": "Sci-Fi",
              "russian": "Фантастика",
              "kind": "genre"
            },
            {
              "id": "18",
              "name": "Mecha",
              "russian": "Меха",
              "kind": "theme"
            },
            {
              "id": "29",
              "name": "Space",
              "russian": "Космос",
              "kind": "theme"
            },
            {
              "id": "31",
              "name": "Super Power",
              "russian": "Супер сила",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "6",
              "name": "Gainax",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/6.png?1452689573"
            }
          ],
          "description": "[character=5118]Спиральный король[/character] повержен и ничто более не угрожает человечеству, по крайней мере, большинство так считает.\r\nГуррен-Дан расформировывают за ненадобностью, а его бывшие члены становятся всеобщими героями и кумирами, многие из них входят в новое мировое правительство.\r\nПроходит семь лет. Человечество во главе с Симоном [シモン], Нией [ニア・テッペリン] и Россиу [ロシウ・アダイ] за эти годы совершает невозможное: полностью возвращает себе контроль над Землёй, повсеместно нанося поражения зверолюдям, отстраивает города, восстанавливает утраченные технологии древности и начинает первые полёты в космос. Население планеты вплотную приближается к одному миллиону человек.\r\nВсе эти годы Симону [シモン] и Россиу не даёт покоя предсмертное пророчество Лордгенома [ロージェノム] о катастрофе, которая наступит при достижении численности населения на поверхности в один миллион человек, и о роли Луны в этой катастрофе. Для разрешения этой загадки на Луну отправляют беспилотный зонд...\r\nКто знает, что произойдёт дальше... Возможно, Гуррен-Дану вновь суждено будет собраться и уже во второй раз спасти человечество, теперь уже от полного уничтожения...\r\n[i]Краткий пересказ событий аниме-сериала «[anime=2001]Гуррен-Лаганн, пронзающий небеса[/anime]» с 16-го по 27-й эпизоды с добавлением некоторых новых сцен и диалогов.[/i]"
        },
        {
          "id": "37991",
          "name": "JoJo no Kimyou na Bouken Part 5: Ougon no Kaze",
          "russian": "Невероятное приключение ДжоДжо: Золотой ветер",
          "season": "fall_2018",
          "poster": {
            "id": "467960",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/37991/68277a64655049fc9b24825a5c7a7019.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/37991/preview-aac7bbf61877024663ac418b12152b66.webp"
          },
          "genres": [
            {
              "id": "27",
              "name": "Shounen",
              "russian": "Сёнен",
              "kind": "demographic"
            },
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "2",
              "name": "Adventure",
              "russian": "Приключения",
              "kind": "genre"
            },
            {
              "id": "37",
              "name": "Supernatural",
              "russian": "Сверхъестественное",
              "kind": "genre"
            },
            {
              "id": "138",
              "name": "Organized Crime",
              "russian": "Организованная преступность",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "287",
              "name": "David Production",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/287.jpg?1311292711"
            }
          ],
          "description": "События новой части «Невероятных приключений ДжоДжо» развернутся в Италии 2001 года.\r\nДжорно Джованна — молодой амбициозный парень, живущий в школе-интернате и промышляющий мелким мошенничеством. Юноша, будучи сыном [character=4004]Дио Брандо[/character], вобрал в себя как хладнокровие отца, так и пылкое, переполненное решимостью сердце Джостаров.\r\nДжорно решает вступить в мафиозную семью «Пассионе», как только встречает её члена — Бруно Буччеллати, чтобы пробиться в ней к вершине власти. В составе команды Буччеллати новоиспечённому гангстеру предстоит найти выход из самых неординарных ситуаций, выполняя крайне ответственное поручение лично от босса семьи.\r\nМножество опасных обладателей стендов станут препятствием на пути команды к успеху и героя к исполнению его «золотой» мечты — возглавить мафиозную группировку и ограничить её преступную деятельность."
        },
        {
          "id": "31757",
          "name": "Kizumonogatari II: Nekketsu-hen",
          "russian": "Истории ран. Часть 2: Горячая кровь",
          "season": null,
          "poster": {
            "id": "464799",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/31757/5477ad6029df5e57596b00809a8f8e2e.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/31757/preview-5123dac044024669db49ff3aa06f1d13.webp"
          },
          "genres": [
            {
              "id": "1",
              "name": "Action",
              "russian": "Экшен",
              "kind": "genre"
            },
            {
              "id": "7",
              "name": "Mystery",
              "russian": "Тайна",
              "kind": "genre"
            },
            {
              "id": "37",
              "name": "Supernatural",
              "russian": "Сверхъестественное",
              "kind": "genre"
            },
            {
              "id": "32",
              "name": "Vampire",
              "russian": "Вампиры",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "44",
              "name": "Shaft",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/44.png?1503215283"
            }
          ],
          "description": "Вторая часть из серии полнометражных фильмов «Истории ран».\r\nПосле договора, заключенного с Мэмэ Осино, Арараги [阿良々木 暦] необходимо победить трех специалистов ([Драматург], [Эпизод], [character=42364 палач]), с каждым из которых он должен сразиться один на один, чтобы вернуть прежнюю силу Киссшот Ацеролаорион Хартандерблэйд и снова стать человеком. Но Арараги терзают сомнения: выполнит ли Киссшот свою часть сделки? И как разобраться с надоедливой Ханэкавой [羽川 翼], которая так и норовит встретиться с вампирами и лезет не в свои дела?\r\nФильм продолжает раскрывать некоторые подробности из прошлого героев: Киссшот до становления тенью себя самой и то, как познакомились Арараги и Ханэкава."
        },
        {
          "id": "32983",
          "name": "Natsume Yuujinchou Go",
          "russian": "Тетрадь дружбы Нацумэ 5",
          "season": "fall_2016",
          "poster": {
            "id": "715467",
            "originalUrl": "https://desu.shikimori.one/uploads/poster/animes/32983/51064590ef71edca20a99aa02a1dd62e.jpeg",
            "previewUrl": "https://desu.shikimori.one/uploads/poster/animes/32983/preview-70749b74d080e94df8e2c9fefd7a48bd.webp"
          },
          "genres": [
            {
              "id": "25",
              "name": "Shoujo",
              "russian": "Сёдзё",
              "kind": "demographic"
            },
            {
              "id": "36",
              "name": "Slice of Life",
              "russian": "Повседневность",
              "kind": "genre"
            },
            {
              "id": "37",
              "name": "Supernatural",
              "russian": "Сверхъестественное",
              "kind": "genre"
            },
            {
              "id": "140",
              "name": "Iyashikei",
              "russian": "Иясикэй",
              "kind": "theme"
            },
            {
              "id": "6",
              "name": "Mythology",
              "russian": "Мифология",
              "kind": "theme"
            }
          ],
          "studios": [
            {
              "id": "1119",
              "name": "Shuka",
              "imageUrl": "https://desu.shikimori.one/system/studios/original/1119.png?1589290644"
            }
          ],
          "description": "Продолжение истории Такаши Нацумэ, с раннего детства имеющего способность видеть духов. Нацумэ вместе со своим верным и пушистым телохранителем Нянко [斑] продолжает возвращать имена из «Тетради дружбы» своей бабушки Рэйко [夏目 レイコ], узнавая с каждым разом всё больше и больше о её необычной жизни, и вместе с этим всё глубже и сильнее погружаясь в таинственный и загадочный мир ёкаев, незаметно существующий для остальных людей и временами, как часто выясняется, с ними тесно пересекающийся."
        }
      
    ]
  
     const animeData = prepareAnimeData(animeList);
     
     async function main() {
       try {
         console.log(`Start seeding ...`)
         
         for (const anime of animeData) {
           // Проверяем существование записи перед созданием
           const exists = await prisma.anime.findUnique({
             where: { slug: anime.slug }
           })
           
           if (!exists) {
             await prisma.anime.create({
               data: anime
             })
           } else {
             console.log(`Anime with slug ${anime.slug} already exists, skipping...`)
           }
         }
         
         console.log(`Seeding finished.`)
       } catch (error) {
         console.error('Error during seeding:', error)
         throw error
       } finally {
         await prisma.$disconnect()
       }
     }
     
     main()
       .catch((error) => {
         console.error(error)
         process.exit(1)
       })