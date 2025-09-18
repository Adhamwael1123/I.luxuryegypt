import { Switch, Route, useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageTransition from "@/components/page-transition";
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
import FamilyLuxury from "@/pages/family-luxury";
import Stay from "@/pages/stay";
import HotelDetail from "@/pages/hotel-detail";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsConditions from "@/pages/terms-conditions";
import CookiePolicy from "@/pages/cookie-policy";
import Disclaimer from "@/pages/disclaimer";
import ResponsibleTravel from "@/pages/responsible-travel";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Switch location={location} key={location}>
        <Route path="/" component={() => <PageTransition><Home /></PageTransition>} />
        <Route path="/about" component={() => <PageTransition><About /></PageTransition>} />
        <Route path="/destinations" component={() => <PageTransition><Destinations /></PageTransition>} />
        <Route path="/destinations/alexandria" component={() => <PageTransition><Alexandria /></PageTransition>} />
        <Route path="/destinations/aswan" component={() => <PageTransition><Aswan /></PageTransition>} />
        <Route path="/destinations/cairo" component={() => <PageTransition><Cairo /></PageTransition>} />
        <Route path="/destinations/dahab" component={() => <PageTransition><Dahab /></PageTransition>} />
        <Route path="/destinations/giza" component={() => <PageTransition><Giza /></PageTransition>} />
        <Route path="/destinations/hurghada" component={() => <PageTransition><Hurghada /></PageTransition>} />
        <Route path="/destinations/luxor" component={() => <PageTransition><Luxor /></PageTransition>} />
        <Route path="/destinations/sharm-el-sheikh" component={() => <PageTransition><SharmElSheikh /></PageTransition>} />
        <Route path="/destinations/siwa-oasis" component={() => <PageTransition><SiwaOasis /></PageTransition>} />
        <Route path="/experiences" component={() => <PageTransition><Experiences /></PageTransition>} />
        <Route path="/experiences/family-luxury" component={() => <PageTransition><FamilyLuxury /></PageTransition>} />
        <Route path="/stay" component={() => <PageTransition><Stay /></PageTransition>} />
        <Route path="/hotel/:id" component={() => <PageTransition><HotelDetail /></PageTransition>} />
        <Route path="/contact" component={() => <PageTransition><Contact /></PageTransition>} />
        <Route path="/privacy-policy" component={() => <PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/terms-conditions" component={() => <PageTransition><TermsConditions /></PageTransition>} />
        <Route path="/cookie-policy" component={() => <PageTransition><CookiePolicy /></PageTransition>} />
        <Route path="/disclaimer" component={() => <PageTransition><Disclaimer /></PageTransition>} />
        <Route path="/responsible-travel" component={() => <PageTransition><ResponsibleTravel /></PageTransition>} />
        {/* Admin Routes */}
        <Route path="/admin/login" component={() => <AdminLogin />} />
        <Route path="/admin" component={() => <AdminDashboard />} />
        <Route component={() => <PageTransition><NotFound /></PageTransition>} />
      </Switch>
    </AnimatePresence>
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