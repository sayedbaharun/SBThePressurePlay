export default function Terms() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text font-display">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Last updated: January 2025
            </p>

            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Acceptance of Terms</h2>
                <p>
                  By accessing and using The Pressure Play website and services, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Use License</h2>
                <p>
                  Permission is granted to temporarily access and listen to the materials on The Pressure Play's website for personal, non-commercial transitory viewing only.
                </p>
                <p className="mt-4">This license shall not permit you to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for commercial purposes or public display</li>
                  <li>Attempt to reverse engineer any software on our website</li>
                  <li>Remove any copyright or proprietary notations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Content</h2>
                <p>
                  All podcast episodes, articles, and other content on this website are the intellectual property of The Pressure Play and our guests. Unauthorized redistribution is prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Newsletter Subscription</h2>
                <p>
                  By subscribing to our newsletter, you agree to receive weekly emails from us. You can unsubscribe at any time using the link provided in each email.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">User Conduct</h2>
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Use our services for any unlawful purpose</li>
                  <li>Interfere with or disrupt our website or servers</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Transmit any harmful or malicious code</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Disclaimer</h2>
                <p>
                  The materials on The Pressure Play's website are provided on an 'as is' basis. The Pressure Play makes no warranties, expressed or implied, and hereby disclaims all other warranties including implied warranties or conditions of merchantability.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Limitations</h2>
                <p>
                  In no event shall The Pressure Play be liable for any damages arising out of the use or inability to use the materials on our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
                <p>
                  We reserve the right to revise these terms of service at any time without notice. By using this website, you agree to be bound by the current version of these terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us at:{" "}
                  <a href="mailto:hello@thepressureplay.com" className="text-primary hover:underline">
                    hello@thepressureplay.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}