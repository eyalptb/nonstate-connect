
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Index,
  Dashboard,
  Impact,
  Funding,
  Messaging,
  SignIn,
  SignUp,
  ResetPassword,
  UpdatePassword,
  NotFound,
  IntegrationHub,
  ProposalDetail,
  Features,
} from "./pages";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import Governance from "./pages/Governance";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="light" storageKey="theme">
            <div className="min-h-screen bg-background">
              <Navbar />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/impact" element={<Impact />} />
                <Route path="/funding" element={<Funding />} />
                <Route path="/messaging" element={<Messaging />} />
                <Route path="/integration-hub" element={<IntegrationHub />} />
                <Route path="/governance" element={<Governance />} />
                <Route path="/governance/proposal/:id" element={<ProposalDetail />} />
                <Route path="/features" element={<Features />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/update-password" element={<UpdatePassword />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
              <Toaster />
            </div>
          </ThemeProvider>
        </QueryClientProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
