import { HeroSection } from "@/components/hero-section"
import { TokenizationProcess } from "@/components/tokenization-process"
import { TechnologyStack } from "@/components/technology-stack"
import { ImpactStories } from "@/components/impact-stories"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { DappPanel } from "@/components/dapp-panel"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <TokenizationProcess />
        <TechnologyStack />
        <ImpactStories />
        <DappPanel />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
