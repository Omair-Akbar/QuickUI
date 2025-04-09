import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: 0,
      description: "Perfect for getting started",
      features: ["1 template download per month", "Basic support", "Access to free templates", "Community access"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: 29,
      description: "For professional developers",
      features: [
        "Unlimited template downloads",
        "Priority support",
        "Access to all templates",
        "Source files included",
        "Remove attribution",
        "Commercial use license",
      ],
      cta: "Subscribe Now",
      popular: true,
    },
    {
      name: "Team",
      price: 99,
      description: "For design and development teams",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "5 team members",
        "Dedicated support",
        "Custom branding",
        "API access",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-[#121212] text-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent <span className="text-[#6E00FF]">Pricing</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Choose the plan that's right for you and start building amazing websites and applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-[#1A1A1A] border ${plan.popular ? "border-[#6E00FF]" : "border-[#6E00FF]/20"} rounded-xl p-6 relative flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#6E00FF] text-white text-xs font-bold py-1 px-3 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-white/70">{plan.description}</p>
              </div>
              <div className="mb-6">
                <div className="flex items-end">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.price > 0 && <span className="text-white/70 ml-1">/month</span>}
                </div>
              </div>
              <div className="mb-8 flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-[#6E00FF] mr-2 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                className={
                  plan.popular
                    ? "bg-[#6E00FF] hover:bg-[#6E00FF]/80 text-white"
                    : "bg-transparent border border-[#6E00FF] text-white hover:bg-[#6E00FF]/10"
                }
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center p-8 bg-[#1A1A1A] border border-[#6E00FF]/20 rounded-xl max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Need a custom plan?</h2>
          <p className="text-white/70 mb-6">
            We offer custom plans for larger teams and enterprises. Contact us to discuss your specific needs.
          </p>
          <Button className="bg-[#6E00FF] hover:bg-[#6E00FF]/80 text-white">Contact Sales</Button>
        </div>
      </div>
    </div>
  )
}
