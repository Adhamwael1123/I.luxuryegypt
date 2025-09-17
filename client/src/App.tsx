import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import Destinations from "@/pages/destinations";
import Alexandria from "@/pages/alexandria";
import Aswan from "@/pages/aswan";
import Cairo from "@/pages/cairo";
import Dahab from "@/pages/dahab";
import Giza from "@/pages/giza";
import Hurghada from "@/pages/hurghada";
import Luxor from "@/pages/luxor";
import SharmElSheikh from "@/pages/sharm-el-sheikh";
import SiwaOasis from "@/pages/siwa-oasis";
import Experiences from "@/pages/experiences";
import Stay from "@/pages/stay";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsConditions from "@/pages/terms-conditions";
import CookiePolicy from "@/pages/cookie-policy";
import Disclaimer from "@/pages/disclaimer";
import ResponsibleTravel from "@/pages/responsible-travel";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/destinations" component={Destinations} />
      <Route path="/destinations/alexandria" component={Alexandria} />
      <Route path="/destinations/aswan" component={Aswan} />
      <Route path="/destinations/cairo" component={Cairo} />
      <Route path="/destinations/dahab" component={Dahab} />
      <Route path="/destinations/giza" component={Giza} />
      <Route path="/destinations/hurghada" component={Hurghada} />
      <Route path="/destinations/luxor" component={Luxor} />
      <Route path="/destinations/sharm-el-sheikh" component={SharmElSheikh} />
      <Route path="/destinations/siwa-oasis" component={SiwaOasis} />
      <Route path="/experiences" component={Experiences} />
      <Route path="/stay" component={Stay} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-conditions" component={TermsConditions} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/responsible-travel" component={ResponsibleTravel} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
