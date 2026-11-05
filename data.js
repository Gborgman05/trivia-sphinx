// Study content for "Beat the Geek" trivia night.
// Categories confirmed for the Nov. 10, 2026 event at Juanita Cantina:
// Current Events, Science - 'Ology's, Celeb Shots - Famous Chickens, Vitamin String Quartet, and Potpourri.
// Bonus: What is Macklemore's real name?
// The visual Celeb Shots - Famous Chickens round (round 3) is intentionally omitted. This is the curated
// 120-question set from trivia-2026-11-10-juanita-cantina.csv.
// difficulty preserves the CSV tiers: "easy-medium" | "medium" | "medium-hard".

const CATEGORIES = [
  {
    "id": "current-events",
    "name": "Current Events",
    "shortName": "Current Events",
    "blurb": "Major news from politics, science, business, sports, and culture in late October and early November 2026.",
    "infoBox": "<strong>Study tip:</strong> connect each answer to the dated event in its notes.",
    "type": "quiz",
    "items": [
      {
        "q": "Which party won control of both the U.S. House and Senate in the 2026 midterm elections?",
        "a": "The Democratic Party",
        "difficulty": "easy-medium",
        "notes": "Results reported Nov. 3-4 2026."
      },
      {
        "q": "Which former Atlanta mayor became the first Black woman elected governor of Georgia?",
        "a": "Keisha Lance Bottoms",
        "difficulty": "medium",
        "notes": "Elected Nov. 3 2026."
      },
      {
        "q": "Which Brazilian president won reelection over Flávio Bolsonaro with 51.8% of the vote?",
        "a": "Luiz Inácio Lula da Silva",
        "difficulty": "easy-medium",
        "notes": "Runoff held Oct. 25 2026."
      },
      {
        "q": "Which country's student-led opposition defeated the party of longtime leader Aleksandar Vučić in a parliamentary election?",
        "a": "Serbia",
        "difficulty": "medium",
        "notes": "Vučić conceded Oct. 25 2026."
      },
      {
        "q": "Which North African country approved a resolution for its first foreign troop deployment since 1973 by authorizing forces for Niger?",
        "a": "Algeria",
        "difficulty": "medium-hard",
        "notes": "Parliament approved the deployment Oct. 25 2026."
      },
      {
        "q": "Which country launched a National Disaster Management Agency to prepare for megaquakes and a possible Mount Fuji eruption?",
        "a": "Japan",
        "difficulty": "easy-medium",
        "notes": "The agency launched Nov. 2 2026."
      },
      {
        "q": "Which West African country confirmed its first Ebola case in more than a decade?",
        "a": "Nigeria",
        "difficulty": "medium",
        "notes": "The imported case was confirmed Oct. 21 2026."
      },
      {
        "q": "Wildfire haze from which country caused school closures in Malaysia, flight cancellations and unhealthy air across Southeast Asia?",
        "a": "Indonesia",
        "difficulty": "easy-medium",
        "notes": "Peatland fires and regional haze were reported Oct. 20 2026."
      },
      {
        "q": "NASA and NOAA reported that the 2026 ozone hole over which continent ranked seventh largest in 48 years of monitoring?",
        "a": "Antarctica",
        "difficulty": "easy-medium",
        "notes": "Report published Nov. 4 2026."
      },
      {
        "q": "Which space telescope helped researchers find that nearby dwarf galaxies retain only a small fraction of the oxygen made by their stars?",
        "a": "The Hubble Space Telescope",
        "difficulty": "medium",
        "notes": "Study of 37 dwarf galaxies reported Nov. 2 2026."
      },
      {
        "q": "What type of NASA vehicle did scientists use to study a solar flare in progress for the first time?",
        "a": "A sounding rocket",
        "difficulty": "medium-hard",
        "notes": "The flare-alert research was published Nov. 4 2026."
      },
      {
        "q": "Which space telescope had its sensitivity to faint planets boosted by as much as 15 times using a new starlight-subtraction technique?",
        "a": "The James Webb Space Telescope",
        "difficulty": "medium",
        "notes": "Research reported Nov. 4 2026."
      },
      {
        "q": "What defensive behavior did a 99-million-year-old lizard tail in amber provide direct fossil evidence for?",
        "a": "Tail shedding",
        "difficulty": "medium",
        "notes": "The micro-CT study was reported Oct. 20 2026."
      },
      {
        "q": "Which 2010 oil disaster was linked by a 13-year survey to a sustained 64% decline in deep-water fish populations?",
        "a": "The Deepwater Horizon oil spill",
        "difficulty": "easy-medium",
        "notes": "Research reported Oct. 20 2026."
      },
      {
        "q": "What twice-yearly HIV-prevention drug did the FDA tentatively approve in generic form for procurement through PEPFAR?",
        "a": "Lenacapavir",
        "difficulty": "medium-hard",
        "notes": "Tentative approval was granted Nov. 2 2026; it enables U.S. government procurement but is not full approval for U.S. marketing."
      },
      {
        "q": "Which state enacted restrictions on unsafe AI companion-chatbot behavior involving users under 18?",
        "a": "New York",
        "difficulty": "easy-medium",
        "notes": "Legislation signed Oct. 28 2026."
      },
      {
        "q": "Which country seized 30 servers containing advanced AI chips at Kuala Lumpur International Airport?",
        "a": "Malaysia",
        "difficulty": "medium",
        "notes": "Seizure announced Oct. 28 2026."
      },
      {
        "q": "Which Chinese genomics company and its affiliates were blocked from sending goods to the United States over forced-labor allegations?",
        "a": "BGI Group",
        "difficulty": "medium-hard",
        "notes": "U.S. action announced Oct. 28 2026."
      },
      {
        "q": "Which Facebook parent company raised $15 billion in a five-part bond sale to fund AI expansion?",
        "a": "Meta Platforms",
        "difficulty": "easy-medium",
        "notes": "Offering announced Nov. 3 2026."
      },
      {
        "q": "Which Vermont aircraft maker received federal certification to fly potential customers aboard its ALIA electric vertical-takeoff aircraft?",
        "a": "Beta Technologies",
        "difficulty": "easy-medium",
        "notes": "The certification was reported Oct. 23 2026."
      },
      {
        "q": "Which Major League Baseball team won the first World Series title in franchise history by defeating the Tampa Bay Rays?",
        "a": "The Milwaukee Brewers",
        "difficulty": "easy-medium",
        "notes": "Milwaukee won Game 5 on Oct. 28 2026."
      },
      {
        "q": "Which second-year expansion team won its first WNBA championship by beating the Atlanta Dream in Game 7?",
        "a": "The Golden State Valkyries",
        "difficulty": "easy-medium",
        "notes": "Championship won Oct. 31 2026."
      },
      {
        "q": "Which Italian Mercedes driver became Formula One's youngest world champion at age 20?",
        "a": "Andrea Kimi Antonelli",
        "difficulty": "medium",
        "notes": "Title secured Nov. 1 2026."
      },
      {
        "q": "Which German player rose to No. 1 in the men's tennis rankings for the first time?",
        "a": "Alexander Zverev",
        "difficulty": "easy-medium",
        "notes": "Ranking announced Nov. 2 2026."
      },
      {
        "q": "Which Kazakhstani tennis player secured the 2026 year-end women's No. 1 ranking at the Pan Pacific Open?",
        "a": "Elena Rybakina",
        "difficulty": "medium",
        "notes": "Achievement reported Oct. 29 2026."
      },
      {
        "q": "Which American gymnast won the women's all-around title at the 2026 World Artistic Gymnastics Championships?",
        "a": "Skye Blakely",
        "difficulty": "medium",
        "notes": "Final held Oct. 23 2026 in Rotterdam."
      },
      {
        "q": "Which England captain became the first Englishman in 25 years to win the men's Ballon d'Or?",
        "a": "Harry Kane",
        "difficulty": "easy-medium",
        "notes": "Award presented Oct. 26 2026."
      },
      {
        "q": "Which film by Macedonian director Milcho Manchevski won the Tokyo International Film Festival's top prize?",
        "a": "Sister Brother Manhole Cover",
        "difficulty": "medium-hard",
        "notes": "Tokyo Grand Prix announced Nov. 4 2026."
      },
      {
        "q": "Which film directed by Javier Calvo and Javier Ambrossi won the 2026 London Film Festival audience award?",
        "a": "La Bola Negra",
        "difficulty": "medium-hard",
        "notes": "Audience award announced Nov. 4 2026."
      },
      {
        "q": "Which documentary filmmaker was named the inaugural winner of the David M. Rubenstein Prize for the Advancement of American History?",
        "a": "Ken Burns",
        "difficulty": "easy-medium",
        "notes": "The New York Historical announced the award Oct. 28 2026."
      }
    ]
  },
  {
    "id": "science-ologies",
    "name": "Science - 'Ology's",
    "shortName": "Science - 'Ology's",
    "blurb": "Scientific fields ending in -ology, plus notable people and tools associated with them.",
    "infoBox": "<strong>Study tip:</strong> break each field name into its subject root and the -ology suffix.",
    "type": "quiz",
    "items": [
      {
        "q": "What scientific field studies insects?",
        "a": "Entomology",
        "difficulty": "easy-medium"
      },
      {
        "q": "What branch of zoology is devoted to birds?",
        "a": "Ornithology",
        "difficulty": "easy-medium"
      },
      {
        "q": "What scientific field studies fish?",
        "a": "Ichthyology",
        "difficulty": "medium"
      },
      {
        "q": "What branch of biology studies fungi?",
        "a": "Mycology",
        "difficulty": "easy-medium"
      },
      {
        "q": "What scientific field studies viruses?",
        "a": "Virology",
        "difficulty": "easy-medium"
      },
      {
        "q": "What field studies how organisms interact with one another and their environment?",
        "a": "Ecology",
        "difficulty": "easy-medium"
      },
      {
        "q": "What field studies animal behavior, especially under natural conditions?",
        "a": "Ethology",
        "difficulty": "medium-hard"
      },
      {
        "q": "What science studies Earth's physical structure, history, and the processes that shape it?",
        "a": "Geology",
        "difficulty": "easy-medium"
      },
      {
        "q": "What branch of Earth science studies earthquakes and seismic waves?",
        "a": "Seismology",
        "difficulty": "easy-medium"
      },
      {
        "q": "What branch of geology studies volcanism, including magma flow and eruptions?",
        "a": "Volcanology",
        "difficulty": "easy-medium"
      },
      {
        "q": "What science studies the occurrence, distribution, movement, and properties of Earth's water?",
        "a": "Hydrology",
        "difficulty": "medium"
      },
      {
        "q": "What science studies snow, ice, glaciers, and ice sheets?",
        "a": "Glaciology",
        "difficulty": "medium"
      },
      {
        "q": "What science reconstructs life in past geologic time using fossils?",
        "a": "Paleontology",
        "difficulty": "easy-medium"
      },
      {
        "q": "What atmospheric science focuses on short-term conditions such as wind, precipitation, and air pressure?",
        "a": "Meteorology",
        "difficulty": "easy-medium"
      },
      {
        "q": "What field studies long-term patterns and averages of weather conditions?",
        "a": "Climatology",
        "difficulty": "medium"
      },
      {
        "q": "What science studies the physical and biological characteristics of inland waters, such as lakes and ponds?",
        "a": "Limnology",
        "difficulty": "medium-hard"
      },
      {
        "q": "What method dates wood and reconstructs past conditions by matching annual tree-ring patterns?",
        "a": "Dendrochronology",
        "difficulty": "medium-hard"
      },
      {
        "q": "What field studies the distribution, frequency, and causes of disease in populations?",
        "a": "Epidemiology",
        "difficulty": "medium"
      },
      {
        "q": "What medical science studies the causes, development, and structural or functional changes associated with disease?",
        "a": "Pathology",
        "difficulty": "medium"
      },
      {
        "q": "What branch of biomedical science studies the immune system?",
        "a": "Immunology",
        "difficulty": "medium"
      },
      {
        "q": "What medical specialty focuses on cancer?",
        "a": "Oncology",
        "difficulty": "easy-medium"
      },
      {
        "q": "What medical specialty studies blood and blood disorders?",
        "a": "Hematology",
        "difficulty": "medium"
      },
      {
        "q": "What field studies the harmful effects of chemicals on living organisms?",
        "a": "Toxicology",
        "difficulty": "medium"
      },
      {
        "q": "What science studies the mind and behavior?",
        "a": "Psychology",
        "difficulty": "easy-medium"
      },
      {
        "q": "What social science studies human society, institutions, and relationships among individuals and groups?",
        "a": "Sociology",
        "difficulty": "easy-medium"
      },
      {
        "q": "What field studies human beings across biology, culture, language, and social organization?",
        "a": "Anthropology",
        "difficulty": "medium"
      },
      {
        "q": "Which physician mapped deaths in London's 1854 cholera outbreak and is called the father of field epidemiology?",
        "a": "John Snow",
        "difficulty": "medium"
      },
      {
        "q": "What scale used by geologists ranks minerals by their resistance to scratching from talc at 1 to diamond at 10?",
        "a": "The Mohs hardness scale",
        "difficulty": "medium",
        "notes": "Accept Mohs scale."
      },
      {
        "q": "Which scientist made a foundational contribution to cytology, or cell biology, by introducing the word cell after examining cork in his 1665 book Micrographia?",
        "a": "Robert Hooke",
        "difficulty": "medium"
      },
      {
        "q": "Which ethologist decoded the honeybee dance and shared the 1973 Nobel Prize in Physiology or Medicine?",
        "a": "Karl von Frisch",
        "difficulty": "medium-hard"
      }
    ]
  },
  {
    "id": "vitamin-string-quartet",
    "name": "Vitamin String Quartet",
    "shortName": "Vitamin String Quartet",
    "blurb": "Identify the original song and artist from Vitamin String Quartet instrumental covers.",
    "infoBox": "<strong>How to practice:</strong> open the Spotify track, hide the screen, and identify both title and original artist.",
    "type": "music",
    "items": [
      {
        "title": "All You Need Is Love",
        "artist": "The Beatles",
        "spotifyUrl": "https://open.spotify.com/track/3JrzKBSNLJT2pUpa08q4Q1",
        "difficulty": "medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Brown Eyed Girl",
        "artist": "Van Morrison",
        "spotifyUrl": "https://open.spotify.com/track/7LrPyPv6m1TWQ2ud1evM42",
        "difficulty": "medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Bohemian Rhapsody",
        "artist": "Queen",
        "spotifyUrl": "https://open.spotify.com/track/3KuuzvDu9YEFANLMcmdZuC",
        "difficulty": "easy-medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "I Will Always Love You",
        "artist": "Dolly Parton",
        "spotifyUrl": "https://open.spotify.com/track/1Pz0hDCAXTTfcpNT5YrufQ",
        "difficulty": "medium-hard",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Defying Gravity",
        "artist": "Idina Menzel and Kristin Chenoweth",
        "spotifyUrl": "https://open.spotify.com/track/3rRYheHIu9WJjhd8xCoHRl",
        "difficulty": "medium-hard",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Mamma Mia",
        "artist": "ABBA",
        "spotifyUrl": "https://open.spotify.com/track/5EcJbRgrUs8iVeB5P5Ub58",
        "difficulty": "easy-medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Billie Jean",
        "artist": "Michael Jackson",
        "spotifyUrl": "https://open.spotify.com/track/7kD8PZ5JMJDs2KaXy0Dkgb",
        "difficulty": "easy-medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Get Lucky",
        "artist": "Daft Punk featuring Pharrell Williams",
        "spotifyUrl": "https://open.spotify.com/track/1bXSNCFYQZTFgN1LkalSYE",
        "difficulty": "medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Dancing on My Own",
        "artist": "Robyn",
        "spotifyUrl": "https://open.spotify.com/track/5tM6Oa5XitwpRCIX7tUcWi",
        "difficulty": "medium-hard",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "The Killing Moon",
        "artist": "Echo & the Bunnymen",
        "spotifyUrl": "https://open.spotify.com/track/3KufRwzBWm08EdVccZAah2",
        "difficulty": "medium-hard",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Cheap Thrills",
        "artist": "Sia",
        "spotifyUrl": "https://open.spotify.com/track/4dRYlZtS7kYfWxkYfMPTe7",
        "difficulty": "medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Smells Like Teen Spirit",
        "artist": "Nirvana",
        "spotifyUrl": "https://open.spotify.com/track/0mPAmCEHLgv0cV6xar6Jj5",
        "difficulty": "easy-medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Enter Sandman",
        "artist": "Metallica",
        "spotifyUrl": "https://open.spotify.com/track/4L367t6kjlw3IchZDVsc8Z",
        "difficulty": "medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "If I Ain't Got You",
        "artist": "Alicia Keys",
        "spotifyUrl": "https://open.spotify.com/track/3wNzuzxKGDSQ56HnQADR7I",
        "difficulty": "medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "I Want It That Way",
        "artist": "Backstreet Boys",
        "spotifyUrl": "https://open.spotify.com/track/1XV0SrjeiLy2fxI8rdPANg",
        "difficulty": "easy-medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Losing My Religion",
        "artist": "R.E.M.",
        "spotifyUrl": "https://open.spotify.com/track/5IAGxdkAn1znAOBeJ2RflC",
        "difficulty": "medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Take On Me",
        "artist": "a-ha",
        "spotifyUrl": "https://open.spotify.com/track/0CftLJL4E0oU2Fwz7Cartb",
        "difficulty": "easy-medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Fireflies",
        "artist": "Owl City",
        "spotifyUrl": "https://open.spotify.com/track/70BySdHNM3mBSrK7pA1MwL",
        "difficulty": "medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Yellow",
        "artist": "Coldplay",
        "spotifyUrl": "https://open.spotify.com/track/3vOykP71BfLYgRtcAkAZ7v",
        "difficulty": "easy-medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Mr. Brightside",
        "artist": "The Killers",
        "spotifyUrl": "https://open.spotify.com/track/2bGZCAldsExKooSRt1tmya",
        "difficulty": "easy-medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Hey Ya!",
        "artist": "Outkast",
        "spotifyUrl": "https://open.spotify.com/track/2SJG7q3XqqMipNzWY12YYM",
        "difficulty": "easy-medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Thrift Shop",
        "artist": "Macklemore & Ryan Lewis featuring Wanz",
        "spotifyUrl": "https://open.spotify.com/track/08K0sJYB1Y2TxkGclD8wl9",
        "difficulty": "medium-hard",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Never Gonna Give You Up",
        "artist": "Rick Astley",
        "spotifyUrl": "https://open.spotify.com/track/4TijaNZQchZj9E86WK5jSH",
        "difficulty": "easy-medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "thank u, next",
        "artist": "Ariana Grande",
        "spotifyUrl": "https://open.spotify.com/track/5tnxlzJHU3ExaYNauG3KdW",
        "difficulty": "medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Rolling in the Deep",
        "artist": "Adele",
        "spotifyUrl": "https://open.spotify.com/track/4OCRAoH6XZkszgqwTPacnP",
        "difficulty": "easy-medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Dynamite",
        "artist": "BTS",
        "spotifyUrl": "https://open.spotify.com/track/3r5qG8lJJhSppdKn9D5voW",
        "difficulty": "medium-hard",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Chandelier",
        "artist": "Sia",
        "spotifyUrl": "https://open.spotify.com/track/5A51C7Ank2IRW0TmhYkeoK",
        "difficulty": "medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Shape of You",
        "artist": "Ed Sheeran",
        "spotifyUrl": "https://open.spotify.com/track/5fAx5nkBA294M6MunnijOM",
        "difficulty": "easy-medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "bad guy",
        "artist": "Billie Eilish",
        "spotifyUrl": "https://open.spotify.com/track/5uLITeb0KGGgP7iYjqGCSL",
        "difficulty": "medium",
        "notes": "Playback: Vitamin String Quartet cover."
      },
      {
        "title": "Blinding Lights",
        "artist": "The Weeknd",
        "spotifyUrl": "https://open.spotify.com/track/5x17OfFfF4UNy5XkRBZjWB",
        "difficulty": "easy-medium",
        "notes": "Playback: Vitamin String Quartet cover."
      }
    ]
  },
  {
    "id": "potpourri",
    "name": "Potpourri",
    "shortName": "Potpourri",
    "blurb": "A broad mix of history, geography, science, literature, entertainment, sports, food, language, and technology.",
    "infoBox": "<strong>Study tip:</strong> use the subject label in each note to group related facts.",
    "type": "quiz",
    "items": [
      {
        "q": "What 1648 settlement, negotiated in Münster and Osnabrück, ended the German phase of the Thirty Years' War?",
        "a": "The Peace of Westphalia",
        "difficulty": "medium",
        "notes": "History."
      },
      {
        "q": "Which ruler of the Mali Empire displayed his realm's wealth during a famous 1324 pilgrimage to Mecca?",
        "a": "Mansa Musa",
        "difficulty": "easy-medium",
        "notes": "History."
      },
      {
        "q": "Which artifact bears the same 196 BC decree in hieroglyphic, Demotic and Ancient Greek scripts?",
        "a": "The Rosetta Stone",
        "difficulty": "easy-medium",
        "notes": "History."
      },
      {
        "q": "Which river flows directly through Vienna, Bratislava, Budapest and Belgrade?",
        "a": "The Danube",
        "difficulty": "medium",
        "notes": "Geography."
      },
      {
        "q": "Which African country is the only independent state whose entire territory lies more than 1,000 meters above sea level?",
        "a": "Lesotho",
        "difficulty": "medium-hard",
        "notes": "Geography."
      },
      {
        "q": "Which Central Asian nation is the world's largest landlocked country by area?",
        "a": "Kazakhstan",
        "difficulty": "medium",
        "notes": "Geography."
      },
      {
        "q": "Which metal has the highest melting point of all metals?",
        "a": "Tungsten",
        "difficulty": "medium",
        "notes": "Science."
      },
      {
        "q": "What is the smallest bone in the human body?",
        "a": "The stapes",
        "difficulty": "medium",
        "notes": "Science; accept stirrup."
      },
      {
        "q": "Which planet became the first located through mathematical prediction when Johann Galle observed it in 1846?",
        "a": "Neptune",
        "difficulty": "medium",
        "notes": "Science."
      },
      {
        "q": "What was the pen name of the novelist born Mary Anne Evans?",
        "a": "George Eliot",
        "difficulty": "easy-medium",
        "notes": "Literature."
      },
      {
        "q": "Which Japanese court writer composed The Tale of Genji around the beginning of the 11th century?",
        "a": "Murasaki Shikibu",
        "difficulty": "medium-hard",
        "notes": "Literature."
      },
      {
        "q": "Which novel follows Okonkwo and the effects of colonial rule on the Igbo community of Umuofia?",
        "a": "Things Fall Apart",
        "difficulty": "medium",
        "notes": "Literature."
      },
      {
        "q": "Which 1954 Akira Kurosawa epic about ronin defending a farming village was remade as a 1960 American Western?",
        "a": "Seven Samurai",
        "difficulty": "medium",
        "notes": "Film and television."
      },
      {
        "q": "Which 1950 Kurosawa film gave its name to an effect in which witnesses offer contradictory accounts of the same event?",
        "a": "Rashomon",
        "difficulty": "medium",
        "notes": "Film and television."
      },
      {
        "q": "Which HBO drama examines Baltimore institutions through characters including detective Jimmy McNulty?",
        "a": "The Wire",
        "difficulty": "easy-medium",
        "notes": "Film and television."
      },
      {
        "q": "Which composer completed the traditional performing version of Mozart's unfinished Requiem after Mozart's death?",
        "a": "Franz Xaver Süssmayr",
        "difficulty": "medium-hard",
        "notes": "Music."
      },
      {
        "q": "Indian musician Ravi Shankar was a virtuoso of which stringed instrument?",
        "a": "The sitar",
        "difficulty": "easy-medium",
        "notes": "Music."
      },
      {
        "q": "Which jazz singer was nicknamed Lady Day by saxophonist Lester Young?",
        "a": "Billie Holiday",
        "difficulty": "medium",
        "notes": "Music."
      },
      {
        "q": "Which American won Olympic gold in light-heavyweight boxing in 1920 and four-man bobsleigh in 1932?",
        "a": "Eddie Eagan",
        "difficulty": "medium-hard",
        "notes": "Sports."
      },
      {
        "q": "What is the official marathon distance in kilometers?",
        "a": "42.195 kilometers",
        "difficulty": "medium",
        "notes": "Sports; accept 42.195 km."
      },
      {
        "q": "Which Green Bay Packers coach lends his name to the trophy awarded to each Super Bowl champion?",
        "a": "Vince Lombardi",
        "difficulty": "easy-medium",
        "notes": "Sports."
      },
      {
        "q": "At a restaurant in which Mexican city was the Caesar salad created in 1924?",
        "a": "Tijuana",
        "difficulty": "medium",
        "notes": "Food."
      },
      {
        "q": "The spice saffron consists primarily of the dried red parts of a crocus known by what botanical term?",
        "a": "Stigmas",
        "difficulty": "medium-hard",
        "notes": "Food."
      },
      {
        "q": "What mold-inoculated grain starter is used to ferment foods including miso and soy sauce?",
        "a": "Koji",
        "difficulty": "medium-hard",
        "notes": "Food."
      },
      {
        "q": "The name of what symbol comes from a contraction of the phrase \"and per se and\"?",
        "a": "The ampersand",
        "difficulty": "medium",
        "notes": "Language."
      },
      {
        "q": "Which Bantu language serves as a major lingua franca in countries including Tanzania and Kenya?",
        "a": "Swahili",
        "difficulty": "easy-medium",
        "notes": "Language."
      },
      {
        "q": "What term describes a sentence that uses every letter of an alphabet at least once?",
        "a": "A pangram",
        "difficulty": "medium",
        "notes": "Language."
      },
      {
        "q": "Which inventor received a 1970 patent for an X-Y position indicator now known as the computer mouse?",
        "a": "Douglas Engelbart",
        "difficulty": "medium-hard",
        "notes": "Technology."
      },
      {
        "q": "Which two-dimensional code was invented by DENSO in 1994 for fast reading in automotive production?",
        "a": "The QR code",
        "difficulty": "easy-medium",
        "notes": "Technology."
      },
      {
        "q": "Which programming language was named for a BBC comedy series starring Graham Chapman and John Cleese rather than for a reptile?",
        "a": "Python",
        "difficulty": "easy-medium",
        "notes": "Technology."
      }
    ]
  },
  {
    "id": "bonus",
    "name": "Bonus Question",
    "shortName": "Bonus",
    "blurb": "The published three-point bonus question for November 10.",
    "infoBox": "<strong>Bonus:</strong> identify the performer behind the stage name.",
    "type": "quiz",
    "items": [
      {
        "q": "What is Macklemore's real name?",
        "a": "Benjamin Hammond \"Ben\" Haggerty"
      }
    ]
  }
];
