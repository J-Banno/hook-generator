import Hero from "@/components/Hero";
import { HookGenerator } from "@/components/HookGenerator";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import { ApiStatus } from "./components/ApiStatus";

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Hero />
      <HookGenerator />
      <ApiStatus />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default App;
