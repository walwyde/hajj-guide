
// export interface QuizQuestion {
//   question: string;
//   options: string[];
//   correct: number; // Index of the correct option
// }

// export interface HajjStepContent {
//   overview: string;
//   procedure: string[];
//   history: string;
//   quranEvidence: {
//     verse: string;
//     reference: string;
//     translation: string;
//   };
//   hadithEvidence: {
//     text: string;
//     reference: string;
//     narrator: string;
//   };
//   quiz: {
//     questions: QuizQuestion[];
//   };
// }

// export interface HajjStep {
//   id: string;
//   title: string;
//   day: string;
//   description: string;
//   mandatory: boolean | { [key in 'tamattu' | 'qiran' | 'ifrad']: boolean };
//   hajjTypes: ('tamattu' | 'qiran' | 'ifrad')[];
//   content: HajjStepContent;
// }

// export const HAJJ_STEPS: HajjStep[] = [
//   {
//     id: "ihram",
//     title: "Entering the State of Ihram",
//     day: "Day 1",
//     description: "Sacred state of ritual purity and dedication",
//     mandatory: true,
//     hajjTypes: ['tamattu', 'qiran', 'ifrad'],
//     content: {
//       overview: "Ihram is the sacred state that a Muslim must enter before performing Hajj or Umrah. For Tamattu, pilgrims enter Ihram for Umrah first, then re-enter for Hajj. In Qiran, Ihram is maintained for both Umrah and Hajj. In Ifrad, Ihram is for Hajj only.",
//       procedure: [
//         "Perform Ghusl (ritual bath) with intention",
//         "Wear the Ihram garments (two white seamless cloths for men)",
//         "Recite the Talbiyah: 'Labbayka Allahumma labbayk' (modify for Umrah or Hajj based on type)",
//         "Make sincere intention (Niyyah) for Umrah (Tamattu/Qiran) or Hajj (Ifrad/Qiran)",
//         "Begin observing Ihram restrictions"
//       ],
//       history: "The practice of Ihram dates back to Prophet Ibrahim (AS) and was perfected by Prophet Muhammad (SAW). It symbolizes equality before Allah, as all pilgrims dress simply regardless of social status.",
//       quranEvidence: {
//         verse: "وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ",
//         reference: "Surah Al-Baqarah 2:196",
//         translation: "And complete the Hajj and Umrah for Allah"
//       },
//       hadithEvidence: {
//         text: "Actions are but by intention, and every man shall have only that which he intended.",
//         reference: "Sahih al-Bukhari 1",
//         narrator: "Umar ibn al-Khattab (RA)"
//       },
//       quiz: {
//         questions: [
//           {
//             question: "What is Ihram?",
//             options: [
//               "A type of prayer",
//               "A sacred state for Hajj/Umrah",
//               "A place in Makkah",
//               "A type of garment only"
//             ],
//             correct: 1
//           },
//           {
//             question: "What should men wear in Ihram?",
//             options: [
//               "Two white seamless cloths",
//               "Regular clothes",
//               "Jeans and shirt",
//               "No clothing"
//             ],
//             correct: 0
//           },
//           {
//             question: "What is recited when entering Ihram?",
//             options: [
//               "Talbiyah",
//               "Surah Al-Fatiha",
//               "Takbir",
//               "Tasbih"
//             ],
//             correct: 0
//           },
//           {
//             question: "Is Ghusl required before Ihram?",
//             options: [
//               "No, only wudu",
//               "Yes, with intention",
//               "Optional",
//               "Only for women"
//             ],
//             correct: 1
//           },
//           {
//             question: "What does Ihram symbolize?",
//             options: [
//               "Equality before Allah",
//               "Wealth and status",
//               "Fashion",
//               "Comfort"
//             ],
//             correct: 0
//           }
//         ]
//       }
//     }
//   },
//   {
//     id: "tawaf-qudum",
//     title: "Tawaf al-Qudum (Arrival Tawaf)",
//     day: "Day 1-2",
//     description: "Circumambulation around the Kaaba upon arrival",
//     mandatory: { tamattu: true, qiran: true, ifrad: false },
//     hajjTypes: ['tamattu', 'qiran', 'ifrad'],
//     content: {
//       overview: "Tawaf al-Qudum is the first Tawaf performed upon arriving in Makkah. It is mandatory for Tamattu and Qiran (as part of Umrah) but Sunnah for Ifrad. It welcomes the pilgrim to the Holy Mosque.",
//       procedure: [
//         "Enter Masjid al-Haram with right foot first",
//         "Approach the Black Stone (Hajar al-Aswad)",
//         "Begin Tawaf from the Black Stone, moving counter-clockwise",
//         "Complete seven circuits around the Kaaba",
//         "Recite prescribed duas during each circuit",
//         "Perform two Rakahs at Maqam Ibrahim"
//       ],
//       history: "Prophet Muhammad (SAW) performed this Tawaf when he arrived in Makkah for his Farewell Hajj, establishing it as a recommended practice for all pilgrims arriving for Hajj.",
//       quranEvidence: {
//         verse: "وَلْيَطَّوَّفُوا بِالْبَيْتِ الْعَتِيقِ",
//         reference: "Surah Al-Hajj 22:29",
//         translation: "Then let them circumambulate the Ancient House"
//       },
//       hadithEvidence: {
//         text: "The Prophet (SAW) performed Tawaf al-Qudum when he arrived in Makkah for Hajj.",
//         reference: "Sahih Muslim 1218",
//         narrator: "Ibn Abbas (RA)"
//       },
//       quiz: {
//         questions: [
//           {
//             question: "How many circuits in Tawaf al-Qudum?",
//             options: [
//               "Five",
//               "Seven",
//               "Three",
//               "Nine"
//             ],
//             correct: 1
//           },
//           {
//             question: "Where does Tawaf begin?",
//             options: [
//               "Maqam Ibrahim",
//               "Black Stone",
//               "Safa",
//               "Marwah"
//             ],
//             correct: 1
//           },
//           {
//             question: "Direction of Tawaf?",
//             options: [
//               "Clockwise",
//               "Counter-clockwise",
//               "No specific direction",
//               "Random"
//             ],
//             correct: 1
//           },
//           {
//             question: "Is Tawaf al-Qudum mandatory for Ifrad?",
//             options: [
//               "Yes",
//               "No, it's Sunnah",
//               "Only for men",
//               "Only on certain days"
//             ],
//             correct: 1
//           },
//           {
//             question: "What to perform after Tawaf?",
//             options: [
//               "Two Rakahs at Maqam Ibrahim",
//               "Sa'i immediately",
//               "Sacrifice",
//               "Stoning"
//             ],
//             correct: 0
//           }
//         ]
//       }
//     }
//   },
//   {
//     id: "sai",
//     title: "Sa'i between Safa and Marwah",
//     day: "Day 1-2",
//     description: "Walking between the hills of Safa and Marwah",
//     mandatory: { tamattu: true, qiran: true, ifrad: false },
//     hajjTypes: ['tamattu', 'qiran'],
//     content: {
//       overview: "Sa'i commemorates Hajar's (AS) search for water for her son Ismail (AS). It is mandatory for Tamattu and Qiran as part of Umrah, but not for Ifrad unless performed after Tawaf al-Ifadah.",
//       procedure: [
//         "Begin at Mount Safa facing the Kaaba",
//         "Recite the prescribed dua and make supplication",
//         "Walk towards Mount Marwah (this counts as one circuit)",
//         "At Marwah, face the Kaaba and make dua",
//         "Return to Safa (this counts as the second circuit)",
//         "Continue until completing seven circuits",
//         "End at Mount Marwah"
//       ],
//       history: "This ritual commemorates the story of Hajar (AS), the wife of Prophet Ibrahim, who ran between these hills searching for water for her infant son Ismail. Allah then caused the Zamzam well to spring forth.",
//       quranEvidence: {
//         verse: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ",
//         reference: "Surah Al-Baqarah 2:158",
//         translation: "Indeed, Safa and Marwah are among the symbols of Allah"
//       },
//       hadithEvidence: {
//         text: "Perform Sa'i, for Allah has prescribed Sa'i upon you.",
//         reference: "Sahih al-Bukhari 1643",
//         narrator: "Ibn Abbas (RA)"
//       },
//       quiz: {
//         questions: [
//           {
//             question: "How many circuits in Sa'i?",
//             options: [
//               "Five",
//               "Seven",
//               "Three",
//               "Nine"
//             ],
//             correct: 1
//           },
//           {
//             question: "Where does Sa'i begin?",
//             options: [
//               "Marwah",
//               "Safa",
//               "Kaaba",
//               "Zamzam"
//             ],
//             correct: 1
//           },
//           {
//             question: "What does Sa'i commemorate?",
//             options: [
//               "Hajar's search for water",
//               "Prophet Muhammad's journey",
//               "Ibrahim's sacrifice",
//               "Adam and Eve"
//             ],
//             correct: 0
//           },
//           {
//             question: "Where does Sa'i end?",
//             options: [
//               "Safa",
//               "Marwah",
//               "Kaaba",
//               "Arafah"
//             ],
//             correct: 1
//           },
//           {
//             question: "Is Sa'i mandatory for Ifrad?",
//             options: [
//               "Yes",
//               "No, unless after Tawaf al-Ifadah",
//               "Always",
//               "Optional"
//             ],
//             correct: 1
//           }
//         ]
//       }
//     }
//   },
//   {
//     id: "mina",
//     title: "Departure to Mina",
//     day: "Day 8 (Tarwiyah)",
//     description: "Journey to Mina for the start of Hajj rituals",
//     mandatory: true,
//     hajjTypes: ['tamattu', 'qiran', 'ifrad'],
//     content: {
//       overview: "The 8th of Dhul-Hijjah, known as Yawm al-Tarwiyah, marks the official beginning of Hajj. Pilgrims travel to Mina where they spend the day and night in worship and preparation.",
//       procedure: [
//         "Travel to Mina after Fajr prayer",
//         "Set up accommodation in designated areas",
//         "Perform five prayers (Dhuhr, Asr, Maghrib, Isha, and Fajr)",
//         "Engage in dhikr, dua, and Quran recitation",
//         "Rest and prepare for the Day of Arafah",
//         "Maintain Ihram restrictions (Qiran/Ifrad maintain from start; Tamattu re-enter Ihram)"
//       ],
//       history: "Mina has been a stopping point for Hajj pilgrims since the time of Prophet Ibrahim (AS). The Prophet Muhammad (SAW) stayed here during his Farewell Hajj, establishing the tradition.",
//       quranEvidence: {
//         verse: "فَإِذَا أَفَضْتُم مِّنْ عَرَفَاتٍ فَاذْكُرُوا اللَّهَ عِندَ الْمَشْعَرِ الْحَرَامِ",
//         reference: "Surah Al-Baqarah 2:198",
//         translation: "But when you depart from Arafat, remember Allah at al-Mash'ar al-Haram"
//       },
//       hadithEvidence: {
//         text: "Learn your rituals from me, for I do not know whether I will perform Hajj after this year.",
//         reference: "Sahih Muslim 1297",
//         narrator: "Jabir ibn Abdullah (RA)"
//       },
//       quiz: {
//         questions: [
//           {
//             question: "What day is Yawm al-Tarwiyah?",
//             options: [
//               "9th Dhul-Hijjah",
//               "8th Dhul-Hijjah",
//               "10th Dhul-Hijjah",
//               "7th Dhul-Hijjah"
//             ],
//             correct: 1
//           },
//           {
//             question: "When to travel to Mina?",
//             options: [
//               "After Maghrib",
//               "After Fajr",
//               "At noon",
//               "After Isha"
//             ],
//             correct: 1
//           },
//           {
//             question: "What to do in Mina?",
//             options: [
//               "Prayers, dhikr, dua",
//               "Tawaf only",
//               "Sacrifice",
//               "Stoning"
//             ],
//             correct: 0
//           },
//           {
//             question: "How many prayers in Mina on Day 8?",
//             options: [
//               "Three",
//               "Five",
//               "Four",
//               "Six"
//             ],
//             correct: 1
//           },
//           {
//             question: "Maintain Ihram in Mina?",
//             options: [
//               "No",
//               "Yes",
//               "Optional",
//               "Only for men"
//             ],
//             correct: 1
//           }
//         ]
//       }
//     }
//   },
//   {
//     id: "arafah",
//     title: "Standing at Arafah",
//     day: "Day 9 (Arafah)",
//     description: "The most important day of Hajj",
//     mandatory: true,
//     hajjTypes: ['tamattu', 'qiran', 'ifrad'],
//     content: {
//       overview: "The Day of Arafah is the pinnacle of Hajj. Standing at Arafah from Dhuhr until sunset is the most essential ritual of Hajj, without which Hajj is not valid.",
//       procedure: [
//         "Leave Mina after Fajr and head to Arafah",
//         "Arrive at Arafah before Dhuhr",
//         "Combine and shorten Dhuhr and Asr prayers",
//         "Stand in worship from Dhuhr until sunset",
//         "Make continuous dua and dhikr",
//         "Seek forgiveness and mercy from Allah",
//         "Leave for Muzdalifah after sunset"
//       ],
//       history: "This is where Prophet Adam (AS) and Hawwa (AS) were reunited after being sent down from Paradise. Prophet Muhammad (SAW) delivered his Farewell Sermon here.",
//       quranEvidence: {
//         verse: "فَإِذَا أَفَضْتُم مِّنْ عَرَفَاتٍ فَاذْكُرُوا اللَّهَ عِندَ الْمَشْعَرِ الْحَرَامِ",
//         reference: "Surah Al-Baqarah 2:198",
//         translation: "But when you depart from Arafat, remember Allah at al-Mash'ar al-Haram"
//       },
//       hadithEvidence: {
//         text: "Hajj is Arafah. Whoever catches the night of Arafah has caught Hajj.",
//         reference: "Sunan Abu Dawud 1949",
//         narrator: "Abd al-Rahman ibn Yamar (RA)"
//       },
//       quiz: {
//         questions: [
//           {
//             question: "What is the most essential ritual of Hajj?",
//             options: [
//               "Tawaf",
//               "Standing at Arafah",
//               "Sacrifice",
//               "Sa'i"
//             ],
//             correct: 1
//           },
//           {
//             question: "When to stand at Arafah?",
//             options: [
//               "From Fajr to sunset",
//               "From Dhuhr until sunset",
//               "Only at night",
//               "After Maghrib"
//             ],
//             correct: 1
//           },
//           {
//             question: "How to pray Dhuhr and Asr at Arafah?",
//             options: [
//               "Separately",
//               "Combine and shorten",
//               "Full length",
//               "Skip"
//             ],
//             correct: 1
//           },
//           {
//             question: "Where to go after Arafah?",
//             options: [
//               "Mina",
//               "Muzdalifah",
//               "Makkah",
//               "Home"
//             ],
//             correct: 1
//           },
//           {
//             question: "What did Prophet Muhammad deliver at Arafah?",
//             options: [
//               "Farewell Sermon",
//               "First revelation",
//               "Marriage",
//               "Nothing"
//             ],
//             correct: 0
//           }
//         ]
//       }
//     }
//   },
//   {
//     id: "muzdalifah",
//     title: "Night at Muzdalifah",
//     day: "Night of Day 9-10",
//     description: "Spending the night under the open sky",
//     mandatory: true,
//     hajjTypes: ['tamattu', 'qiran', 'ifrad'],
//     content: {
//       overview: "After leaving Arafah at sunset, pilgrims travel to Muzdalifah where they spend the night under the open sky, collect pebbles for stoning, and prepare for the final days of Hajj.",
//       procedure: [
//         "Travel from Arafah to Muzdalifah after sunset",
//         "Combine Maghrib and Isha prayers upon arrival",
//         "Sleep under the open sky (no tents)",
//         "Collect small pebbles for Jamarat",
//         "Perform Fajr prayer at its earliest time",
//         "Make dua and dhikr until sunrise",
//         "Depart for Mina after sunrise"
//       ],
//       history: "Muzdalifah, also known as al-Mash'ar al-Haram, has been a stopping point since the time of Prophet Ibrahim (AS). The Prophet (SAW) emphasized spending the night here.",
//       quranEvidence: {
//         verse: "فَاذْكُرُوا اللَّهَ عِندَ الْمَشْعَرِ الْحَرَامِ وَاذْكُرُوهُ كَمَا هَدَاكُمْ",
//         reference: "Surah Al-Baqarah 2:198",
//         translation: "Remember Allah at al-Mash'ar al-Haram and remember Him as He has guided you"
//       },
//       hadithEvidence: {
//         text: "All of Muzdalifah is a place of standing, and all of Arafah is a place of standing.",
//         reference: "Sunan Abu Dawud 1937",
//         narrator: "Jabir ibn Abdullah (RA)"
//       },
//       quiz: {
//         questions: [
//           {
//             question: "When to travel to Muzdalifah?",
//             options: [
//               "After sunrise",
//               "After sunset from Arafah",
//               "At noon",
//               "Before Dhuhr"
//             ],
//             correct: 1
//           },
//           {
//             question: "How to pray Maghrib and Isha in Muzdalifah?",
//             options: [
//               "Separately",
//               "Combine",
//               "Shorten only",
//               "Skip"
//             ],
//             correct: 1
//           },
//           {
//             question: "What to collect in Muzdalifah?",
//             options: [
//               "Water",
//               "Pebbles for Jamarat",
//               "Food",
//               "Clothes"
//             ],
//             correct: 1
//           },
//           {
//             question: "Where to sleep?",
//             options: [
//               "In tents",
//               "Under open sky",
//               "In hotels",
//               "No sleep"
//             ],
//             correct: 1
//           },
//           {
//             question: "What is Muzdalifah also known as?",
//             options: [
//               "al-Mash'ar al-Haram",
//               "Jamarat",
//               "Arafah",
//               "Mina"
//             ],
//             correct: 0
//           }
//         ]
//       }
//     }
//   },
//   {
//     id: "jamarat",
//     title: "Stoning the Jamarat",
//     day: "Days 10-13",
//     description: "Symbolic rejection of Satan",
//     mandatory: true,
//     hajjTypes: ['tamattu', 'qiran', 'ifrad'],
//     content: {
//       overview: "The stoning of the Jamarat represents the rejection of Satan and evil. It commemorates Prophet Ibrahim's (AS) rejection of Satan's temptations when commanded to sacrifice his son.",
//       procedure: [
//         "On Day 10: Stone only Jamarat al-Aqaba (large pillar) with 7 pebbles",
//         "Recite 'Allahu Akbar' with each throw",
//         "On Days 11-13: Stone all three Jamarat in order",
//         "Start with Jamarat al-Sughra, then al-Wusta, then al-Aqaba",
//         "Throw 7 pebbles at each pillar",
//         "Make dua after first two Jamarat, not after the third"
//       ],
//       history: "This ritual commemorates Prophet Ibrahim's (AS) rejection of Satan when Allah commanded him to sacrifice his son. Satan appeared three times to dissuade him, and Ibrahim threw stones to drive him away.",
//       quranEvidence: {
//         verse: "وَاذْكُرُوا اللَّهَ فِي أَيَّامٍ مَّعْدُودَاتٍ",
//         reference: "Surah Al-Baqarah 2:203",
//         translation: "And remember Allah during [specific] numbered days"
//       },
//       hadithEvidence: {
//         text: "I saw the Prophet (SAW) throwing pebbles at Jamarat al-Aqaba while mounted on his camel, and people were around him throwing pebbles.",
//         reference: "Sahih al-Bukhari 1748",
//         narrator: "Ibn Abbas (RA)"
//       },
//       quiz: {
//         questions: [
//           {
//             question: "What does stoning Jamarat symbolize?",
//             options: [
//               "Rejection of Satan",
//               "Prayer",
//               "Sacrifice",
//               "Tawaf"
//             ],
//             correct: 0
//           },
//           {
//             question: "How many pebbles on Day 10?",
//             options: [
//               "21",
//               "7 for Aqaba only",
//               "49",
//               "3"
//             ],
//             correct: 1
//           },
//           {
//             question: "Order of Jamarat on Days 11-13?",
//             options: [
//               "Aqaba first",
//               "Sughra, Wusta, Aqaba",
//               "Wusta first",
//               "Random"
//             ],
//             correct: 1
//           },
//           {
//             question: "What to recite while throwing?",
//             options: [
//               "Talbiyah",
//               "Allahu Akbar",
//               "Subhanallah",
//               "No recitation"
//             ],
//             correct: 1
//           },
//           {
//             question: "When to make dua during stoning?",
//             options: [
//               "After all three",
//               "After first two only",
//               "Before throwing",
//               "Never"
//             ],
//             correct: 1
//           }
//         ]
//       }
//     }
//   },
//   {
//     id: "sacrifice",
//     title: "Animal Sacrifice (Qurbani)",
//     day: "Day 10",
//     description: "Sacrificial offering in remembrance of Ibrahim",
//     mandatory: { tamattu: true, qiran: true, ifrad: false },
//     hajjTypes: ['tamattu', 'qiran', 'ifrad'],
//     content: {
//       overview: "The sacrifice commemorates Prophet Ibrahim's (AS) willingness to sacrifice his son for Allah. It is mandatory for Tamattu and Qiran but optional for Ifrad.",
//       procedure: [
//         "Perform after stoning Jamarat al-Aqaba on Day 10",
//         "Choose a healthy animal (sheep, goat, cow, or camel)",
//         "Make intention and mention Allah's name",
//         "Ensure proper slaughter according to Islamic guidelines",
//         "Distribute meat to the poor and needy",
//         "Keep some for personal consumption"
//       ],
//       history: "When Prophet Ibrahim (AS) was about to sacrifice his son Ismail (AS) in obedience to Allah's command, Allah replaced Ismail with a ram. This established the tradition of sacrifice during Hajj.",
//       quranEvidence: {
//         verse: "فَلَمَّا أَسْلَمَا وَتَلَّهُ لِلْجَبِينِ * وَنَادَيْنَاهُ أَن يَا إِبْرَاهِيمُ * قَدْ صَدَّقْتَ الرُّؤْيَا",
//         reference: "Surah As-Saffat 37:103-105",
//         translation: "And when they had both submitted and he put him down upon his forehead, We called to him, 'O Abraham, You have fulfilled the vision.'"
//       },
//       hadithEvidence: {
//         text: "On the Day of Sacrifice, there is no deed more beloved to Allah than spilling blood (sacrifice).",
//         reference: "Sunan al-Tirmidhi 1493",
//         narrator: "Aisha (RA)"
//       },
//       quiz: {
//         questions: [
//           {
//             question: "What does sacrifice commemorate?",
//             options: [
//               "Ibrahim's willingness to sacrifice his son",
//               "Prophet Muhammad's birth",
//               "Kaaba construction",
//               "Nothing specific"
//             ],
//             correct: 0
//           },
//           {
//             question: "When to perform sacrifice?",
//             options: [
//               "Before stoning",
//               "After stoning Aqaba on Day 10",
//               "On Day 9",
//               "After Hajj"
//             ],
//             correct: 1
//           },
//           {
//             question: "What animals can be sacrificed?",
//             options: [
//               "Any animal",
//               "Sheep, goat, cow, camel",
//               "Only sheep",
//               "Birds only"
//             ],
//             correct: 1
//           },
//           {
//             question: "How to distribute meat?",
//             options: [
//               "All to family",
//               "To poor and needy, some for self",
//               "Throw away",
//               "Sell it"
//             ],
//             correct: 1
//           },
//           {
//             question: "Is sacrifice mandatory for Ifrad?",
//             options: [
//               "Yes",
//               "No, optional",
//               "Only for men",
//               "Only for women"
//             ],
//             correct: 1
//           }
//         ]
//       }
//     }
//   },
//   {
//     id: "halq-taqsir",
//     title: "Shaving or Trimming Hair",
//     day: "Day 10",
//     description: "Symbolic renewal and purification",
//     mandatory: true,
//     hajjTypes: ['tamattu', 'qiran', 'ifrad'],
//     content: {
//       overview: "After the sacrifice, pilgrims shave their heads (Halq) or trim their hair (Taqsir) as a symbol of humility, renewal, and the completion of most Hajj rituals.",
//       procedure: [
//         "Perform after animal sacrifice on Day 10 (or after Jamarat for Ifrad)",
//         "Men: Complete head shaving (Halq) is preferred",
//         "Alternative for men: Trim at least 1/4 of hair length",
//         "Women: Trim only a small portion (about a fingertip length)",
//         "Begin from the right side of the head",
//         "Make dua for forgiveness and acceptance"
//       ],
//       history: "Prophet Muhammad (SAW) made dua three times for those who shave their heads and once for those who trim, showing the preference for complete shaving for men.",
//       quranEvidence: {
//         verse: "مُّحَلِّقِينَ رُءُوسَكُمْ وَمُقَصِّرِينَ لَا تَخَافُونَ",
//         reference: "Surah Al-Fath 48:27",
//         translation: "With your heads shaved and [hair] shortened, not fearing [anyone]"
//       },
//       hadithEvidence: {
//         text: "May Allah have mercy on those who shave. May Allah have mercy on those who shave. May Allah have mercy on those who trim.",
//         reference: "Sahih al-Bukhari 1727",
//         narrator: "Ibn Umar (RA)"
//       },
//       quiz: {
//         questions: [
//           {
//             question: "When to shave/trim hair?",
//             options: [
//               "Before sacrifice",
//               "After sacrifice on Day 10",
//               "On Day 9",
//               "After Tawaf Wada"
//             ],
//             correct: 1
//           },
//           {
//             question: "What is preferred for men?",
//             options: [
//               "Trimming",
//               "Complete shaving (Halq)",
//               "No change",
//               "Dyeing"
//             ],
//             correct: 1
//           },
//           {
//             question: "For women, how much to trim?",
//             options: [
//               "Complete shave",
//               "Small portion (fingertip length)",
//               "Half",
//               "Nothing"
//             ],
//             correct: 1
//           },
//           {
//             question: "From which side to begin?",
//             options: [
//               "Left",
//               "Right",
//               "No specific",
//               "Back"
//             ],
//             correct: 1
//           },
//           {
//             question: "How many times did Prophet make dua for shavers?",
//             options: [
//               "Once",
//               "Three times",
//               "Twice",
//               "Four times"
//             ],
//             correct: 1
//           }
//         ]
//       }
//     }
//   },
//   {
//     id: "tawaf-ifadah",
//     title: "Tawaf al-Ifadah",
//     day: "Day 10-12",
//     description: "The Tawaf of pouring forth",
//     mandatory: true,
//     hajjTypes: ['tamattu', 'qiran', 'ifrad'],
//     content: {
//       overview: "Tawaf al-Ifadah is an essential pillar of Hajj for all types. It is performed after coming from Mina and represents the pilgrim's spiritual return to the House of Allah. For Ifrad, Sa'i is typically performed after this Tawaf if not done earlier.",
//       procedure: [
//         "Travel to Masjid al-Haram after completing Mina rituals",
//         "Perform Tawaf of seven circuits around the Kaaba",
//         "Start and end at the Black Stone",
//         "Recite appropriate duas during circumambulation",
//         "Perform two Rakahs at Maqam Ibrahim",
//         "Perform Sa'i if not done earlier (mandatory for Ifrad if not done with Tawaf al-Qudum)"
//       ],
//       history: "This Tawaf represents the believer's return to Allah after completing the major rituals of Hajj. It signifies the completion of the spiritual journey and renewed commitment to faith.",
//       quranEvidence: {
//         verse: "ثُمَّ لْيَقْضُوا تَفَثَهُمْ وَلْيُوفُوا نُذُورَهُمْ وَلْيَطَّوَّفُوا بِالْبَيْتِ الْعَتِيقِ",
//         reference: "Surah Al-Hajj 22:29",
//         translation: "Then let them end their untidiness and fulfill their vows and circumambulate the ancient House"
//       },
//       hadithEvidence: {
//         text: "The most beloved deed to Allah on the Day of Sacrifice is spilling blood, then Tawaf al-Ifadah.",
//         reference: "Al-Hakim 1676",
//         narrator: "Aisha (RA)"
//       },
//       quiz: {
//         questions: [
//           {
//             question: "Is Tawaf al-Ifadah a pillar of Hajj?",
//             options: [
//               "No",
//               "Yes",
//               "Optional",
//               "Only for Umrah"
//             ],
//             correct: 1
//           },
//           {
//             question: "When to perform Tawaf al-Ifadah?",
//             options: [
//               "Before Mina",
//               "After Mina rituals, Days 10-12",
//               "On Day 9",
//               "At departure"
//             ],
//             correct: 1
//           },
//           {
//             question: "How many circuits?",
//             options: [
//               "Five",
//               "Seven",
//               "Three",
//               "Nine"
//             ],
//             correct: 1
//           },
//           {
//             question: "What after Tawaf al-Ifadah for Ifrad if Sa'i not done?",
//             options: [
//               "Sacrifice",
//               "Perform Sa'i",
//               "Stoning",
//               "Nothing"
//             ],
//             correct: 1
//           },
//           {
//             question: "What to perform after Tawaf?",
//             options: [
//               "Two Rakahs at Maqam Ibrahim",
//               "Sa'i only",
//               "No prayer",
//               "Four Rakahs"
//             ],
//             correct: 0
//           }
//         ]
//       }
//     }
//   }
// ];

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number; // Index of the correct option
}

