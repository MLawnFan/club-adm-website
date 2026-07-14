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
import ThankYouCourse21km from "./pages/ThankYouCourse21km";
import ThankYouCourse10km from "./pages/ThankYouCourse10km";
import ThankYouCourse5km from "./pages/ThankYouCourse5km";
import ThankYouCourse1km from "./pages/ThankYouCourse1km";
import Programmation5km from "./pages/Programmation5km";
import Programmation10km from "./pages/Programmation10km";
import ProgrammationDemiMarathon from "./pages/ProgrammationDemiMarathon";
import ProgrammeDashboard from "./pages/ProgrammeDashboard";
import ProgrammeModule from "./pages/ProgrammeModule";
import GHLChat from "./components/GHLChat";
function Router() {
  // make sure to consider if you need authentication for certain routes
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
      <Route path={"/merci-course-21km"} component={ThankYouCourse21km} />
      <Route path={"/merci-course-10km"} component={ThankYouCourse10km} />
      <Route path={"/merci-course-5km"} component={ThankYouCourse5km} />
      <Route path={"/merci-course-1km"} component={ThankYouCourse1km} />
      <Route path={"/programmation-5km"} component={Programmation5km} />
      <Route path={"/programmation-10km"} component={Programmation10km} />
      <Route path={"/programmation-21km"} component={ProgrammationDemiMarathon} />
      <Route path={"/programme/module/:id"} component={ProgrammeModule} />
      <Route path={"/programme"} component={ProgrammeDashboard} />
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
