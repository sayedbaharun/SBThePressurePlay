import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Episodes from "@/pages/episodes";
import InnerCircle from "@/pages/inner-circle";
import About from "@/pages/about";
import Newsletter from "@/pages/newsletter";
import Contact from "@/pages/contact";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Cookies from "@/pages/cookies";
import Analytics from "@/pages/analytics";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/episodes" component={Episodes} />
      <Route path="/inner-circle" component={InnerCircle} />
      <Route path="/about" component={About} />
      <Route path="/newsletter" component={Newsletter} />
      <Route path="/contact" component={Contact} />
      
      {/* Analytics page - hidden from navigation */}
      <Route path="/analytics" component={Analytics} />
      
      {/* Admin page - hidden from navigation */}
      <Route path="/admin" component={Admin} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/cookies" component={Cookies} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <SiteHeader />
          <main>
            <Router />
          </main>
          <SiteFooter />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
