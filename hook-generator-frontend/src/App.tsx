import Hero from "@/components/Hero";
import { HookGenerator } from "@/components/HookGenerator";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Hero />
      <HookGenerator />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default App;
