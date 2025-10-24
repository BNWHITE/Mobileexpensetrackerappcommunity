import { useState } from "react";
import { SplashScreen } from "./components/nesti/SplashScreen";
import { Onboarding } from "./components/nesti/Onboarding";
import { SignupPage } from "./components/nesti/SignupPage";
import { LoginPage } from "./components/nesti/LoginPage";
import { InitialSetup } from "./components/nesti/InitialSetup";
import { MainLayout } from "./components/nesti/MainLayout";
import { DashboardPage } from "./components/nesti/DashboardPage";
import { CalendarPage } from "./components/nesti/CalendarPage";
import { TasksPage } from "./components/nesti/TasksPage";
import { ChatPage } from "./components/nesti/ChatPage";
import { DiscoveriesPage } from "./components/nesti/DiscoveriesPage";
import { SettingsPage } from "./components/nesti/SettingsPage";

type AppScreen =
  | "splash"
  | "onboarding"
  | "login"
  | "signup"
  | "setup"
  | "dashboard";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<AppScreen>("splash");
  const [currentPage, setCurrentPage] =
    useState<string>("dashboard");

  const renderScreen = () => {
    // Authentication flow screens
    switch (currentScreen) {
      case "splash":
        return (
          <SplashScreen
            onContinue={() => setCurrentScreen("onboarding")}
          />
        );

      case "onboarding":
        return (
          <Onboarding
            onComplete={() => setCurrentScreen("signup")}
          />
        );

      case "signup":
        return (
          <SignupPage
            onSignup={() => setCurrentScreen("setup")}
            onLogin={() => setCurrentScreen("login")}
          />
        );

      case "login":
        return (
          <LoginPage
            onLogin={() => setCurrentScreen("dashboard")}
            onSignup={() => setCurrentScreen("signup")}
          />
        );

      case "setup":
        return (
          <InitialSetup
            onComplete={() => setCurrentScreen("dashboard")}
          />
        );

      case "dashboard":
        return (
          <MainLayout
            currentPage={currentPage}
            onNavigate={setCurrentPage}
          >
            {renderPage()}
          </MainLayout>
        );

      default:
        return (
          <SplashScreen
            onContinue={() => setCurrentScreen("onboarding")}
          />
        );
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "calendar":
        return <CalendarPage />;
      case "tasks":
        return <TasksPage />;
      case "chat":
        return <ChatPage />;
      case "discoveries":
        return <DiscoveriesPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="mobile-container">{renderScreen()}</div>
  );
}