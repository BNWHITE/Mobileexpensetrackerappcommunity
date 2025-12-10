import { useState } from 'react';
import { SplashScreen } from './components/nesti/SplashScreen';
import { Onboarding } from './components/nesti/Onboarding';
import { MainLayout } from './components/nesti/MainLayout';
import { FeedPage } from './components/nesti/FeedPage';
import { MyNestPage } from './components/nesti/MyNestPage';
import { SettingsPage } from './components/nesti/SettingsPage';
import { DiscoveriesPage } from './components/nesti/DiscoveriesPage';
import { AgendaPage } from './components/nesti/AgendaPage';
import { ChatPage } from './components/nesti/ChatPage';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'onboarding' | 'main'>('splash');
  const [currentPage, setCurrentPage] = useState<string>('feed');

  if (currentScreen === 'splash') {
    return <SplashScreen onContinue={() => setCurrentScreen('onboarding')} />;
  }

  if (currentScreen === 'onboarding') {
    return <Onboarding onComplete={() => setCurrentScreen('main')} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'feed':
        return <FeedPage />;
      case 'agenda':
        return <AgendaPage />;
      case 'nest':
        return <MyNestPage />;
      case 'discoveries':
        return <DiscoveriesPage />;
      case 'chat':
        return <ChatPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <FeedPage />;
    }
  };

  return (
    <MainLayout 
      currentPage={currentPage} 
      onNavigate={setCurrentPage}
      nestName="Famille Martin"
      userName="Sophie"
      userRole="admin"
    >
      {renderPage()}
    </MainLayout>
  );
}
