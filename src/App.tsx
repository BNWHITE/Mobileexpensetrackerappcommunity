import { useState } from 'react';
import { SplashScreen } from './components/nesti/SplashScreen';
import { MainLayout } from './components/nesti/MainLayout';
import { FeedPage } from './components/nesti/FeedPage';
import { MyNestPage } from './components/nesti/MyNestPage';
import { SettingsPage } from './components/nesti/SettingsPage';
import { DiscoveriesPage } from './components/nesti/DiscoveriesPage';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'main'>('splash');
  const [currentPage, setCurrentPage] = useState<string>('feed');

  if (currentScreen === 'splash') {
    return <SplashScreen onContinue={() => setCurrentScreen('main')} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'feed':
        return <FeedPage />;
      case 'agenda':
        return <PlaceholderPage title="Agenda & Tâches" icon="📅" />;
      case 'nest':
        return <MyNestPage />;
      case 'discoveries':
        return <DiscoveriesPage />;
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

// Placeholder component for pages not yet implemented
function PlaceholderPage({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <div className="text-center space-y-4">
        <div className="text-8xl mb-4">{icon}</div>
        <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {title}
        </h2>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          Cette page sera bientôt disponible avec toutes ses fonctionnalités : 
          gestion d'événements, tâches partagées, rappels intelligents et bien plus encore !
        </p>
        <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl max-w-lg mx-auto">
          <p className="text-sm text-foreground leading-relaxed">
            🚀 <strong>À venir :</strong> Vue calendrier, création d'événements récurrents, 
            assignation de tâches aux membres du nest, et synchronisation avec vos calendriers.
          </p>
        </div>
      </div>
    </div>
  );
}
