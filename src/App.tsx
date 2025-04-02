
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Index,
  Dashboard,
  Impact,
  Funding,
  Messaging,
  NotFound,
  IntegrationHub,
  ProposalDetail,
  Features,
  Profile,
  Projects,
  ProjectDetail
} from "./pages";
import { AuthProvider } from "./contexts/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import Governance from "./pages/Governance";
import Admin from "./pages/Admin";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";
import AuthCallback from "./pages/AuthCallback";
import SetUsername from "@/components/auth/SetUsername";
import Privacy from "./pages/Privacy";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

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
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/impact" element={<Impact />} />
                <Route path="/funding" element={<Funding />} />
                <Route path="/messaging" element={
                  <ProtectedRoute>
                    <Messaging />
                  </ProtectedRoute>
                } />
                <Route path="/collaboration-hub" element={<IntegrationHub />} />
                <Route path="/governance" element={<Governance />} />
                <Route path="/governance/proposal/:id" element={<ProposalDetail />} />
                <Route path="/features" element={<Features />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/admin" element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <Admin />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:projectId" element={<ProjectDetail />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/set-username" element={
                  <ProtectedRoute>
                    <SetUsername />
                  </ProtectedRoute>
                } />
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
