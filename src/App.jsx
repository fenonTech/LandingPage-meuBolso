import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import WhatsAppPay from "./components/WhatsAppPay";
import OpenFinance from "./components/OpenFinance";
import Plans from "./components/Plans";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";

function App() {
  const [currentView, setCurrentView] = useState("main"); // 'main', 'login', 'createAccount'

  console.log("App render - currentView:", currentView);

  const handleOpenCreateAccount = () => {
    console.log("Opening Create Account");
    setCurrentView("createAccount");
  };

  const handleOpenLogin = () => {
    console.log("Opening Login");
    setCurrentView("login");
  };

  const handleGoBack = () => {
    console.log("Going back to main");
    setCurrentView("main");
  };

  // Renderizar baseado na view atual
  if (currentView === "login") {
    return (
      <Login
        isVisible={true}
        onClose={handleGoBack}
        onSwitchToCreateAccount={handleOpenCreateAccount}
      />
    );
  }

  if (currentView === "createAccount") {
    return (
      <CreateAccount
        isVisible={true}
        onClose={handleGoBack}
        onSwitchToLogin={handleOpenLogin}
      />
    );
  }

  // View principal
  return (
    <div className="min-h-screen bg-dark-900">
      <Header
        onOpenCreateAccount={handleOpenCreateAccount}
        onOpenLogin={handleOpenLogin}
      />
      <Hero onOpenCreateAccount={handleOpenCreateAccount} />
      <div className="hidden sm:block">
        <Dashboard />
      </div>
      <WhatsAppPay />
      <OpenFinance />
      <Plans />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
