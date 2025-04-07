
import React from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface PricingFAQProps {
  title: string;
  description: string;
  faqItems: FAQItem[];
  languageKey: string;
}

const PricingFAQ: React.FC<PricingFAQProps> = ({ 
  title, 
  description, 
  faqItems,
  languageKey 
}) => {
  return (
    <div className="mt-16 text-center">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-8">{description}</p>
      <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
        {faqItems.map((faq, i) => (
          <div key={`faq-${i}-${languageKey}`} className="space-y-2">
            <h3 className="font-semibold">{faq.question}</h3>
            <p className="text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingFAQ;
