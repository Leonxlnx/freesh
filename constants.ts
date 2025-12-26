import { Ingredient, Metric, Testimonial } from './types';

export const INGREDIENTS: Ingredient[] = [
  {
    name: "L-Theanine",
    scientificName: "Extracted from Green Tea",
    dosage: "200mg",
    function: "Provides a calm, steady sense of alertness without the usual caffeine edge."
  },
  {
    name: "Lion's Mane",
    scientificName: "Natural Mushroom Extract",
    dosage: "500mg",
    function: "Support for mental clarity and long-term brain health."
  },
  {
    name: "Natural Caffeine",
    scientificName: "Sourced from Green Coffee",
    dosage: "80mg",
    function: "A gentle energy boost that works in harmony with your natural rhythm."
  },
  {
    name: "Rhodiola Rosea",
    scientificName: "Arctic Root Herb",
    dosage: "150mg",
    function: "Helps the body manage daily stress and maintains mental stamina."
  }
];

export const METRICS: Metric[] = [
  {
    label: "Reaction Time",
    value: 40,
    unit: "%",
    description: "Average improvement in focus"
  },
  {
    label: "Clean Energy",
    value: 6,
    unit: "HRS",
    description: "Sustained boost per serving"
  },
  {
    label: "Sugar Content",
    value: 0,
    unit: "G",
    description: "Pure energy, zero fillers"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "It's the first energy drink that actually makes me feel balanced, not jittery.",
    author: "Elena Vance",
    title: "Lead Designer",
    company: "Studio North"
  },
  {
    quote: "Perfect for long afternoons in the studio. Clean focus that lasts until dinner.",
    author: "Marcus Chen",
    title: "Senior Developer",
    company: "Modern Web"
  },
  {
    quote: "I've replaced my third coffee with Freesh. My sleep has never been better.",
    author: "Dr. Aris Thorne",
    title: "Researcher",
    company: "Global Health"
  }
];