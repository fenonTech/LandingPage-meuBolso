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
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const [currentView, setCurrentView] = useState("main"); // 'main', 'login', 'createAccount', 'forgotPassword'

  console.log("App render - currentView:", currentView);

  const handleOpenCreateAccount = () => {
    console.log("Opening Create Account");
    setCurrentView("createAccount");
  };

  const handleOpenLogin = () => {
    console.log("Opening Login");
    setCurrentView("login");
  };

  const handleOpenForgotPassword = () => {
    console.log("Opening Forgot Password");
    setCurrentView("forgotPassword");
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
        onSwitchToForgotPassword={handleOpenForgotPassword}
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

  if (currentView === "forgotPassword") {
    return (
      <ForgotPassword
        isVisible={true}
        onClose={handleGoBack}
        onBackToLogin={handleOpenLogin}
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
