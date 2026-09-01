'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "When and where is the event?",
    answer: "Design Dialects 2.0 will be held on February 20-21, 2027 in Ludhiana, Punjab. The exact venue will be announced soon. Registration opens at 5:00 PM on the first day."
  },
  {
    question: "Who can attend this event?",
    answer: "This event is designed for architects, designers, brand partners, and industry professionals in the architecture and built environment sector. Students and aspiring professionals are also welcome."
  },
  {
    question: "Is there a registration fee?",
    answer: "Registration details including any fees will be communicated via email after you complete the registration form. We'll send you all the necessary information."
  },
  {
    question: "What should I bring to the event?",
    answer: "Please bring a valid ID for entry verification. We also recommend bringing business cards for networking opportunities. More details will be shared in your confirmation email."
  },
  {
    question: "Can I register someone else?",
    answer: "Yes! After completing your registration, you can submit another form for a colleague or friend. Each attendee needs to register individually."
  },
  {
    question: "Will there be networking opportunities?",
    answer: "Absolutely! Design Dialects is built around meaningful conversations and connections. You'll have ample opportunities to network with industry leaders, architects, designers, and brand partners."
  },
  {
    question: "What if I need to cancel my registration?",
    answer: "If you need to cancel, please email us at hello@lamediacommunications.com at least 7 days before the event. We'll process your cancellation and provide further instructions."
  },
  {
    question: "Will food and beverages be provided?",
    answer: "Yes, refreshments and meals will be provided during the event. Specific meal times will be included in your event schedule, which you'll receive via email."
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="border-t border-hairline py-section">
      <div className="mx-auto max-w-3xl px-gutter">
        <div className="text-center">
          <p className="eyebrow">Got questions?</p>
          <h2 className="h-tight mt-6 text-[clamp(1.8rem,3.6vw,2.8rem)]">
            Frequently Asked Questions
          </h2>
          <p className="mt-5 text-[15px] text-mist">
            Find answers to common questions about the event. Still have questions?{' '}
            <a href="mailto:hello@lamediacommunications.com" className="text-copper hover:underline">
              Contact us
            </a>
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <div key={index} className="panel overflow-hidden">
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-navy-2/20"
                aria-expanded={openIndex === index}
              >
                <span className="text-[15px] font-semibold leading-snug">
                  {item.question}
                </span>
                <svg
                  className={`h-5 w-5 shrink-0 text-copper transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="border-t border-hairline px-6 pb-6 pt-4">
                  <p className="text-[14.5px] leading-relaxed text-mist">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="panel mt-8 p-8 text-center">
          <p className="text-[15px] text-mist">
            Still have questions? We're here to help!
          </p>
          <a
            href="mailto:hello@lamediacommunications.com"
            className="btn btn-line mt-4 inline-flex"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
