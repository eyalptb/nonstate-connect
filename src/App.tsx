
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { NotificationProvider } from './contexts/notification/NotificationContext';
import { TranslationProvider } from './contexts/translation/TranslationContext';
import { AuthProvider } from './contexts/auth/AuthProvider';
import * as Pages from './pages';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="paracollab-theme">
      <Router>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Pages.Index />} />
                <Route path="/dashboard" element={<Pages.Dashboard />} />
                <Route path="/features" element={<Pages.Features />} />
                <Route path="/projects" element={<Pages.Projects />} />
                <Route path="/projects/:id" element={<Pages.ProjectDetail />} />
                <Route path="/impact" element={<Pages.Impact />} />
                <Route path="/messaging" element={<Pages.Messaging />} />
                <Route path="/governance" element={<Pages.Governance />} />
                <Route path="/funding" element={<Pages.Funding />} />
                <Route path="/integrations" element={<Pages.IntegrationHub />} />
                <Route path="/profile" element={<Pages.Profile />} />
                <Route path="/admin" element={<Pages.Admin />} />
                <Route path="/privacy" element={<Pages.Privacy />} />
                <Route path="/garden" element={<Pages.GardenProjects />} />
                <Route path="/garden/:id" element={<Pages.GardenProject />} />
                <Route path="/proposals/:id" element={<Pages.ProposalDetail />} />
                <Route path="/use-cases" element={<Pages.UseCases />} />
                <Route path="/learn" element={<Pages.Learn />} />
                <Route path="/pricing" element={<Pages.Pricing />} />
                <Route path="/contact-sales" element={<Pages.ContactSales />} />
                <Route path="/auth/callback" element={<Pages.AuthCallback />} />
                <Route path="/sign-in" element={<Pages.SignIn />} />
                <Route path="*" element={<Pages.NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
