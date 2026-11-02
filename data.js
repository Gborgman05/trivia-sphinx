// Study content for "Beat the Geek" trivia night.
// Categories confirmed from the Nov. 3, 2026 event listing at Juanita Cantina (Ben, 7:30pm):
// Double D, U.S. Citizenship Test, Food Brand Logos, Songs of 2019, and Idiom Nexus.
// Bonus: What is both the world's tallest stone structure and the world's tallest obelisk?
// The visual Food Brand Logos round (round 3) is intentionally omitted. This is the curated
// 120-question set from trivia-2026-11-03-juanita-cantina.csv.
// Music links are Spotify-only because YouTube oEmbed verification was unavailable.
// difficulty preserves the CSV tiers: "easy-medium" | "medium" | "medium-hard".

const CATEGORIES = [
  {
    "id": "double-d",
    "name": "Double D",
    "shortName": "Double D",
    "blurb": "General-knowledge clues whose answers contain at least two instances of the letter D.",
    "infoBox": "<strong>Study tip:</strong> use the two-D pattern as a check after solving each clue, not as a substitute for the fact.",
    "type": "quiz",
    "items": [
      {
        "q": "Which Disney character is the hot-tempered sailor who first appeared in the 1934 short The Wise Little Hen?",
        "a": "Donald Duck",
        "difficulty": "easy-medium"
      },
      {
        "q": "What tabletop fantasy role-playing game was first published by TSR in 1974?",
        "a": "Dungeons & Dragons",
        "difficulty": "easy-medium",
        "notes": "Created by Gary Gygax and Dave Arneson."
      },
      {
        "q": "What surround-sound format succeeded Dolby Stereo and debuted theatrically with Batman Returns?",
        "a": "Dolby Digital",
        "difficulty": "medium-hard",
        "notes": "The format was initially called Dolby Stereo Digital."
      },
      {
        "q": "What chain dropped the word Donuts from most of its branding in 2019?",
        "a": "Dunkin' Donuts",
        "difficulty": "easy-medium",
        "notes": "The corporate name remains Dunkin' Brands."
      },
      {
        "q": "Which actor played FBI agent Fox Mulder on The X-Files?",
        "a": "David Duchovny",
        "difficulty": "easy-medium"
      },
      {
        "q": "Which actor won an Oscar for My Left Foot and later played Abraham Lincoln?",
        "a": "Daniel Day-Lewis",
        "difficulty": "easy-medium"
      },
      {
        "q": "Which Ivorian striker captained his country and scored more than 100 Premier League goals for Chelsea?",
        "a": "Didier Drogba",
        "difficulty": "medium"
      },
      {
        "q": "Which Argentine soccer star scored the infamous Hand of God goal at the 1986 World Cup?",
        "a": "Diego Maradona",
        "difficulty": "easy-medium"
      },
      {
        "q": "Which World War II medic received the Medal of Honor despite refusing to carry a weapon?",
        "a": "Desmond Doss",
        "difficulty": "medium",
        "notes": "His story inspired the film Hacksaw Ridge."
      },
      {
        "q": "Which U.S. president warned about the military-industrial complex in his farewell address?",
        "a": "Dwight D. Eisenhower",
        "difficulty": "easy-medium"
      },
      {
        "q": "What 1974 David Bowie album includes the title track and Rebel Rebel?",
        "a": "Diamond Dogs",
        "difficulty": "medium"
      },
      {
        "q": "What HBO Western series is set in a lawless South Dakota mining camp?",
        "a": "Deadwood",
        "difficulty": "easy-medium"
      },
      {
        "q": "What 1987 film features Frances Baby Houseman and dance instructor Johnny Castle?",
        "a": "Dirty Dancing",
        "difficulty": "easy-medium"
      },
      {
        "q": "What 1994 comedy stars Jim Carrey and Jeff Daniels as Lloyd Christmas and Harry Dunne?",
        "a": "Dumb and Dumber",
        "difficulty": "easy-medium"
      },
      {
        "q": "What 2001 cult film stars Jake Gyllenhaal as a teenager visited by a figure in a rabbit costume?",
        "a": "Donnie Darko",
        "difficulty": "medium"
      },
      {
        "q": "Which Hugh Lofting character can communicate with animals?",
        "a": "Doctor Dolittle",
        "difficulty": "medium",
        "notes": "The character first appeared in print in 1920."
      },
      {
        "q": "Which Marvel hero is attorney Matt Murdock?",
        "a": "Daredevil",
        "difficulty": "easy-medium"
      },
      {
        "q": "Which U.S. state is officially named the State of Rhode Island and Providence Plantations in its former full name?",
        "a": "Rhode Island",
        "difficulty": "medium",
        "notes": "Voters shortened the official name to State of Rhode Island in 2020."
      },
      {
        "q": "What Rockstar Games Western follows outlaw Arthur Morgan?",
        "a": "Red Dead Redemption 2",
        "difficulty": "easy-medium"
      },
      {
        "q": "What 2010 U.S. financial reform law is named for two members of Congress?",
        "a": "Dodd-Frank Act",
        "difficulty": "medium",
        "notes": "Named for Senator Chris Dodd and Representative Barney Frank."
      },
      {
        "q": "What name do the children in Stranger Things give the alternate dimension parallel to their hometown?",
        "a": "The Upside Down",
        "difficulty": "easy-medium"
      },
      {
        "q": "What fictional paper company employs the Scranton branch featured in The Office?",
        "a": "Dunder Mifflin",
        "difficulty": "easy-medium"
      },
      {
        "q": "What yoga pose is commonly named for an inverted V shape with hands and feet on the floor?",
        "a": "Downward-Facing Dog",
        "difficulty": "easy-medium"
      },
      {
        "q": "What 1993 Richard Linklater film follows Texas teenagers on the last day of school in 1976?",
        "a": "Dazed and Confused",
        "difficulty": "medium"
      },
      {
        "q": "What long-legged arachnid is also called a harvestman in common usage?",
        "a": "Daddy longlegs",
        "difficulty": "medium",
        "notes": "True harvestmen are not spiders."
      },
      {
        "q": "What statistical measure describes how spread out values are around their mean?",
        "a": "Standard deviation",
        "difficulty": "medium"
      },
      {
        "q": "What July 4 holiday commemorates the adoption of a document in 1776?",
        "a": "Independence Day",
        "difficulty": "easy-medium"
      },
      {
        "q": "What document adopted by the Second Continental Congress announced the colonies' separation from Britain?",
        "a": "Declaration of Independence",
        "difficulty": "easy-medium"
      },
      {
        "q": "In a division problem what term names the number that is being divided?",
        "a": "Dividend",
        "difficulty": "medium"
      },
      {
        "q": "What 2004 comedy features the Average Joe's team competing against Globo Gym in Las Vegas?",
        "a": "DodgeBall: A True Underdog Story",
        "difficulty": "easy-medium"
      }
    ]
  },
  {
    "id": "us-citizenship-test",
    "name": "U.S. Citizenship Test",
    "shortName": "Citizenship Test",
    "blurb": "Core American government, history, rights, geography, and civics drawn from USCIS naturalization-test material.",
    "infoBox": "<strong>Study tip:</strong> several official questions accept more than one answer; notes call out common alternatives.",
    "type": "quiz",
    "items": [
      {
        "q": "What is the supreme law of the land?",
        "a": "The Constitution",
        "difficulty": "easy-medium"
      },
      {
        "q": "What do we call the first ten amendments to the Constitution?",
        "a": "The Bill of Rights",
        "difficulty": "easy-medium"
      },
      {
        "q": "What are the first three words of the Constitution?",
        "a": "We the People",
        "difficulty": "easy-medium"
      },
      {
        "q": "What is an amendment?",
        "a": "A change or addition to the Constitution",
        "difficulty": "medium",
        "notes": "USCIS accepts \"a change to the Constitution\" or \"an addition to the Constitution.\""
      },
      {
        "q": "Name one right named in the Declaration of Independence.",
        "a": "Life; liberty; or the pursuit of happiness",
        "difficulty": "easy-medium",
        "notes": "Any one of the three is accepted."
      },
      {
        "q": "What does freedom of religion mean?",
        "a": "You may practice any religion or no religion",
        "difficulty": "easy-medium"
      },
      {
        "q": "What is the economic system of the United States?",
        "a": "A capitalist economy or market economy",
        "difficulty": "medium",
        "notes": "Either wording is accepted."
      },
      {
        "q": "What does the rule of law mean?",
        "a": "Everyone must follow the law",
        "difficulty": "medium",
        "notes": "Other accepted ideas include that leaders and government must obey the law and no one is above it."
      },
      {
        "q": "Name one branch or part of the federal government.",
        "a": "Congress; the president; or the courts",
        "difficulty": "easy-medium",
        "notes": "Legislative; executive; and judicial are also accepted."
      },
      {
        "q": "What prevents one branch of government from becoming too powerful?",
        "a": "Checks and balances or separation of powers",
        "difficulty": "medium"
      },
      {
        "q": "Who is in charge of the executive branch?",
        "a": "The President",
        "difficulty": "easy-medium"
      },
      {
        "q": "Who makes federal laws?",
        "a": "Congress",
        "difficulty": "easy-medium",
        "notes": "The Senate and House of Representatives are also accepted."
      },
      {
        "q": "What are the two parts of the U.S. Congress?",
        "a": "The Senate and House of Representatives",
        "difficulty": "easy-medium"
      },
      {
        "q": "How many U.S. senators are there?",
        "a": "100",
        "difficulty": "easy-medium"
      },
      {
        "q": "For how many years is a U.S. senator elected?",
        "a": "Six years",
        "difficulty": "medium"
      },
      {
        "q": "How many voting members are in the House of Representatives?",
        "a": "435",
        "difficulty": "medium"
      },
      {
        "q": "For how many years is a U.S. representative elected?",
        "a": "Two years",
        "difficulty": "medium"
      },
      {
        "q": "Why do some states have more representatives than other states?",
        "a": "Because they have larger populations",
        "difficulty": "medium"
      },
      {
        "q": "For how many years is a U.S. president elected?",
        "a": "Four years",
        "difficulty": "easy-medium"
      },
      {
        "q": "In what month do Americans vote for president?",
        "a": "November",
        "difficulty": "easy-medium"
      },
      {
        "q": "If the president can no longer serve who becomes president?",
        "a": "The Vice President",
        "difficulty": "easy-medium"
      },
      {
        "q": "Name one power of the federal government.",
        "a": "Print money; declare war; create an army; make treaties; or conduct foreign policy",
        "difficulty": "medium",
        "notes": "Any one listed power is accepted."
      },
      {
        "q": "Name one power reserved to the states.",
        "a": "Provide schooling; provide police or fire protection; issue driver licenses; approve zoning and land use",
        "difficulty": "medium-hard",
        "notes": "Any one listed state power is accepted."
      },
      {
        "q": "What is the capital of the United States?",
        "a": "Washington DC",
        "difficulty": "easy-medium"
      },
      {
        "q": "Who was the first president of the United States?",
        "a": "George Washington",
        "difficulty": "easy-medium"
      },
      {
        "q": "When was the Declaration of Independence adopted?",
        "a": "July 4 1776",
        "difficulty": "easy-medium"
      },
      {
        "q": "What did the Emancipation Proclamation do?",
        "a": "Freed enslaved people in the Confederacy",
        "difficulty": "medium",
        "notes": "USCIS also phrases this as freeing slaves in the Confederate states or most Southern states."
      },
      {
        "q": "Which constitutional amendment abolished slavery?",
        "a": "The 13th Amendment",
        "difficulty": "medium"
      },
      {
        "q": "What movement tried to end racial discrimination?",
        "a": "The civil rights movement",
        "difficulty": "easy-medium"
      },
      {
        "q": "What ocean is on the West Coast of the United States?",
        "a": "The Pacific Ocean",
        "difficulty": "easy-medium"
      }
    ]
  },
  {
    "id": "songs-of-2019",
    "name": "Songs of 2019",
    "shortName": "Songs of 2019",
    "blurb": "Recognizable pop, hip-hop, R&B, alternative, and crossover tracks released during 2019.",
    "infoBox": "<strong>How to practice:</strong> open the Spotify track, hide the screen, and identify both title and artist.",
    "type": "music",
    "items": [
      {
        "title": "bad guy",
        "artist": "Billie Eilish",
        "spotifyUrl": "https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m",
        "difficulty": "easy-medium",
        "notes": "Released in March 2019 on When We All Fall Asleep Where Do We Go?"
      },
      {
        "title": "Old Town Road (Remix)",
        "artist": "Lil Nas X ft. Billy Ray Cyrus",
        "spotifyUrl": "https://open.spotify.com/track/2YpeDb67231RjR0MgVLzsG",
        "difficulty": "easy-medium",
        "notes": "The remix was released in April 2019."
      },
      {
        "title": "Señorita",
        "artist": "Shawn Mendes & Camila Cabello",
        "spotifyUrl": "https://open.spotify.com/track/0TK2YIli7K1leLovkQiNik",
        "difficulty": "easy-medium",
        "notes": "Released in June 2019."
      },
      {
        "title": "Circles",
        "artist": "Post Malone",
        "spotifyUrl": "https://open.spotify.com/track/21jGcNKet2qwijlDFuPiPb",
        "difficulty": "easy-medium",
        "notes": "Released in August 2019."
      },
      {
        "title": "Don't Start Now",
        "artist": "Dua Lipa",
        "spotifyUrl": "https://open.spotify.com/track/6WrI0LAC5M1Rw2MnX2ZvEg",
        "difficulty": "easy-medium",
        "notes": "Released in October 2019."
      },
      {
        "title": "Dance Monkey",
        "artist": "Tones and I",
        "spotifyUrl": "https://open.spotify.com/track/2XU0oxnq2qxCpomAAuJY8K",
        "difficulty": "easy-medium",
        "notes": "Released in May 2019."
      },
      {
        "title": "Sucker",
        "artist": "Jonas Brothers",
        "spotifyUrl": "https://open.spotify.com/track/4y3OI86AEP6PQoDE6olYhO",
        "difficulty": "easy-medium",
        "notes": "Released in March 2019."
      },
      {
        "title": "Memories",
        "artist": "Maroon 5",
        "spotifyUrl": "https://open.spotify.com/track/2b8fOow8UzyDFAE27YhOZM",
        "difficulty": "easy-medium",
        "notes": "Released in September 2019."
      },
      {
        "title": "Blinding Lights",
        "artist": "The Weeknd",
        "spotifyUrl": "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b",
        "difficulty": "easy-medium",
        "notes": "Released in November 2019."
      },
      {
        "title": "Watermelon Sugar",
        "artist": "Harry Styles",
        "spotifyUrl": "https://open.spotify.com/track/6UelLqGlWMcVH1E5c4H7lY",
        "difficulty": "easy-medium",
        "notes": "Released in November 2019 before becoming a 2020 hit."
      },
      {
        "title": "Adore You",
        "artist": "Harry Styles",
        "spotifyUrl": "https://open.spotify.com/track/3jjujdWJ72nww5eGnfs2E7",
        "difficulty": "medium",
        "notes": "Released in December 2019."
      },
      {
        "title": "Lover",
        "artist": "Taylor Swift",
        "spotifyUrl": "https://open.spotify.com/track/1dGr1c8CrMLDpV6mPbImSI",
        "difficulty": "easy-medium",
        "notes": "The title track was released as a single in August 2019."
      },
      {
        "title": "You Need to Calm Down",
        "artist": "Taylor Swift",
        "spotifyUrl": "https://open.spotify.com/track/6RRNNciQGZEXnqk8SQ9yv5",
        "difficulty": "easy-medium",
        "notes": "Released in June 2019."
      },
      {
        "title": "ME!",
        "artist": "Taylor Swift ft. Brendon Urie",
        "spotifyUrl": "https://open.spotify.com/track/2Rk4JlNc2TPmZe2af99d45",
        "difficulty": "easy-medium",
        "notes": "Released in April 2019."
      },
      {
        "title": "7 rings",
        "artist": "Ariana Grande",
        "spotifyUrl": "https://open.spotify.com/track/6ocbgoVGwYJhOv1GgI9NsF",
        "difficulty": "easy-medium",
        "notes": "Released in January 2019."
      },
      {
        "title": "break up with your girlfriend, i'm bored",
        "artist": "Ariana Grande",
        "spotifyUrl": "https://open.spotify.com/track/4kV4N9D1iKVxx1KLvtTpjS",
        "difficulty": "medium",
        "notes": "Released in February 2019."
      },
      {
        "title": "ROXANNE",
        "artist": "Arizona Zervas",
        "spotifyUrl": "https://open.spotify.com/track/696DnlkuDOXcMAnKlTgXXK",
        "difficulty": "medium",
        "notes": "Released in October 2019."
      },
      {
        "title": "The Box",
        "artist": "Roddy Ricch",
        "spotifyUrl": "https://open.spotify.com/track/0nbXyq5TXYPCO7pr3N8S4I",
        "difficulty": "easy-medium",
        "notes": "Released with Please Excuse Me for Being Antisocial in December 2019."
      },
      {
        "title": "HIGHEST IN THE ROOM",
        "artist": "Travis Scott",
        "spotifyUrl": "https://open.spotify.com/track/3eekarcy7kvN4yt5ZFzltW",
        "difficulty": "medium",
        "notes": "Released in October 2019."
      },
      {
        "title": "Panini",
        "artist": "Lil Nas X",
        "spotifyUrl": "https://open.spotify.com/track/1000nHvUdawXuUHgBod4Wv",
        "difficulty": "medium",
        "notes": "Released in June 2019."
      },
      {
        "title": "bury a friend",
        "artist": "Billie Eilish",
        "spotifyUrl": "https://open.spotify.com/track/4SSnFejRGlZikf02HLewEF",
        "difficulty": "medium",
        "notes": "Released in January 2019."
      },
      {
        "title": "Talk",
        "artist": "Khalid",
        "spotifyUrl": "https://open.spotify.com/track/0rTV5WefWd1J3OwIheTzxM",
        "difficulty": "medium",
        "notes": "Released in February 2019."
      },
      {
        "title": "Beautiful People",
        "artist": "Ed Sheeran ft. Khalid",
        "spotifyUrl": "https://open.spotify.com/track/70eFcWOvlMObDhURTqT4Fv",
        "difficulty": "medium",
        "notes": "Released in June 2019."
      },
      {
        "title": "I Don't Care",
        "artist": "Ed Sheeran & Justin Bieber",
        "spotifyUrl": "https://open.spotify.com/track/0hVXuCcriWRGvwMV1r5Yn9",
        "difficulty": "easy-medium",
        "notes": "Released in May 2019."
      },
      {
        "title": "South of the Border",
        "artist": "Ed Sheeran ft. Camila Cabello & Cardi B",
        "spotifyUrl": "https://open.spotify.com/track/4vUmTMuQqjdnvlZmAH61Qk",
        "difficulty": "medium",
        "notes": "Released as a single in September 2019."
      },
      {
        "title": "How Do You Sleep?",
        "artist": "Sam Smith",
        "spotifyUrl": "https://open.spotify.com/track/6b2RcmUt1g9N9mQ3CbjX2Y",
        "difficulty": "medium",
        "notes": "Released in July 2019."
      },
      {
        "title": "Dancing with a Stranger",
        "artist": "Sam Smith & Normani",
        "spotifyUrl": "https://open.spotify.com/track/6Qs4SXO9dwPj5GKvVOv8Ki",
        "difficulty": "easy-medium",
        "notes": "Released in January 2019."
      },
      {
        "title": "Lose You to Love Me",
        "artist": "Selena Gomez",
        "spotifyUrl": "https://open.spotify.com/track/4l0Mvzj72xxOpRrp6h8nHi",
        "difficulty": "easy-medium",
        "notes": "Released in October 2019."
      },
      {
        "title": "Motivation",
        "artist": "Normani",
        "spotifyUrl": "https://open.spotify.com/track/0rIAC4PXANcKmitJfoqmVm",
        "difficulty": "medium-hard",
        "notes": "Released in August 2019."
      },
      {
        "title": "Never Really Over",
        "artist": "Katy Perry",
        "spotifyUrl": "https://open.spotify.com/track/5PYQUBXc7NYeI1obMKSJK0",
        "difficulty": "medium",
        "notes": "Released in May 2019."
      }
    ]
  },
  {
    "id": "idiom-nexus",
    "name": "Idiom Nexus",
    "shortName": "Idiom Nexus",
    "blurb": "Wordplay chains that join two familiar expressions at a shared boundary word.",
    "infoBox": "<strong>Study tip:</strong> solve each half of the clue separately, then overlap the shared word once.",
    "type": "quiz",
    "items": [
      {
        "q": "Lose your nerve + a fundamental weakness hidden by an imposing appearance",
        "a": "Get cold feet of clay",
        "difficulty": "medium",
        "notes": "(get cold feet + feet of clay)"
      },
      {
        "q": "Feeling ill + endure a difficult situation",
        "a": "Under the weather the storm",
        "difficulty": "medium",
        "notes": "(under the weather + weather the storm)"
      },
      {
        "q": "Present your most favorable qualities + an innovative outlook",
        "a": "Put your best foot forward thinking",
        "difficulty": "medium",
        "notes": "(put your best foot forward + forward thinking)"
      },
      {
        "q": "Make people feel comfortable + completely chilled",
        "a": "Break the ice cold",
        "difficulty": "easy-medium",
        "notes": "(break the ice + ice-cold)"
      },
      {
        "q": "Act too soon + wary because of bad experience",
        "a": "Jump the gun-shy",
        "difficulty": "medium",
        "notes": "(jump the gun + gun-shy)"
      },
      {
        "q": "Use your influence aggressively + continuously all day and night",
        "a": "Throw your weight around the clock",
        "difficulty": "medium",
        "notes": "(throw your weight around + around the clock)"
      },
      {
        "q": "Stay cheerful + still undecided",
        "a": "Keep your chin up in the air",
        "difficulty": "easy-medium",
        "notes": "(keep your chin up + up in the air)"
      },
      {
        "q": "Return to the beginning + extraordinarily rare",
        "a": "Back to square one in a million",
        "difficulty": "easy-medium",
        "notes": "(back to square one + one in a million)"
      },
      {
        "q": "Avoid addressing the point + amateurish or inferior",
        "a": "Beat around the bush league",
        "difficulty": "medium",
        "notes": "(beat around the bush + bush league)"
      },
      {
        "q": "Describe something exactly + madly in love",
        "a": "Hit the nail on the head over heels",
        "difficulty": "easy-medium",
        "notes": "(hit the nail on the head + head over heels)"
      },
      {
        "q": "Work very late + help a process run smoothly",
        "a": "Burn the midnight oil the wheels",
        "difficulty": "medium-hard",
        "notes": "(burn the midnight oil + oil the wheels)"
      },
      {
        "q": "Start an activity + extremely wealthy",
        "a": "Get the ball rolling in dough",
        "difficulty": "easy-medium",
        "notes": "(get the ball rolling + rolling in dough)"
      },
      {
        "q": "A tiny contribution to a large need + desired experiences to complete",
        "a": "A drop in the bucket list",
        "difficulty": "easy-medium",
        "notes": "(a drop in the bucket + bucket list)"
      },
      {
        "q": "Enjoy two different advantages + very different from each other",
        "a": "The best of both worlds apart",
        "difficulty": "easy-medium",
        "notes": "(the best of both worlds + worlds apart)"
      },
      {
        "q": "An obvious issue nobody discusses + capacity to become better",
        "a": "The elephant in the room for improvement",
        "difficulty": "easy-medium",
        "notes": "(the elephant in the room + room for improvement)"
      },
      {
        "q": "It is now your responsibility + judgment by the general public",
        "a": "The ball is in your court of public opinion",
        "difficulty": "medium",
        "notes": "(the ball is in your court + court of public opinion)"
      },
      {
        "q": "Regard something skeptically + an exceptionally decent person",
        "a": "Take it with a grain of salt of the earth",
        "difficulty": "easy-medium",
        "notes": "(take it with a grain of salt + salt of the earth)"
      },
      {
        "q": "During both good and bad times + a risky or precarious situation",
        "a": "Through thick and thin ice",
        "difficulty": "easy-medium",
        "notes": "(through thick and thin + thin ice)"
      },
      {
        "q": "Away from familiar routes + a history of past performance",
        "a": "Off the beaten track record",
        "difficulty": "medium",
        "notes": "(off the beaten track + track record)"
      },
      {
        "q": "Immediately and without warning + three successes by one player",
        "a": "At the drop of a hat trick",
        "difficulty": "easy-medium",
        "notes": "(at the drop of a hat + hat trick)"
      },
      {
        "q": "Unexpectedly + aristocratic ancestry",
        "a": "Out of the blue blood",
        "difficulty": "medium",
        "notes": "(out of the blue + blue blood)"
      },
      {
        "q": "A natural talent for gardening + show contempt with a gesture",
        "a": "A green thumb your nose at",
        "difficulty": "medium-hard",
        "notes": "(a green thumb + thumb your nose at)"
      },
      {
        "q": "A pointless pursuit + pursue a hopeless circular course",
        "a": "A wild-goose chase your tail",
        "difficulty": "medium",
        "notes": "(a wild-goose chase + chase your tail)"
      },
      {
        "q": "Reveal a secret + a collection of useful techniques",
        "a": "Let the cat out of the bag of tricks",
        "difficulty": "easy-medium",
        "notes": "(let the cat out of the bag + bag of tricks)"
      },
      {
        "q": "A person uncomfortable in unfamiliar surroundings + a past matter no longer worth concern",
        "a": "A fish out of water under the bridge",
        "difficulty": "easy-medium",
        "notes": "(a fish out of water + water under the bridge)"
      },
      {
        "q": "A cherished person + the calm center of a cyclone",
        "a": "The apple of my eye of the storm",
        "difficulty": "medium",
        "notes": "(the apple of my eye + eye of the storm)"
      },
      {
        "q": "Regret what cannot be changed + exploit something as much as possible",
        "a": "Cry over spilled milk it for all it's worth",
        "difficulty": "medium",
        "notes": "(cry over spilled milk + milk it for all it's worth)"
      },
      {
        "q": "Become the main focus + anxiety about performing publicly",
        "a": "Take center stage fright",
        "difficulty": "easy-medium",
        "notes": "(take center stage + stage fright)"
      },
      {
        "q": "A personal recommendation + speak rudely or indiscreetly",
        "a": "Word of mouth off",
        "difficulty": "medium",
        "notes": "(word of mouth + mouth off)"
      },
      {
        "q": "Earn just enough to cover expenses + compromise with the other side",
        "a": "Make ends meet halfway",
        "difficulty": "easy-medium",
        "notes": "(make ends meet + meet halfway)"
      }
    ]
  },
  {
    "id": "bonus",
    "name": "Bonus Question",
    "shortName": "Bonus",
    "blurb": "The published three-point bonus question for November 3.",
    "infoBox": "<strong>Bonus:</strong> connect the monument's material and shape to both records named in the clue.",
    "type": "quiz",
    "items": [
      {
        "q": "What is both the world's tallest stone structure and the world's tallest obelisk?",
        "a": "Washington Monument"
      }
    ]
  }
];
