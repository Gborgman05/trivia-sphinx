// Study content for "Beat the Geek" trivia night.
// Categories confirmed from the Sep. 29, 2026 event listing at Juanita Cantina (Ben, 7:30pm):
// Blue Stuff, Mythological Human Hybrids, Pictures – Watercolor Cinema,
// Music – 2000s Women Musicians, and Forget About It. Bonus: A "prickle" is a group of what animals?
// The picture round (Pictures – Watercolor Cinema, always round 3 at this venue) is intentionally
// omitted below — there's no way to predict the exact image, so it can't be turned into
// fact-checked Q&A. This is the curated 120-question set (30 per remaining round) from
// trivia-2026-09-29-juanita-cantina.csv, generated via .claude/commands/weekly-trivia.md.
// difficulty preserves the CSV's bar-trivia tiers: "easy-medium" | "medium" | "medium-hard".

const CATEGORIES = [
  {
    "id": "blue-stuff",
    "name": "Blue Stuff",
    "shortName": "Blue Stuff",
    "blurb": "Everything blue — nature, chemistry, art, geography, pop culture, and the science of why things look blue. Bar trivia loves the iconic hits (blue whale, indigo jeans, Blue Man Group) but also pulls from pigment history and structural coloration.",
    "infoBox": "<strong>How to use this:</strong> learn both the straightforward facts (largest animal, which planet looks blue) and the slightly deeper ones (Rayleigh scattering, lapis lazuli, structural vs. pigment color). Questions often hinge on a specific detail in the clue — the gemstone, the protein, the artist.",
    "type": "quiz",
    "items": [
      {
        "q": "What is the largest animal known to have ever lived?",
        "a": "Blue whale",
        "difficulty": "easy-medium",
        "notes": "Adults can exceed 100 feet and 150 metric tons."
      },
      {
        "q": "Which planet, the farthest from the Sun, is known for its deep-blue appearance and supersonic winds?",
        "a": "Neptune",
        "difficulty": "medium",
        "notes": "Methane and atmospheric scattering contribute to Neptune's blue appearance; Uranus is the next planet inward."
      },
      {
        "q": "What scattering process makes Earth's daytime sky appear blue?",
        "a": "Rayleigh scattering",
        "difficulty": "medium",
        "notes": "Shorter blue wavelengths are scattered more strongly by air molecules."
      },
      {
        "q": "The prized ultramarine pigment was historically made by grinding what blue gemstone?",
        "a": "Lapis lazuli",
        "difficulty": "medium-hard",
        "notes": "Natural ultramarine was once more expensive than gold."
      },
      {
        "q": "Which chemical element, atomic number 27, gives many blue glasses and ceramic glazes their characteristic color?",
        "a": "Cobalt",
        "difficulty": "medium",
        "notes": "Compounds of this element have colored glass blue since antiquity."
      },
      {
        "q": "What early modern synthetic blue pigment was discovered accidentally in Berlin around 1706?",
        "a": "Prussian blue",
        "difficulty": "medium-hard",
        "notes": "It was the first modern synthetic pigment."
      },
      {
        "q": "What plant-derived dye gave blue jeans their traditional color?",
        "a": "Indigo",
        "difficulty": "easy-medium",
        "notes": "Modern denim usually uses synthetic indigo."
      },
      {
        "q": "The brilliant blue of a morpho butterfly's wings comes mainly from pigment or microscopic structure?",
        "a": "Microscopic structure (structural coloration)",
        "difficulty": "medium",
        "notes": "Wing scales reflect and interfere with light to produce the color."
      },
      {
        "q": "Male members of what Galápagos seabird use their bright blue feet in courtship displays?",
        "a": "Blue-footed booby",
        "difficulty": "easy-medium",
        "notes": "Bluer feet can signal better condition to potential mates."
      },
      {
        "q": "The blue color in a blue jay's feathers is produced mainly by what optical phenomenon?",
        "a": "Structural coloration",
        "difficulty": "medium-hard",
        "notes": "The feathers contain no blue pigment; nanostructures scatter blue light."
      },
      {
        "q": "What marine animal flashes iridescent blue rings when threatened and carries tetrodotoxin?",
        "a": "Blue-ringed octopus",
        "difficulty": "medium",
        "notes": "Its venom can cause paralysis and has no known antivenom."
      },
      {
        "q": "What genus of mold creates the blue-green veins in blue cheeses such as Roquefort?",
        "a": "Penicillium",
        "difficulty": "easy-medium",
        "notes": "Species such as Penicillium roqueforti create the characteristic veins and flavor."
      },
      {
        "q": "Blue Curaçao liqueur is traditionally flavored with the peel of what type of fruit?",
        "a": "Laraha orange",
        "difficulty": "medium-hard",
        "notes": "Laraha is a bitter citrus associated with Curaçao."
      },
      {
        "q": "The Blue Nile flows from Lake Tana in what country?",
        "a": "Ethiopia",
        "difficulty": "medium",
        "notes": "It joins the White Nile at Khartoum, Sudan."
      },
      {
        "q": "What natural compounds released by trees help create the bluish haze of the Blue Ridge Mountains?",
        "a": "Isoprene (hydrocarbons)",
        "difficulty": "medium-hard",
        "notes": "The compounds form aerosols that scatter blue light."
      },
      {
        "q": "In common North American usage, what is a 'blue moon'?",
        "a": "The second full moon in a calendar month",
        "difficulty": "easy-medium",
        "notes": "An older seasonal definition also exists."
      },
      {
        "q": "What deep-blue copper carbonate mineral, often found with green malachite, was historically ground into pigment?",
        "a": "Azurite",
        "difficulty": "medium",
        "notes": "Azurite has the formula Cu3(CO3)2(OH)2."
      },
      {
        "q": "The 'Blue Screen of Death' is an error screen associated with what operating-system family?",
        "a": "Microsoft Windows",
        "difficulty": "easy-medium",
        "notes": "It appears after a critical system error."
      },
      {
        "q": "So-called blue laws traditionally restrict commerce or activities on what day of the week?",
        "a": "Sunday",
        "difficulty": "medium",
        "notes": "Many historically limited Sunday alcohol sales or business hours."
      },
      {
        "q": "What copper-containing protein makes horseshoe crab blood appear blue?",
        "a": "Hemocyanin",
        "difficulty": "medium-hard",
        "notes": "Hemocyanin transports oxygen using copper rather than iron."
      },
      {
        "q": "What medical term describes bluish skin or lips caused by insufficient oxygen in the blood?",
        "a": "Cyanosis",
        "difficulty": "medium",
        "notes": "The word derives from Greek for dark blue."
      },
      {
        "q": "What blue-white star in Orion marks the hunter's left foot or knee?",
        "a": "Rigel",
        "difficulty": "medium",
        "notes": "Rigel is a luminous blue supergiant system."
      },
      {
        "q": "Which French artist developed an intense ultramarine paint using a synthetic-resin binder and registered its process in a 1960 Soleau envelope?",
        "a": "Yves Klein",
        "difficulty": "medium-hard",
        "notes": "The paint became known as International Klein Blue; the registration established priority but was not a patent on the color itself."
      },
      {
        "q": "Blue sapphire and ruby are color varieties of what mineral?",
        "a": "Corundum",
        "difficulty": "medium",
        "notes": "Trace elements produce their different colors."
      },
      {
        "q": "What astaxanthin-binding shell protein is overproduced in many unusually blue American lobsters?",
        "a": "Crustacyanin",
        "difficulty": "medium-hard",
        "notes": "Crustacyanin binding shifts red astaxanthin toward blue; heat denatures the protein and reveals the red pigment."
      },
      {
        "q": "What performance-art trio is famous for bald blue-painted characters and percussion-heavy shows?",
        "a": "Blue Man Group",
        "difficulty": "easy-medium",
        "notes": "The group began performing in New York in the late 1980s."
      },
      {
        "q": "Which jazz trumpeter released the landmark 1959 album Kind of Blue?",
        "a": "Miles Davis",
        "difficulty": "easy-medium",
        "notes": "The album features John Coltrane and Cannonball Adderley."
      },
      {
        "q": "What 1986 David Lynch mystery film stars Isabella Rossellini as nightclub singer Dorothy Vallens?",
        "a": "Blue Velvet",
        "difficulty": "medium",
        "notes": "Its title comes from the song featured in the film."
      },
      {
        "q": "Which Picasso period, roughly 1901–1904, is known for somber paintings dominated by cool colors?",
        "a": "The Blue Period",
        "difficulty": "easy-medium",
        "notes": "Poverty and melancholy are recurring subjects."
      },
      {
        "q": "What children's television dog leaves paw-print clues for viewers to solve?",
        "a": "Blue (from Blue's Clues)",
        "difficulty": "easy-medium",
        "notes": "The Nickelodeon series premiered in 1996."
      }
    ]
  },
  {
    "id": "mythological-hybrids",
    "name": "Mythological Human Hybrids",
    "shortName": "Hybrids",
    "blurb": "Creatures that combine human and animal (or other) parts across Greek, Roman, Egyptian, Hindu, Mesopotamian, and other traditions. Know the canonical form of each — artistic depictions vary by era and culture.",
    "infoBox": "<strong>How to use this:</strong> focus on the body-part combo in the clue (human + horse, human + bull head, human + fish tail). Many answers are Greek, but Egyptian gods and Mesopotamian lamassu show up too. Note when a creature's ancient form differs from its modern image (sirens, satyrs, Scylla).",
    "type": "quiz",
    "items": [
      {
        "q": "What Greek mythological creature has a human upper body and a horse's lower body?",
        "a": "Centaur",
        "difficulty": "easy-medium",
        "notes": "Chiron is the best-known wise centaur."
      },
      {
        "q": "What Cretan monster had a man's body and a bull's head?",
        "a": "Minotaur",
        "difficulty": "easy-medium",
        "notes": "Theseus killed it in the Labyrinth."
      },
      {
        "q": "What male nature spirit and companion of Dionysus had horse ears and a horse tail in early Greek art?",
        "a": "Satyr",
        "difficulty": "easy-medium",
        "notes": "Goat features became common later, partly through association with Pan and Roman fauns."
      },
      {
        "q": "What Roman nature spirit, counterpart to the Greek satyr, is part human and part goat?",
        "a": "Faun",
        "difficulty": "medium",
        "notes": "Faunus is the Roman woodland god behind the name."
      },
      {
        "q": "What legendary aquatic being has a woman's upper body and a fish's tail?",
        "a": "Mermaid",
        "difficulty": "easy-medium",
        "notes": "The male counterpart is a merman."
      },
      {
        "q": "In early Greek art, what dangerous singers were depicted as women with birds' bodies?",
        "a": "Sirens",
        "difficulty": "medium",
        "notes": "Their later fish-tailed image differs from the ancient Greek form."
      },
      {
        "q": "What Greek creatures have women's heads and torsos with birds' wings and claws?",
        "a": "Harpies",
        "difficulty": "medium",
        "notes": "Their name is associated with snatching or carrying away."
      },
      {
        "q": "What riddle-posing monster has a human head, lion's body, and bird's wings?",
        "a": "Sphinx",
        "difficulty": "easy-medium",
        "notes": "Oedipus answered its famous riddle."
      },
      {
        "q": "What Greek monster was a woman from the waist up and a serpent below, and mothered many monsters with Typhon?",
        "a": "Echidna",
        "difficulty": "medium-hard",
        "notes": "Her children include Cerberus and the Hydra."
      },
      {
        "q": "What serpent-human beings appear in Hindu and Buddhist traditions?",
        "a": "Nagas",
        "difficulty": "medium",
        "notes": "They are often associated with water and subterranean realms."
      },
      {
        "q": "What Hindu deity has a human body and an elephant's head?",
        "a": "Ganesha",
        "difficulty": "easy-medium",
        "notes": "He is widely revered as a remover of obstacles."
      },
      {
        "q": "What Egyptian god of embalming is commonly shown with a human body and jackal head?",
        "a": "Anubis",
        "difficulty": "easy-medium",
        "notes": "He guided and protected the dead."
      },
      {
        "q": "What Egyptian sky god is commonly depicted with a human body and falcon head?",
        "a": "Horus",
        "difficulty": "medium",
        "notes": "The Eye of Horus became a symbol of protection."
      },
      {
        "q": "What ibis-headed Egyptian god is associated with writing and wisdom?",
        "a": "Thoth",
        "difficulty": "medium",
        "notes": "He was also linked with the moon and reckoning of time."
      },
      {
        "q": "What Hindu divine hero is commonly portrayed with monkey-like features and is devoted to Rama?",
        "a": "Hanuman",
        "difficulty": "easy-medium",
        "notes": "He is a central figure in the Ramayana."
      },
      {
        "q": "What Greek god of shepherds has a man's torso, goat legs, and horns?",
        "a": "Pan",
        "difficulty": "easy-medium",
        "notes": "The word panic derives from his name."
      },
      {
        "q": "What snake-haired women of Greek myth included Medusa?",
        "a": "Gorgons",
        "difficulty": "medium",
        "notes": "Medusa alone among the three sisters was mortal."
      },
      {
        "q": "What monster was shown in later classical art with a woman's upper body and canine foreparts emerging above a fishlike tail?",
        "a": "Scylla",
        "difficulty": "medium-hard",
        "notes": "This artistic form differs from Homer's monster with twelve feet, six long necks, and yelping voices."
      },
      {
        "q": "What colossal Greek monster, often described with a human torso and serpents for legs, challenged Zeus?",
        "a": "Typhon",
        "difficulty": "medium-hard",
        "notes": "Zeus ultimately defeated and buried him."
      },
      {
        "q": "What Japanese yōkai are often portrayed as bird-human mountain beings with long noses or beaks?",
        "a": "Tengu",
        "difficulty": "medium-hard",
        "notes": "They evolved from birdlike forms into red-faced long-nosed figures."
      },
      {
        "q": "What Slavic legendary creature has a woman's head and chest with a bird's body and sings beautifully?",
        "a": "Alkonost",
        "difficulty": "medium-hard",
        "notes": "Its name derives from the Greek figure Alcyone."
      },
      {
        "q": "What Mesopotamian protective figures combine a human head, bull or lion body, and eagle wings?",
        "a": "Lamassu",
        "difficulty": "medium",
        "notes": "Monumental lamassu guarded Assyrian gateways."
      },
      {
        "q": "What beings guard the gate at Mount Mashu and admit Gilgamesh into the sun's dark passage?",
        "a": "Scorpion men (Girtablilu)",
        "difficulty": "medium-hard",
        "notes": "Mesopotamian art depicts these guardians with human and scorpion anatomy."
      },
      {
        "q": "What Akkadian term names Mesopotamian sages whose protective images include bird-headed, human-bodied hybrids and figures wearing fish-skin cloaks?",
        "a": "Apkallu",
        "difficulty": "medium-hard",
        "notes": "The term is associated with the antediluvian Seven Sages and Enki; other apkallu images are fully human."
      },
      {
        "q": "What Greek king and autochthonous founder of Athens was depicted as human above and snake below?",
        "a": "Cecrops",
        "difficulty": "medium-hard",
        "notes": "He judged the contest between Athena and Poseidon."
      },
      {
        "q": "What sea deity, son of Poseidon and Amphitrite, is usually shown as a merman blowing a conch shell?",
        "a": "Triton",
        "difficulty": "medium",
        "notes": "He served as a herald of the sea."
      },
      {
        "q": "What Greek sea creatures combine a human upper body, horse forequarters, and fish tail?",
        "a": "Ichthyocentaurs",
        "difficulty": "medium-hard",
        "notes": "They are marine counterparts to centaurs."
      },
      {
        "q": "What Scandinavian forest being looks like a woman but has a cow's tail and sometimes a hollow back?",
        "a": "Huldra",
        "difficulty": "medium-hard",
        "notes": "She is known in Norwegian folklore."
      },
      {
        "q": "What medieval creature combines a human torso with the body of a donkey rather than a horse?",
        "a": "Onocentaur",
        "difficulty": "medium-hard",
        "notes": "Its name literally means donkey-centaur."
      },
      {
        "q": "What legendary creature from Islamic tradition carried Muhammad on the Night Journey and is often depicted with a human face, wings, and an equine body?",
        "a": "Buraq",
        "difficulty": "medium-hard",
        "notes": "Its appearance varies across artistic traditions."
      }
    ]
  },
  {
    "id": "music-2000s-women",
    "name": "Music – 2000s Women Musicians",
    "shortName": "Music",
    "blurb": "You need both title and artist here, and it clicks much faster once you've actually heard the hook rather than just reading the title. Press play on each — these are 2000–2009 hits by women solo artists and women-fronted acts.",
    "infoBox": "<strong>How to use this:</strong> hit play, see how fast you can name the song + artist before the reveal, then check yourself. Every YouTube ID and Spotify link below was individually vetted — the YouTube ID via the oEmbed API (confirming the returned title actually names this song/artist) and the Spotify link via a matching search result cross-checked against the YouTube title.",
    "type": "music",
    "items": [
      {
        "title": "Fallin'",
        "artist": "Alicia Keys",
        "youtubeId": "Urdlvw0SSEc",
        "spotifyUrl": "https://open.spotify.com/track/3unsLiH5FXmaDWtT5Imolu",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "2001 debut single from Songs in A Minor."
      },
      {
        "title": "Complicated",
        "artist": "Avril Lavigne",
        "youtubeId": "5NPBIwQyPWE",
        "spotifyUrl": "https://open.spotify.com/track/5xEM5hIgJ1jjgcEBfpkt2F",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "2002 single from Let Go."
      },
      {
        "title": "A Thousand Miles",
        "artist": "Vanessa Carlton",
        "youtubeId": "Cwkej79U3ek",
        "spotifyUrl": "https://open.spotify.com/track/6t6rudGjkLftasgUiSGcPN",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "2002 single built around a signature piano riff."
      },
      {
        "title": "Whenever, Wherever",
        "artist": "Shakira",
        "youtubeId": "weRHyjj34ZE",
        "spotifyUrl": "https://open.spotify.com/track/2lnzGkdtDj5mtlcOW2yRtG",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "2001 English-language crossover single."
      },
      {
        "title": "Crazy in Love",
        "artist": "Beyoncé ft. Jay-Z",
        "youtubeId": "ViwtNLUqkMY",
        "spotifyUrl": "https://open.spotify.com/track/5IVuqXILoxVWvWEPm82Jxr",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "2003 lead single from Dangerously in Love."
      },
      {
        "title": "Since U Been Gone",
        "artist": "Kelly Clarkson",
        "youtubeId": "E5Lt9MHuUNc",
        "spotifyUrl": "https://open.spotify.com/track/0wFX3vyirwADaItS9Hq54I",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "2004 single from Breakaway; the album's Spotify listing is dated 2005 in some markets."
      },
      {
        "title": "Promiscuous",
        "artist": "Nelly Furtado ft. Timbaland",
        "youtubeId": "0J3vgcE5i2o",
        "spotifyUrl": "https://open.spotify.com/track/2gam98EZKrF9XuOkU13ApN",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "2006 single from Loose."
      },
      {
        "title": "Rehab",
        "artist": "Amy Winehouse",
        "youtubeId": "KUmZp8pR1uc",
        "spotifyUrl": "https://open.spotify.com/track/1L5tZi0izXsi5Kk5OJf4W0",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "2006 single from Back to Black."
      },
      {
        "title": "Umbrella",
        "artist": "Rihanna ft. Jay-Z",
        "youtubeId": "CvBfHwUxHIk",
        "spotifyUrl": "https://open.spotify.com/track/4FgQ7jK068Eb6v016MxmJn",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "2007 single from Good Girl Gone Bad."
      },
      {
        "title": "Bleeding Love",
        "artist": "Leona Lewis",
        "youtubeId": "Vzo-EL_62fQ",
        "spotifyUrl": "https://open.spotify.com/track/7wZUrN8oemZfsEd1CGkbXE",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "2007 single from Spirit."
      },
      {
        "title": "Pocketful of Sunshine",
        "artist": "Natasha Bedingfield",
        "youtubeId": "gte3BoXKwP0",
        "spotifyUrl": "https://open.spotify.com/track/49Qh6RdJKP92onI3FpE0c4",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "Recorded in 2007 and released as a US single in 2008."
      },
      {
        "title": "So What",
        "artist": "P!nk",
        "youtubeId": "FJfFZqTlWrQ",
        "spotifyUrl": "https://open.spotify.com/track/6qYGUxPjQt5PJtWdiNppZx",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "2008 lead single from Funhouse."
      },
      {
        "title": "I Kissed a Girl",
        "artist": "Katy Perry",
        "youtubeId": "tAp9BKosZXs",
        "spotifyUrl": "https://open.spotify.com/track/005lwxGU1tms6HGELIcUv9",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "2008 breakthrough single from One of the Boys."
      },
      {
        "title": "Love Story",
        "artist": "Taylor Swift",
        "youtubeId": "8xg3vE8Ie_E",
        "spotifyUrl": "https://open.spotify.com/track/5MONKNdpMcrynzmq5sMkB0",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "2008 lead single from Fearless."
      },
      {
        "title": "Everywhere",
        "artist": "Michelle Branch",
        "youtubeId": "HLCasyAh7ic",
        "spotifyUrl": "https://open.spotify.com/track/1u0l8zWpQeMYStFkc2mLD7",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "2001 lead single from her major-label debut album, The Spirit Room."
      },
      {
        "title": "Bubbly",
        "artist": "Colbie Caillat",
        "youtubeId": "AWGqoCNbsvM",
        "spotifyUrl": "https://open.spotify.com/track/0rFOs9paloAvEtzwDX1Kmc",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "2007 breakthrough single from Coco."
      },
      {
        "title": "Put Your Records On",
        "artist": "Corinne Bailey Rae",
        "youtubeId": "rjOhZZyn30k",
        "spotifyUrl": "https://open.spotify.com/track/2nGFzvICaeEWjIrBrL2RAx",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "2006 single from her self-titled debut album."
      },
      {
        "title": "Beautiful",
        "artist": "Christina Aguilera",
        "youtubeId": "eAfyFTzZDMM",
        "spotifyUrl": "https://open.spotify.com/track/3TCauNPqFiniaYHBvEVoHG",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "2002 single from Stripped."
      },
      {
        "title": "Toxic",
        "artist": "Britney Spears",
        "youtubeId": "LOZuxwVk7TU",
        "spotifyUrl": "https://open.spotify.com/track/6I9VzXrHxO9rA9A5euc8Ak",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "2003 single from In the Zone; released in 2004 in the United States."
      },
      {
        "title": "Milkshake",
        "artist": "Kelis",
        "youtubeId": "pGL2rytTraA",
        "spotifyUrl": "https://open.spotify.com/track/4LmzPJDil70LpiApWfOI6O",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "2003 single from Tasty."
      },
      {
        "title": "Bootylicious",
        "artist": "Destiny's Child",
        "youtubeId": "IyYnnUcgeMc",
        "spotifyUrl": "https://open.spotify.com/track/1hJ9fQMfjZiBzz0Hs8DuMj",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "2001 single from Survivor."
      },
      {
        "title": "Poker Face",
        "artist": "Lady Gaga",
        "youtubeId": "bESGLojNYSo",
        "spotifyUrl": "https://open.spotify.com/track/1QV6tiMFM6fSOKOGLMHYYg",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "2008 single from The Fame."
      },
      {
        "title": "Paper Planes",
        "artist": "M.I.A.",
        "youtubeId": "ewRjZoRtu0Y",
        "spotifyUrl": "https://open.spotify.com/track/3ZlFUr0RBrUYYsmlcFvD0e",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "2007 album track from Kala; released as a single in 2008."
      },
      {
        "title": "Maps",
        "artist": "Yeah Yeah Yeahs",
        "youtubeId": "oIIxlgcuQRU",
        "spotifyUrl": "https://open.spotify.com/track/4EwNG7uCvLEm5a6KgerCHf",
        "startSeconds": 0,
        "difficulty": "medium-hard",
        "notes": "2003 single from Fever to Tell, fronted by Karen O."
      },
      {
        "title": "Bring Me to Life",
        "artist": "Evanescence",
        "youtubeId": "3YxaaGgTQYM",
        "spotifyUrl": "https://open.spotify.com/track/0COqiPhxzoWICwFCS4eZcp",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "2003 single from Fallen, fronted by Amy Lee."
      },
      {
        "title": "Don't Know Why",
        "artist": "Norah Jones",
        "youtubeId": "tO4dxvguQDk",
        "spotifyUrl": "https://open.spotify.com/track/6ybViy2qrO9sIi41EgRJgx",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "2002 single from Come Away with Me."
      },
      {
        "title": "Hollaback Girl",
        "artist": "Gwen Stefani",
        "youtubeId": "Kgjkth6BRRY",
        "spotifyUrl": "https://open.spotify.com/track/0LzrhCZFXW94Y8nwtTuRlw",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "2005 single from Love. Angel. Music. Baby."
      },
      {
        "title": "Work It",
        "artist": "Missy Elliott",
        "youtubeId": "cjIvu7e6Wq8",
        "spotifyUrl": "https://open.spotify.com/track/3jagJCUbdqhDSPuxP8cAqF",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "2002 single from Under Construction."
      },
      {
        "title": "Hips Don't Lie",
        "artist": "Shakira ft. Wyclef Jean",
        "youtubeId": "DUT5rEU6pqM",
        "spotifyUrl": "https://open.spotify.com/track/6sEtce6qTCrPZQQMGY3nRD",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "2006 single from the reissue of Oral Fixation, Vol. 2."
      },
      {
        "title": "Big Girls Don't Cry",
        "artist": "Fergie",
        "youtubeId": "agrXgrAgQ0U",
        "spotifyUrl": "https://open.spotify.com/track/4AniPkv5vgdE1n6VKreiyI",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "2007 single from the 2006 album The Dutchess."
      }
    ]
  },
  {
    "id": "forget-about-it",
    "name": "Forget About It",
    "shortName": "Forget About It",
    "blurb": "Memory, forgetting, amnesia, idioms, and pop culture built around forgetting. Covers neuroscience basics, classic psychology, famous cases, familiar sayings, and films and songs tied to the theme.",
    "infoBox": "<strong>How to use this:</strong> split your study between memory science and the category title’s other plausible reading: familiar idioms, sayings, and cultural references about forgetting.",
    "type": "quiz",
    "items": [
      {
        "q": "What seahorse-shaped brain structure is crucial for forming new episodic memories?",
        "a": "Hippocampus",
        "difficulty": "easy-medium",
        "notes": "Damage to both hippocampi can severely impair new-memory formation."
      },
      {
        "q": "What type of amnesia prevents a person from forming new long-term memories after its onset?",
        "a": "Anterograde amnesia",
        "difficulty": "medium",
        "notes": "Older memories may remain relatively intact."
      },
      {
        "q": "What type of amnesia involves loss of memories formed before an injury or illness?",
        "a": "Retrograde amnesia",
        "difficulty": "medium",
        "notes": "The loss often affects recent memories more than remote ones."
      },
      {
        "q": "What progressive disease is the most common cause of dementia?",
        "a": "Alzheimer's disease",
        "difficulty": "easy-medium",
        "notes": "It impairs memory, thinking, and eventually daily functioning."
      },
      {
        "q": "Which psychologist's experiments produced the famous forgetting curve?",
        "a": "Hermann Ebbinghaus",
        "difficulty": "medium-hard",
        "notes": "He published Memory in 1885."
      },
      {
        "q": "What study technique reviews material at expanding intervals to resist forgetting?",
        "a": "Spaced repetition",
        "difficulty": "easy-medium",
        "notes": "It exploits the spacing effect."
      },
      {
        "q": "In the familiar saying, what animal 'never forgets'?",
        "a": "Elephant",
        "difficulty": "easy-medium",
        "notes": "The proverb draws on elephants' reputation for strong long-term memory."
      },
      {
        "q": "Complete the idiom for something quickly forgotten once absent: 'Out of sight, out of ____.'",
        "a": "Mind",
        "difficulty": "easy-medium",
        "notes": "'Out of sight, out of mind' has been proverbial in English for centuries."
      },
      {
        "q": "In what 1997 crime film does Johnny Depp's undercover agent explain the many meanings of the phrase 'forget about it'?",
        "a": "Donnie Brasco",
        "difficulty": "medium",
        "notes": "Al Pacino's character Lefty demonstrates several meanings of the phrase in the film."
      },
      {
        "q": "What short-term mental workspace holds and manipulates information during reasoning?",
        "a": "Working memory",
        "difficulty": "easy-medium",
        "notes": "It has limited capacity."
      },
      {
        "q": "What type of long-term memory stores skills and habits such as riding a bicycle?",
        "a": "Procedural memory",
        "difficulty": "easy-medium",
        "notes": "It is a form of implicit memory."
      },
      {
        "q": "What type of memory stores general facts and concepts rather than personal experiences?",
        "a": "Semantic memory",
        "difficulty": "medium",
        "notes": "Knowing that Paris is France's capital is an example."
      },
      {
        "q": "What type of memory records personally experienced events tied to a time and place?",
        "a": "Episodic memory",
        "difficulty": "medium",
        "notes": "It is often described as autobiographical event memory."
      },
      {
        "q": "What 1982 Patrice Rushen hit, later sampled in Will Smith's 'Men in Black,' has a title naming small reminders?",
        "a": "Forget Me Nots",
        "difficulty": "medium",
        "notes": "The song appeared on Rushen's album Straight from the Heart."
      },
      {
        "q": "Which psychologist pioneered research on the misinformation effect and eyewitness memory?",
        "a": "Elizabeth Loftus",
        "difficulty": "medium",
        "notes": "Her work showed that later wording can alter recollection."
      },
      {
        "q": "What is the familiar feeling that a known word or name is temporarily just out of reach?",
        "a": "Tip-of-the-tongue phenomenon",
        "difficulty": "easy-medium",
        "notes": "Partial information about the word is often still accessible."
      },
      {
        "q": "What term describes adults' inability to recall events from the first few years of life?",
        "a": "Infantile amnesia (childhood amnesia)",
        "difficulty": "medium",
        "notes": "Most adults retain few autobiographical memories from before age three."
      },
      {
        "q": "What temporary syndrome causes sudden inability to form new memories, usually resolving within 24 hours?",
        "a": "Transient global amnesia",
        "difficulty": "medium-hard",
        "notes": "Identity and basic skills are usually preserved."
      },
      {
        "q": "Patient H.M., central to memory research, was publicly identified after death by what name?",
        "a": "Henry Molaison",
        "difficulty": "medium-hard",
        "notes": "A 1953 operation removed much of both medial temporal lobes."
      },
      {
        "q": "Which British musician developed profound amnesia after herpes encephalitis in 1985?",
        "a": "Clive Wearing",
        "difficulty": "medium-hard",
        "notes": "His case illustrates severe damage to episodic memory."
      },
      {
        "q": "What forgetful blue tang is voiced by Ellen DeGeneres in Finding Nemo?",
        "a": "Dory",
        "difficulty": "easy-medium",
        "notes": "Dory describes herself as having short-term memory loss."
      },
      {
        "q": "What Christopher Nolan film tells Leonard Shelby's investigation in a reverse-ordered narrative?",
        "a": "Memento",
        "difficulty": "easy-medium",
        "notes": "Leonard cannot form new long-term memories."
      },
      {
        "q": "What 2004 film has a couple use a procedure to erase memories of their relationship?",
        "a": "Eternal Sunshine of the Spotless Mind",
        "difficulty": "easy-medium",
        "notes": "Jim Carrey and Kate Winslet star."
      },
      {
        "q": "What 2004 romantic comedy stars Drew Barrymore as a woman who forgets each day's events?",
        "a": "50 First Dates",
        "difficulty": "easy-medium",
        "notes": "Adam Sandler plays a man who courts her anew."
      },
      {
        "q": "Simple Minds recorded what parenthetical 1985 hit for The Breakfast Club?",
        "a": "Don't You (Forget About Me)",
        "difficulty": "easy-medium",
        "notes": "It plays over the film's final scene."
      },
      {
        "q": "What 2010 CeeLo Green single has a radio-safe title replacing a stronger expletive?",
        "a": "Forget You",
        "difficulty": "easy-medium",
        "notes": "The original version has a different two-word title."
      },
      {
        "q": "What spell modifies or erases memory in the Harry Potter series?",
        "a": "Obliviate (the Memory Charm)",
        "difficulty": "easy-medium",
        "notes": "Gilderoy Lockhart famously attempts it in Chamber of Secrets."
      },
      {
        "q": "In Greek mythology, drinking from what Underworld river caused forgetfulness?",
        "a": "Lethe",
        "difficulty": "medium",
        "notes": "Lethe personified oblivion as well as naming the river."
      },
      {
        "q": "What small blue flower's common name is a plea to be remembered?",
        "a": "Forget-me-not",
        "difficulty": "easy-medium",
        "notes": "It commonly belongs to the genus Myosotis."
      },
      {
        "q": "What 1945 Alfred Hitchcock thriller stars Ingrid Bergman as a psychoanalyst treating an amnesiac man?",
        "a": "Spellbound",
        "difficulty": "medium-hard",
        "notes": "Gregory Peck plays the man accused of murder."
      }
    ]
  },
  {
    "id": "bonus",
    "name": "Bonus Question",
    "shortName": "Bonus",
    "blurb": "The named bonus question for this week.",
    "type": "quiz",
    "items": [
      {
        "q": "A “prickle” is a group of what animals?",
        "a": "Porcupines"
      }
    ]
  }
];
