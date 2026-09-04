export type Locale = "en" | "bn";

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  problemDescription: string;
  preferredContact: "email" | "phone" | "whatsapp";
  website?: string;
  teamSize?: string;
  currentTools?: string;
}
