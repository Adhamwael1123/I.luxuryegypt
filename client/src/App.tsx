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
import TourDetail from "@/pages/tour-detail";
import Experiences from "@/pages/experiences";
import CategoryDetail from "@/pages/category-detail";
import FamilyLuxury from "@/pages/family-luxury";
import NileCruise from "@/pages/nile-cruise";
import ClassicEgypt from "@/pages/classic-egypt";
import SpiritualJourneys from "@/pages/spiritual-journeys";
import AdventureTours from "@/pages/adventure-tours";
import UltraLuxury from "@/pages/ultra-luxury";
import Stay from "@/pages/stay";
import HotelDetail from "@/pages/hotel-detail";
import Blog from "@/pages/blog";
import BlogArchive from "@/pages/blog-archive";
import BlogPost from "@/pages/blog-post";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsConditions from "@/pages/terms-conditions";
import CookiePolicy from "@/pages/cookie-policy";
import Disclaimer from "@/pages/disclaimer";
import ResponsibleTravel from "@/pages/responsible-travel";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminHotels from "@/pages/admin-hotels";
import AdminTours from "@/pages/admin-tours";
import AdminToursNew from "@/pages/admin-tours-new";
import AdminToursEdit from "@/pages/admin-tours-edit";
import AdminPackages from "@/pages/admin-packages";
import AdminPackageForm from "@/pages/admin-package-form";
import AdminPages from "@/pages/admin-pages";
import AdminPosts from "@/pages/admin-posts";
import AdminInquiries from "@/pages/admin-inquiries";
import AdminMedia from "@/pages/admin-media";
import AdminDestinations from "@/pages/admin-destinations";
import AdminCategories from "@/pages/admin-categories";
import AdminSettings from "@/pages/admin-settings";

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
        <Route path="/tour/:id" component={() => <PageTransition><TourDetail /></PageTransition>} />
        <Route path="/experiences" component={() => <PageTransition><Experiences /></PageTransition>} />
        <Route path="/experiences/family-luxury" component={() => <PageTransition><FamilyLuxury /></PageTransition>} />
        <Route path="/experiences/nile-cruise" component={() => <PageTransition><NileCruise /></PageTransition>} />
        <Route path="/experiences/classic-egypt" component={() => <PageTransition><ClassicEgypt /></PageTransition>} />
        <Route path="/experiences/spiritual-journeys" component={() => <PageTransition><SpiritualJourneys /></PageTransition>} />
        <Route path="/experiences/adventure-tours" component={() => <PageTransition><AdventureTours /></PageTransition>} />
        <Route path="/experiences/ultra-luxury" component={() => <PageTransition><UltraLuxury /></PageTransition>} />
        <Route path="/experiences/:slug" component={() => <PageTransition><CategoryDetail /></PageTransition>} />
        <Route path="/stay" component={() => <PageTransition><Stay /></PageTransition>} />
        <Route path="/hotel/:id" component={() => <PageTransition><HotelDetail /></PageTransition>} />
        <Route path="/blog" component={() => <PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/archive" component={() => <PageTransition><BlogArchive /></PageTransition>} />
        <Route path="/blog/:id" component={() => <PageTransition><BlogPost /></PageTransition>} />
        <Route path="/contact" component={() => <PageTransition><Contact /></PageTransition>} />
        <Route path="/privacy-policy" component={() => <PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/terms-conditions" component={() => <PageTransition><TermsConditions /></PageTransition>} />
        <Route path="/cookie-policy" component={() => <PageTransition><CookiePolicy /></PageTransition>} />
        <Route path="/disclaimer" component={() => <PageTransition><Disclaimer /></PageTransition>} />
        <Route path="/responsible-travel" component={() => <PageTransition><ResponsibleTravel /></PageTransition>} />
        {/* Admin Routes */}
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/hotels" component={AdminHotels} />
        <Route path="/admin/posts" component={AdminPosts} />
        <Route path="/admin/media" component={AdminMedia} />
        <Route path="/admin/categories" component={AdminCategories} />
        <Route path="/admin/tours" component={AdminTours} />
        <Route path="/admin/tours/new" component={AdminToursNew} />
        <Route path="/admin/tours/:id/edit" component={AdminToursEdit} />
        <Route path="/admin/packages" component={AdminPackages} />
        <Route path="/admin/packages/new" component={AdminPackageForm} />
        <Route path="/admin/packages/:id/edit" component={AdminPackageForm} />
        <Route path="/admin/destinations" component={AdminDestinations} />
        <Route path="/admin/settings" component={AdminSettings} />
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