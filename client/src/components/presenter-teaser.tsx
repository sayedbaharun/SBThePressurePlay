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
            <span className="brand-text">Your Co-Founders</span>
          </h2>
          <p className="text-body-large text-muted-foreground mb-12">
            Two champions from different worlds, united by a shared mission to unlock human potential.
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
              <p className="text-body text-muted-foreground mb-3">Co-Founder & Performance Architect</p>
              <p className="text-small text-muted-foreground">
                Visionary behind The Pressure Play concept combining neuroscience, business strategy, and AI innovation.
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
              <p className="text-body text-muted-foreground mb-3">Co-Founder & Champion Validator</p>
              <p className="text-small text-muted-foreground">
                5x Premier League Champion bringing championship credibility and global platform.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about">
              <Button variant="outline" size="lg">
                Meet the Co-Founders
              </Button>
            </Link>
            <Link href="/playbook">
              <Button size="lg">
                Explore Our Methodology
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}