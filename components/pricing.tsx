import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "$0",
      description: "Perfect for browsing and exploring templates",
      features: ["Browse all templates", "Preview functionality", "Community support", "1 download per month"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "For professional developers and designers",
      features: [
        "Unlimited downloads",
        "Access to premium templates",
        "Priority support",
        "No attribution required",
        "Early access to new templates",
      ],
      cta: "Subscribe Now",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For teams and businesses",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Custom branding",
        "API access",
        "Dedicated account manager",
        "Custom template requests",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section className="py-20 relative" id="pricing">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-[#6E00FF]/30 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="text-[#6E00FF]">Pricing</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Choose the plan that works best for your needs. No hidden fees or surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-[#1A1A1A] rounded-xl overflow-hidden border transition-all duration-300 relative ${
                plan.popular
                  ? "border-[#6E00FF] shadow-lg shadow-[#6E00FF]/20 scale-105 md:scale-110 z-10"
                  : "border-[#6E00FF]/20 hover:border-[#6E00FF]/50"
              }`}
            >
              {plan.popular && (
                <div className="bg-[#6E00FF] text-white text-xs font-bold px-3 py-1 absolute top-0 right-0 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end mb-4">
                  <span className="text-3xl md:text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-white/50 ml-1">{plan.period}</span>}
                </div>
                <p className="text-white/70 mb-6">{plan.description}</p>
                <Button
                  className={`w-full mb-8 ${
                    plan.popular
                      ? "bg-[#6E00FF] hover:bg-[#6E00FF]/80"
                      : "bg-transparent border border-[#6E00FF] hover:bg-[#6E00FF]/10"
                  }`}
                >
                  {plan.cta}
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="w-5 h-5 text-[#6E00FF] mr-3 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