export interface HajjStepContent {
  overview: string;
  procedure: string[];
  history: string;
  quranEvidence: {
    verse: string;
    reference: string;
    translation: string;
  };
  hadithEvidence: {
    text: string;
    reference: string;
    narrator: string;
  };
  quiz: {
    questions: QuizQuestion[];
  };
  audio: string; // Changed to YouTube embed URL
}

export interface HajjStep {
  id: string;
  title: string;
  day: string;
  description: string;
  mandatory: boolean | { [key in 'tamattu' | 'qiran' | 'ifrad']: boolean };
  hajjTypes: ('tamattu' | 'qiran' | 'ifrad')[];
  content: HajjStepContent;
}

export const HAJJ_STEPS: HajjStep[] = [
  {
    id: "ihram",
    title: "Entering the State of Ihram",
    day: "Day 1",
    description: "Sacred state of ritual purity and dedication",
    mandatory: true,
    hajjTypes: ['tamattu', 'qiran', 'ifrad'],
    content: {
      overview: "Ihram is the sacred state that a Muslim must enter before performing Hajj or Umrah. For Tamattu, pilgrims enter Ihram for Umrah first, then re-enter for Hajj. In Qiran, Ihram is maintained for both Umrah and Hajj. In Ifrad, Ihram is for Hajj only.",
      procedure: [
        "Perform Ghusl (ritual bath) with intention",
        "Wear the Ihram garments (two white seamless cloths for men)",
        "Recite the Talbiyah: 'Labbayka Allahumma labbayk' (modify for Umrah or Hajj based on type)",
        "Make sincere intention (Niyyah) for Umrah (Tamattu/Qiran) or Hajj (Ifrad/Qiran)",
        "Begin observing Ihram restrictions"
      ],
      history: "The practice of Ihram dates back to Prophet Ibrahim (AS) and was perfected by Prophet Muhammad (SAW). It symbolizes equality before Allah, as all pilgrims dress simply regardless of social status.",
      quranEvidence: {
        verse: "وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ",
        reference: "Surah Al-Baqarah 2:196",
        translation: "And complete the Hajj and Umrah for Allah"
      },
      hadithEvidence: {
        text: "Actions are but by intention, and every man shall have only that which he intended.",
        reference: "Sahih al-Bukhari 1",
        narrator: "Umar ibn al-Khattab (RA)"
      },
      quiz: {
        questions: [
          {
            question: "What is Ihram?",
            options: [
              "A type of prayer",
              "A sacred state for Hajj/Umrah",
              "A place in Makkah",
              "A type of garment only"
            ],
            correct: 1
          },
          {
            question: "What should men wear in Ihram?",
            options: [
              "Two white seamless cloths",
              "Regular clothes",
              "Jeans and shirt",
              "No clothing"
            ],
            correct: 0
          },
          {
            question: "What is recited when entering Ihram?",
            options: [
              "Talbiyah",
              "Surah Al-Fatiha",
              "Takbir",
              "Tasbih"
            ],
            correct: 0
          },
          {
            question: "Is Ghusl required before Ihram?",
            options: [
              "No, only wudu",
              "Yes, with intention",
              "Optional",
              "Only for women"
            ],
            correct: 1
          },
          {
            question: "What does Ihram symbolize?",
            options: [
              "Equality before Allah",
              "Wealth and status",
              "Fashion",
              "Comfort"
            ],
            correct: 0
          }
        ]
      },
      audio: "xmihuiLbm1k?si=_lFf0dDb3CPzBX88" // Placeholder YouTube URL
    }
  },
  {
    id: "tawaf-qudum",
    title: "Tawaf al-Qudum (Arrival Tawaf)",
    day: "Day 1-2",
    description: "Circumambulation around the Kaaba upon arrival",
    mandatory: { tamattu: true, qiran: true, ifrad: false },
    hajjTypes: ['tamattu', 'qiran', 'ifrad'],
    content: {
      overview: "Tawaf al-Qudum is the first Tawaf performed upon arriving in Makkah. It is mandatory for Tamattu and Qiran (as part of Umrah) but Sunnah for Ifrad. It welcomes the pilgrim to the Holy Mosque.",
      procedure: [
        "Enter Masjid al-Haram with right foot first",
        "Approach the Black Stone (Hajar al-Aswad)",
        "Begin Tawaf from the Black Stone, moving counter-clockwise",
        "Complete seven circuits around the Kaaba",
        "Recite prescribed duas during each circuit",
        "Perform two Rakahs at Maqam Ibrahim"
      ],
      history: "Prophet Muhammad (SAW) performed this Tawaf when he arrived in Makkah for his Farewell Hajj, establishing it as a recommended practice for all pilgrims arriving for Hajj.",
      quranEvidence: {
        verse: "وَلْيَطَّوَّفُوا بِالْبَيْتِ الْعَتِيقِ",
        reference: "Surah Al-Hajj 22:29",
        translation: "Then let them circumambulate the Ancient House"
      },
      hadithEvidence: {
        text: "The Prophet (SAW) performed Tawaf al-Qudum when he arrived in Makkah for Hajj.",
        reference: "Sahih Muslim 1218",
        narrator: "Ibn Abbas (RA)"
      },
      quiz: {
        questions: [
          {
            question: "How many circuits in Tawaf al-Qudum?",
            options: [
              "Five",
              "Seven",
              "Three",
              "Nine"
            ],
            correct: 1
          },
          {
            question: "Where does Tawaf begin?",
            options: [
              "Maqam Ibrahim",
              "Black Stone",
              "Safa",
              "Marwah"
            ],
            correct: 1
          },
          {
            question: "Direction of Tawaf?",
            options: [
              "Clockwise",
              "Counter-clockwise",
              "No specific direction",
              "Random"
            ],
            correct: 1
          },
          {
            question: "Is Tawaf al-Qudum mandatory for Ifrad?",
            options: [
              "Yes",
              "No, it's Sunnah",
              "Only for men",
              "Only on certain days"
            ],
            correct: 1
          },
          {
            question: "What to perform after Tawaf?",
            options: [
              "Two Rakahs at Maqam Ibrahim",
              "Sa'i immediately",
              "Sacrifice",
              "Stoning"
            ],
            correct: 0
          }
        ]
      },
      audio: "l9vPe6hfhac?si=EyqTd2TbLf1y3WDJ" // Placeholder YouTube URL
    }
  },
  {
    id: "sai",
    title: "Sa'i between Safa and Marwah",
    day: "Day 1-2",
    description: "Walking between the hills of Safa and Marwah",
    mandatory: { tamattu: true, qiran: true, ifrad: false },
    hajjTypes: ['tamattu', 'qiran'],
    content: {
      overview: "Sa'i commemorates Hajar's (AS) search for water for her son Ismail (AS). It is mandatory for Tamattu and Qiran as part of Umrah, but not for Ifrad unless performed after Tawaf al-Ifadah.",
      procedure: [
        "Begin at Mount Safa facing the Kaaba",
        "Recite the prescribed dua and make supplication",
        "Walk towards Mount Marwah (this counts as one circuit)",
        "At Marwah, face the Kaaba and make dua",
        "Return to Safa (this counts as the second circuit)",
        "Continue until completing seven circuits",
        "End at Mount Marwah"
      ],
      history: "This ritual commemorates the story of Hajar (AS), the wife of Prophet Ibrahim, who ran between these hills searching for water for her infant son Ismail. Allah then caused the Zamzam well to spring forth.",
      quranEvidence: {
        verse: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ",
        reference: "Surah Al-Baqarah 2:158",
        translation: "Indeed, Safa and Marwah are among the symbols of Allah"
      },
      hadithEvidence: {
        text: "Perform Sa'i, for Allah has prescribed Sa'i upon you.",
        reference: "Sahih al-Bukhari 1643",
        narrator: "Ibn Abbas (RA)"
      },
      quiz: {
        questions: [
          {
            question: "How many circuits in Sa'i?",
            options: [
              "Five",
              "Seven",
              "Three",
              "Nine"
            ],
            correct: 1
          },
          {
            question: "Where does Sa'i begin?",
            options: [
              "Marwah",
              "Safa",
              "Kaaba",
              "Zamzam"
            ],
            correct: 1
          },
          {
            question: "What does Sa'i commemorate?",
            options: [
              "Hajar's search for water",
              "Prophet Muhammad's journey",
              "Ibrahim's sacrifice",
              "Adam and Eve"
            ],
            correct: 0
          },
          {
            question: "Where does Sa'i end?",
            options: [
              "Safa",
              "Marwah",
              "Kaaba",
              "Arafah"
            ],
            correct: 1
          },
          {
            question: "Is Sa'i mandatory for Ifrad?",
            options: [
              "Yes",
              "No, unless after Tawaf al-Ifadah",
              "Always",
              "Optional"
            ],
            correct: 1
          }
        ]
      },
      audio: "XmykkPyUEvQ?si=hS8UW0FbX-5KPoHm" // Placeholder YouTube URL
    }
  },
  {
    id: "mina",
    title: "Departure to Mina",
    day: "Day 8 (Tarwiyah)",
    description: "Journey to Mina for the start of Hajj rituals",
    mandatory: true,
    hajjTypes: ['tamattu', 'qiran', 'ifrad'],
    content: {
      overview: "The 8th of Dhul-Hijjah, known as Yawm al-Tarwiyah, marks the official beginning of Hajj. Pilgrims travel to Mina where they spend the day and night in worship and preparation.",
      procedure: [
        "Travel to Mina after Fajr prayer",
        "Set up accommodation in designated areas",
        "Perform five prayers (Dhuhr, Asr, Maghrib, Isha, and Fajr)",
        "Engage in dhikr, dua, and Quran recitation",
        "Rest and prepare for the Day of Arafah",
        "Maintain Ihram restrictions (Qiran/Ifrad maintain from start; Tamattu re-enter Ihram)"
      ],
      history: "Mina has been a stopping point for Hajj pilgrims since the time of Prophet Ibrahim (AS). The Prophet Muhammad (SAW) stayed here during his Farewell Hajj, establishing the tradition.",
      quranEvidence: {
        verse: "فَإِذَا أَفَضْتُم مِّنْ عَرَفَاتٍ فَاذْكُرُوا اللَّهَ عِندَ الْمَشْعَرِ الْحَرَامِ",
        reference: "Surah Al-Baqarah 2:198",
        translation: "But when you depart from Arafat, remember Allah at al-Mash'ar al-Haram"
      },
      hadithEvidence: {
        text: "Learn your rituals from me, for I do not know whether I will perform Hajj after this year.",
        reference: "Sahih Muslim 1297",
        narrator: "Jabir ibn Abdullah (RA)"
      },
      quiz: {
        questions: [
          {
            question: "What day is Yawm al-Tarwiyah?",
            options: [
              "9th Dhul-Hijjah",
              "8th Dhul-Hijjah",
              "10th Dhul-Hijjah",
              "7th Dhul-Hijjah"
            ],
            correct: 1
          },
          {
            question: "When to travel to Mina?",
            options: [
              "After Maghrib",
              "After Fajr",
              "At noon",
              "After Isha"
            ],
            correct: 1
          },
          {
            question: "What to do in Mina?",
            options: [
              "Prayers, dhikr, dua",
              "Tawaf only",
              "Sacrifice",
              "Stoning"
            ],
            correct: 0
          },
          {
            question: "How many prayers in Mina on Day 8?",
            options: [
              "Three",
              "Five",
              "Four",
              "Six"
            ],
            correct: 1
          },
          {
            question: "Maintain Ihram in Mina?",
            options: [
              "No",
              "Yes",
              "Optional",
              "Only for men"
            ],
            correct: 1
          }
        ]
      },
      audio: "OVsWndLZDs8?si=hMjSjCTUdK0bNv7y" // Placeholder YouTube URL
    }
  },
  {
    id: "arafah",
    title: "Standing at Arafah",
    day: "Day 9 (Arafah)",
    description: "The most important day of Hajj",
    mandatory: true,
    hajjTypes: ['tamattu', 'qiran', 'ifrad'],
    content: {
      overview: "The Day of Arafah is the pinnacle of Hajj. Standing at Arafah from Dhuhr until sunset is the most essential ritual of Hajj, without which Hajj is not valid.",
      procedure: [
        "Leave Mina after Fajr and head to Arafah",
        "Arrive at Arafah before Dhuhr",
        "Combine and shorten Dhuhr and Asr prayers",
        "Stand in worship from Dhuhr until sunset",
        "Make continuous dua and dhikr",
        "Seek forgiveness and mercy from Allah",
        "Leave for Muzdalifah after sunset"
      ],
      history: "This is where Prophet Adam (AS) and Hawwa (AS) were reunited after being sent down from Paradise. Prophet Muhammad (SAW) delivered his Farewell Sermon here.",
      quranEvidence: {
        verse: "فَإِذَا أَفَضْتُم مِّنْ عَرَفَاتٍ فَاذْكُرُوا اللَّهَ عِندَ الْمَشْعَرِ الْحَرَامِ",
        reference: "Surah Al-Baqarah 2:198",
        translation: "But when you depart from Arafat, remember Allah at al-Mash'ar al-Haram"
      },
      hadithEvidence: {
        text: "Hajj is Arafah. Whoever catches the night of Arafah has caught Hajj.",
        reference: "Sunan Abu Dawud 1949",
        narrator: "Abd al-Rahman ibn Yamar (RA)"
      },
      quiz: {
        questions: [
          {
            question: "What is the most essential ritual of Hajj?",
            options: [
              "Tawaf",
              "Standing at Arafah",
              "Sacrifice",
              "Sa'i"
            ],
            correct: 1
          },
          {
            question: "When to stand at Arafah?",
            options: [
              "From Fajr to sunset",
              "From Dhuhr until sunset",
              "Only at night",
              "After Maghrib"
            ],
            correct: 1
          },
          {
            question: "How to pray Dhuhr and Asr at Arafah?",
            options: [
              "Separately",
              "Combine and shorten",
              "Full length",
              "Skip"
            ],
            correct: 1
          },
          {
            question: "Where to go after Arafah?",
            options: [
              "Mina",
              "Muzdalifah",
              "Makkah",
              "Home"
            ],
            correct: 1
          },
          {
            question: "What did Prophet Muhammad deliver at Arafah?",
            options: [
              "Farewell Sermon",
              "First revelation",
              "Marriage",
              "Nothing"
            ],
            correct: 0
          }
        ]
      },
      audio: "IN_lqu9Ubvc?si=hjzZhKVkmRP-SYFB" // Placeholder YouTube URL
    }
  },
  {
    id: "muzdalifah",
    title: "Night at Muzdalifah",
    day: "Night of Day 9-10",
    description: "Spending the night under the open sky",
    mandatory: true,
    hajjTypes: ['tamattu', 'qiran', 'ifrad'],
    content: {
      overview: "After leaving Arafah at sunset, pilgrims travel to Muzdalifah where they spend the night under the open sky, collect pebbles for stoning, and prepare for the final days of Hajj.",
      procedure: [
        "Travel from Arafah to Muzdalifah after sunset",
        "Combine Maghrib and Isha prayers upon arrival",
        "Sleep under the open sky (no tents)",
        "Collect small pebbles for Jamarat",
        "Perform Fajr prayer at its earliest time",
        "Make dua and dhikr until sunrise",
        "Depart for Mina after sunrise"
      ],
      history: "Muzdalifah, also known as al-Mash'ar al-Haram, has been a stopping point since the time of Prophet Ibrahim (AS). The Prophet (SAW) emphasized spending the night here.",
      quranEvidence: {
        verse: "فَاذْكُرُوا اللَّهَ عِندَ الْمَشْعَرِ الْحَرَامِ وَاذْكُرُوهُ كَمَا هَدَاكُمْ",
        reference: "Surah Al-Baqarah 2:198",
        translation: "Remember Allah at al-Mash'ar al-Haram and remember Him as He has guided you"
      },
      hadithEvidence: {
        text: "All of Muzdalifah is a place of standing, and all of Arafah is a place of standing.",
        reference: "Sunan Abu Dawud 1937",
        narrator: "Jabir ibn Abdullah (RA)"
      },
      quiz: {
        questions: [
          {
            question: "When to travel to Muzdalifah?",
            options: [
              "After sunrise",
              "After sunset from Arafah",
              "At noon",
              "Before Dhuhr"
            ],
            correct: 1
          },
          {
            question: "How to pray Maghrib and Isha in Muzdalifah?",
            options: [
              "Separately",
              "Combine",
              "Shorten only",
              "Skip"
            ],
            correct: 1
          },
          {
            question: "What to collect in Muzdalifah?",
            options: [
              "Water",
              "Pebbles for Jamarat",
              "Food",
              "Clothes"
            ],
            correct: 1
          },
          {
            question: "Where to sleep?",
            options: [
              "In tents",
              "Under open sky",
              "In hotels",
              "No sleep"
            ],
            correct: 1
          },
          {
            question: "What is Muzdalifah also known as?",
            options: [
              "al-Mash'ar al-Haram",
              "Jamarat",
              "Arafah",
              "Mina"
            ],
            correct: 0
          }
        ]
      },
      audio: "JisbT78wyvA?si=a-ipiR_7jKXXiENM" // Placeholder YouTube URL
    }
  },
  {
    id: "jamarat",
    title: "Stoning the Jamarat",
    day: "Days 10-13",
    description: "Symbolic rejection of Satan",
    mandatory: true,
    hajjTypes: ['tamattu', 'qiran', 'ifrad'],
    content: {
      overview: "The stoning of the Jamarat represents the rejection of Satan and evil. It commemorates Prophet Ibrahim's (AS) rejection of Satan's temptations when commanded to sacrifice his son.",
      procedure: [
        "On Day 10: Stone only Jamarat al-Aqaba (large pillar) with 7 pebbles",
        "Recite 'Allahu Akbar' with each throw",
        "On Days 11-13: Stone all three Jamarat in order",
        "Start with Jamarat al-Sughra, then al-Wusta, then al-Aqaba",
        "Throw 7 pebbles at each pillar",
        "Make dua after first two Jamarat, not after the third"
      ],
      history: "This ritual commemorates Prophet Ibrahim's (AS) rejection of Satan when Allah commanded him to sacrifice his son. Satan appeared three times to dissuade him, and Ibrahim threw stones to drive him away.",
      quranEvidence: {
        verse: "وَاذْكُرُوا اللَّهَ فِي أَيَّامٍ مَّعْدُودَاتٍ",
        reference: "Surah Al-Baqarah 2:203",
        translation: "And remember Allah during [specific] numbered days"
      },
      hadithEvidence: {
        text: "I saw the Prophet (SAW) throwing pebbles at Jamarat al-Aqaba while mounted on his camel, and people were around him throwing pebbles.",
        reference: "Sahih al-Bukhari 1748",
        narrator: "Ibn Abbas (RA)"
      },
      quiz: {
        questions: [
          {
            question: "What does stoning Jamarat symbolize?",
            options: [
              "Rejection of Satan",
              "Prayer",
              "Sacrifice",
              "Tawaf"
            ],
            correct: 0
          },
          {
            question: "How many pebbles on Day 10?",
            options: [
              "21",
              "7 for Aqaba only",
              "49",
              "3"
            ],
            correct: 1
          },
          {
            question: "Order of Jamarat on Days 11-13?",
            options: [
              "Aqaba first",
              "Sughra, Wusta, Aqaba",
              "Wusta first",
              "Random"
            ],
            correct: 1
          },
          {
            question: "What to recite while throwing?",
            options: [
              "Talbiyah",
              "Allahu Akbar",
              "Subhanallah",
              "No recitation"
            ],
            correct: 1
          },
          {
            question: "When to make dua during stoning?",
            options: [
              "After all three",
              "After first two only",
              "Before throwing",
              "Never"
            ],
            correct: 1
          }
        ]
      },
      audio: "HQwzQzwKN6I?si=vTvlMTbrif8iDDQE" // Placeholder YouTube URL
    }
  },
  {
    id: "sacrifice",
    title: "Animal Sacrifice (Qurbani)",
    day: "Day 10",
    description: "Sacrificial offering in remembrance of Ibrahim",
    mandatory: { tamattu: true, qiran: true, ifrad: false },
    hajjTypes: ['tamattu', 'qiran', 'ifrad'],
    content: {
      overview: "The sacrifice commemorates Prophet Ibrahim's (AS) willingness to sacrifice his son for Allah. It is mandatory for Tamattu and Qiran but optional for Ifrad.",
      procedure: [
        "Perform after stoning Jamarat al-Aqaba on Day 10",
        "Choose a healthy animal (sheep, goat, cow, or camel)",
        "Make intention and mention Allah's name",
        "Ensure proper slaughter according to Islamic guidelines",
        "Distribute meat to the poor and needy",
        "Keep some for personal consumption"
      ],
      history: "When Prophet Ibrahim (AS) was about to sacrifice his son Ismail (AS) in obedience to Allah's command, Allah replaced Ismail with a ram. This established the tradition of sacrifice during Hajj.",
      quranEvidence: {
        verse: "فَلَمَّا أَسْلَمَا وَتَلَّهُ لِلْجَبِينِ * وَنَادَيْنَاهُ أَن يَا إِبْرَاهِيمُ * قَدْ صَدَّقْتَ الرُّؤْيَا",
        reference: "Surah As-Saffat 37:103-105",
        translation: "And when they had both submitted and he put him down upon his forehead, We called to him, 'O Abraham, You have fulfilled the vision.'"
      },
      hadithEvidence: {
        text: "On the Day of Sacrifice, there is no deed more beloved to Allah than spilling blood (sacrifice).",
        reference: "Sunan al-Tirmidhi 1493",
        narrator: "Aisha (RA)"
      },
      quiz: {
        questions: [
          {
            question: "What does sacrifice commemorate?",
            options: [
              "Ibrahim's willingness to sacrifice his son",
              "Prophet Muhammad's birth",
              "Kaaba construction",
              "Nothing specific"
            ],
            correct: 0
          },
          {
            question: "When to perform sacrifice?",
            options: [
              "Before stoning",
              "After stoning Aqaba on Day 10",
              "On Day 9",
              "After Hajj"
            ],
            correct: 1
          },
          {
            question: "What animals can be sacrificed?",
            options: [
              "Any animal",
              "Sheep, goat, cow, camel",
              "Only sheep",
              "Birds only"
            ],
            correct: 1
          },
          {
            question: "How to distribute meat?",
            options: [
              "All to family",
              "To poor and needy, some for self",
              "Throw away",
              "Sell it"
            ],
            correct: 1
          },
          {
            question: "Is sacrifice mandatory for Ifrad?",
            options: [
              "Yes",
              "No, optional",
              "Only for men",
              "Only for women"
            ],
            correct: 1
          }
        ]
      },
      audio: "IqY5s2PTrIg?si=jph6ZTFbjnweFNwa" // Placeholder YouTube URL
    }
  },
  {
    id: "halq-taqsir",
    title: "Shaving or Trimming Hair",
    day: "Day 10",
    description: "Symbolic renewal and purification",
    mandatory: true,
    hajjTypes: ['tamattu', 'qiran', 'ifrad'],
    content: {
      overview: "After the sacrifice, pilgrims shave their heads (Halq) or trim their hair (Taqsir) as a symbol of humility, renewal, and the completion of most Hajj rituals.",
      procedure: [
        "Perform after animal sacrifice on Day 10 (or after Jamarat for Ifrad)",
        "Men: Complete head shaving (Halq) is preferred",
        "Alternative for men: Trim at least 1/4 of hair length",
        "Women: Trim only a small portion (about a fingertip length)",
        "Begin from the right side of the head",
        "Make dua for forgiveness and acceptance"
      ],
      history: "Prophet Muhammad (SAW) made dua three times for those who shave their heads and once for those who trim, showing the preference for complete shaving for men.",
      quranEvidence: {
        verse: "مُّحَلِّقِينَ رُءُوسَكُمْ وَمُقَصِّرِينَ لَا تَخَافُونَ",
        reference: "Surah Al-Fath 48:27",
        translation: "With your heads shaved and [hair] shortened, not fearing [anyone]"
      },
      hadithEvidence: {
        text: "May Allah have mercy on those who shave. May Allah have mercy on those who shave. May Allah have mercy on those who trim.",
        reference: "Sahih al-Bukhari 1727",
        narrator: "Ibn Umar (RA)"
      },
      quiz: {
        questions: [
          {
            question: "When to shave/trim hair?",
            options: [
              "Before sacrifice",
              "After sacrifice on Day 10",
              "On Day 9",
              "After Tawaf Wada"
            ],
            correct: 1
          },
          {
            question: "What is preferred for men?",
            options: [
              "Trimming",
              "Complete shaving (Halq)",
              "No change",
              "Dyeing"
            ],
            correct: 1
          },
          {
            question: "For women, how much to trim?",
            options: [
              "Complete shave",
              "Small portion (fingertip length)",
              "Half",
              "Nothing"
            ],
            correct: 1
          },
          {
            question: "From which side to begin?",
            options: [
              "Left",
              "Right",
              "No specific",
              "Back"
            ],
            correct: 1
          },
          {
            question: "How many times did Prophet make dua for shavers?",
            options: [
              "Once",
              "Three times",
              "Twice",
              "Four times"
            ],
            correct: 1
          }
        ]
      },
      audio: "4J3Q6JmRDo0?si=PWKjo8jVyIzve3Jb" // Placeholder YouTube URL
    }
  },
  {
    id: "tawaf-ifadah",
    title: "Tawaf al-Ifadah",
    day: "Day 10-12",
    description: "The Tawaf of pouring forth",
    mandatory: true,
    hajjTypes: ['tamattu', 'qiran', 'ifrad'],
    content: {
      overview: "Tawaf al-Ifadah is an essential pillar of Hajj for all types. It is performed after coming from Mina and represents the pilgrim's spiritual return to the House of Allah. For Ifrad, Sa'i is typically performed after this Tawaf if not done earlier.",
      procedure: [
        "Travel to Masjid al-Haram after completing Mina rituals",
        "Perform Tawaf of seven circuits around the Kaaba",
        "Start and end at the Black Stone",
        "Recite appropriate duas during circumambulation",
        "Perform two Rakahs at Maqam Ibrahim",
        "Perform Sa'i if not done earlier (mandatory for Ifrad if not done with Tawaf al-Qudum)"
      ],
      history: "This Tawaf represents the believer's return to Allah after completing the major rituals of Hajj. It signifies the completion of the spiritual journey and renewed commitment to faith.",
      quranEvidence: {
        verse: "ثُمَّ لْيَقْضُوا تَفَثَهُمْ وَلْيُوفُوا نُذُورَهُمْ وَلْيَطَّوَّفُوا بِالْبَيْتِ الْعَتِيقِ",
        reference: "Surah Al-Hajj 22:29",
        translation: "Then let them end their untidiness and fulfill their vows and circumambulate the ancient House"
      },
      hadithEvidence: {
        text: "The most beloved deed to Allah on the Day of Sacrifice is spilling blood, then Tawaf al-Ifadah.",
        reference: "Al-Hakim 1676",
        narrator: "Aisha (RA)"
      },
      quiz: {
        questions: [
          {
            question: "Is Tawaf al-Ifadah a pillar of Hajj?",
            options: [
              "No",
              "Yes",
              "Optional",
              "Only for Umrah"
            ],
            correct: 1
          },
          {
            question: "When to perform Tawaf al-Ifadah?",
            options: [
              "Before Mina",
              "After Mina rituals, Days 10-12",
              "On Day 9",
              "At departure"
            ],
            correct: 1
          },
          {
            question: "How many circuits?",
            options: [
              "Five",
              "Seven",
              "Three",
              "Nine"
            ],
            correct: 1
          },
          {
            question: "What after Tawaf al-Ifadah for Ifrad if Sa'i not done?",
            options: [
              "Sacrifice",
              "Perform Sa'i",
              "Stoning",
              "Nothing"
            ],
            correct: 1
          },
          {
            question: "What to perform after Tawaf?",
            options: [
              "Two Rakahs at Maqam Ibrahim",
              "Sa'i only",
              "No prayer",
              "Four Rakahs"
            ],
            correct: 0
          }
        ]
      },
      audio: "mF9ybe2WPv8?si=iPA9FD7IZblQGZ8e" // Placeholder YouTube URL
    }
  }
];