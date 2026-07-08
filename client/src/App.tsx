import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import OnlinePrograms from "./pages/OnlinePrograms";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Programmes from "./pages/Programmes";
import NotreEquipe from "./pages/NotreEquipe";
import HorairePrix from "./pages/HorairePrix";
import Contact from "./pages/Contact";
import ConsultationGratuite from "./pages/ConsultationGratuite";
import Evenements from "./pages/Evenements";
import EvenementCourse from "./pages/EvenementCourse";
import ThankYouCourse from "./pages/ThankYouCourse";
import GHLChat from "./components/GHLChat";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/en-ligne"} component={OnlinePrograms} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogArticle} />
      <Route path={"/programmes"} component={Programmes} />
      <Route path={"/notre-equipe"} component={NotreEquipe} />
      <Route path={"/horaire-prix"} component={HorairePrix} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/consultation-gratuite"} component={ConsultationGratuite} />
      <Route path={"/evenements"} component={Evenements} />
      <Route path={"/evenements/course-19-septembre"} component={EvenementCourse} />
      <Route path={"/merci-course"} component={ThankYouCourse} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <GHLChat />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
