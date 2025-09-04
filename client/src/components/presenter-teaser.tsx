import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import sayedImage from "@assets/IMG_3685_1756540300594.jpg";
import patriceImage from "@assets/PE2_1756540349604.jpg";

export default function PresenterTeaser() {
  return (
    <section className="content-section">
      <div className="container mx-auto px-5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-display-2 font-display mb-6">
            <span className="brand-text">Your Bridge Builders</span>
          </h2>
          <p className="text-body-large text-muted-foreground mb-12">
            Two champions who discovered the boardroom and locker room face identical pressures. 
            Now they're bridging both worlds to share what works everywhere.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="apple-card p-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden">
                <img 
                  src={sayedImage}
                  alt="Sayed Baharun"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-headline font-display mb-2">Sayed Baharun</h3>
              <p className="text-body text-muted-foreground mb-3">Boardroom Champion & AI Pioneer</p>
              <p className="text-small text-muted-foreground">
                Brings boardroom strategies to the locker room, proving executive decisions and athletic choices use identical mental frameworks.
              </p>
            </div>
            
            <div className="apple-card p-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden">
                <img 
                  src={patriceImage}
                  alt="Patrice Evra"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-headline font-display mb-2">Patrice Evra</h3>
              <p className="text-body text-muted-foreground mb-3">Locker Room Legend & Business Leader</p>
              <p className="text-small text-muted-foreground">
                Brings championship psychology to the boardroom, showing how title-winning mentality translates directly to business success.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about">
              <Button variant="outline" size="lg">
                Meet the Bridge Builders
              </Button>
            </Link>
            <Link href="/playbook">
              <Button size="lg">
                Discover Pressure Principles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}