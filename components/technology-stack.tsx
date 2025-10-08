import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Globe, Database } from "lucide-react"

export function TechnologyStack() {
  const technologies = [
    {
      icon: Zap,
      title: "Ethereum L2",
      description: "Built on Onino for RWA architecture, low-cost, fast transactions",
      badges: ["Onino", "ERC-721", "ERC-20"],
    },
    {
      icon: Shield,
      title: "Oracle Networks",
      description: "Chainlink provides reliable external data feeds",
      badges: ["Chainlink", "Satellite Data", "IoT Sensors"],
    },
    {
      icon: Globe,
      title: "Decentralized Storage",
      description: "IPFS and Arweave for immutable metadata storage",
      badges: ["IPFS", "Arweave", "Metadata"],
    },
    {
      icon: Database,
      title: "Smart Contracts",
      description: "Automated revenue distribution and governance",
      badges: ["Solidity", "OpenZeppelin", "Upgradeable"],
    },
  ]

  return (
    <section id="technology" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Built on Cutting-Edge Technology</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform leverages the most advanced blockchain infrastructure to ensure security, transparency, and
            scalability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {technologies.map((tech, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <tech.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{tech.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{tech.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tech.badges.map((badge, badgeIndex) => (
                    <Badge key={badgeIndex} variant="secondary">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Smart Contract Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-lg font-semibold">Tree NFT Contract</div>
                <div className="text-sm text-muted-foreground">
                  ERC-721 tokens representing individual trees with rich metadata
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-semibold">TST Token Contract</div>
                <div className="text-sm text-muted-foreground">
                  ERC-20 tokens for revenue sharing across the forest ecosystem
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-semibold">Treasury Contract</div>
                <div className="text-sm text-muted-foreground">
                  Automated distribution of timber proceeds and insurance payouts
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
