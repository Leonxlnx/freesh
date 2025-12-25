import { Ingredient, Metric, Testimonial } from './types';

export const INGREDIENTS: Ingredient[] = [
  {
    name: "L-Theanine",
    scientificName: "N-ethyl-L-glutamine",
    dosage: "200mg",
    function: "Alpha Wave Modulation"
  },
  {
    name: "Lion's Mane",
    scientificName: "Hericium erinaceus",
    dosage: "500mg",
    function: "Neurogenesis Support"
  },
  {
    name: "Natural Caffeine",
    scientificName: "1,3,7-Trimethylxanthine",
    dosage: "80mg",
    function: "Adenosine Antagonism"
  },
  {
    name: "Rhodiola",
    scientificName: "Rhodiola rosea",
    dosage: "150mg",
    function: "Cortisol Regulation"
  }
];

export const METRICS: Metric[] = [
  {
    label: "Cognitive Latency",
    value: -42,
    unit: "%",
    description: "Reduction in reaction time"
  },
  {
    label: "Focus Duration",
    value: 6.5,
    unit: "HRS",
    description: "Sustained alpha-state flow"
  },
  {
    label: "Crash Index",
    value: 0,
    unit: "NIL",
    description: "Post-peak glycemic impact"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "It doesn't feel like caffeine. It feels like waking up for the second time today.",
    author: "Elena Vance",
    title: "Lead Architect",
    company: "Oculus Structural"
  },
  {
    quote: "The distinct lack of jitters transforms my afternoon coding sprints. Essential infrastructure.",
    author: "Marcus Chen",
    title: "Senior Engineer",
    company: "Vercel"
  },
  {
    quote: "Freesh obliterated my need for the 3 PM espresso. It is clean, precise energy.",
    author: "Dr. Aris Thorne",
    title: "Neurobiologist",
    company: "Helix Labs"
  }
];
