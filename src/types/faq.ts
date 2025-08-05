export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  name: string;
  items: FAQItem[];
} 