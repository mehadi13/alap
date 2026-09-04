export interface ClientRecord {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  solution: string;
  status: "Active" | "In Consultation" | "Onboarding" | "Inactive";
  monthlyValue: string;
  startDate: string;
  lastContact: string;
  notes: string;
}

export interface ConsultationLead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  problemDescription: string;
  preferredContact: "whatsapp" | "phone" | "email";
  submittedAt: string;
  status: "New" | "Contacted" | "Proposal Sent" | "Converted" | "Archived";
  audioFileUrl?: string;
}

export const initialClients: ClientRecord[] = [
  {
    id: "CLT-1001",
    name: "Tanvir Ahmed",
    company: "Metro E-Store",
    email: "tanvir@metroestore.bd",
    phone: "+880 1711-223344",
    industry: "E-Commerce",
    solution: "E-Commerce Order Workflows",
    status: "Active",
    monthlyValue: "$450 / mo",
    startDate: "2025-11-15",
    lastContact: "2026-09-02",
    notes: "Integrated Pathao API + SMS order verification. 70% decrease in manual courier entry.",
  },
  {
    id: "CLT-1002",
    name: "Nusrat Jahan",
    company: "CarePlus Diagnostic & Clinic",
    email: "nusrat@careplusclinic.com",
    phone: "+880 1819-556677",
    industry: "Clinics & Medical",
    solution: "Customer Support Automation",
    status: "Active",
    monthlyValue: "$600 / mo",
    startDate: "2026-01-10",
    lastContact: "2026-09-03",
    notes: "Messenger & WhatsApp automated appointment booking chatbot operating 24/7.",
  },
  {
    id: "CLT-1003",
    name: "Rahim Chowdhury",
    company: "Urban Properties Ltd.",
    email: "rahim@urbanproperties.com.bd",
    phone: "+880 1912-889900",
    industry: "Real Estate",
    solution: "Sales Lead Routing & Automation",
    status: "Onboarding",
    monthlyValue: "$850 / mo",
    startDate: "2026-08-20",
    lastContact: "2026-09-04",
    notes: "Configuring automatic lead scoring and Discord team alerts for instant follow-up.",
  },
  {
    id: "CLT-1004",
    name: "Kazi Farhana",
    company: "SkillCraft Academy",
    email: "farhana@skillcraft.edu.bd",
    phone: "+880 1610-334455",
    industry: "Education & Coaching",
    solution: "AI Business Solutions",
    status: "In Consultation",
    monthlyValue: "$700 / mo",
    startDate: "2026-09-01",
    lastContact: "2026-09-04",
    notes: "Evaluating internal document RAG knowledge base for student support team.",
  },
  {
    id: "CLT-1005",
    name: "Shahriar Hassan",
    company: "Apex Distribution Network",
    email: "shahriar@apexdistrib.com",
    phone: "+880 1755-667788",
    industry: "Distributors & Supply",
    solution: "Office Workflow Automation",
    status: "Active",
    monthlyValue: "$500 / mo",
    startDate: "2026-03-05",
    lastContact: "2026-08-28",
    notes: "Automated weekly reporting engine and digital PDF invoice generator.",
  },
];

export const initialLeads: ConsultationLead[] = [
  {
    id: "LEAD-2001",
    name: "Mahmud Hasan",
    company: "NextGen Fashion Store",
    email: "mahmud@nextgenfashion.com",
    phone: "+880 1788-123456",
    industry: "F-Commerce",
    problemDescription: "We process 100+ orders daily manually into Steadfast courier. Taking 4 hours per day.",
    preferredContact: "whatsapp",
    submittedAt: "2026-09-04 10:15 AM",
    status: "New",
  },
  {
    id: "LEAD-2002",
    name: "Sabrina Karim",
    company: "Apex Visa Consultancy",
    email: "sabrina@apexvisa.com",
    phone: "+880 1922-987654",
    industry: "Travel & Agencies",
    problemDescription: "Clients ask same document checklist queries all day. We need an automated AI assistant.",
    preferredContact: "phone",
    submittedAt: "2026-09-04 09:30 AM",
    status: "New",
  },
  {
    id: "LEAD-2003",
    name: "Imtiaz Ali",
    company: "Green Leaf Agro Tech",
    email: "imtiaz@greenleaf.com.bd",
    phone: "+880 1677-445566",
    industry: "Growing SMEs",
    problemDescription: "Our stock reconciliation between warehouse and online sheets takes 6 hours every Friday.",
    preferredContact: "email",
    submittedAt: "2026-09-03 04:45 PM",
    status: "Contacted",
  },
];
