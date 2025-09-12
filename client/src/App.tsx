import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Guests from "@/pages/guests";
import GuestDetail from "@/pages/guest-detail";
import About from "@/pages/about";
import Newsletter from "@/pages/newsletter";
import Partners from "@/pages/partners";
import Press from "@/pages/press";
import Playbook from "@/pages/playbook";
import Events from "@/pages/events";
import Contact from "@/pages/contact";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Cookies from "@/pages/cookies";
import NotFound from "@/pages/not-found";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* Redirect episode-related routes to newsletter */}
      <Route path="/episodes" component={() => { window.location.href = "/newsletter"; return null; }} />
      <Route path="/episodes/:slug" component={() => { window.location.href = "/newsletter"; return null; }} />
      <Route path="/watch" component={() => { window.location.href = "/newsletter"; return null; }} />
      <Route path="/listen" component={() => { window.location.href = "/newsletter"; return null; }} />
      {/* Redirect guest-related routes to newsletter */}
      <Route path="/guests" component={() => { window.location.href = "/newsletter"; return null; }} />
      <Route path="/guests/:slug" component={() => { window.location.href = "/newsletter"; return null; }} />
      <Route path="/about" component={About} />
      <Route path="/newsletter" component={Newsletter} />
      {/* Redirect playbook route to newsletter */}
      <Route path="/playbook" component={() => { window.location.href = "/newsletter"; return null; }} />
      {/* Redirect events route to newsletter */}
      <Route path="/events" component={() => { window.location.href = "/newsletter"; return null; }} />
      {/* Redirect partners route to newsletter */}
      <Route path="/partners" component={() => { window.location.href = "/newsletter"; return null; }} />
      {/* Redirect press route to newsletter */}
      <Route path="/press" component={() => { window.location.href = "/newsletter"; return null; }} />
      <Route path="/contact" component={Contact} />
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
