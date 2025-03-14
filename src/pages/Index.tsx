
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Projects from "@/components/Projects";
import JoinCta from "@/components/JoinCta";
import Footer from "@/components/Footer";
import TokenWallet from "@/components/TokenWallet";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-12 mt-20">
          <h2 className="text-3xl font-bold text-center mb-8">Your CollabCoin Wallet</h2>
          <div className="max-w-2xl mx-auto">
            <TokenWallet />
          </div>
        </div>
        <Features />
        <Projects />
        <JoinCta />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
