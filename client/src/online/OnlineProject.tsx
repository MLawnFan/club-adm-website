import { Route, Switch } from "wouter";
import OptInPage from "./pages/OptInPage";
import ResultPage from "./pages/ResultPage";
import ProgramPage from "./pages/ProgramPage";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage";
import UpsellPage from "./pages/UpsellPage";
import CommunityConfirmedPage from "./pages/CommunityConfirmedPage";
import ProgramOnlyThankYouPage from "./pages/ProgramOnlyThankYouPage";
import PaymentsPage from "./pages/PaymentsPage";
import MetaPixelConsent from "./components/MetaPixelConsent";
import "./online.css";

export default function OnlineProject() {
  return <div className="online-project">
    <Switch>
      <Route path="/online-project" component={OptInPage} />
      <Route path="/online-project/resultat" component={ResultPage} />
      <Route path="/online-project/programme" component={ProgramPage} />
      <Route path="/online-project/checkout" component={CheckoutPage} />
      <Route path="/online-project/merci" component={ThankYouPage} />
      <Route path="/online-project/upsell" component={UpsellPage} />
      <Route path="/online-project/communaute-confirmee" component={CommunityConfirmedPage} />
      <Route path="/online-project/merci-programme" component={ProgramOnlyThankYouPage} />
      <Route path="/online-project/mes-achats" component={PaymentsPage} />
      <Route><main className="min-h-screen p-10 text-white"><h1>Page introuvable</h1><a href="/online-project">Retour au programme en ligne</a></main></Route>
    </Switch>
    <MetaPixelConsent />
  </div>;
}
