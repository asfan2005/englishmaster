import { ListeningExercise, ListeningLevel, ExerciseType } from './types';

export const listeningLevels: ListeningLevel[] = [
  { id: "beginner", name: "Beginner (A1-A2)" },
  { id: "intermediate", name: "Intermediate (B1-B2)" },
  { id: "advanced", name: "Advanced (C1-C2)" },
  { id: "ielts", name: "IELTS Practice" }
];

// Sahifada exerciseTypes.map(type => ({...type, icon: React.createElement(iconComponent)}))
// orqali icons qo'shiladi
export const exerciseTypes = [
  { id: "conversations", name: "Conversations" },
  { id: "lectures", name: "Lectures & Talks" },
  { id: "news", name: "News Reports" },
  { id: "interviews", name: "Interviews" }
];

export const mockExercises: ListeningExercise[] = [
  // BEGINNER LEVEL - CONVERSATIONS
  {
    id: "beg-conv-1",
    title: "At the Coffee Shop",
    level: "beginner",
    type: "conversations",
    audioSrc: "/audio/coffee-shop.mp3", 
    description: "Listen to a conversation between a customer and barista at a coffee shop.",
    duration: 95,
    transcript: `
Customer: Good morning!
Barista: Good morning! What can I get for you today?
Customer: I'd like a medium coffee, please.
Barista: Would you like regular or decaf?
Customer: Regular, please.
Barista: Do you want room for cream?
Customer: Yes, a little bit of room.
Barista: Would you like to add anything else? We have some fresh pastries today.
Customer: What kind of pastries do you have?
Barista: We have croissants, muffins, and cinnamon rolls.
Customer: A cinnamon roll sounds good. I'll take one.
Barista: Great! That's a medium regular coffee and one cinnamon roll. That will be $5.75.
Customer: Here you go.
Barista: Thank you. Your coffee will be ready at the end of the counter.
Customer: Thank you!
Barista: You're welcome. Have a nice day!
    `,
    questions: [
      {
        id: "beg-conv-1-q1",
        type: "mcq",
        text: "What size of coffee does the customer order?",
        options: [
          "Small",
          "Medium",
          "Large",
          "Extra large"
        ],
        correctAnswer: "Medium"
      },
      {
        id: "beg-conv-1-q2",
        type: "mcq",
        text: "What type of coffee does the customer order?",
        options: [
          "Decaf",
          "Regular",
          "Espresso",
          "Americano"
        ],
        correctAnswer: "Regular"
      },
      {
        id: "beg-conv-1-q3",
        type: "mcq",
        text: "What does the customer buy with the coffee?",
        options: [
          "A croissant",
          "A muffin",
          "A cinnamon roll",
          "Nothing else"
        ],
        correctAnswer: "A cinnamon roll"
      },
      {
        id: "beg-conv-1-q4",
        type: "mcq",
        text: "How much does the customer pay?",
        options: [
          "$4.75",
          "$5.25",
          "$5.75",
          "$6.25"
        ],
        correctAnswer: "$5.75"
      }
    ]
  },
  
  // BEGINNER LEVEL - INTERVIEWS
  {
    id: "beg-int-1",
    title: "Job Application Interview",
    level: "beginner",
    type: "interviews",
    audioSrc: "/audio/job-interview-beg.mp3",
    description: "Listen to a simple job interview for a part-time position.",
    duration: 120,
    transcript: `
Interviewer: Hello, thank you for coming in today. Please, have a seat.
Applicant: Thank you for having me.
Interviewer: Can you tell me a little about yourself?
Applicant: Of course. My name is Sarah, and I'm a student at the local community college. I'm studying business, and I'm looking for a part-time job to gain some experience.
Interviewer: That sounds good. Why are you interested in working at our bookstore?
Applicant: I love books, and I enjoy helping people. I think working here would be a great way to combine those interests.
Interviewer: Have you had any customer service experience before?
Applicant: Yes, I worked at a café last summer. I took orders, served customers, and handled the cash register.
Interviewer: That's useful experience. What hours are you available to work?
Applicant: I'm available weekday afternoons after 3 PM and all day on weekends.
Interviewer: Perfect. We need someone for weekend shifts especially. Do you have any questions for me?
Applicant: Yes, when would I start if I get the position?
Interviewer: We'd like someone to start next week if possible.
Applicant: That works for me.
Interviewer: Great! We'll call you by Friday to let you know our decision.
Applicant: Thank you very much. I look forward to hearing from you.
    `,
    questions: [
      {
        id: "beg-int-1-q1",
        type: "mcq",
        text: "What is the applicant's name?",
        options: [
          "Susan",
          "Sarah",
          "Sandra",
          "Sophie"
        ],
        correctAnswer: "Sarah"
      },
      {
        id: "beg-int-1-q2",
        type: "mcq",
        text: "What type of job is the applicant interviewing for?",
        options: [
          "A café position",
          "A bookstore position",
          "A college position",
          "A business position"
        ],
        correctAnswer: "A bookstore position"
      },
      {
        id: "beg-int-1-q3",
        type: "mcq",
        text: "What previous work experience does the applicant have?",
        options: [
          "Working at a library",
          "Working at a bookstore",
          "Working at a café",
          "Working at a college"
        ],
        correctAnswer: "Working at a café"
      },
      {
        id: "beg-int-1-q4",
        type: "mcq",
        text: "When will the interviewer inform the applicant of their decision?",
        options: [
          "By Monday",
          "By Wednesday",
          "By Friday",
          "By next week"
        ],
        correctAnswer: "By Friday"
      }
    ]
  },
  
  // INTERMEDIATE LEVEL - CONVERSATIONS
  {
    id: "int-conv-1",
    title: "At the Restaurant",
    level: "intermediate",
    type: "conversations",
    audioSrc: "/audio/restaurant-conversation.mp3", 
    description: "Listen to a conversation between two people at a restaurant and answer the questions.",
    duration: 173,
    transcript: `
Woman: Hi, can I get a table for two, please?
Host: Of course. Would you prefer to sit inside or on the patio?
Woman: It's such a nice day. Let's sit on the patio.
Host: Perfect. Follow me. Here's your table. Your server will be with you shortly.
Woman: Thank you.
[A few moments later]
Waiter: Hello, welcome to Riverside Café. My name is David, and I'll be your server today. Can I start you off with something to drink?
Woman: I'll have an iced tea, please.
Man: And I'll take a sparkling water with lime.
Waiter: Great. One iced tea and one sparkling water with lime. Are you ready to order, or do you need a few minutes?
Man: We need a few minutes, I think.
Waiter: No problem. I'll be back with your drinks.
[A few minutes later]
Waiter: Here are your drinks. Are you ready to order now?
Woman: Yes, I'd like the grilled salmon with seasonal vegetables, please.
Waiter: Good choice. And how would you like your salmon cooked?
Woman: Medium, please.
Waiter: Medium it is. And for you, sir?
Man: I'll have the mushroom risotto. Does it contain any dairy?
Waiter: Yes, it does have butter and parmesan cheese in it. Are you lactose intolerant?
Man: I am, actually.
Waiter: We can make it without the parmesan on top, but the butter is mixed in during cooking. I can recommend our vegetable pasta instead, which is dairy-free.
Man: That sounds perfect. I'll go with the vegetable pasta then.
Waiter: Excellent. So that's one grilled salmon, medium, with seasonal vegetables, and one vegetable pasta. I'll put your order in right away.
Woman: Thank you. Oh, and could we get some bread for the table?
Waiter: Of course. I'll bring that right out.
    `,
    questions: [
      {
        id: "int-conv-1-q1",
        type: "mcq",
        text: "Where do the customers decide to sit?",
        options: [
          "At a table inside",
          "On the patio",
          "Near the window",
          "At the bar"
        ],
        correctAnswer: "On the patio"
      },
      {
        id: "int-conv-1-q2",
        type: "mcq",
        text: "What does the man order to drink?",
        options: [
          "Iced tea",
          "Still water",
          "Sparkling water with lime",
          "Lemonade"
        ],
        correctAnswer: "Sparkling water with lime"
      },
      {
        id: "int-conv-1-q3",
        type: "mcq",
        text: "What food does the woman order?",
        options: [
          "Vegetable pasta",
          "Grilled salmon",
          "Mushroom risotto",
          "A salad"
        ],
        correctAnswer: "Grilled salmon"
      },
      {
        id: "int-conv-1-q4",
        type: "mcq",
        text: "Why does the man change his order?",
        options: [
          "He doesn't like mushrooms",
          "The dish is too expensive",
          "He is lactose intolerant",
          "The risotto isn't available"
        ],
        correctAnswer: "He is lactose intolerant"
      },
      {
        id: "int-conv-1-q5",
        type: "mcq",
        text: "What does the woman request at the end of the conversation?",
        options: [
          "More water",
          "The check",
          "Bread for the table",
          "Salt and pepper"
        ],
        correctAnswer: "Bread for the table"
      }
    ]
  },
  
  // INTERMEDIATE LEVEL - NEWS REPORTS
  {
    id: "int-news-1",
    title: "Local Festival Report",
    level: "intermediate",
    type: "news",
    audioSrc: "/audio/festival-news.mp3",
    description: "Listen to a news report about a local arts and music festival.",
    duration: 135,
    transcript: `
Reporter: Good afternoon. This is Emma Chen reporting live from City Park, where the annual Arts and Music Festival is in full swing. Despite the rain earlier this morning, thousands of visitors have gathered to enjoy the diverse array of performances and exhibitions.

The festival, now in its 15th year, features over 50 musical acts across five stages, as well as art installations from more than 100 local and international artists. The main stage has been particularly popular today, with indie rock band "Sunset Boulevard" drawing a large crowd during their afternoon performance.

Festival organizer Michael Thompson told us that attendance is up 20% from last year, with an estimated 25,000 people expected over the three-day event.

Local businesses are also benefiting from the increased foot traffic. Sarah Johnson, owner of "The Coffee Corner" near the park entrance, said her sales have doubled compared to a normal weekend.

The festival continues throughout the weekend, with headline acts performing each evening until 11 PM. Sunday will feature a special children's program, with interactive art workshops and family-friendly performances scheduled throughout the day.

Visitors are reminded that parking is limited, and organizers recommend using the free shuttle service from downtown or public transportation. For more information, visit the festival's website at cityartsfestival.org.

This is Emma Chen, reporting for Channel 8 News.
    `,
    questions: [
      {
        id: "int-news-1-q1",
        type: "mcq",
        text: "How many years has the festival been running?",
        options: [
          "5 years",
          "10 years",
          "15 years",
          "20 years"
        ],
        correctAnswer: "15 years"
      },
      {
        id: "int-news-1-q2",
        type: "mcq",
        text: "How many people are expected to attend the festival?",
        options: [
          "15,000",
          "20,000",
          "25,000",
          "30,000"
        ],
        correctAnswer: "25,000"
      },
      {
        id: "int-news-1-q3",
        type: "mcq",
        text: "What is scheduled for Sunday at the festival?",
        options: [
          "A rock concert",
          "A children's program",
          "An art auction",
          "A food competition"
        ],
        correctAnswer: "A children's program"
      },
      {
        id: "int-news-1-q4",
        type: "mcq",
        text: "What transportation option does the reporter recommend?",
        options: [
          "Private cars",
          "Taxis",
          "Bicycles",
          "Shuttle service or public transportation"
        ],
        correctAnswer: "Shuttle service or public transportation"
      },
      {
        id: "int-news-1-q5",
        type: "mcq",
        text: "What is the name of the reporter?",
        options: [
          "Sarah Johnson",
          "Michael Thompson",
          "Emma Chen",
          "Sunset Boulevard"
        ],
        correctAnswer: "Emma Chen"
      }
    ]
  },
  
  // ADVANCED LEVEL - LECTURES
  {
    id: "adv-lec-1",
    title: "Climate Change Lecture",
    level: "advanced",
    type: "lectures",
    audioSrc: "/audio/climate-lecture.mp3",
    description: "Listen to a university lecture about climate change and its environmental impacts.",
    duration: 240,
    transcript: `
Professor: Good morning, everyone. Today we'll be discussing the current scientific consensus on climate change, with particular emphasis on feedback mechanisms and tipping points in Earth's climate system.

As you're aware from your readings, global temperatures have risen approximately 1.1 degrees Celsius since pre-industrial times. This may not sound significant, but it's important to understand that small changes in global average temperature can lead to dramatic shifts in climate patterns.

One of the most concerning aspects of climate science is the existence of positive feedback loops. These are mechanisms that amplify the initial warming effect. For example, as Arctic sea ice melts due to rising temperatures, the dark ocean water that's exposed absorbs more solar radiation than the reflective ice did. This additional absorption further warms the ocean, causing more ice to melt, creating a self-reinforcing cycle.

Another critical feedback mechanism involves permafrost thawing. Permafrost regions contain vast amounts of frozen organic matter. When this thaws, microbial decomposition releases methane and carbon dioxide – potent greenhouse gases that further accelerate warming. Recent studies suggest permafrost is thawing much faster than our earlier models predicted.

The concept of climate tipping points is equally concerning. These are thresholds that, once crossed, lead to large, irreversible changes in the climate system. The potential collapse of the West Antarctic Ice Sheet is one example. If completely melted, this alone could raise global sea levels by approximately 3.3 meters.

Similarly, changes to the Atlantic Meridional Overturning Circulation – which includes the Gulf Stream – could radically alter climate patterns across Europe and North America. Evidence suggests this circulation has already weakened by about 15% since the mid-20th century.

What makes these tipping points particularly dangerous is that they can be triggered by relatively small temperature increases, potentially leading to abrupt, non-linear changes rather than gradual shifts. Moreover, they interact with each other, potentially creating cascading effects throughout Earth's systems.

The latest climate models incorporating these feedback mechanisms suggest we may have less time to act than previously thought. While there's still scientific debate about the exact thresholds for various tipping points, there's broad consensus that maintaining warming below 1.5 degrees Celsius would significantly reduce these risks.

In the second half of today's lecture, we'll examine potential solutions, including both mitigation strategies to reduce emissions and adaptation approaches for impacts that are now unavoidable. Please take a moment to review your notes, and then we'll continue.
    `,
    questions: [
      {
        id: "adv-lec-1-q1",
        type: "mcq",
        text: "By how much have global temperatures risen since pre-industrial times, according to the lecture?",
        options: [
          "0.5 degrees Celsius",
          "1.1 degrees Celsius",
          "1.5 degrees Celsius",
          "2.0 degrees Celsius"
        ],
        correctAnswer: "1.1 degrees Celsius"
      },
      {
        id: "adv-lec-1-q2",
        type: "mcq",
        text: "What example does the professor give of a positive feedback loop?",
        options: [
          "Increased plant growth absorbing more carbon dioxide",
          "More clouds reflecting sunlight back to space",
          "Arctic sea ice melting exposing dark ocean water",
          "Increased rainfall cooling the atmosphere"
        ],
        correctAnswer: "Arctic sea ice melting exposing dark ocean water"
      },
      {
        id: "adv-lec-1-q3",
        type: "mcq",
        text: "What gases are released when permafrost thaws?",
        options: [
          "Oxygen and nitrogen",
          "Hydrogen and oxygen",
          "Methane and carbon dioxide",
          "Nitrogen and sulfur dioxide"
        ],
        correctAnswer: "Methane and carbon dioxide"
      },
      {
        id: "adv-lec-1-q4",
        type: "mcq",
        text: "How much could sea levels rise if the West Antarctic Ice Sheet completely melted?",
        options: [
          "0.5 meters",
          "1.5 meters",
          "3.3 meters",
          "5.0 meters"
        ],
        correctAnswer: "3.3 meters"
      },
      {
        id: "adv-lec-1-q5",
        type: "mcq",
        text: "By approximately what percentage has the Atlantic Meridional Overturning Circulation weakened since the mid-20th century?",
        options: [
          "5%",
          "15%",
          "25%",
          "35%"
        ],
        correctAnswer: "15%"
      },
      {
        id: "adv-lec-1-q6",
        type: "mcq",
        text: "What is the temperature threshold mentioned that would significantly reduce the risks of climate tipping points?",
        options: [
          "Below 1.0 degrees Celsius",
          "Below 1.5 degrees Celsius",
          "Below 2.0 degrees Celsius",
          "Below 2.5 degrees Celsius"
        ],
        correctAnswer: "Below 1.5 degrees Celsius"
      }
    ]
  },
  
  // IELTS PRACTICE - INTERVIEWS
  {
    id: "ielts-int-1",
    title: "IELTS Interview Practice",
    level: "ielts",
    type: "interviews",
    audioSrc: "/audio/ielts-interview.mp3",
    description: "Listen to a mock IELTS speaking test (Part 3) discussing the topic of technology and education.",
    duration: 185,
    transcript: `
Examiner: Now I'd like to discuss with you some more general questions related to technology in education. Firstly, do you think technology has improved the quality of education in recent years?

Candidate: I believe technology has brought both advantages and challenges to education. On the positive side, it's made information far more accessible. Students can now access resources and research from around the world instantly, which was impossible thirty years ago. Interactive learning platforms also allow for personalized learning experiences tailored to individual needs and pace.

However, there are certainly drawbacks. The constant distraction of social media and entertainment apps can significantly reduce concentration. Some studies suggest that handwriting information helps with retention better than typing, so digital note-taking might not always be beneficial. Overall, I think technology improves education when implemented thoughtfully, but it's not a solution in itself.

Examiner: Some people argue that traditional teaching methods are being lost as schools embrace new technologies. What's your view on this?

Candidate: That's a valid concern. There's definitely value in many traditional approaches, particularly the development of critical thinking through face-to-face discussion and debate. When students engage directly with teachers and peers, they develop communication skills that are difficult to replicate in digital environments.

That said, I don't think it has to be an either-or situation. The most effective educational models integrate technology while preserving valuable traditional methods. For example, a history teacher might use virtual reality to "visit" historical sites but still assign analytical essays and facilitate classroom debates about historical perspectives. I believe we should aim for a balanced approach rather than complete replacement of traditional methods.

Examiner: Looking to the future, how do you think technological developments might change education in the next fifty years?

Candidate: I expect we'll see some revolutionary changes. Artificial intelligence will likely provide highly personalized education, adapting in real-time to each student's learning style, pace, and interests. Virtual and augmented reality might make experiential learning the norm – imagine learning biology by virtually exploring inside a cell or studying astronomy by navigating through a 3D model of the solar system.

I also think the traditional university model might be transformed. We're already seeing the rise of micro-credentials and specialized online courses. In fifty years, education might be much more flexible and continuous throughout one's career rather than concentrated in the early years of life.

That said, I believe human teachers will remain essential. Their role might evolve from information providers to mentors who help students develop critical thinking, emotional intelligence, and creativity – skills that technology will likely struggle to teach effectively.
    `,
    questions: [
      {
        id: "ielts-int-1-q1",
        type: "mcq",
        text: "What is one advantage of technology in education mentioned by the candidate?",
        options: [
          "Reduced cost of education",
          "Improved student attendance",
          "Greater accessibility to information",
          "Reduced workload for teachers"
        ],
        correctAnswer: "Greater accessibility to information"
      },
      {
        id: "ielts-int-1-q2",
        type: "mcq",
        text: "According to the candidate, what is a potential disadvantage of digital note-taking?",
        options: [
          "It's more time-consuming",
          "It may not help with information retention as well as handwriting",
          "It requires expensive equipment",
          "It's difficult to organize digital notes"
        ],
        correctAnswer: "It may not help with information retention as well as handwriting"
      },
      {
        id: "ielts-int-1-q3",
        type: "mcq",
        text: "What skills does the candidate suggest are developed through face-to-face discussion?",
        options: [
          "Technical skills",
          "Communication skills",
          "Mathematical skills",
          "Programming skills"
        ],
        correctAnswer: "Communication skills"
      },
      {
        id: "ielts-int-1-q4",
        type: "mcq",
        text: "What approach to technology in education does the candidate advocate for?",
        options: [
          "Completely replacing traditional methods",
          "Avoiding technology altogether",
          "A balanced integration of technology with traditional methods",
          "Letting students choose their preferred method"
        ],
        correctAnswer: "A balanced integration of technology with traditional methods"
      },
      {
        id: "ielts-int-1-q5",
        type: "mcq",
        text: "According to the candidate, what role might teachers have in fifty years?",
        options: [
          "They will be completely replaced by AI",
          "They will focus on teaching programming",
          "They will become mentors focusing on skills like critical thinking",
          "They will primarily manage educational technology"
        ],
        correctAnswer: "They will become mentors focusing on skills like critical thinking"
      },
      {
        id: "ielts-int-1-q6",
        type: "mcq",
        text: "What does the candidate predict about the university model in the future?",
        options: [
          "It will remain exactly the same",
          "It might be transformed with more flexible, continuous education",
          "Universities will no longer exist",
          "It will become more expensive and exclusive"
        ],
        correctAnswer: "It might be transformed with more flexible, continuous education"
      }
    ]
  },
  
  // IELTS PRACTICE - LECTURES
  {
    id: "ielts-lec-1",
    title: "IELTS Academic Lecture: Urban Planning",
    level: "ielts",
    type: "lectures",
    audioSrc: "/audio/ielts-lecture-urban.mp3",
    description: "Listen to an academic lecture about sustainable urban planning strategies.",
    duration: 210,
    transcript: `
Today I'll be discussing sustainable urban planning, focusing particularly on how cities can adapt to accommodate growing populations while minimizing their environmental impact.

Urbanization continues at an unprecedented rate globally. The UN projects that by 2050, nearly 70% of the world's population will live in urban areas. This rapid growth presents significant challenges for urban planners, particularly in terms of housing, transportation, resource management, and environmental preservation.

Let's begin by examining the concept of compact city development. This approach aims to increase population density in urban areas through strategic planning. Rather than allowing cities to sprawl outward, compact development encourages vertical growth and the efficient use of available land. This often involves mixed-use zoning, where residential, commercial, and recreational facilities exist in close proximity.

The benefits of this approach are manifold. First, it reduces dependency on private vehicles, as key services and employment opportunities are within walking distance or accessible via public transportation. This, in turn, leads to reduced carbon emissions. Second, it preserves outlying natural habitats and agricultural land that would otherwise be consumed by urban expansion. Third, it allows for more efficient provision of essential services like water, electricity, and waste management.

Singapore provides an excellent case study of compact urban development. Despite having one of the highest population densities in the world, the city-state has managed to maintain over 46% green cover through innovative approaches like vertical gardens, green roofs, and the integration of natural elements into architectural designs.

Moving on to transportation, which is a critical component of sustainable urban planning. Traditional car-centric urban design has led to numerous problems, including traffic congestion, air pollution, and extensive land use for roads and parking. Sustainable alternatives focus on creating multi-modal transportation networks that prioritize public transit, cycling, and pedestrian movement.

Copenhagen's transformation offers valuable insights here. Since the 1960s, the Danish capital has systematically reduced car traffic in the city center while expanding cycling infrastructure. Today, approximately 49% of all journeys to work or education in Copenhagen are made by bicycle. This shift has significantly reduced carbon emissions, improved air quality, and enhanced the quality of urban life.

Water management represents another crucial challenge. As cities grow, they typically replace permeable surfaces with concrete and asphalt, increasing the risk of flooding during heavy rainfall. Moreover, urban areas require vast quantities of water for domestic and industrial use, placing pressure on surrounding watersheds.

Innovative approaches to urban water management include the implementation of green infrastructure such as rain gardens, bioswales, and permeable pavements that allow rainwater to infiltrate the ground rather than overwhelming stormwater systems. Cities like Portland, Oregon have successfully implemented such strategies, reducing flood risk while creating additional green space for residents.

In conclusion, sustainable urban planning requires integrated approaches that address housing, transportation, and resource management holistically. While the challenges are significant, cities around the world are demonstrating that it's possible to accommodate growing populations while reducing environmental impact and improving quality of life. The examples of Singapore, Copenhagen, and Portland show that with thoughtful planning and political will, cities can become more sustainable, resilient, and livable spaces.

In next week's lecture, we'll explore how these principles are being applied in rapidly developing cities across Asia and Africa, and the unique challenges they face. Thank you for your attention.
    `,
    questions: [
      {
        id: "ielts-lec-1-q1",
        type: "mcq",
        text: "According to the lecture, what percentage of the global population is projected to live in urban areas by 2050?",
        options: [
          "50%",
          "60%",
          "70%",
          "80%"
        ],
        correctAnswer: "70%"
      },
      {
        id: "ielts-lec-1-q2",
        type: "mcq",
        text: "What is the main goal of compact city development?",
        options: [
          "To create more jobs in urban areas",
          "To increase tourism in cities",
          "To increase population density through strategic planning",
          "To reduce the cost of housing"
        ],
        correctAnswer: "To increase population density through strategic planning"
      },
      {
        id: "ielts-lec-1-q3",
        type: "mcq",
        text: "What percentage of green cover has Singapore maintained despite its high population density?",
        options: [
          "26%",
          "36%",
          "46%",
          "56%"
        ],
        correctAnswer: "46%"
      },
      {
        id: "ielts-lec-1-q4",
        type: "mcq",
        text: "Approximately what percentage of journeys to work or education in Copenhagen are made by bicycle?",
        options: [
          "29%",
          "39%",
          "49%",
          "59%"
        ],
        correctAnswer: "49%"
      },
      {
        id: "ielts-lec-1-q5",
        type: "mcq",
        text: "Which of the following is NOT mentioned as an example of green infrastructure for water management?",
        options: [
          "Rain gardens",
          "Bioswales",
          "Permeable pavements",
          "Water towers"
        ],
        correctAnswer: "Water towers"
      },
      {
        id: "ielts-lec-1-q6",
        type: "mcq",
        text: "Which city is mentioned as successfully implementing green infrastructure for water management?",
        options: [
          "Singapore",
          "Copenhagen",
          "Portland",
          "New York"
        ],
        correctAnswer: "Portland"
      }
    ]
  }
];