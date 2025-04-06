
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme-provider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { pages } from './pages';
import { NotificationProvider } from './contexts/notification/NotificationContext';
import { TranslationProvider } from './contexts/translation/TranslationContext';
import { ensureCriticalTranslations } from './utils/i18nVerification';
import './App.css';

function App() {
  // Ensure critical translations are loaded when the app starts
  useEffect(() => {
    const loadTranslations = async () => {
      await ensureCriticalTranslations();
    };
    
    loadTranslations();
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="paracollab-theme">
      <TranslationProvider>
        <NotificationProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow">
                <Routes>
                  {pages.map((page) => (
                    <Route key={page.path} path={page.path} element={page.element} />
                  ))}
                </Routes>
              </div>
              <Footer />
            </div>
            <Toaster position="top-right" richColors closeButton />
          </Router>
        </NotificationProvider>
      </TranslationProvider>
    </ThemeProvider>
  );
}

export default App;
