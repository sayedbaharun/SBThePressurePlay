import { Switch, Route, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Cookies from "@/pages/cookies";
import Analytics from "@/pages/analytics";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

function AnimatedRoute({ component: Component }: { component: () => JSX.Element }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <Component />
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={() => <AnimatedRoute component={Home} />} />
        <Route path="/about" component={() => <AnimatedRoute component={About} />} />
        <Route path="/contact" component={() => <AnimatedRoute component={Contact} />} />
        <Route path="/analytics" component={() => <AnimatedRoute component={Analytics} />} />
        <Route path="/admin" component={() => <AnimatedRoute component={Admin} />} />
        <Route path="/privacy" component={() => <AnimatedRoute component={Privacy} />} />
        <Route path="/terms" component={() => <AnimatedRoute component={Terms} />} />
        <Route path="/cookies" component={() => <AnimatedRoute component={Cookies} />} />
        <Route component={() => <AnimatedRoute component={NotFound} />} />
      </Switch>
    </AnimatePresence>
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
