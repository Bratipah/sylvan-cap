import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TreePine, Coins, TrendingUp, Banknote } from "lucide-react"

export function TokenizationProcess() {
  const steps = [
    {
      icon: TreePine,
      title: "Tree NFT Creation",
      description: "Each tree is tokenized as a unique NFT with GPS coordinates, species data, and growth tracking.",
      badge: "ERC-721",
    },
    {
      icon: Coins,
      title: "TST Token Distribution",
      description: "Timber Share Tokens (TST) represent your claim on future timber revenue from the entire forest.",
      badge: "ERC-20",
    },
    {
      icon: TrendingUp,
      title: "Growth & Monitoring",
      description: "Satellite imagery and IoT sensors track tree health and growth, verified by oracle networks.",
      badge: "Chainlink",
    },
    {
      icon: Banknote,
      title: "Revenue Distribution",
      description: "When trees mature or insurance pays out, proceeds are distributed to TST holders automatically.",
      badge: "Smart Contract",
    },
  ]

  return (
    <section id="tokenization" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">How Tree Tokenization Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our innovative dual-token system separates ownership from revenue, creating a liquid and secure investment
            in African forestry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="relative">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <Badge variant="secondary" className="mb-2 w-fit mx-auto">
                  {step.badge}
                </Badge>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{step.description}</p>
              </CardContent>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/30" />
              )}
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-card rounded-lg border border-border">
          <h3 className="text-xl font-semibold mb-4 text-center">The "Mature or Dead" Guarantee</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-primary">Tree Matures & Harvested</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Timber sold on commodity market</li>
                <li>• Proceeds converted to USDC</li>
                <li>• TST tokens bought back and burned</li>
                <li>• All TST holders benefit proportionally</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-primary">Tree Dies (Fire, Disease, Storm)</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Death verified by oracle networks</li>
                <li>• Forest insurance payout triggered</li>
                <li>• Same distribution mechanism activated</li>
                <li>• TST holders still receive returns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
