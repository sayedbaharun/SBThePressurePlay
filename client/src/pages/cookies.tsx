export default function Cookies() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text font-display">
            Cookie Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Last updated: December 2024
            </p>

            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">What Are Cookies</h2>
                <p>
                  Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Cookies</h2>
                <p>We use cookies for several purposes:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Marketing Cookies:</strong> May be used to show relevant content and advertisements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Types of Cookies We Use</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Session Cookies</h3>
                    <p>These are temporary cookies that expire when you close your browser. They help our website function properly during your visit.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Persistent Cookies</h3>
                    <p>These cookies remain on your device until they expire or you delete them. They help us remember your preferences for future visits.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Third-Party Cookies</h3>
                    <p>We may use third-party services like Google Analytics that place their own cookies to help us analyze website usage and improve our content.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Managing Cookies</h2>
                <p>
                  You can control and manage cookies in several ways:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies</li>
                  <li>You can delete existing cookies from your browser</li>
                  <li>You can set your browser to notify you when cookies are being sent</li>
                  <li>Some third-party services offer opt-out options for their tracking cookies</li>
                </ul>
                <p className="mt-4">
                  Please note that disabling cookies may affect the functionality of our website and limit your access to certain features.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Browser Settings</h2>
                <p>Here's how to manage cookies in popular browsers:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Updates to This Policy</h2>
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for legal and regulatory reasons. Please check this page periodically for updates.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
                <p>
                  If you have any questions about our use of cookies, please contact us at:{" "}
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