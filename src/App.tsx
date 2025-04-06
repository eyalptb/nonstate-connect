
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
  ProjectDetail,
  GardenProjects,
  GardenProjectCreation,
  GardenProject,
  GardenProjectSetup
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
import UseCases from "./pages/UseCases";
import Learn from "./pages/Learn";
import Pricing from "./pages/Pricing";
import ContactSales from "./pages/ContactSales";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="theme">
          <AuthProvider>
            <div className="min-h-screen bg-background">
              <Navbar />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/features" element={<Features />} />
                <Route path="/use-cases" element={<UseCases />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact-sales" element={<ContactSales />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:projectId" element={<ProjectDetail />} />
                <Route path="/impact" element={<Impact />} />
                
                {/* Authentication Routes */}
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/messaging" element={
                  <ProtectedRoute>
                    <Messaging />
                  </ProtectedRoute>
                } />
                <Route path="/governance" element={
                  <ProtectedRoute>
                    <Governance />
                  </ProtectedRoute>
                } />
                <Route path="/governance/proposal/:id" element={<ProposalDetail />} />
                <Route path="/admin" element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <Admin />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="/set-username" element={
                  <ProtectedRoute>
                    <SetUsername />
                  </ProtectedRoute>
                } />
                <Route path="/collaboration-hub" element={<IntegrationHub />} />
                <Route path="/funding" element={<Funding />} />
                
                {/* Garden-specific routes */}
                <Route path="/garden" element={<GardenProjects />} />
                <Route path="/garden/create" element={<GardenProjectCreation />} />
                <Route path="/garden/:projectId" element={<GardenProject />} />
                <Route path="/projects/:projectId/setup" element={<GardenProjectSetup />} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
              <Toaster />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
