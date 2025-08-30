import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Episodes from "@/pages/episodes";
import EpisodeDetail from "@/pages/episode-detail";
import Guests from "@/pages/guests";
import GuestDetail from "@/pages/guest-detail";
import Watch from "@/pages/watch";
import Listen from "@/pages/listen";
import About from "@/pages/about";
import Newsletter from "@/pages/newsletter";
import Partners from "@/pages/partners";
import Press from "@/pages/press";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import AudioPlayer from "@/components/audio-player";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/episodes" component={Episodes} />
      <Route path="/episodes/:slug" component={EpisodeDetail} />
      <Route path="/guests" component={Guests} />
      <Route path="/guests/:slug" component={GuestDetail} />
      <Route path="/watch" component={Watch} />
      <Route path="/listen" component={Listen} />
      <Route path="/about" component={About} />
      <Route path="/newsletter" component={Newsletter} />
      <Route path="/partners" component={Partners} />
      <Route path="/press" component={Press} />
      <Route path="/contact" component={Contact} />
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
          <AudioPlayer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
