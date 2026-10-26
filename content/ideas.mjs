// Automation ideas by business type, shown at /ideas and /ideas/<slug>.
// `sentence` and `pains` feed the /ideas picker ("I run ___ and I'm stuck ___");
// each pain points at the idea (1-3) that fixes it.
// Linked from the Instagram auto-DM ("Comment AUTOMATE").
// Rules for this copy: plain friendly English, "you" and "we", no invented
// results, percentages, client names or case studies, and no prices.
// The build checks every field against those rules and stops if one breaks.

export const BUSINESS_TYPES = [
  {
    slug: "restaurants-cafes",
    name: "Restaurants & cafes",
    short: "restaurants & cafes",
    timeWasters: "Answering the same questions on WhatsApp and Instagram, taking bookings by hand and chasing reviews.",
    sentence: "a restaurant or cafe",
    pains: [
      { say: "answering the same questions", idea: 2 },
      { say: "taking bookings by hand", idea: 1 },
      { say: "chasing reviews", idea: 3 },
    ],
    ideas: [
      {
        title: "WhatsApp bookings without the back-and-forth",
        summary: "Guests book a table on WhatsApp and get an instant confirmation, while you see every booking in one list.",
        steps: [
          "A guest messages your WhatsApp Business number asking for a table.",
          "An AI assistant asks for the date, time, number of people and name.",
          "It checks your booking sheet, or your reservation system if it allows outside connections, and offers free times.",
          "Once they confirm, the booking is saved and they get a reminder on the day.",
          "Large groups and special requests are passed to your team.",
        ],
        takes_off_plate: "Replying to every booking message and writing tables into the book by hand.",
        setup_time: "about 2 weeks",
      },
      {
        title: "Instant answers to common questions",
        summary: "An assistant answers questions about your menu, hours, parking and dietary options on WhatsApp and Instagram.",
        steps: [
          "We give the assistant your menu, opening hours and the answers you already give every day.",
          "When someone messages on Instagram or WhatsApp, it replies straight away.",
          "Anything it isn't sure about, such as large events or complaints, is passed to your team.",
        ],
        takes_off_plate: "Typing the same answers about hours, menu and location all day.",
        setup_time: "about 1 week",
      },
      {
        title: "A review request after every visit",
        summary: "Guests who booked get a friendly thank-you message the next day with a link to leave a Google review.",
        steps: [
          "After a booking's date has passed, the guest is picked up from your booking list.",
          "They get a short WhatsApp message thanking them for coming, with a link to your Google review page.",
          "Every guest gets the same link, as Google's rules require.",
          "Anyone who replies with a problem is flagged to you so you can follow up personally.",
        ],
        takes_off_plate: "Remembering to ask for reviews and following up with guests one by one.",
        setup_time: "about 1 week",
      },
    ],
  },
  {
    slug: "salons-spas",
    name: "Salons & spas",
    short: "salons & spas",
    timeWasters: "Booking appointments over DMs, no-shows and reminding clients to come back.",
    sentence: "a salon or spa",
    pains: [
      { say: "booking clients over DMs", idea: 1 },
      { say: "with no-shows", idea: 2 },
      { say: "getting clients to come back", idea: 3 },
    ],
    ideas: [
      {
        title: "Book appointments straight from Instagram DMs",
        summary: "Clients who message on Instagram or WhatsApp can pick a service and a free slot without waiting for you to reply.",
        steps: [
          "A client messages asking for an appointment.",
          "An AI assistant asks which service they want and which day suits them.",
          "It checks your Google Calendar, or your booking app if it allows outside connections, and offers the free slots.",
          "The appointment is booked and the client gets a confirmation message.",
          "If your booking app doesn't allow it, the assistant sends your booking link instead.",
        ],
        takes_off_plate: "Going back and forth in DMs to find a time that works.",
        setup_time: "about 2–3 weeks",
      },
      {
        title: "Appointment reminders with one-tap confirm",
        summary: "Clients get a WhatsApp reminder before their appointment and can confirm or reschedule with one reply.",
        steps: [
          "The day before an appointment, the client gets a WhatsApp reminder.",
          "They reply to confirm, or ask to move it.",
          "Reschedule requests are offered new slots from your calendar.",
          "Your calendar updates and your team sees who has confirmed.",
        ],
        takes_off_plate: "Calling or texting every client the day before.",
        setup_time: "about 1 week",
      },
      {
        title: "Bring regulars back on time",
        summary: "Clients who are due their next visit get a personal message inviting them to book again.",
        steps: [
          "Each client's last visit and service are kept in a simple sheet or your booking system.",
          "When they're due again, for example six weeks after a colour, a message is drafted for them.",
          "It's sent on WhatsApp with a link to book, only to clients who agreed to hear from you.",
        ],
        takes_off_plate: "Working out who is due back and messaging them yourself.",
        setup_time: "about 1 week",
      },
    ],
  },
  {
    slug: "clinics",
    name: "Clinics",
    short: "clinics",
    timeWasters: "Phone and WhatsApp bookings, appointment reminders and patient paperwork.",
    sentence: "a clinic",
    pains: [
      { say: "on phone and WhatsApp bookings", idea: 1 },
      { say: "with patient paperwork", idea: 2 },
      { say: "answering the same questions", idea: 3 },
    ],
    ideas: [
      {
        title: "WhatsApp appointment booking",
        summary: "Patients book, move or cancel appointments on WhatsApp, and your front desk sees every change in one place.",
        steps: [
          "A patient messages your clinic's WhatsApp Business number.",
          "An assistant asks what they need and offers free slots from your calendar or clinic system, if it allows outside connections.",
          "The appointment is booked and the patient gets a confirmation.",
          "Medical questions are never answered by the assistant; they go straight to your staff.",
        ],
        takes_off_plate: "Answering booking calls and messages one by one.",
        setup_time: "about 2–3 weeks",
      },
      {
        title: "Reminders and pre-visit forms",
        summary: "Patients get a reminder before their visit with a link to fill in their details in advance.",
        steps: [
          "Two days before the appointment, the patient gets a WhatsApp reminder.",
          "The message includes a link to a secure online form for their details, so nothing personal is shared over chat.",
          "Answers go to your patient system or a form tool that meets your local privacy rules, ready for the visit.",
        ],
        takes_off_plate: "Reminder calls and filling in forms at reception.",
        setup_time: "about 1–2 weeks",
      },
      {
        title: "Answers to everyday questions",
        summary: "An assistant answers questions about opening hours, services, location and insurance on WhatsApp and your website.",
        steps: [
          "We give the assistant your approved answers to common questions.",
          "It replies to patients any time of day, using only those answers.",
          "Anything medical or sensitive is handed to a person straight away.",
        ],
        takes_off_plate: "Repeating the same answers about hours, services and insurance.",
        setup_time: "about 1 week",
      },
    ],
  },
  {
    slug: "real-estate",
    name: "Real estate agencies",
    short: "real estate agencies",
    timeWasters: "Replying to property enquiries fast, qualifying leads and booking viewings.",
    sentence: "a real estate agency",
    pains: [
      { say: "replying to enquiries fast", idea: 1 },
      { say: "booking viewings", idea: 2 },
      { say: "matching buyers to listings", idea: 3 },
    ],
    ideas: [
      {
        title: "Reply to every enquiry in minutes",
        summary: "New enquiries from portals, Instagram and your website get a friendly reply and a few questions straight away.",
        steps: [
          "An enquiry arrives from a property portal's lead email, Instagram or your website form.",
          "The lead gets a WhatsApp message within minutes asking about budget, area and timing.",
          "Their answers are added to your CRM or Google Sheet.",
          "The right agent is notified with a short summary.",
        ],
        takes_off_plate: "Copying enquiries out of emails and chasing basic details.",
        setup_time: "about 1–2 weeks",
      },
      {
        title: "Book viewings without the phone tag",
        summary: "Interested leads pick a viewing slot from the agent's calendar on WhatsApp.",
        steps: [
          "When a lead is ready to view, they're sent the free viewing slots.",
          "They pick one and it's added to the agent's Google Calendar.",
          "Both sides get a reminder before the viewing with the address.",
        ],
        takes_off_plate: "Calling back and forth to agree viewing times.",
        setup_time: "about 1 week",
      },
      {
        title: "New listings sent to matching buyers",
        summary: "When you add a listing, buyers whose needs match it get a message about it.",
        steps: [
          "You add a new listing to your sheet or CRM as usual.",
          "It's matched against saved buyer requirements, such as area, budget and bedrooms.",
          "Matching buyers who asked to hear about new listings get a short WhatsApp or email message with the details.",
        ],
        takes_off_plate: "Going through your contacts to find who might want a new listing.",
        setup_time: "about 1–2 weeks",
      },
    ],
  },
  {
    slug: "online-stores",
    name: "Online stores",
    short: "online stores",
    timeWasters: "\"Where's my order?\" messages, abandoned carts and copying orders between tools.",
    sentence: "an online store",
    pains: [
      { say: "on \"where's my order?\" messages", idea: 1 },
      { say: "with abandoned carts", idea: 2 },
      { say: "answering customer questions", idea: 3 },
    ],
    ideas: [
      {
        title: "Order updates customers don't have to ask for",
        summary: "Customers who opt in get WhatsApp updates when their order is confirmed and shipped, with a tracking link.",
        steps: [
          "When an order changes status in Shopify, WooCommerce or a similar store, the store tells our workflow.",
          "The customer gets a short WhatsApp message with the update and the courier's tracking link.",
          "Replies with questions are passed to your support inbox.",
        ],
        takes_off_plate: "Answering \"where's my order?\" messages by hand.",
        setup_time: "about 1 week",
      },
      {
        title: "Abandoned cart reminders on WhatsApp",
        summary: "Shoppers who leave items in their cart get a friendly reminder, with their permission.",
        steps: [
          "A shopper who opted in to messages leaves at checkout, after entering their phone number.",
          "After a few hours, they get a WhatsApp message with a link back to their cart.",
          "If they reply with a question, an assistant answers or hands it to you.",
        ],
        takes_off_plate: "Chasing abandoned carts one by one, or not at all.",
        setup_time: "about 1 week",
      },
      {
        title: "A support assistant for common questions",
        summary: "An assistant answers questions about sizes, delivery and returns on Instagram, WhatsApp and your store.",
        steps: [
          "We give the assistant your product details, delivery times and returns policy.",
          "It answers customer questions any time of day.",
          "It can look up an order's status in your store when the customer gives their order number.",
          "Refunds and complaints always go to a person.",
        ],
        takes_off_plate: "Repeating the same answers about sizing, delivery and returns.",
        setup_time: "about 1–2 weeks",
      },
    ],
  },
  {
    slug: "retail-shops",
    name: "Retail shops",
    short: "retail shops",
    timeWasters: "Stock checks, customer messages about availability and keeping sales numbers up to date.",
    sentence: "a retail shop",
    pains: [
      { say: "on \"is it in stock?\" messages", idea: 1 },
      { say: "keeping track of stock", idea: 2 },
      { say: "updating sales numbers", idea: 3 },
    ],
    ideas: [
      {
        title: "\"Is it in stock?\" answered automatically",
        summary: "Customers ask on WhatsApp or Instagram whether you have an item, and get an answer from your live stock list.",
        steps: [
          "Stock levels are read from your POS (if it allows outside connections) or a Google Sheet you keep up to date.",
          "A customer messages asking about a product or size.",
          "An assistant checks the stock list and replies with what's available.",
          "They can ask you to hold it, and you get a notification.",
        ],
        takes_off_plate: "Checking the shelves or stock room for every availability message.",
        setup_time: "about 2 weeks",
      },
      {
        title: "Low-stock alerts before you run out",
        summary: "You get a WhatsApp message with a ready-made reorder list when items drop below the level you choose.",
        steps: [
          "Each item's minimum stock level and supplier are set in a simple sheet.",
          "Sales from your POS update the stock count.",
          "When items drop below their level, you get a WhatsApp alert with a reorder list grouped by supplier.",
          "If your POS already sends basic low-stock alerts, we build on those rather than repeat them.",
        ],
        takes_off_plate: "Counting stock and noticing too late that something has run out.",
        setup_time: "about 1 week",
      },
      {
        title: "A daily sales summary on your phone",
        summary: "Every evening you get a short summary of the day's sales, best sellers and anything unusual.",
        steps: [
          "At closing time, the day's sales are pulled from your POS.",
          "They're added to a Google Sheet so you have a running history.",
          "You get a short WhatsApp summary with totals and top items.",
        ],
        takes_off_plate: "Pulling reports from the POS and updating spreadsheets by hand.",
        setup_time: "about 1 week",
      },
    ],
  },
  {
    slug: "gyms-fitness",
    name: "Gyms & fitness studios",
    short: "gyms & fitness studios",
    timeWasters: "Trial sign-ups, class bookings and members who quietly stop coming.",
    sentence: "a gym or studio",
    pains: [
      { say: "following up trial sign-ups", idea: 1 },
      { say: "juggling class bookings", idea: 2 },
      { say: "with members who stop coming", idea: 3 },
    ],
    ideas: [
      {
        title: "Follow up every trial sign-up",
        summary: "People who ask about a trial get booked in and followed up automatically.",
        steps: [
          "Someone fills in your trial form or messages on Instagram.",
          "They get a WhatsApp message to pick a time for their first session.",
          "After the trial, they get a friendly check-in and your membership options.",
          "Your team sees everyone's status in one Google Sheet.",
        ],
        takes_off_plate: "Chasing trial leads and remembering who to follow up.",
        setup_time: "about 1–2 weeks",
      },
      {
        title: "Class bookings and waitlists on WhatsApp",
        summary: "Members book classes by message, and waitlisted members are told the moment a spot opens.",
        steps: [
          "A member messages to book a class.",
          "The assistant checks your class schedule, in a sheet or in your gym software if it allows outside connections.",
          "If there's space they're booked in, and if not, they join the waitlist.",
          "When someone cancels, the next person on the waitlist gets a message.",
        ],
        takes_off_plate: "Managing class lists and waitlists by hand.",
        setup_time: "about 2–3 weeks",
      },
      {
        title: "Check in with members who stop coming",
        summary: "Members who haven't visited for a while get a personal message from your team.",
        steps: [
          "Visit dates come from your check-in system or a sheet.",
          "Each week, members who haven't been in for a set time are listed.",
          "A friendly message is drafted for each, and you approve before it's sent on WhatsApp.",
        ],
        takes_off_plate: "Spotting quiet members and writing to them one by one.",
        setup_time: "about 1 week",
      },
    ],
  },
  {
    slug: "agencies-consultants",
    name: "Agencies & consultants",
    short: "agencies & consultants",
    timeWasters: "Client onboarding, writing up meetings and sending reports and invoices.",
    sentence: "an agency or consultancy",
    pains: [
      { say: "onboarding new clients", idea: 1 },
      { say: "writing up meetings", idea: 2 },
      { say: "putting reports together", idea: 3 },
    ],
    ideas: [
      {
        title: "Client onboarding that runs itself",
        summary: "When a client signs, their folder, welcome email, forms and project tasks are set up for you.",
        steps: [
          "You mark a new client as signed in your CRM or sheet.",
          "A Google Drive folder and project board are created from your template.",
          "The client gets a welcome email with an intake form.",
          "Their answers are saved to the folder and your team is notified.",
        ],
        takes_off_plate: "Setting up folders, emails and tasks for every new client.",
        setup_time: "about 1–2 weeks",
      },
      {
        title: "Meeting notes and follow-ups, drafted for you",
        summary: "After each client call, an AI assistant drafts the summary, action items and follow-up email.",
        steps: [
          "Your call recording or transcript is saved after the meeting, with everyone's OK to record.",
          "An AI step writes a short summary and a list of action items.",
          "A follow-up email is drafted in Gmail for you to check and send.",
          "Action items are added to your project tool.",
        ],
        takes_off_plate: "Writing up notes and follow-up emails after every call.",
        setup_time: "about 1 week",
      },
      {
        title: "Monthly reports put together automatically",
        summary: "Client reports are built from your data each month, ready for you to review.",
        steps: [
          "Numbers are pulled from the tools you report on, such as ads or analytics.",
          "They're added to your report template in Google Sheets or Slides.",
          "An AI step drafts the summary for you to edit before sending.",
        ],
        takes_off_plate: "Copying numbers into reports at the end of every month.",
        setup_time: "about 2–3 weeks, depending on how many tools you report on",
      },
    ],
  },
  {
    slug: "trades-home-services",
    name: "Trades & home services",
    short: "trades & home services",
    timeWasters: "Quote requests, scheduling jobs and chasing unpaid invoices.",
    sentence: "a trades business",
    pains: [
      { say: "on quote requests", idea: 1 },
      { say: "scheduling jobs", idea: 2 },
      { say: "chasing unpaid invoices", idea: 3 },
    ],
    ideas: [
      {
        title: "Collect job details before you quote",
        summary: "Customers who ask for a quote are asked for the details and photos you need, before you call them back.",
        steps: [
          "A customer messages on WhatsApp or fills in your website form.",
          "They're asked for the job type, address and a few photos.",
          "Everything is saved to a Google Sheet, with the photos in a linked Drive folder.",
          "You get one tidy summary, ready for you to quote.",
        ],
        takes_off_plate: "Calling customers back just to get the basic details.",
        setup_time: "about 1 week",
      },
      {
        title: "Book jobs and send reminders",
        summary: "Customers pick a time from your calendar and get a reminder the day before you arrive.",
        steps: [
          "Once a quote is accepted, the customer gets a link to pick from the slots you've opened, with travel time left between jobs.",
          "The job goes into your Google Calendar with the address and notes.",
          "The customer gets a WhatsApp reminder the day before.",
        ],
        takes_off_plate: "Scheduling jobs over the phone and remembering to remind people.",
        setup_time: "about 1 week",
      },
      {
        title: "Friendly invoice reminders",
        summary: "Unpaid invoices get polite WhatsApp reminders with a payment link, on a schedule you choose.",
        steps: [
          "Invoices are read from your accounting tool, such as Xero or QuickBooks, or a sheet.",
          "When one passes its due date, the customer gets a polite WhatsApp reminder with the invoice and payment link.",
          "This adds WhatsApp to the email reminders your accounting tool may already send.",
          "A second reminder goes out later if needed, and you're told who is still unpaid.",
        ],
        takes_off_plate: "Chasing payments yourself.",
        setup_time: "about 1 week",
      },
    ],
  },
  {
    slug: "coaches-education",
    name: "Coaches & training centres",
    short: "coaches & training centres",
    timeWasters: "Answering course questions, booking calls and keeping students on track.",
    sentence: "a coaching business",
    pains: [
      { say: "answering course questions", idea: 1 },
      { say: "onboarding new students", idea: 2 },
      { say: "keeping students on track", idea: 3 },
    ],
    ideas: [
      {
        title: "Answer course questions on Instagram",
        summary: "An assistant answers questions about your courses, dates and how to join, and books discovery calls.",
        steps: [
          "We give the assistant your course details and the questions you usually get.",
          "It replies to DMs on Instagram and WhatsApp straight away.",
          "Interested people are offered a time for a call from your calendar.",
        ],
        takes_off_plate: "Answering the same course questions in DMs every day.",
        setup_time: "about 1 week",
      },
      {
        title: "Automatic student onboarding",
        summary: "When someone signs up, they get their welcome message, materials and calendar invites automatically.",
        steps: [
          "A new sign-up comes in through your payment page or form.",
          "They get a welcome message on WhatsApp or email with their materials.",
          "Session invites are added to their calendar.",
          "Their details are added to your student sheet.",
        ],
        takes_off_plate: "Sending welcome messages, links and invites by hand.",
        setup_time: "about 1 week",
      },
      {
        title: "Weekly student check-ins",
        summary: "Students get regular check-in messages, and you see who might need a hand.",
        steps: [
          "Each week, students who signed up for check-ins get a short message asking how they're doing.",
          "Their replies are collected in one sheet.",
          "An AI step highlights anyone who sounds stuck, so you can reach out.",
        ],
        takes_off_plate: "Checking on every student one by one.",
        setup_time: "about 1 week",
      },
    ],
  },
];
