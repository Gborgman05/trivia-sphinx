// Study content for "Beat the Geek" trivia night.
// Categories confirmed from the Oct. 6, 2026 event listing at Juanita Cantina (Ben, 7:30pm):
// TV Character Catchphrases, Ancient Rome, Rebuses, Disney Covers, and Potpourri.
// Bonus: What is the 3rd largest island (by area) in the world?
// The visual Rebuses round (round 3) is intentionally omitted. This is the curated
// 120-question set from trivia-2026-10-06-juanita-cantina.csv.
// difficulty preserves the CSV tiers: "easy-medium" | "medium" | "medium-hard".

const CATEGORIES = [
  {
    "id": "tv-character-catchphrases",
    "name": "TV Character Catchphrases",
    "shortName": "TV Catchphrases",
    "blurb": "Match signature lines to the television characters and series that made them famous, from classic sitcoms to modern animation.",
    "infoBox": "<strong>Study tip:</strong> connect each quotation to both the speaker and the show; either may be the missing part of a clue.",
    "type": "quiz",
    "items": [
      {
        "q": "Which animated TV dad is famous for exclaiming \"D'oh!\"?",
        "a": "Homer Simpson",
        "difficulty": "easy-medium",
        "notes": "The character is voiced by Dan Castellaneta on The Simpsons."
      },
      {
        "q": "\"How you doin'?\" is the signature pickup line of which Friends character?",
        "a": "Joey Tribbiani",
        "difficulty": "easy-medium",
        "notes": "Matt LeBlanc played Joey throughout the sitcom's original run."
      },
      {
        "q": "Which Diff'rent Strokes character made \"What'choo talkin' 'bout, Willis?\" his trademark response?",
        "a": "Arnold Jackson",
        "difficulty": "easy-medium",
        "notes": "Gary Coleman played Arnold; published versions vary slightly in spelling but preserve this wording."
      },
      {
        "q": "\"Did I do that?\" was the catchphrase of which accident-prone Family Matters character?",
        "a": "Steve Urkel",
        "difficulty": "easy-medium",
        "notes": "Jaleel White played the Winslows' nerdy neighbor Steve Urkel."
      },
      {
        "q": "Which physicist on The Big Bang Theory punctuated his pranks with \"Bazinga!\"?",
        "a": "Sheldon Cooper",
        "difficulty": "easy-medium",
        "notes": "Jim Parsons played Sheldon Cooper."
      },
      {
        "q": "Which How I Met Your Mother character repeatedly urged his friends to \"Suit up!\"?",
        "a": "Barney Stinson",
        "difficulty": "easy-medium",
        "notes": "Neil Patrick Harris played the suit-obsessed Barney."
      },
      {
        "q": "On Seinfeld, which minor character barks \"No soup for you!\" at customers who break his rules?",
        "a": "The Soup Nazi",
        "difficulty": "easy-medium",
        "notes": "Larry Thomas played the character Yev Kassem in the episode The Soup Nazi."
      },
      {
        "q": "\"That's what she said\" became a reflexive punch line for which boss on the U.S. version of The Office?",
        "a": "Michael Scott",
        "difficulty": "easy-medium",
        "notes": "Steve Carell played Dunder Mifflin manager Michael Scott."
      },
      {
        "q": "Which Stone Age cartoon father shouts \"Yabba dabba doo!\"?",
        "a": "Fred Flintstone",
        "difficulty": "easy-medium",
        "notes": "Fred is the central character of The Flintstones."
      },
      {
        "q": "Which Star Trek character is most associated with the Vulcan farewell \"Live long and prosper\"?",
        "a": "Spock",
        "difficulty": "easy-medium",
        "notes": "Spock accompanies the phrase with the Vulcan salute."
      },
      {
        "q": "Captain Jean-Luc Picard's command \"Make it so\" comes from which Star Trek series?",
        "a": "Star Trek: The Next Generation",
        "difficulty": "medium",
        "notes": "Patrick Stewart played Captain Picard on the series."
      },
      {
        "q": "Which Hawaii Five-O detective captain regularly ordered \"Book 'em, Danno!\"?",
        "a": "Steve McGarrett",
        "difficulty": "medium",
        "notes": "Jack Lord played McGarrett in the original 1968 series."
      },
      {
        "q": "\"Just one more thing...\" is the deceptively casual refrain of which rumpled TV detective?",
        "a": "Columbo",
        "difficulty": "medium",
        "notes": "Peter Falk's Lieutenant Columbo often used the line as he turned back to a suspect."
      },
      {
        "q": "Which lollipop-loving TV detective asked \"Who loves ya, baby?\"?",
        "a": "Theo Kojak",
        "difficulty": "medium",
        "notes": "Telly Savalas played Lieutenant Theo Kojak on Kojak."
      },
      {
        "q": "\"I love it when a plan comes together\" belongs to which leader of The A-Team?",
        "a": "John \"Hannibal\" Smith",
        "difficulty": "medium",
        "notes": "George Peppard played Colonel John Hannibal Smith."
      },
      {
        "q": "On Lost in Space, which nonhuman character warned \"Danger, Will Robinson!\"?",
        "a": "The Robot",
        "difficulty": "medium",
        "notes": "The Robot served as a protector and companion to young Will Robinson."
      },
      {
        "q": "\"Exterminate!\" is the battle cry of what recurring Doctor Who villains?",
        "a": "The Daleks",
        "difficulty": "medium",
        "notes": "The Daleks debuted in Doctor Who in 1963."
      },
      {
        "q": "Which Friday Night Lights coach leads the chant \"Clear eyes, full hearts, can't lose\"?",
        "a": "Eric Taylor",
        "difficulty": "medium",
        "notes": "Kyle Chandler played Dillon Panthers coach Eric Taylor."
      },
      {
        "q": "\"Everybody lies\" is the diagnostic credo of which title character on House?",
        "a": "Dr. Gregory House",
        "difficulty": "medium",
        "notes": "Hugh Laurie played the brilliant and abrasive diagnostician."
      },
      {
        "q": "\"The truth is out there\" is most closely associated with which believer on The X-Files?",
        "a": "Fox Mulder",
        "difficulty": "medium",
        "notes": "David Duchovny played FBI agent Fox Mulder."
      },
      {
        "q": "Sgt. Phil Esterhaus ended roll call with \"Let's be careful out there\" on what police drama?",
        "a": "Hill Street Blues",
        "difficulty": "medium-hard",
        "notes": "Michael Conrad played Esterhaus during the show's early seasons."
      },
      {
        "q": "\"Would you believe...?\" introduced increasingly desperate bluffs by which bumbling secret agent?",
        "a": "Maxwell Smart",
        "difficulty": "medium-hard",
        "notes": "Don Adams played Agent 86 on Get Smart."
      },
      {
        "q": "Which Fantasy Island character announced arriving guests by shouting \"De plane! De plane!\"?",
        "a": "Tattoo",
        "difficulty": "medium-hard",
        "notes": "Hervé Villechaize played Tattoo on the original series."
      },
      {
        "q": "\"Kiss my grits!\" was the trademark put-down of which waitress on Alice?",
        "a": "Florence \"Flo\" Castleberry",
        "difficulty": "medium-hard",
        "notes": "Polly Holliday played Flo and later carried the character into a spin-off."
      },
      {
        "q": "Which Good Times character made \"Dy-no-mite!\" a 1970s television catchphrase?",
        "a": "J.J. Evans",
        "difficulty": "medium-hard",
        "notes": "Jimmie Walker played James J.J. Evans Jr."
      },
      {
        "q": "\"Marcia, Marcia, Marcia!\" is the frustrated cry of which Brady Bunch sister?",
        "a": "Jan Brady",
        "difficulty": "medium-hard",
        "notes": "Eve Plumb played middle sister Jan Brady."
      },
      {
        "q": "Which alien title character on Mork & Mindy used the Orkan greeting \"Na-Nu, Na-Nu\"?",
        "a": "Mork",
        "difficulty": "medium-hard",
        "notes": "Robin Williams played Mork from the planet Ork."
      },
      {
        "q": "\"You rang?\" was the deadpan response of which towering Addams Family servant?",
        "a": "Lurch",
        "difficulty": "medium-hard",
        "notes": "Ted Cassidy played Lurch in the 1960s television series."
      },
      {
        "q": "\"Nip it in the bud!\" was the emphatic advice of which deputy on The Andy Griffith Show?",
        "a": "Barney Fife",
        "difficulty": "medium-hard",
        "notes": "Don Knotts played Mayberry deputy Barney Fife."
      },
      {
        "q": "Which animated sci-fi character cries \"Wubba Lubba Dub-Dub\"?",
        "a": "Rick Sanchez",
        "difficulty": "medium-hard",
        "notes": "Rick uses the phrase on Rick and Morty."
      }
    ]
  },
  {
    "id": "ancient-rome",
    "name": "Ancient Rome",
    "shortName": "Ancient Rome",
    "blurb": "The Roman Republic and Empire: rulers, wars, engineering, religion, daily life, geography, and enduring Latin terms.",
    "infoBox": "<strong>Study tip:</strong> distinguish the Republic from the Empire and pair major people with their offices, wars, and monuments.",
    "type": "quiz",
    "items": [
      {
        "q": "What two annually elected officials were the highest ordinary magistrates of the Roman Republic?",
        "a": "Consuls",
        "difficulty": "easy-medium",
        "notes": "Each consul could veto the other; their one-year terms limited individual power."
      },
      {
        "q": "Which Roman officials could use a veto to protect plebeians from actions by magistrates?",
        "a": "Tribunes of the plebs",
        "difficulty": "medium",
        "notes": "The Latin word veto means \"I forbid.\""
      },
      {
        "q": "What was the name of Rome's earliest written law code, traditionally dated to 451-450 BCE?",
        "a": "The Twelve Tables",
        "difficulty": "easy-medium",
        "notes": "The code was produced amid conflict between patricians and plebeians."
      },
      {
        "q": "During the Republic, what elite body advised magistrates and became highly influential in finance and foreign policy?",
        "a": "The Senate",
        "difficulty": "easy-medium",
        "notes": "Its decrees carried great weight even though it was formally advisory."
      },
      {
        "q": "In a Republican emergency, what temporary office could be appointed with extraordinary authority?",
        "a": "Dictator",
        "difficulty": "medium",
        "notes": "Unlike the modern meaning, this was a recognized Roman magistracy appointed for a limited emergency."
      },
      {
        "q": "Who became Rome's first emperor in 27 BCE?",
        "a": "Augustus",
        "difficulty": "easy-medium",
        "notes": "Also known as Octavian, he ruled as princeps or \"first citizen.\""
      },
      {
        "q": "Under which emperor did the Roman Empire reach its greatest territorial extent in 117 CE?",
        "a": "Trajan",
        "difficulty": "medium",
        "notes": "Trajan ruled from 98 to 117 CE and was one of the Five Good Emperors."
      },
      {
        "q": "What four-ruler system of power sharing was introduced by Emperor Diocletian?",
        "a": "The Tetrarchy",
        "difficulty": "medium-hard",
        "notes": "It comprised two senior augusti and two junior caesars."
      },
      {
        "q": "Which emperor refounded Byzantium as Constantinople and made it an imperial capital?",
        "a": "Constantine I",
        "difficulty": "medium",
        "notes": "Constantine dedicated Constantinople in 330 CE."
      },
      {
        "q": "The death of which emperor in 68 CE ended the Julio-Claudian dynasty?",
        "a": "Nero",
        "difficulty": "medium",
        "notes": "Nero was the fifth Roman emperor and ruled from 54 to 68 CE."
      },
      {
        "q": "What was the name of the short sword closely associated with Roman legionaries?",
        "a": "Gladius",
        "difficulty": "easy-medium",
        "notes": "The classic gladius was a cut-and-thrust weapon roughly two feet long."
      },
      {
        "q": "What was the pilum carried by Roman legionaries?",
        "a": "A javelin",
        "difficulty": "medium",
        "notes": "Legionaries threw the pilum before closing with the gladius."
      },
      {
        "q": "A standard imperial Roman legion was commonly divided into ten units called what?",
        "a": "Cohorts",
        "difficulty": "medium",
        "notes": "The cohort replaced the smaller maniple as the legion's principal tactical unit."
      },
      {
        "q": "What professional Roman officer commanded a unit called a centuria?",
        "a": "Centurion",
        "difficulty": "easy-medium",
        "notes": "Centurions were the principal professional officers of the Roman army."
      },
      {
        "q": "Rome fought the three Punic Wars against what North African power?",
        "a": "Carthage",
        "difficulty": "easy-medium",
        "notes": "The wars ran from 264 to 146 BCE and ended with Carthage's destruction."
      },
      {
        "q": "On what river was the city of Rome founded?",
        "a": "The Tiber",
        "difficulty": "easy-medium",
        "notes": "Rome lies about 15 miles inland from the Tyrrhenian Sea."
      },
      {
        "q": "Which two major European rivers formed much of Rome's northern frontier?",
        "a": "The Rhine and the Danube",
        "difficulty": "medium",
        "notes": "Roman territory generally extended west of the Rhine and south of the Danube."
      },
      {
        "q": "What term did Romans use for a conquered territorial subdivision governed in Rome's name?",
        "a": "Province",
        "difficulty": "easy-medium",
        "notes": "The Latin provincia originally meant a magistrate's sphere of authority."
      },
      {
        "q": "What famous road begun in 312 BCE linked Rome southward toward Capua and later Brundisium?",
        "a": "The Appian Way",
        "difficulty": "medium",
        "notes": "It was the first great Roman military road and was commissioned by Appius Claudius Caecus."
      },
      {
        "q": "What force moved water through most Roman aqueduct channels?",
        "a": "Gravity",
        "difficulty": "easy-medium",
        "notes": "Engineers maintained a very gradual downward slope across long distances."
      },
      {
        "q": "What volcanic material did Roman builders mix with lime to make durable hydraulic cement?",
        "a": "Pozzolana",
        "difficulty": "medium-hard",
        "notes": "The mixture strengthened mortar and concrete and improved water resistance."
      },
      {
        "q": "What is the name of the circular opening at the center of the Pantheon's dome?",
        "a": "The oculus",
        "difficulty": "easy-medium",
        "notes": "The open oculus is the rotunda's principal direct source of light."
      },
      {
        "q": "What was the Colosseum called in ancient Rome?",
        "a": "The Flavian Amphitheater",
        "difficulty": "medium-hard",
        "notes": "Construction began under Vespasian, the first Flavian emperor; the name Colosseum arose later."
      },
      {
        "q": "The Vestal Virgins tended the sacred fire of which goddess?",
        "a": "Vesta",
        "difficulty": "easy-medium",
        "notes": "Vesta was the Roman goddess of the hearth; her priestesses traditionally served for 30 years."
      },
      {
        "q": "What kind of Roman religious official interpreted omens such as the flight and behavior of birds?",
        "a": "An augur",
        "difficulty": "medium",
        "notes": "Augurs sought signs of divine approval or disapproval before proposed actions."
      },
      {
        "q": "Which Roman god was honored by the winter festival Saturnalia?",
        "a": "Saturn",
        "difficulty": "easy-medium",
        "notes": "The festival featured suspended business, gift-giving, and temporary social license."
      },
      {
        "q": "What Latin term named the male legal head of a Roman household?",
        "a": "Paterfamilias",
        "difficulty": "medium",
        "notes": "He exercised patria potestas over descendants and household property, though that authority changed over time."
      },
      {
        "q": "What were the multi-story apartment or tenement buildings housing many ordinary Romans called?",
        "a": "Insulae",
        "difficulty": "medium",
        "notes": "The singular is insula; shops and workshops commonly occupied street level."
      },
      {
        "q": "Spanish, French, Italian, Portuguese, and Romanian developed primarily from what language of Rome?",
        "a": "Latin",
        "difficulty": "easy-medium",
        "notes": "These are called Romance languages because they descend from varieties of Latin used across the Roman world."
      },
      {
        "q": "Which Roman poet wrote the epic Aeneid about the Trojan hero Aeneas?",
        "a": "Virgil",
        "difficulty": "easy-medium",
        "notes": "The 12-book Latin epic links Aeneas with the legendary origins of Roman greatness."
      }
    ]
  },
  {
    "id": "disney-covers",
    "name": "Disney Covers",
    "shortName": "Disney Covers",
    "blurb": "Recognizable Disney songs reinterpreted by pop, rock, country, jazz, and alternative artists.",
    "infoBox": "<strong>How to practice:</strong> play each track with its title and performer hidden, then identify both before revealing the answer.",
    "type": "music",
    "items": [
      {
        "title": "A Spoonful of Sugar",
        "artist": "Kacey Musgraves",
        "youtubeId": "eWsj9wC9zMU",
        "spotifyUrl": "https://open.spotify.com/track/5ohYQZfcLlD4Lvf8lt3VCA",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "Country-pop cover of the Mary Poppins song, released on We Love Disney (2015)."
      },
      {
        "title": "Part of Your World",
        "artist": "Jessie J",
        "youtubeId": "Qd__KQryieg",
        "spotifyUrl": "https://open.spotify.com/track/4UW8c9JSzoyjErfmmMkInw",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "Pop-soul cover of the song from The Little Mermaid, released on We Love Disney (2015)."
      },
      {
        "title": "Colors of the Wind",
        "artist": "Tori Kelly",
        "youtubeId": "XpIMGamlvwg",
        "spotifyUrl": "https://open.spotify.com/track/7qgM0MdETmhd3mORTqvJRm",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "R&B-pop cover of the Pocahontas song, released on We Love Disney (2015)."
      },
      {
        "title": "Friend Like Me",
        "artist": "Ne-Yo",
        "youtubeId": "r21fH-ysABs",
        "spotifyUrl": "https://open.spotify.com/track/0GzjDErRS86SEetLDn2ZXN",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "R&B cover of the Aladdin song, released on We Love Disney (2015)."
      },
      {
        "title": "Zero to Hero",
        "artist": "Ariana Grande",
        "youtubeId": "4fTLqV17VZo",
        "spotifyUrl": "https://open.spotify.com/track/21DxcOtDKlVOlmeYed1IG3",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "Pop cover of the Hercules song, released on We Love Disney (2015)."
      },
      {
        "title": "I Wan'na Be Like You",
        "artist": "Fall Out Boy",
        "youtubeId": "uiI5Xh2520U",
        "spotifyUrl": "https://open.spotify.com/track/6zMNLIFrUss4qklFUdpzjp",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "Rock cover of the Jungle Book song, released on We Love Disney (2015)."
      },
      {
        "title": "Rainbow Connection",
        "artist": "Gwen Stefani",
        "youtubeId": "538UpUeRmqw",
        "spotifyUrl": "https://open.spotify.com/track/37guUG3IuyJBo0poxQ54gc",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "Pop cover of the Muppet Movie song, released on We Love Disney (2015)."
      },
      {
        "title": "A Dream Is a Wish Your Heart Makes",
        "artist": "Jessie Ware",
        "youtubeId": "k2HX9_AB0qg",
        "spotifyUrl": "https://open.spotify.com/track/4XECYwPN9YaGHTf7X9XJJA",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "Pop-soul cover of the Cinderella song, released on We Love Disney (2015)."
      },
      {
        "title": "Under the Sea",
        "artist": "Raven-Symoné",
        "youtubeId": "SCysAd3hQos",
        "spotifyUrl": "https://open.spotify.com/track/4HxukyGNRDjnZm3Q6jUDTT",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "Pop cover of the Little Mermaid song, released on Disneymania 3 (2005)."
      },
      {
        "title": "Zip-A-Dee-Doo-Dah",
        "artist": "Miley Cyrus",
        "youtubeId": "FPxdLa6ditw",
        "spotifyUrl": "https://open.spotify.com/track/6MIPvQ8kOzEf8mwrqbgUj2",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "Pop-rock cover of the Song of the South standard, released on Disneymania 4 (2006)."
      },
      {
        "title": "Poor Unfortunate Souls",
        "artist": "Jonas Brothers",
        "youtubeId": "t4lTWetaftw",
        "spotifyUrl": "https://open.spotify.com/track/1alCMHZkJxkP18NNzvCLeb",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "Pop-rock cover of the Little Mermaid villain song, released in 2006."
      },
      {
        "title": "Kiss the Girl",
        "artist": "Ashley Tisdale",
        "youtubeId": "06t0tbr3aH4",
        "spotifyUrl": "https://open.spotify.com/track/6kkFjjMbO9EL1YxNt8BKm3",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "Pop cover of the Little Mermaid song, released in 2006."
      },
      {
        "title": "Cruella De Vil",
        "artist": "Selena Gomez",
        "youtubeId": "Je9ZfezquCI",
        "spotifyUrl": "https://open.spotify.com/track/6NO2DmPusZLT5KTsrfpGLW",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "Pop-rock cover of the 101 Dalmatians song, recorded for Disneymania 6."
      },
      {
        "title": "That's How You Know",
        "artist": "Demi Lovato",
        "youtubeId": "1KMIUfPQ_5o",
        "spotifyUrl": "https://open.spotify.com/track/1jdJ8luWSATnyr4MOiIoHO",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "Pop cover of Amy Adams's Enchanted number, released on Disneymania 6 (2008)."
      },
      {
        "title": "When You Wish Upon a Star",
        "artist": "Billy Joel",
        "youtubeId": "gXjGh-Ql5Po",
        "spotifyUrl": "https://open.spotify.com/track/2NPFirx1Ig2Uy970OIBQDO",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "Pop cover of the Pinocchio standard, released on Simply Mad About the Mouse (1991)."
      },
      {
        "title": "You'll Be in My Heart",
        "artist": "Usher",
        "youtubeId": "dl_mFvd28R0",
        "spotifyUrl": "https://open.spotify.com/track/1nayTAuWAW9qILHyobKlBa",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "R&B cover of Phil Collins's Tarzan song, released on Disneymania (2002)."
      },
      {
        "title": "This Is Halloween",
        "artist": "Marilyn Manson",
        "youtubeId": "jU6iP0WLsU8",
        "spotifyUrl": "https://open.spotify.com/track/7aoInyY7amyKi0NFDLFZbP",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "Industrial-rock cover from The Nightmare Before Christmas special edition (2006)."
      },
      {
        "title": "Sally's Song",
        "artist": "Amy Lee",
        "youtubeId": "RQj2iOEx-V8",
        "spotifyUrl": "https://open.spotify.com/track/3U0rLVR2IN3kvVQGfvQKEH",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "Gothic-rock cover from Nightmare Revisited (2008)."
      },
      {
        "title": "Once Upon a Dream",
        "artist": "Lana Del Rey",
        "youtubeId": "8waJ7W3QcJc",
        "spotifyUrl": "https://open.spotify.com/track/3sXq7EPSrhRY5TO0y6ePUy",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "Dark pop cover of the Sleeping Beauty song, recorded for Maleficent (2014)."
      },
      {
        "title": "Baby Mine",
        "artist": "Arcade Fire",
        "youtubeId": "qpYOstfcQBs",
        "spotifyUrl": "https://open.spotify.com/track/2ufkOFn5LKYNoAdss0GUKR",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "Indie-rock cover of the Dumbo lullaby, recorded for the 2019 remake."
      },
      {
        "title": "Lost in the Woods",
        "artist": "Weezer",
        "youtubeId": "QnEWs8D9zu8",
        "spotifyUrl": "https://open.spotify.com/track/6bd3X6eXfamHGEHOHe86nn",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "Rock cover of Jonathan Groff's Frozen 2 song, released on the 2019 soundtrack."
      },
      {
        "title": "Into the Unknown",
        "artist": "Panic! At The Disco",
        "youtubeId": "jp-CVYGEsjg",
        "spotifyUrl": "https://open.spotify.com/track/0v622a7rlXRYcT6m3xwutU",
        "startSeconds": 0,
        "difficulty": "easy-medium",
        "notes": "Rock cover of Idina Menzel and AURORA's Frozen 2 song, released in 2019."
      },
      {
        "title": "When She Loved Me",
        "artist": "Bridgit Mendler",
        "youtubeId": "yivyABmG0s8",
        "spotifyUrl": "https://open.spotify.com/track/16oPtblayhsbzWxSrlLIN6",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "Pop cover of Sarah McLachlan's Toy Story 2 song, released on Disneymania 7 (2010)."
      },
      {
        "title": "You've Got a Friend in Me",
        "artist": "George Jones & Kathy Mattea",
        "youtubeId": "j5OD1kVvGyY",
        "spotifyUrl": "https://open.spotify.com/track/0JSiLxY5SBznAkT4ERoOKV",
        "startSeconds": 0,
        "difficulty": "medium-hard",
        "notes": "Country duet cover of the Toy Story song, released in 1996."
      },
      {
        "title": "Let It Go",
        "artist": "Rascal Flatts & Lucy Hale",
        "youtubeId": "OrWddfkIhpc",
        "spotifyUrl": "https://open.spotify.com/track/1clvTB87GDFoeImLrE0HuH",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "Country-pop duet cover of the Frozen anthem, released on We Love Disney (2015)."
      },
      {
        "title": "Circle of Life",
        "artist": "Disney Channel Circle of Stars",
        "youtubeId": "oZeVPywKNcQ",
        "spotifyUrl": "https://open.spotify.com/track/70IUh8iL1FyzDdYB6SF84x",
        "startSeconds": 0,
        "difficulty": "medium-hard",
        "notes": "Disney Channel ensemble cover and remix of the Lion King opener, released in 2003."
      },
      {
        "title": "Hakuna Matata",
        "artist": "Baha Men",
        "youtubeId": "jzc0W5eKhbU",
        "spotifyUrl": "https://open.spotify.com/track/1RfK7agnEdpyxUlDKOvqVN",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "Caribbean-pop cover of the Lion King song, released on Disneymania (2002)."
      },
      {
        "title": "Can You Feel the Love Tonight / Nants' Ingonyama",
        "artist": "Jason Derulo",
        "youtubeId": "MIHyg5VoiCo",
        "spotifyUrl": "https://open.spotify.com/track/6Z08ekE36sgK3J3jBIi285",
        "startSeconds": 0,
        "difficulty": "medium",
        "notes": "Pop and R&B cover of the Lion King songs, released on We Love Disney (2015)."
      },
      {
        "title": "I Just Can't Wait to Be King",
        "artist": "Aaron Carter",
        "youtubeId": "LCfEHbedWbk",
        "spotifyUrl": "https://open.spotify.com/track/21of6iq6Ks76fbG34MJeHO",
        "startSeconds": 0,
        "difficulty": "medium-hard",
        "notes": "Teen-pop cover of the Lion King song, released on Disneymania (2002)."
      },
      {
        "title": "True to Your Heart",
        "artist": "Keke Palmer",
        "youtubeId": "9PUcfZCZcVU",
        "spotifyUrl": "https://open.spotify.com/track/4viVOQNAlEptAKjavq4qq1",
        "startSeconds": 0,
        "difficulty": "medium-hard",
        "notes": "Pop cover of the Mulan end-title song, released in 2008."
      }
    ]
  },
  {
    "id": "potpourri",
    "name": "Potpourri",
    "shortName": "Potpourri",
    "blurb": "A mixed general-knowledge round spanning science, history, geography, arts, language, sports, food, and pop culture.",
    "infoBox": "<strong>Expect variety:</strong> this round rewards broad recall rather than mastery of one theme.",
    "type": "quiz",
    "items": [
      {
        "q": "Which planet has a day longer than its year, taking about 243 Earth days to rotate but about 225 to orbit the Sun?",
        "a": "Venus",
        "difficulty": "medium",
        "notes": "NASA lists Venus's rotation period as 243 Earth days and its orbital period as 225."
      },
      {
        "q": "How many hearts does an octopus have?",
        "a": "Three",
        "difficulty": "easy-medium",
        "notes": "Two branchial hearts pump blood through the gills, while one systemic heart pumps it through the body."
      },
      {
        "q": "What mineral defines 10 on the Mohs scale of hardness?",
        "a": "Diamond",
        "difficulty": "easy-medium",
        "notes": "The Mohs scale ranks ten reference minerals by scratch resistance, from talc at 1 to diamond at 10."
      },
      {
        "q": "Which chemical element has the symbol W, derived from its alternative name wolfram?",
        "a": "Tungsten",
        "difficulty": "medium",
        "notes": "Tungsten has atomic number 74; W comes from wolfram, reflected in the ore name wolframite."
      },
      {
        "q": "At what temperature do the Celsius and Fahrenheit scales show the same numerical value?",
        "a": "Minus 40 degrees",
        "difficulty": "medium",
        "notes": "The conversion equations meet at −40, so −40 °C equals −40 °F."
      },
      {
        "q": "What is the world's largest inland body of water?",
        "a": "The Caspian Sea",
        "difficulty": "easy-medium",
        "notes": "The Caspian is also the world's largest salt lake and has no natural outlet."
      },
      {
        "q": "What European river flows through or along the borders of ten countries before reaching the Black Sea?",
        "a": "The Danube",
        "difficulty": "medium",
        "notes": "The Danube is Europe's second-longest river after the Volga."
      },
      {
        "q": "The Bay of Fundy, famous for the world's highest tidal range, lies between which two Canadian provinces?",
        "a": "New Brunswick and Nova Scotia",
        "difficulty": "medium",
        "notes": "At Burntcoat Head, the tidal range can reach about 53 feet (16 metres)."
      },
      {
        "q": "What is Bolivia's constitutional capital?",
        "a": "Sucre",
        "difficulty": "medium-hard",
        "notes": "La Paz is the seat of government, but Sucre is the capital named in Bolivia's constitution."
      },
      {
        "q": "Which country is crossed by both the Equator and the Tropic of Capricorn?",
        "a": "Brazil",
        "difficulty": "medium-hard",
        "notes": "The Equator crosses northern Brazil, while the Tropic of Capricorn crosses the country's south."
      },
      {
        "q": "Which three writing systems appear on the Rosetta Stone?",
        "a": "Egyptian hieroglyphs, Demotic script, and Ancient Greek",
        "difficulty": "medium-hard",
        "notes": "The same 196 BCE decree appears in all three, helping scholars decipher hieroglyphs."
      },
      {
        "q": "Which English king accepted Magna Carta at Runnymede in 1215?",
        "a": "King John",
        "difficulty": "medium",
        "notes": "The charter established that the sovereign was subject to the rule of law."
      },
      {
        "q": "What 1868 political transformation restored imperial rule and ended Japan's Tokugawa shogunate?",
        "a": "The Meiji Restoration",
        "difficulty": "medium",
        "notes": "The restoration began a period of rapid political, military and economic modernization."
      },
      {
        "q": "Which Baltic port city was the leading center of the medieval Hanseatic League?",
        "a": "Lübeck",
        "difficulty": "medium-hard",
        "notes": "Lübeck's central position helped it lead the trading network of northern European towns."
      },
      {
        "q": "What battle is depicted in the nearly 230-foot-long Bayeux Tapestry?",
        "a": "The Battle of Hastings",
        "difficulty": "medium",
        "notes": "The 11th-century work is technically wool embroidery on linen and portrays events surrounding the 1066 Norman Conquest."
      },
      {
        "q": "Who wrote the novel The Master and Margarita?",
        "a": "Mikhail Bulgakov",
        "difficulty": "medium-hard",
        "notes": "Written mainly from 1928 to 1940, the novel was first published in censored form in the Soviet Union in 1966–67."
      },
      {
        "q": "Which composer wrote the ballet The Rite of Spring?",
        "a": "Igor Stravinsky",
        "difficulty": "medium",
        "notes": "Its famously turbulent premiere took place in Paris in 1913."
      },
      {
        "q": "Which artist painted the melting clocks in The Persistence of Memory?",
        "a": "Salvador Dalí",
        "difficulty": "easy-medium",
        "notes": "Dalí completed the small Surrealist oil painting in 1931."
      },
      {
        "q": "Who painted Girl with a Pearl Earring?",
        "a": "Johannes Vermeer",
        "difficulty": "easy-medium",
        "notes": "Painted around 1665, the work is a tronie rather than a commissioned portrait."
      },
      {
        "q": "What is Oscar Wilde's only published novel?",
        "a": "The Picture of Dorian Gray",
        "difficulty": "medium",
        "notes": "It first appeared in magazine form in 1890 and was expanded for book publication in 1891."
      },
      {
        "q": "Which city hosted the first modern Olympic Games in 1896?",
        "a": "Athens",
        "difficulty": "easy-medium",
        "notes": "The inaugural modern Games featured 241 male athletes from 14 nations."
      },
      {
        "q": "Which Grand Slam tennis tournament is played on grass courts?",
        "a": "Wimbledon",
        "difficulty": "easy-medium",
        "notes": "Wimbledon is the only one of tennis's four Grand Slam tournaments still played on grass."
      },
      {
        "q": "The Stanley Cup is named for Lord Stanley of Preston who held what Canadian office?",
        "a": "Governor General of Canada",
        "difficulty": "medium-hard",
        "notes": "Lord Stanley donated the original silver bowl in 1892 as a hockey challenge trophy."
      },
      {
        "q": "What color jersey identifies the leader of the Tour de France's general classification?",
        "a": "Yellow",
        "difficulty": "easy-medium",
        "notes": "The maillot jaune is worn by the rider with the lowest cumulative time."
      },
      {
        "q": "What type of container served as the original goals in James Naismith's first basketball game?",
        "a": "Peach baskets",
        "difficulty": "medium",
        "notes": "Naismith devised basketball in 1891 at a YMCA training school in Springfield, Massachusetts."
      },
      {
        "q": "In what Mexican city was Caesar salad created in the 1920s?",
        "a": "Tijuana",
        "difficulty": "medium",
        "notes": "Restaurateur Caesar Cardini is traditionally credited with creating it there in 1924."
      },
      {
        "q": "The dessert pavlova is named after a famous performer in what art form?",
        "a": "Ballet",
        "difficulty": "medium",
        "notes": "It honors Russian ballerina Anna Pavlova; Australia and New Zealand both claim the dessert's origin."
      },
      {
        "q": "What citrus fruit provides Earl Grey tea's characteristic flavor?",
        "a": "Bergamot orange",
        "difficulty": "medium",
        "notes": "The tea is flavored with fragrant oil from the bergamot peel."
      },
      {
        "q": "The word ampersand evolved from what phrase used when reciting the & symbol?",
        "a": "And per se and",
        "difficulty": "medium-hard",
        "notes": "The symbol itself began as a ligature of the Latin letters e and t, spelling et (and)."
      },
      {
        "q": "What product did Nintendo originally manufacture when its founder began business in Kyoto in 1889?",
        "a": "Hanafuda playing cards",
        "difficulty": "medium",
        "notes": "Nintendo's official history says Fusajiro Yamauchi began making and selling the Japanese cards in 1889."
      }
    ]
  },
  {
    "id": "bonus",
    "name": "Bonus Question",
    "shortName": "Bonus",
    "blurb": "The published three-point bonus question for October 6.",
    "infoBox": "<strong>Bonus:</strong> learn the answer, then review the ranking around it so differently worded versions do not trip you up.",
    "type": "quiz",
    "items": [
      {
        "q": "What is the 3rd largest island (by area) in the world?",
        "a": "Borneo"
      }
    ]
  }
];
