export interface NavItem {
  label: string;
  href: string;
}

export interface Ingredient {
  name: string;
  scientificName: string;
  dosage: string;
  function: string;
}

export interface Metric {
  label: string;
  value: number;
  unit: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
}
