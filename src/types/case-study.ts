export interface Metric {
  label: string;
  value: string;
  description?: string;
}

export interface TradeOff {
  pros: string[];
  cons: string[];
}

export interface Decision {
  title: string;
  rationale: string;
  tradeOffs: TradeOff;
  alternativesDiscarded: {
    option: string;
    reason: string;
  }[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverImage?: string;
  
  businessContext: {
    industry: string;
    clientSize: string;
    problem: string;
  };
  
  technicalChallenge: {
    description: string;
    constraints: string[];
  };
  
  decisions: Decision[];
  
  metrics: Metric[];
  
  stack: string[];
  
  // Metadata for SEO
  publishDate: string;
  featured: boolean;
}
