import { Button } from "@/components/ui/button"
import { ArrowRight, TreePine, Coins, Shield } from "lucide-react"

export function HeroSection() {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Invest in Africa's Forests Through <span className="text-primary">Blockchain Technology</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Own tokenized trees as NFTs, earn from timber revenue, and support sustainable forestry across Africa.
            Bridge traditional forestry investment with cutting-edge DeFi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8">
              Start Investing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border">
              <TreePine className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Real Trees, Real Impact</h3>
              <p className="text-muted-foreground text-center">
                Each NFT represents actual trees in managed African forests
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border">
              <Coins className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Dual Token System</h3>
              <p className="text-muted-foreground text-center">
                Tree NFTs for ownership, TST tokens for revenue sharing
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Insurance Protected</h3>
              <p className="text-muted-foreground text-center">
                Full forest insurance ensures returns even if trees die
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background image */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img src="/placeholder-dv6gf.png" alt="African Forest" className="w-full h-full object-cover opacity-5" />
      </div>
    </section>
  )
}
