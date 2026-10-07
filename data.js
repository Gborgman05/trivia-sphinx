// Study content for "Beat the Geek" trivia night.
// Categories confirmed from the Oct. 13, 2026 event listing at Juanita Cantina (Ben, 7:30pm):
// Current Events, Board Games, Pictures – Squares, Music – Songs with Repeating Titles, and Before and After.
// Bonus: Where did Ben Affleck attend college? – 3 pts.
// The visual Pictures – Squares round (round 3) is intentionally omitted. This is the curated
// 120-question set from trivia-2026-10-13-juanita-cantina.csv.
// Music links are Spotify-only this week (YouTube could not be vetted); no youtubeId/startSeconds.
// difficulty preserves the CSV tiers: "easy-medium" | "medium" | "medium-hard".

const CATEGORIES = [
  {
    "id": "current-events",
    "name": "Current Events",
    "shortName": "Current Events",
    "blurb": "Headlines, sports results, awards, and milestones from roughly the past year.",
    "infoBox": "<strong>Study tip:</strong> pair each event with its date, winner, and runner-up; questions may ask for either side.",
    "type": "quiz",
    "items": [
      {
        "q": "Which team won Super Bowl LX in February 2026, and who did they beat?",
        "a": "Seattle Seahawks (29-13 over the New England Patriots)",
        "difficulty": "easy-medium",
        "notes": "Played Feb 8, 2026 at Levi's Stadium; the Seahawks' second title."
      },
      {
        "q": "Who was named MVP of Super Bowl LX?",
        "a": "Kenneth Walker III",
        "difficulty": "medium-hard",
        "notes": "First running back to win Super Bowl MVP since Terrell Davis (Super Bowl XXXII)."
      },
      {
        "q": "Which country won the 2026 FIFA World Cup?",
        "a": "Spain",
        "difficulty": "easy-medium",
        "notes": "Beat Argentina 1-0 after extra time in the July 19, 2026 final at MetLife Stadium; Spain's second title after 2010."
      },
      {
        "q": "Which Dodgers pitcher was named 2025 World Series MVP?",
        "a": "Yoshinobu Yamamoto",
        "difficulty": "medium",
        "notes": "Dodgers beat the Blue Jays in 7 games; Game 7 went 11 innings, 5-4."
      },
      {
        "q": "The New York Knicks won the 2026 NBA title, their first since 1973, by beating which team?",
        "a": "San Antonio Spurs",
        "difficulty": "medium",
        "notes": "Knicks closed out the Finals in five games."
      },
      {
        "q": "Which Knicks guard was named 2026 NBA Finals MVP?",
        "a": "Jalen Brunson",
        "difficulty": "medium",
        "notes": "Scored 45 points in the clinching Game 5."
      },
      {
        "q": "Which team beat the Vegas Golden Knights to win the 2026 Stanley Cup?",
        "a": "Carolina Hurricanes",
        "difficulty": "medium",
        "notes": "Won the Final 4-2 in June 2026; their first Cup since 2006."
      },
      {
        "q": "Which Hurricanes forward won the 2026 Conn Smythe Trophy as playoff MVP?",
        "a": "Jordan Staal",
        "difficulty": "medium-hard",
        "notes": ""
      },
      {
        "q": "Which film won Best Picture at the 2026 Academy Awards (98th Oscars)?",
        "a": "One Battle After Another",
        "difficulty": "easy-medium",
        "notes": "Directed by Paul Thomas Anderson, who also won Best Director."
      },
      {
        "q": "Which actor won Best Actor at the 2026 Oscars for his role in Sinners?",
        "a": "Michael B. Jordan",
        "difficulty": "easy-medium",
        "notes": ""
      },
      {
        "q": "Jessie Buckley won her first Oscar, Best Actress, for which 2025 film?",
        "a": "Hamnet",
        "difficulty": "medium",
        "notes": ""
      },
      {
        "q": "Whose album Debí Tirar Más Fotos won Album of the Year at the 2026 Grammys, the first fully Spanish-language winner of the award?",
        "a": "Bad Bunny",
        "difficulty": "easy-medium",
        "notes": "Grammys held Feb 1, 2026."
      },
      {
        "q": "Who won the 2025 Nobel Peace Prize?",
        "a": "María Corina Machado",
        "difficulty": "easy-medium",
        "notes": "Venezuelan opposition leader."
      },
      {
        "q": "Which Hungarian author won the 2025 Nobel Prize in Literature?",
        "a": "László Krasznahorkai",
        "difficulty": "medium-hard",
        "notes": "The second Hungarian laureate in Literature after Imre Kertész (2002)."
      },
      {
        "q": "Which Canadian Space Agency astronaut flew on Artemis II, the crewed lunar flyby that launched April 1, 2026?",
        "a": "Jeremy Hansen",
        "difficulty": "medium",
        "notes": "Crew: Reid Wiseman, Victor Glover, Christina Koch, Jeremy Hansen; splashed down off San Diego April 10, 2026."
      },
      {
        "q": "Which country won the 2026 Eurovision Song Contest in Vienna with the song \"Bangaranga\"?",
        "a": "Bulgaria",
        "difficulty": "medium",
        "notes": "Performed by DARA; Bulgaria's first Eurovision win."
      },
      {
        "q": "Which country finished first in the gold medal count at the 2026 Milan Cortina Winter Olympics?",
        "a": "Norway",
        "difficulty": "medium",
        "notes": "Norway won 18 golds; the US won a record 12 golds, finishing second."
      },
      {
        "q": "Who won the men's singles title at Wimbledon 2026?",
        "a": "Jannik Sinner",
        "difficulty": "easy-medium",
        "notes": "Beat Alexander Zverev in four sets in the final."
      },
      {
        "q": "Which German player won his first Grand Slam singles title at the 2026 French Open?",
        "a": "Alexander Zverev",
        "difficulty": "medium",
        "notes": "Beat Flavio Cobolli in five sets in the final."
      },
      {
        "q": "Who won the 2026 Masters, becoming only the fourth player to win back-to-back?",
        "a": "Rory McIlroy",
        "difficulty": "easy-medium",
        "notes": "Finished one stroke ahead of Scottie Scheffler; the others to go back-to-back were Nicklaus, Faldo and Woods."
      },
      {
        "q": "Who won the 2026 Tour de France, his fifth title?",
        "a": "Tadej Pogačar",
        "difficulty": "medium",
        "notes": "Equalled Anquetil, Merckx, Hinault and Indurain at five."
      },
      {
        "q": "Which team won the 2026 College Football Playoff national championship, finishing a 16-0 season?",
        "a": "Indiana Hoosiers",
        "difficulty": "easy-medium",
        "notes": "Beat Miami 27-21 on Jan 19, 2026; QB Fernando Mendoza won the Heisman Trophy."
      },
      {
        "q": "In the October 2025 Louvre jewel heist, thieves took roughly how many minutes to steal crown jewels worth about €88 million?",
        "a": "About seven minutes",
        "difficulty": "medium",
        "notes": "Thieves used a basket lift to reach the Galerie d'Apollon on Oct 19, 2025."
      },
      {
        "q": "How many days did the record-setting US government shutdown that ended in November 2025 last?",
        "a": "43 days",
        "difficulty": "medium",
        "notes": "Ended Nov 12, 2025; the previous record was 34 days in 2018-19."
      },
      {
        "q": "Who was elected mayor of New York City in November 2025, defeating Andrew Cuomo and Curtis Sliwa?",
        "a": "Zohran Mamdani",
        "difficulty": "easy-medium",
        "notes": "Became the city's first Muslim mayor."
      },
      {
        "q": "TIME's 2025 Person of the Year was not an individual but which group?",
        "a": "The Architects of AI",
        "difficulty": "medium",
        "notes": "Included figures such as Sam Altman, Jensen Huang and Lisa Su."
      },
      {
        "q": "What was Merriam-Webster's 2025 Word of the Year, referring to low-quality AI-generated content?",
        "a": "Slop",
        "difficulty": "medium",
        "notes": "Oxford's 2025 Word of the Year was \"rage bait.\""
      },
      {
        "q": "Who became Japan's first female prime minister in October 2025?",
        "a": "Sanae Takaichi",
        "difficulty": "medium",
        "notes": "Elected by the Diet on Oct 21, 2025, succeeding Shigeru Ishiba."
      },
      {
        "q": "Which series won Outstanding Comedy Series at the 2026 Emmys, setting a record with 14 wins for a comedy?",
        "a": "Widow's Bay",
        "difficulty": "medium-hard",
        "notes": "The Pitt won Outstanding Drama Series."
      },
      {
        "q": "In October 2025, which company became the first to reach a $5 trillion market capitalization?",
        "a": "Nvidia",
        "difficulty": "easy-medium",
        "notes": "Reached the mark on Oct 29, 2025."
      }
    ]
  },
  {
    "id": "board-games",
    "name": "Board Games",
    "shortName": "Board Games",
    "blurb": "Classic and modern tabletop games: designers, publishers, rules, award winners, and origin stories.",
    "infoBox": "<strong>Study tip:</strong> link each game to its designer, year, and signature rule or component.",
    "type": "quiz",
    "items": [
      {
        "q": "Which German designer created The Settlers of Catan, first published in 1995?",
        "a": "Klaus Teuber",
        "difficulty": "medium",
        "notes": ""
      },
      {
        "q": "In Catan, what number rolled on the two dice activates the robber instead of producing resources?",
        "a": "7",
        "difficulty": "easy-medium",
        "notes": ""
      },
      {
        "q": "Ticket to Ride, which won the 2004 Spiel des Jahres, was designed by which American designer?",
        "a": "Alan R. Moon",
        "difficulty": "medium",
        "notes": "The original game's map is of North America."
      },
      {
        "q": "Which designer created the cooperative game Pandemic, released in 2008?",
        "a": "Matt Leacock",
        "difficulty": "medium",
        "notes": ""
      },
      {
        "q": "Wingspan, the 2019 bird-collecting engine builder from Stonemaier Games, was designed by whom?",
        "a": "Elizabeth Hargrave",
        "difficulty": "medium",
        "notes": ""
      },
      {
        "q": "Which Czech designer created the word-association game Codenames, published in 2015?",
        "a": "Vlaada Chvátil",
        "difficulty": "medium-hard",
        "notes": ""
      },
      {
        "q": "In Codenames, how many 'assassin' cards are in each game, ending the game instantly for whichever team's operatives pick it?",
        "a": "One",
        "difficulty": "medium",
        "notes": "The 5x5 grid has 25 words: 9 and 8 team agents, 7 bystanders, 1 assassin."
      },
      {
        "q": "Which woman patented The Landlord's Game in 1904, the forerunner of Monopoly?",
        "a": "Elizabeth (Lizzie) Magie",
        "difficulty": "medium",
        "notes": "Parker Brothers bought her patent in 1935 for $500."
      },
      {
        "q": "In 2013, Monopoly fans voted on Facebook to replace which classic token with a cat?",
        "a": "The iron",
        "difficulty": "easy-medium",
        "notes": ""
      },
      {
        "q": "Which Monopoly property is statistically the most-landed-on square among the colored properties?",
        "a": "Illinois Avenue",
        "difficulty": "medium-hard",
        "notes": "Boosted by Jail/Chance-card traffic; Jail itself is the most visited square overall."
      },
      {
        "q": "Does Mr. Monopoly (Rich Uncle Pennybags) wear a monocle?",
        "a": "No",
        "difficulty": "medium",
        "notes": "A classic Mandela effect: he has a top hat, mustache and bow tie but no monocle."
      },
      {
        "q": "In Clue, what is the name of the murder victim in the original U.S. version (called Dr. Black in the UK Cluedo)?",
        "a": "Mr. Boddy",
        "difficulty": "easy-medium",
        "notes": "The game was devised by English musician Anthony Pratt and published in 1949."
      },
      {
        "q": "Which French filmmaker, who also made the short film The Red Balloon, invented the game that became Risk?",
        "a": "Albert Lamorisse",
        "difficulty": "medium-hard",
        "notes": "The game debuted in France in 1957 as La Conquête du Monde."
      },
      {
        "q": "Which American architect invented Scrabble (originally called Criss-Crosswords) in 1938?",
        "a": "Alfred Mosher Butts",
        "difficulty": "medium",
        "notes": "James Brunot bought the rights in 1948 and renamed it Scrabble."
      },
      {
        "q": "In Scrabble, how many points is the letter Q worth?",
        "a": "10",
        "difficulty": "easy-medium",
        "notes": ""
      },
      {
        "q": "In standard Scrabble, how many bonus points do you get for playing all seven tiles from your rack in one turn?",
        "a": "50",
        "difficulty": "medium",
        "notes": ""
      },
      {
        "q": "Which game's pie-shaped playing pieces are filled with wedges from six categories, and was created in 1979 by Chris Haney and Scott Abbott in Montreal?",
        "a": "Trivial Pursuit",
        "difficulty": "easy-medium",
        "notes": "It was first sold in Canada in 1981."
      },
      {
        "q": "Pictionary was created by a waiter in which U.S. city?",
        "a": "Seattle",
        "difficulty": "medium",
        "notes": "Rob Angel's Angel Games rolled the game out in 1985."
      },
      {
        "q": "What 1983 wooden-block stacking game takes its name from the Swahili word for 'to build'?",
        "a": "Jenga",
        "difficulty": "medium",
        "notes": "Created by Leslie Scott, who grew up speaking Swahili."
      },
      {
        "q": "Candy Land was invented in 1948 by a retired schoolteacher recovering from which disease?",
        "a": "Polio",
        "difficulty": "medium",
        "notes": "Eleanor Abbott designed it to entertain children in a San Diego hospital."
      },
      {
        "q": "Which two-player guessing game, originally released in Dutch in 1979 as 'Wie is het?', has players flip down faces of characters?",
        "a": "Guess Who?",
        "difficulty": "easy-medium",
        "notes": "Designed by Israeli inventors Ora and Theo Coster."
      },
      {
        "q": "Connect Four is played on a grid with how many columns and rows?",
        "a": "7 columns and 6 rows",
        "difficulty": "medium",
        "notes": ""
      },
      {
        "q": "Carcassonne, designed by Klaus-Jürgen Wrede in 2000, has players place what type of pieces on the board to claim features?",
        "a": "Meeples (followers)",
        "difficulty": "medium",
        "notes": "The tile-laying game is named for a fortified city in southern France."
      },
      {
        "q": "Which designer's 2008 game Dominion launched the deck-building genre and won the 2009 Spiel des Jahres?",
        "a": "Donald X. Vaccarino",
        "difficulty": "medium-hard",
        "notes": ""
      },
      {
        "q": "What was the first game to win the Spiel des Jahres, in 1979?",
        "a": "Hare and Tortoise (Hase und Igel)",
        "difficulty": "medium-hard",
        "notes": "Designed by Dave Parlett."
      },
      {
        "q": "Azul, the 2018 Spiel des Jahres winner by Michael Kiesling, has players drafting colorful tiles to decorate the walls of a palace in which country?",
        "a": "Portugal",
        "difficulty": "medium",
        "notes": "The tiles are inspired by Portuguese azulejos."
      },
      {
        "q": "In the 2016 game Terraforming Mars, players take on the role of what, working to raise temperature, oxygen and ocean coverage?",
        "a": "Corporations",
        "difficulty": "medium",
        "notes": "Designed by Jacob Fryxelius and published by FryxGames."
      },
      {
        "q": "Diplomacy, designed by Allan B. Calhamer, has players controlling one of seven Great Powers of Europe starting in which year?",
        "a": "1901",
        "difficulty": "medium-hard",
        "notes": "The game has no dice; movement is resolved by simultaneously written orders."
      },
      {
        "q": "In Catan, which resource is needed along with brick to build a road?",
        "a": "Lumber (wood)",
        "difficulty": "easy-medium",
        "notes": "Roads cost one brick and one lumber."
      },
      {
        "q": "In Pandemic, players race to cure how many different diseases?",
        "a": "Four",
        "difficulty": "easy-medium",
        "notes": "The diseases are blue, yellow, black and red."
      }
    ]
  },
  {
    "id": "songs-with-repeating-titles",
    "name": "Music – Songs with Repeating Titles",
    "shortName": "Repeating Titles",
    "blurb": "Hit songs whose titles repeat a word or phrase, across decades and genres.",
    "infoBox": "<strong>How to practice:</strong> play each track with its title and performer hidden, then identify both before revealing the answer.",
    "type": "music",
    "items": [
      {
        "title": "Bye Bye Bye",
        "artist": "*NSYNC",
        "spotifyUrl": "https://open.spotify.com/track/62bOmKYxYg7dhrC6gH9vFn",
        "difficulty": "easy-medium",
        "notes": "Lead single from No Strings Attached (2000); it became the Deadpool & Wolverine trailer song in 2024."
      },
      {
        "title": "Ice Ice Baby",
        "artist": "Vanilla Ice",
        "spotifyUrl": "https://open.spotify.com/track/3XVozq1aeqsJwpXrEZrDJ9",
        "difficulty": "easy-medium",
        "notes": "Samples the bassline of Queen and David Bowie's \"Under Pressure\"; first hip-hop single to reach #1 on the Billboard Hot 100."
      },
      {
        "title": "Girls, Girls, Girls",
        "artist": "Mötley Crüe",
        "spotifyUrl": "https://open.spotify.com/track/3439OLNIeD3y68kVuoZUO5",
        "difficulty": "medium",
        "notes": "Title track of the band's 1987 album."
      },
      {
        "title": "Fun, Fun, Fun",
        "artist": "The Beach Boys",
        "spotifyUrl": "https://open.spotify.com/track/7fW1OwQPexk5OWCj7CSpqU",
        "difficulty": "medium",
        "notes": "1964 hit about a girl who takes her dad's T-Bird; this is the remastered 2001 version from Shut Down Volume 2."
      },
      {
        "title": "Da Da Da",
        "artist": "Trio",
        "spotifyUrl": "https://open.spotify.com/track/6S0O1LpQtGyALQ9TVurDMU",
        "difficulty": "medium",
        "notes": "German Neue Deutsche Welle hit (1982) full title \"Da Da Da, I Don't Love You You Don't Love Me, Aha Aha Aha\"; famously used in a Volkswagen Golf ad."
      },
      {
        "title": "Dance, Dance",
        "artist": "Fall Out Boy",
        "spotifyUrl": "https://open.spotify.com/track/0a7BloCiNzLDD9qSQHh5m7",
        "difficulty": "medium",
        "notes": "From From Under the Cork Tree (2005)."
      },
      {
        "title": "Cherry, Cherry",
        "artist": "Neil Diamond",
        "spotifyUrl": "https://open.spotify.com/track/24aHrSsj9oR5MdDBUlXynM",
        "difficulty": "medium-hard",
        "notes": "Neil Diamond's first Top 10 hit as a performer (1966)."
      },
      {
        "title": "Money, Money, Money",
        "artist": "ABBA",
        "spotifyUrl": "https://open.spotify.com/track/3lKN03PDeBnXZS7sDukRBt",
        "difficulty": "medium",
        "notes": "From the album Arrival (1976)."
      },
      {
        "title": "Boom, Boom, Boom, Boom!!",
        "artist": "Vengaboys",
        "spotifyUrl": "https://open.spotify.com/track/5N6M8yDiMV32T6Rkzh8EbW",
        "difficulty": "medium",
        "notes": "Dutch Eurodance group's 1998 hit."
      },
      {
        "title": "Mmm Mmm Mmm Mmm",
        "artist": "Crash Test Dummies",
        "spotifyUrl": "https://open.spotify.com/track/76nvqWPFucUra1xCkN1tnD",
        "difficulty": "easy-medium",
        "notes": "Canadian band's 1993 breakout hit; Brad Roberts sings the deep lead vocal."
      },
      {
        "title": "Everybody Everybody",
        "artist": "Black Box",
        "spotifyUrl": "https://open.spotify.com/track/6wBMTv8yTiNh50fqTkT0JC",
        "difficulty": "medium-hard",
        "notes": "1990 Italian house hit."
      },
      {
        "title": "Baby, Baby",
        "artist": "Amy Grant",
        "spotifyUrl": "https://open.spotify.com/track/3IDsegNBHC4pjGCOMTQYlU",
        "difficulty": "medium",
        "notes": "Amy Grant's 1991 pop crossover hit from Heart in Motion."
      },
      {
        "title": "Bang Bang",
        "artist": "Jessie J, Ariana Grande & Nicki Minaj",
        "spotifyUrl": "https://open.spotify.com/track/0puf9yIluy9W0vpMEUoAnN",
        "difficulty": "easy-medium",
        "notes": "2014 pop collaboration; not to be confused with Cher's and Nancy Sinatra's \"Bang Bang (My Baby Shot Me Down)\"."
      },
      {
        "title": "Down Down",
        "artist": "Status Quo",
        "spotifyUrl": "https://open.spotify.com/track/5vVZaiK2mIL9WE1GWikOE6",
        "difficulty": "medium-hard",
        "notes": "The British rock band's only UK #1 single, from 1975."
      },
      {
        "title": "Mony Mony",
        "artist": "Billy Idol",
        "spotifyUrl": "https://open.spotify.com/track/7gIQrP5rRbb0BX8lFEnTwg",
        "difficulty": "medium",
        "notes": "Billy Idol's 1987 cover of the Tommy James and the Shondells hit."
      },
      {
        "title": "Na Na Hey Hey (Kiss Him Goodbye)",
        "artist": "Steam",
        "spotifyUrl": "https://open.spotify.com/track/2cyb9YEJF9x9p0snXC5PtF",
        "difficulty": "medium",
        "notes": "1969 #1 hit by a fictitious studio 'band'; later a sports-arena singalong."
      },
      {
        "title": "Please Please Please",
        "artist": "Sabrina Carpenter",
        "spotifyUrl": "https://open.spotify.com/track/3en83k4guqoZjiGikLCXmF",
        "difficulty": "easy-medium",
        "notes": "From Short n' Sweet (2024); a remix featuring Dolly Parton is on the deluxe edition."
      },
      {
        "title": "Que Sera, Sera",
        "artist": "Doris Day",
        "spotifyUrl": "https://open.spotify.com/track/3RwY5743QUDDkd8KKxJJcN",
        "difficulty": "medium",
        "notes": "Won the 1956 Best Original Song Oscar; from The Man Who Knew Too Much. Full title: Que Sera, Sera (Whatever Will Be, Will Be)."
      },
      {
        "title": "Ring Ring",
        "artist": "ABBA",
        "spotifyUrl": "https://open.spotify.com/track/4RRbO7irEWPZ80DIHmtia4",
        "difficulty": "medium",
        "notes": "Title track of ABBA's 1973 debut album."
      },
      {
        "title": "Round and Round",
        "artist": "Ratt",
        "spotifyUrl": "https://open.spotify.com/track/6QKToMy6096oooFMGEXije",
        "difficulty": "medium",
        "notes": "From Out of the Cellar (1984); peaked at #12 on the Hot 100."
      },
      {
        "title": "Say Say Say",
        "artist": "Paul McCartney & Michael Jackson",
        "spotifyUrl": "https://open.spotify.com/track/5AbrdOBpQBsokNEoHCBdph",
        "difficulty": "easy-medium",
        "notes": "From Pipes of Peace (1983). Spotify track is the remastered 2015 version."
      },
      {
        "title": "Sugar, Sugar",
        "artist": "The Archies",
        "spotifyUrl": "https://open.spotify.com/track/3iSws76HjaU7k49EqJVTfF",
        "difficulty": "easy-medium",
        "notes": "Fictional cartoon band; 1969 #1 hit."
      },
      {
        "title": "Swish Swish",
        "artist": "Katy Perry ft. Nicki Minaj",
        "spotifyUrl": "https://open.spotify.com/track/4jgvPFeCE4V2HkYX6luV9B",
        "difficulty": "easy-medium",
        "notes": "From Witness (2017)."
      },
      {
        "title": "Shake Shake Shake (Shake Your Booty)",
        "artist": "KC and the Sunshine Band",
        "spotifyUrl": "https://open.spotify.com/track/4vrYuVd5Hj7KKKfcSHYe50",
        "difficulty": "medium",
        "notes": "Spotify lists it as '(Shake Shake Shake) Shake Your Booty'."
      },
      {
        "title": "Tonight, Tonight",
        "artist": "The Smashing Pumpkins",
        "spotifyUrl": "https://open.spotify.com/track/1ulWieXWAXHtK0qtMwN4DG",
        "difficulty": "medium",
        "notes": "From Mellon Collie and the Infinite Sadness (1995)."
      },
      {
        "title": "Turn! Turn! Turn! (To Everything There Is a Season)",
        "artist": "The Byrds",
        "spotifyUrl": "https://open.spotify.com/track/524FErAnPu3GkH30PMcqRF",
        "difficulty": "medium-hard",
        "notes": "Lyrics adapted from Ecclesiastes; Pete Seeger wrote the music. Spotify track is from the 1967 compilation."
      },
      {
        "title": "Wild Wild West",
        "artist": "Will Smith ft. Dru Hill & Kool Moe Dee",
        "spotifyUrl": "https://open.spotify.com/track/1gbAcoNHzrR7MmiMXYUIq2",
        "difficulty": "easy-medium",
        "notes": "From the 1999 film of the same name; samples Stevie Wonder's 'I Wish'."
      },
      {
        "title": "Yummy Yummy Yummy",
        "artist": "Ohio Express",
        "spotifyUrl": "https://open.spotify.com/track/10eXLl6hZ8myKtORUXSYXD",
        "difficulty": "medium-hard",
        "notes": "1968 bubblegum hit."
      },
      {
        "title": "Yakety Yak",
        "artist": "The Coasters",
        "spotifyUrl": "https://open.spotify.com/track/78KVBUfmHquq4ljOHSmM9F",
        "difficulty": "medium",
        "notes": "1958 #1 hit written by Leiber and Stoller."
      },
      {
        "title": "Ob-La-Di, Ob-La-Da",
        "artist": "The Beatles",
        "spotifyUrl": "https://open.spotify.com/track/1gFNm7cXfG1vSMcxPpSxec",
        "difficulty": "easy-medium",
        "notes": "From The Beatles (White Album, 1968). Spotify track is the 2009 remaster."
      }
    ]
  },
  {
    "id": "before-and-after",
    "name": "Before and After",
    "shortName": "Before & After",
    "blurb": "Two titles or names that share an overlapping word and merge into one phrase.",
    "infoBox": "<strong>Study tip:</strong> identify both halves first, then look for the word they share.",
    "type": "quiz",
    "items": [
      {
        "q": "Margaret Mitchell's Civil War epic + Kenneth Grahame's tale of Mole, Rat, and Toad",
        "a": "Gone with the Wind in the Willows",
        "difficulty": "medium",
        "notes": "(Gone with the Wind + The Wind in the Willows)"
      },
      {
        "q": "Dinosaur-theme-park blockbuster + famous Manhattan avenue lined with luxury apartments",
        "a": "Jurassic Park Avenue",
        "difficulty": "easy-medium",
        "notes": "(Jurassic Park + Park Avenue)"
      },
      {
        "q": "Disney's Simba movie + giant ape who climbs the Empire State Building",
        "a": "The Lion King Kong",
        "difficulty": "easy-medium",
        "notes": "(The Lion King + King Kong)"
      },
      {
        "q": "1987 Patrick Swayze film with the lift + ABC celebrity ballroom competition",
        "a": "Dirty Dancing with the Stars",
        "difficulty": "easy-medium",
        "notes": "(Dirty Dancing + Dancing with the Stars)"
      },
      {
        "q": "Julia Roberts film with Richard Gere + 2022 Viola Davis action epic about Dahomey warriors",
        "a": "Pretty Woman King",
        "difficulty": "medium",
        "notes": "(Pretty Woman + The Woman King)"
      },
      {
        "q": "Macaulay Culkin holiday comedy + video-game/horror franchise set in a haunted mansion",
        "a": "Home Alone in the Dark",
        "difficulty": "medium",
        "notes": "(Home Alone + Alone in the Dark)"
      },
      {
        "q": "Natalie Portman ballet thriller + Tchaikovsky ballet with Odette and Odile",
        "a": "Black Swan Lake",
        "difficulty": "easy-medium",
        "notes": "(Black Swan + Swan Lake)"
      },
      {
        "q": "Post-apocalyptic Mel Gibson franchise + 1980s computer-generated TV host who stuttered",
        "a": "Mad Max Headroom",
        "difficulty": "medium",
        "notes": "(Mad Max + Max Headroom)"
      },
      {
        "q": "1982 Sean Penn teen comedy with Jeff Spicoli + Disney Channel film starring Zac Efron and Vanessa Hudgens",
        "a": "Fast Times at Ridgemont High School Musical",
        "difficulty": "medium",
        "notes": "(Fast Times at Ridgemont High + High School Musical)"
      },
      {
        "q": "Rob Reiner fairy-tale film (\"As you wish\") + 1935 James Whale sequel starring Elsa Lanchester",
        "a": "The Princess Bride of Frankenstein",
        "difficulty": "medium",
        "notes": "(The Princess Bride + Bride of Frankenstein)"
      },
      {
        "q": "George Lucas space saga + 15th-century English dynastic conflict between Lancaster and York",
        "a": "Star Wars of the Roses",
        "difficulty": "easy-medium",
        "notes": "(Star Wars + Wars of the Roses)"
      },
      {
        "q": "1977 John Travolta disco film + Nick Hornby memoir about being an Arsenal fan",
        "a": "Saturday Night Fever Pitch",
        "difficulty": "medium",
        "notes": "(Saturday Night Fever + Fever Pitch)"
      },
      {
        "q": "Bill Murray film about a time loop in Punxsutawney + Roland Emmerich climate disaster film",
        "a": "Groundhog Day After Tomorrow",
        "difficulty": "easy-medium",
        "notes": "(Groundhog Day + The Day After Tomorrow)"
      },
      {
        "q": "North American mountain range stretching from Canada to New Mexico + citrus-flavored caffeinated soda",
        "a": "Rocky Mountain Dew",
        "difficulty": "easy-medium",
        "notes": "(Rocky Mountains + Mountain Dew)"
      },
      {
        "q": "CBS sitcom about Sheldon, Leonard, and Penny + 2014 Stephen Hawking biopic starring Eddie Redmayne",
        "a": "The Big Bang Theory of Everything",
        "difficulty": "easy-medium",
        "notes": "(The Big Bang Theory + The Theory of Everything)"
      },
      {
        "q": "AMC drama about chemistry teacher Walter White + Will Smith and Martin Lawrence buddy-cop franchise",
        "a": "Breaking Bad Boys",
        "difficulty": "easy-medium",
        "notes": "(Breaking Bad + Bad Boys)"
      },
      {
        "q": "Netflix women's-prison dramedy about Piper Chapman + Netflix sci-fi anthology about technology's dark side",
        "a": "Orange Is the New Black Mirror",
        "difficulty": "medium",
        "notes": "(Orange Is the New Black + Black Mirror)"
      },
      {
        "q": "Netflix series set in Hawkins, Indiana + Chinua Achebe's 1958 novel about Okonkwo",
        "a": "Stranger Things Fall Apart",
        "difficulty": "medium",
        "notes": "(Stranger Things + Things Fall Apart)"
      },
      {
        "q": "ABC medical drama set at Seattle Grace + 2023 Palme d'Or-winning courtroom drama starring Sandra Hüller",
        "a": "Grey's Anatomy of a Fall",
        "difficulty": "medium-hard",
        "notes": "(Grey's Anatomy + Anatomy of a Fall)"
      },
      {
        "q": "ABC sitcom about the Pritchetts and Dunphys + Seth MacFarlane cartoon about the Griffins",
        "a": "Modern Family Guy",
        "difficulty": "easy-medium",
        "notes": "(Modern Family + Family Guy)"
      },
      {
        "q": "HBO show about Carrie Bradshaw + 1998 Nicolas Cage and Meg Ryan romantic fantasy",
        "a": "Sex and the City of Angels",
        "difficulty": "medium",
        "notes": "(Sex and the City + City of Angels)"
      },
      {
        "q": "Harper Lee novel about Atticus Finch + fictional street address of the Munster family",
        "a": "To Kill a Mockingbird Lane",
        "difficulty": "medium",
        "notes": "(To Kill a Mockingbird + Mockingbird Lane)"
      },
      {
        "q": "Katniss Everdeen's dystopian series + Eric Berne's 1964 book on psychology of social interactions (also a Joe South hit)",
        "a": "The Hunger Games People Play",
        "difficulty": "medium-hard",
        "notes": "(The Hunger Games + Games People Play)"
      },
      {
        "q": "Tolkien's fantasy trilogy + the planet with the most famous ring system",
        "a": "Lord of the Rings of Saturn",
        "difficulty": "medium",
        "notes": "(The Lord of the Rings + Rings of Saturn)"
      },
      {
        "q": "John Steinbeck novella about George and Lennie + Will Smith and Tommy Lee Jones alien-hunting film",
        "a": "Of Mice and Men in Black",
        "difficulty": "easy-medium",
        "notes": "(Of Mice and Men + Men in Black)"
      },
      {
        "q": "Gal Gadot's Amazonian superhero + Susan Hill ghost story (adapted with Daniel Radcliffe)",
        "a": "Wonder Woman in Black",
        "difficulty": "medium",
        "notes": "(Wonder Woman + The Woman in Black)"
      },
      {
        "q": "Steven Soderbergh heist film starring George Clooney + Daniel Humm's NYC restaurant overlooking a park",
        "a": "Ocean's Eleven Madison Park",
        "difficulty": "medium-hard",
        "notes": "(Ocean's Eleven + Eleven Madison Park)"
      },
      {
        "q": "\"Folsom Prison Blues\" singer, the Man in Black + Discovery game show where the host drives a taxi quizzing riders",
        "a": "Johnny Cash Cab",
        "difficulty": "medium",
        "notes": "(Johnny Cash + Cash Cab)"
      },
      {
        "q": "School of Rock actor and Tenacious D frontman + the shopping day after Thanksgiving",
        "a": "Jack Black Friday",
        "difficulty": "easy-medium",
        "notes": "(Jack Black + Black Friday)"
      },
      {
        "q": "\"Roar\" and \"Firework\" pop star + Raymond Burr's fictional defense attorney",
        "a": "Katy Perry Mason",
        "difficulty": "easy-medium",
        "notes": "(Katy Perry + Perry Mason)"
      }
    ]
  },
  {
    "id": "bonus",
    "name": "Bonus Question",
    "shortName": "Bonus",
    "blurb": "The published three-point bonus question for October 13.",
    "infoBox": "<strong>Bonus:</strong> learn the answer, then review related facts so differently worded versions do not trip you up.",
    "type": "quiz",
    "items": [
      {
        "q": "Where did Ben Affleck attend college?",
        "a": "Occidental College",
        "notes": "Affleck briefly attended the University of Vermont before Occidental College in Los Angeles; he left without graduating."
      }
    ]
  }
];
