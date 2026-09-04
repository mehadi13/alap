export interface SolutionItem {
  slug: string;
  title: string;
  titleBn: string;
  shortDescription: string;
  shortDescriptionBn: string;
  problem: string;
  problemBn: string;
  whoItsFor: string[];
  whoItsForBn: string[];
  commonUseCases: string[];
  commonUseCasesBn: string[];
  deliverables: string[];
  deliverablesBn: string[];
  expectedOutcomes: string[];
  expectedOutcomesBn: string[];
  exampleWorkflow: { step: string; text: string }[];
  exampleWorkflowBn: { step: string; text: string }[];
  categoryTag: string;
  categoryTagBn: string;
}

export const solutionsData: Record<string, SolutionItem> = {
  "customer-support-automation": {
    slug: "customer-support-automation",
    title: "Customer Support Automation",
    titleBn: "কাস্টমার সাপোর্ট অটোমেশন",
    shortDescription: "Automate repetitive customer inquiries and route complex issues to the right support representatives.",
    shortDescriptionBn: "সাধারণ কাস্টমার প্রশ্নের স্বয়ংক্রিয় উত্তর দিন এবং জটিল সমস্যা সঠিক প্রতিনিধির কাছে পৌঁছে দিন।",
    problem: "Support teams spend hours manually answering the exact same FAQ questions all day across Facebook Messenger, WhatsApp, and email, leading to delayed response times and burnout.",
    problemBn: "মেসেঞ্জার, হোয়াটসঅ্যাপ এবং ইমেইলে সারাদিন একই এফএকিউ প্রশ্নের উত্তর দিতে গিয়ে সাপোর্ট টিমের অনেক সময় নষ্ট হয়, যার ফলে উত্তর দিতে দেরি হয় এবং কাস্টমার অসন্তুষ্ট হয়।",
    whoItsFor: [
      "E-commerce brands handling high query volume",
      "Service businesses managing appointment inquiries",
      "Online educational platforms & clinics",
    ],
    whoItsForBn: [
      "প্রচুর মেসেজ আসা ই-কমার্স ব্র্যান্ড",
      "অ্যাপয়েন্টমেন্ট ও সার্ভিস বুকিং পরিচালনা করে এমন ব্যবসা",
      "অনলাইন লার্নিং প্ল্যাটফর্ম ও হেলথ ক্লিনিক",
    ],
    commonUseCases: [
      "24/7 instant automated FAQ answers (pricing, location, hours)",
      "Order status & delivery tracking lookup",
      "Lead qualification & smart routing to human support",
    ],
    commonUseCasesBn: [
      "২৪/৭ তাৎক্ষণিক উত্তর (দাম, লোকেশন, অফার)",
      "অর্ডার স্ট্যাটাস ও ডেলিভারি ট্র্যাকিং সিস্টেম",
      "লিড কোয়ালিফিকেশন ও স্মার্ট এজেন্ট রাউটিং",
    ],
    deliverables: [
      "Custom Messenger & WhatsApp chatbot integration",
      "Omnichannel support inbox dashboard setup",
      "Automated FAQ knowledge base mapping",
      "Human agent handover escalation workflows",
    ],
    deliverablesBn: [
      "কাস্টম মেসেঞ্জার ও হোয়াটসঅ্যাপ চ্যাটবট ইন্টিগ্রেশন",
      "সর্বজনীন সাপোর্ট ইনবক্স ড্যাশবোর্ড সেটআপ",
      "স্বয়ংক্রিয় এফএকিউ নলেজ বেস ম্যাপিং",
      "হিউম্যান এজেন্ট হ্যান্ডওভার এস্কেলেশন প্রসেস",
    ],
    expectedOutcomes: [
      "Up to 70% reduction in repetitive support tickets",
      "Instant response time under 5 seconds",
      "Higher customer satisfaction and retention",
    ],
    expectedOutcomesBn: [
      "৭০% পর্যন্ত পুনরাবৃত্তিমূলক সাপোর্ট টিকিটের চাপ হ্রাস",
      "৫ সেকেন্ডের মধ্যে তাৎক্ষণিক রেসপন্স",
      "উচ্চতর কাস্টমার সন্তুষ্টি ও ধরে রাখার ক্ষমতা",
    ],
    exampleWorkflow: [
      { step: "01", text: "Customer sends inquiry on Messenger or WhatsApp" },
      { step: "02", text: "Automated ALAP assistant resolves common queries instantly" },
      { step: "03", text: "Complex queries route to the appropriate human agent with full history" },
    ],
    exampleWorkflowBn: [
      { step: "01", text: "মেসেঞ্জার বা হোয়াটসঅ্যাপে কাস্টমার মেসেজ পাঠান" },
      { step: "02", text: "আলাপ-এর স্বয়ংক্রিয় অ্যাসিস্ট্যান্ট তাৎক্ষণিকভাবে উত্তর দেয়" },
      { step: "03", text: "জটিল প্রশ্নগুলো সকল পূর্ব ইতিহাসসহ সরাসরি মানুষের কাছে ট্রান্সফার হয়" },
    ],
    categoryTag: "Customer Support",
    categoryTagBn: "কাস্টমার সাপোর্ট",
  },

  "sales-automation": {
    slug: "sales-automation",
    title: "Sales Lead Routing & Automation",
    titleBn: "সেলস লিড রাউটিং ও অটোমেশন",
    shortDescription: "Capture, qualify, route, and automatically follow up with sales leads across digital channels.",
    shortDescriptionBn: "ডিজিটাল চ্যানেল থেকে আসা সেলস লিড সংগ্রহ, যাচাই, রাউট ও স্বয়ংক্রিয়ভাবে ফলো-আপ করুন।",
    problem: "Businesses lose qualified leads because incoming inquiries are not followed up within the critical first 10 minutes or get lost in spreadsheet unorganized files.",
    problemBn: "প্রথম ১০ মিনিটের মধ্যে যোগাযোগের অভাবে বা স্প্রেডশীটে এলোমেলো থাকার কারণে ব্যবসা প্রতিষ্ঠানগুলো তাদের সম্ভাবনাময় লিড হারিয়ে ফেলে।",
    whoItsFor: [
      "B2B service agencies & consultants",
      "Real estate developers & brokers",
      "Course providers & training institutes",
    ],
    whoItsForBn: [
      "বিটুবি সার্ভিস এজেন্সি ও কনসালট্যান্ট",
      "রিয়েল এস্টেট ডেভেলপার ও ব্রোকার",
      "ট্রেনিং ইনস্টিটিউট ও কোর্স প্রদানকারী",
    ],
    commonUseCases: [
      "Instant automated SMS / Email lead acknowledgment",
      "Automatic lead scoring & qualification forms",
      "Automated sales pipeline CRM sync & seller notification",
    ],
    commonUseCasesBn: [
      "তাৎক্ষণিক এসএমএস/ইমেইল স্বয়ংক্রিয় উত্তর",
      "অটোমেটেড লিড স্কোরিং ও কোয়ালিফিকেশন ফর্ম",
      "সেলস সিআরএম সিংকিং ও সেলস টিম নোটিফিকেশন",
    ],
    deliverables: [
      "Lead capture form & landing page integrations",
      "Automated multi-channel follow-up sequences",
      "Sales CRM pipeline configuration",
      "Real-time Discord / Telegram lead alerts for team",
    ],
    deliverablesBn: [
      "লিড ক্যাপচার ফর্ম ও ল্যান্ডিং পেজ ইন্টিগ্রেশন",
      "অটোমেটেড মাল্টি-চ্যানেল ফলো-আপ সিকোয়েন্স",
      "সেলস সিআরএম পাইপলাইন কনফিগারেশন",
      "ডিসকর্ড/টেলিগ্রাম চ্যানেলে রিয়েল-টাইম লিড অ্যালার্ট",
    ],
    expectedOutcomes: [
      "100% immediate lead contact rate",
      "Higher conversion rate from inquiry to paid customer",
      "Zero missed sales leads",
    ],
    expectedOutcomesBn: [
      "১০০% তাৎক্ষণিক লিড রেসপন্স নিশ্চিতকরণ",
      "ইনকোয়ারি থেকে পেইড কাস্টমারে রূপান্তরের উচ্চ হার",
      "কোনো লিড হাতছাড়া না হওয়া",
    ],
    exampleWorkflow: [
      { step: "01", text: "Prospect submits consultation request or lead form" },
      { step: "02", text: "ALAP triggers immediate instant email/SMS confirmation and lead score" },
      { step: "03", text: "Lead is assigned to sales team with automated follow-up reminders" },
    ],
    exampleWorkflowBn: [
      { step: "01", text: "গ্রাহক পরামর্শ ফর্ম বা লিড ফর্ম জমা দেন" },
      { step: "02", text: "আলাপ সাথে সাথে কনফার্মেশন ইমেইল/এসএমএস পাঠায় ও স্কোর হিসেব করে" },
      { step: "03", text: "সেলস টিমের কাছে অটোমেটেড রিমাইন্ডারসহ লিড অ্যাসাইন করা হয়" },
    ],
    categoryTag: "Sales & Marketing",
    categoryTagBn: "সেলস ও মার্কেটিং",
  },

  "ecommerce-automation": {
    slug: "ecommerce-automation",
    title: "E-Commerce Order Workflows",
    titleBn: "ই-কমার্স অর্ডার ওয়ার্কফ্লো",
    shortDescription: "Connect orders, inventory, courier booking, customer notifications, and business accounting.",
    shortDescriptionBn: "অর্ডার, ইনভেন্টরি, কুরিয়ার বুকিং, কাস্টমার নোটিফিকেশন ও হিসাব একসাথে যুক্ত করুন।",
    problem: "Online store owners manually copy customer address details into courier portals, manually check stock, and send order updates one by one.",
    problemBn: "অনলাইন শপ মালিকদের ম্যানুয়ালি কাস্টমারের ঠিকানা কুরিয়ার প্যানেলে তুলতে হয়, স্টক চেক করতে হয় এবং একটা একটা করে আপডেট পাঠাতে হয়।",
    whoItsFor: [
      "F-commerce & Shopify store owners",
      "Multi-channel online retail brands",
      "Distributors managing online orders",
    ],
    whoItsForBn: [
      "এফ-কমার্স ও শপিফাই স্টোর মালিক",
      "মাল্টি-চ্যানেল অনলাইন রিটেল ব্র্যান্ড",
      "অনলাইন অর্ডার পরিচালনাকারী ডিস্ট্রিবিউটর",
    ],
    commonUseCases: [
      "Automatic courier booking (Pathao, Steadfast, RedX API)",
      "Automated SMS order confirmation & tracking link dispatch",
      "Inventory sync between warehouse and online storefront",
    ],
    commonUseCasesBn: [
      "স্বয়ংক্রিয় কুরিয়ার বুকিং (পাঠাও, স্টিডফাস্ট, রেডএক্স এপিআই)",
      "অটোমেটেড এসএমএস কনফার্মেশন ও ট্র্যাকিং লিংক প্রেরণ",
      "ওয়্যারহাউস ও অনলাইন স্টোরের মধ্যে ইনভেন্টরি সিংক",
    ],
    deliverables: [
      "Courier API automated booking setup",
      "SMS gateway order status notifications",
      "Automated invoice & manifest generator",
      "Inventory & accounting spreadsheet automation",
    ],
    deliverablesBn: [
      "কুরিয়ার এপিআই অটোমেটেড বুকিং সেটআপ",
      "এসএমএস গেটওয়ে অর্ডার স্ট্যাটাস নোটিফিকেশন",
      "অটোমেটেড ইনভয়েস ও চালান জেনারেটর",
      "ইনভেন্টরি ও অ্যাকাউন্টিং স্প্রেডশীট অটোমেশন",
    ],
    expectedOutcomes: [
      "Save 15+ hours per week on manual order entry",
      "Reduced return rates (RTO) via instant address validation SMS",
      "Faster fulfillment & happier customers",
    ],
    expectedOutcomesBn: [
      "ম্যানুয়াল অর্ডার এন্ট্রিতে সপ্তাহে ১৫+ ঘণ্টা সময় সাশ্রয়",
      "এসএমএস ভেরিফিকেশনের মাধ্যমে রিটার্ন (RTO) হার কমানো",
      "দ্রুত শিপিং ও কাস্টমারদের সন্তুষ্টি বৃদ্ধি",
    ],
    exampleWorkflow: [
      { step: "01", text: "Customer places order on website or social store" },
      { step: "02", text: "ALAP validates address, books courier shipment, and generates invoice" },
      { step: "03", text: "Customer receives SMS with live courier tracking link" },
    ],
    exampleWorkflowBn: [
      { step: "01", text: "কাস্টমার ওয়েবসাইট বা সোশাল পেজে অর্ডার প্লেস করেন" },
      { step: "02", text: "আলাপ ঠিকানা যাচাই করে, কুরিয়ার শিপমেন্ট বুক করে এবং ইনভয়েস বানায়" },
      { step: "03", text: "কাস্টমার লাইভ কুরিয়ার ট্র্যাকিং লিংকসহ এসএমএস পেয়ে যান" },
    ],
    categoryTag: "E-Commerce",
    categoryTagBn: "ই-কমার্স",
  },

  "workflow-automation": {
    slug: "workflow-automation",
    title: "Office Workflow Automation",
    titleBn: "অফিস প্রসেস অটোমেশন",
    shortDescription: "Replace repetitive manual processes and spreadsheet dependence with structured digital workflows.",
    shortDescriptionBn: "ম্যানুয়াল কাজের পুনরাবৃত্তি ও স্প্রেডশীট নির্ভরতা কমিয়ে ডিজিটাল প্রসেস তৈরি করুন।",
    problem: "Employees spend hours copying data between disconnected spreadsheets, preparing manual weekly reports, and chasing internal approvals via messaging apps.",
    problemBn: "কর্মীরা ঘণ্টার পর ঘণ্টা একাধিক ফাইলের মাঝে তথ্য আদান-প্রদান, হাতে হাতে উইকলি রিপোর্ট তৈরি এবং চ্যাট অ্যাপে অনুমোদনের জন্য অপেক্ষা করে সময় কাটায়।",
    whoItsFor: [
      "Growing SMEs & administrative teams",
      "Clinics & medical diagnostic centers",
      "Logistics & distribution businesses",
    ],
    whoItsForBn: [
      "ক্রমবর্ধমান এসএমই ও প্রশাসনিক টিম",
      "ক্লিনিক ও মেডিকেল ডায়াগনস্টিক সেন্টার",
      "লজিস্টিকস ও সরবরাহকারী প্রতিষ্ঠান",
    ],
    commonUseCases: [
      "Automated weekly & monthly report generation",
      "Digital internal approval request workflows",
      "Automated document creation & PDF invoicing",
    ],
    commonUseCasesBn: [
      "স্বয়ংক্রিয় সাপ্তাহিক ও মাসিক রিপোর্ট তৈরি",
      "ডিজিটাল অভ্যন্তরীণ অনুমোদন (Approval) প্রসেস",
      "স্বয়ংক্রিয় ডকুমেন্ট ও পিডিএফ ইনভয়েস জেনারেশন",
    ],
    deliverables: [
      "Custom workflow dashboard & data connector setup",
      "Automated scheduled reporting engine",
      "Document generation templates (Contracts, Invoices)",
      "Role-based permission & approval pipeline",
    ],
    deliverablesBn: [
      "কাস্টম ওয়ার্কফ্লো ড্যাশবোর্ড ও ডেটা কানেক্টর সেটআপ",
      "অটোমেটেড শিডিউল্ড রিপোর্টিং ইঞ্জিন",
      "ডকুমেন্ট জেনারেশন টেমপ্লেট (চুক্তিপত্র, ইনভয়েস)",
      "রোল-ভিত্তিক পারমিশন ও অ্যাপ্রুভাল পাইপলাইন",
    ],
    expectedOutcomes: [
      "Eliminate repetitive manual data entry errors",
      "Automated reports delivered on schedule to executive chat",
      "Streamlined internal team operations",
    ],
    expectedOutcomesBn: [
      "ম্যানুয়াল ডেটা এন্ট্রি ভুলের পুনরাবৃত্তি দূর করা",
      "নির্দিষ্ট সময়ে এক্সিকিউটিভ চ্যাটে রিপোর্ট স্বয়ংক্রিয়ভাবে পৌঁছে যাওয়া",
      "টিমের অভ্যন্তরীণ কাজের গতি ও দক্ষতা বৃদ্ধি",
    ],
    exampleWorkflow: [
      { step: "01", text: "Team member submits structured internal request" },
      { step: "02", text: "Automated routing notifies approver and updates central database" },
      { step: "03", text: "Approved request generates PDF documentation and triggers execution" },
    ],
    exampleWorkflowBn: [
      { step: "01", text: "টিমের সদস্য ডিজিটাল ফর্মে রিকুয়েস্ট জমা দেন" },
      { step: "02", text: "অটোমেটেড রাউটিংয়ের মাধ্যমে অনুমোদনকারীর কাছে নোটিফিকেশন যায়" },
      { step: "03", text: "অনুমোদনের সাথে সাথে পিডিএফ তৈরি ও কাজ শুরু হয়" },
    ],
    categoryTag: "Operations",
    categoryTagBn: "অপারেশনস",
  },

  "ai-business-solutions": {
    slug: "ai-business-solutions",
    title: "AI Business Solutions",
    titleBn: "এআই বিজনেস সলিউশন",
    shortDescription: "Deploy practical AI integrations where they create measurable business efficiency and ROI.",
    shortDescriptionBn: "বাস্তবমুখী এআই প্রযুক্তি ব্যবহার করে ব্যবসায়িক সময় ও শ্রম সাশ্রয় করুন।",
    problem: "Businesses want to utilize AI but struggle with gimmicky tools that do not integrate with existing business databases or operational processes.",
    problemBn: "ব্যবসায়ীরা এআই ব্যবহার করতে চাইলেও সাধারণ টুলসগুলো তাদের নিজস্ব ডেটাবেজ বা প্রসেসের সাথে সামঞ্জস্য রেখে কাজ করতে পারে না।",
    whoItsFor: [
      "Companies with large document / knowledge repositories",
      "Customer support teams needing smart assistant tools",
      "Content & market research operations",
    ],
    whoItsForBn: [
      "বিশাল ডকুমেন্ট বা ফাইল সংগ্রহ থাকা কোম্পানি",
      "স্মার্ট অ্যাসিস্ট্যান্ট প্রয়োজন এমন কাস্টমার সাপোর্ট টিম",
      "কনটেন্ট ও মার্কেট রিসার্চ টিম",
    ],
    commonUseCases: [
      "Custom AI document Q&A assistant (internal company knowledge base)",
      "Automated customer inquiry sentiment & category classification",
      "AI-powered content & quotation drafting assistants",
    ],
    commonUseCasesBn: [
      "কোম্পানির অভ্যন্তরীণ ফাইল থেকে প্রশ্নের উত্তর দেওয়ার কাস্টম এআই",
      "কাস্টমার মেসেজের অনুভূতি (Sentiment) ও ক্যাটাগরি বিশ্লেষণ",
      "এআই-চালিত ড্রাফটিং ও কোটেশন অ্যাসিস্ট্যান্ট",
    ],
    deliverables: [
      "Private document RAG / Vector search knowledge base",
      "Custom OpenAI / Claude API business integration",
      "AI prompt engineering & guardrails setup",
      "Staff training & operation handbook",
    ],
    deliverablesBn: [
      "প্রাইভেট ডকুমেন্ট ভ্যাক্টর সার্চ নলেজ বেস",
      "কাস্টম OpenAI / Claude API বিজনেস ইন্টিগ্রেশন",
      "এআই প্রম্পট ইঞ্জিনিয়ারিং ও নিরাপত্তা ফিল্টার সেটআপ",
      "স্টাফ ট্রেনিং ও গাইডবুক",
    ],
    expectedOutcomes: [
      "Instant search across thousands of internal documents",
      "Faster decision making & reduced research hours",
      "Practical, measurable AI ROI without privacy risk",
    ],
    expectedOutcomesBn: [
      "হাজার হাজার অভ্যন্তরীণ ডকুমেন্টের মধ্য থেকে চোখের পলকে তথ্য অনুসন্ধান",
      "দ্রুত সিদ্ধান্ত গ্রহণ ও গবেষণা সময় কমানো",
      "গোপনীয়তা বজায় রেখে প্র্যাকটিক্যাল এআই রিটার্ন অন ইনভেস্টমেন্ট",
    ],
    exampleWorkflow: [
      { step: "01", text: "Employee or client asks question about company policy or product" },
      { step: "02", text: "AI retrieves exact verified information from company knowledge base" },
      { step: "03", text: "Generates accurate response with source citations" },
    ],
    exampleWorkflowBn: [
      { step: "01", text: "কর্মী বা ক্লায়েন্ট কোম্পানির পলিসি বা সেবা সম্পর্কে প্রশ্ন করেন" },
      { step: "02", text: "এআই সিস্টেম নিজস্ব ফাইল ঘেঁটে সঠিক উত্তর খুঁজে বের করে" },
      { step: "03", text: "সঠিক উৎস উল্লেখসহ স্পষ্ট উত্তর প্রদান করে" },
    ],
    categoryTag: "AI & Innovation",
    categoryTagBn: "এআই ও ইনোভেশন",
  },

  "custom-digital-solutions": {
    slug: "custom-digital-solutions",
    title: "Custom Digital Solutions",
    titleBn: "কাস্টম ডিজিটাল সলিউশন",
    shortDescription: "Build custom web applications, APIs, and business software when off-the-shelf options fall short.",
    shortDescriptionBn: "প্রস্তুতকৃত সফটওয়্যার যখন আপনার প্রয়োজন মেটাতে পারে না, তখন তৈরি করুন নিজস্ব কাস্টম ওয়েব অ্যাপ।",
    problem: "Existing SaaS tools are either too expensive, overly bloated, or fail to fit unique local business requirements.",
    problemBn: "বাজারে তৈরি থাকা সফটওয়্যারগুলো হয় অনেক ব্যয়বহুল, অতিরিক্ত জটিল, নয়তো স্থানীয় ব্যবসার বিশেষ প্রয়োজনের সাথে মিলে না।",
    whoItsFor: [
      "Businesses with specialized operational models",
      "Startups needing MVP product engineering",
      "Companies upgrading legacy desktop software to web apps",
    ],
    whoItsForBn: [
      "স্বতন্ত্র অপারেটিং মডেল থাকা ব্যবসা প্রতিষ্ঠান",
      "এমভিপি (MVP) প্রোডাক্ট তৈরি করতে চাওয়া স্টার্টআপ",
      "পুরোনো এনভায়রনমেন্ট থেকে আধুনিক ওয়েব অ্যাপে আপডেট করতে চাওয়া কোম্পানি",
    ],
    commonUseCases: [
      "Custom client portals & requirements management",
      "Custom inventory & booking management systems",
      "Tailored web applications & API integrations",
    ],
    commonUseCasesBn: [
      "কাস্টম ক্লায়েন্ট পোর্টাল ও প্রয়োজনীয়তা ব্যবস্থাপনা",
      "কাস্টম ইনভেন্টরি ও বুকিং ম্যানেজমেন্ট সিস্টেম",
      "বিশেষায়িত ওয়েব অ্যাপ্লিকেশন ও এপিআই ইন্টিগ্রেশন",
    ],
    deliverables: [
      "Next.js / React production web application",
      "Database architecture (PostgreSQL / Supabase)",
      "API integration & secure backend services",
      "Source code repository & deployment setup",
    ],
    deliverablesBn: [
      "Next.js / React প্রোডাকশন রেডি ওয়েব অ্যাপ্লিকেশন",
      "ডাটাবেজ আর্কিটেকচার (PostgreSQL / Supabase)",
      "এপিআই ইন্টিগ্রেশন ও সুরক্ষিত ব্যাকএন্ড সার্ভিস",
      "সোর্স কোড ও ডিপ্লয়মেন্ট সাপোর্ট",
    ],
    expectedOutcomes: [
      "100% tailored software aligned with your exact process",
      "Full ownership of your digital assets & codebase",
      "Scalable infrastructure ready for business expansion",
    ],
    expectedOutcomesBn: [
      "আপনার ব্যবসার ১০০% উপযোগী নিজস্ব সফটওয়্যার",
      "নিজের সোর্স কোড ও ডিজিটেল অ্যাসেটের ওপর পূর্ণ মালিকানা",
      "ব্যবসা প্রসারের সাথে সাথে সহজে স্কেল করার সুবিধা",
    ],
    exampleWorkflow: [
      { step: "01", text: "Consultation & technical scope specification" },
      { step: "02", text: "Agile engineering sprints with weekly live demo previews" },
      { step: "03", text: "Final testing, deployment, and operational handover" },
    ],
    exampleWorkflowBn: [
      { step: "01", text: "পরামর্শ ও টেকনিক্যাল কাজের রূপরেখা তৈরি" },
      { step: "02", text: "সাপ্তাহিক ডেমো প্রিভিউসহ চটপটে ইঞ্জিনিয়ারিং ডেভেলপমেন্ট" },
      { step: "03", text: "চূড়ান্ত টেস্টিং, ডিপ্লয়মেন্ট ও টিমকে বুঝিয়ে দেওয়া" },
    ],
    categoryTag: "Software Development",
    categoryTagBn: "সফটওয়্যার ডেভেলপমেন্ট",
  },
};
