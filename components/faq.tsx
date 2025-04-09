"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  const faqs = [
    {
      question: "What types of templates do you offer?",
      answer:
        "We offer a wide range of templates including landing pages, dashboards, e-commerce stores, blogs, admin panels, and more. All our templates are built with React and Next.js, following modern best practices.",
    },
    {
      question: "Can I customize the templates?",
      answer:
        "All our templates are fully customizable. They're built with clean, well-structured code that makes it easy to modify colors, layouts, and functionality to suit your specific needs.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Yes, we offer a 14-day money-back guarantee. If you're not satisfied with your purchase for any reason, simply contact our support team within 14 days for a full refund.",
    },
    {
      question: "Can I use the templates for client projects?",
      answer:
        "Yes, our standard license allows you to use a template for a single end product (yours or a client's). For multiple projects, you'll need to purchase additional licenses or consider our extended license options.",
    },
    {
      question: "Do you offer support for the templates?",
      answer:
        "Yes, we provide support for all our templates. Our standard support includes bug fixes and basic assistance with template setup. Premium support with more extensive help is available with our Pro and Team plans.",
    },
    {
      question: "How often are templates updated?",
      answer:
        "We regularly update our templates to ensure compatibility with the latest versions of React, Next.js, and other dependencies. Pro and Team plan subscribers get lifetime access to all updates for their purchased templates.",
    },
  ]

  return (
    <section id="faq" className="py-20 relative">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-[#6E00FF]/30 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="text-[#6E00FF]">Questions</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Find answers to common questions about our templates, licensing, and support.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-[#1A1A1A] border border-[#6E00FF]/20 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:text-[#6E00FF] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-white/70">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
