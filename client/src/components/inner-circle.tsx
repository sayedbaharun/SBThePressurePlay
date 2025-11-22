import { CheckCircle, Zap, Users, Book } from "lucide-react";

const features = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Quarterly Networking",
    description: "Exclusive access to members-only events",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Direct Access to Hosts",
    description: "Monthly 1-on-1 coaching sessions",
  },
  {
    icon: <Book className="w-6 h-6" />,
    title: "Executive Blueprints",
    description: "Proprietary frameworks & strategies",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Ad-Free Episodes",
    description: "Premium listening experience",
  },
];

export default function InnerCircle() {
  return (
    <section id="inner-circle" className="section-padding bg-black" data-testid="inner-circle">
      <div className="container-max">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              THE INNER CIRCLE
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              You've listened to the advice. Now it's time to apply it.
            </p>
            <p className="text-gray-500 mb-12">
              Join an exclusive community of high achievers who are decoding champion mindsets and building championship results.
            </p>

            {/* Features List */}
            <div className="space-y-6 mb-12">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 items-start" data-testid={`inner-circle-feature-${idx}`}>
                  <div className="text-primary flex-shrink-0 mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="btn-gold text-lg" data-testid="apply-access-btn">
              Apply for Access
            </button>
          </div>

          {/* Right - Premium Card */}
          <div className="glass p-8 rounded-2xl border-2 border-primary/50 hover:border-primary transition-colors">
            <div className="mb-6">
              <div className="inline-block bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-bold uppercase mb-4">
                Premium
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">$97</h3>
              <p className="text-gray-400 text-sm">/month (billed annually)</p>
            </div>

            <div className="space-y-4 mb-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-gray-300">{feature.title}</span>
                </div>
              ))}
            </div>

            <button className="btn-gold w-full mb-4" data-testid="inner-circle-subscribe-btn">
              Subscribe Now
            </button>

            <p className="text-center text-xs text-gray-500">
              30-day money-back guarantee. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
