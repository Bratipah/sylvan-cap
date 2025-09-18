import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Quote } from "lucide-react"

export function ImpactStories() {
  const stories = [
    {
      name: "Dr. Amara Okafor",
      role: "Environmental Scientist",
      location: "Lagos, Nigeria",
      avatar: "/african-woman-scientist.jpg",
      quote:
        "SylvanCap has revolutionized how we think about forest conservation. The transparency and financial incentives create a powerful force for sustainable management.",
      impact: "Planted 500 trees",
      returns: "12.3% APY",
    },
    {
      name: "James Mwangi",
      role: "Crypto Investor",
      location: "Nairobi, Kenya",
      avatar: "/african-man-investor.jpg",
      quote:
        "Finally, a DeFi project with real-world impact. My portfolio grows while supporting African communities and environmental conservation.",
      impact: "2,300 TST tokens",
      returns: "8.7% APY",
    },
    {
      name: "Sarah Mensah",
      role: "Local Community Leader",
      location: "Kumasi, Ghana",
      avatar: "/african-woman-community-leader.jpg",
      quote:
        "The forest management jobs created by SylvanCap have transformed our community. We are the guardians of these tokenized trees.",
      impact: "45 jobs created",
      returns: "Community fund",
    },
  ]

  const impactMetrics = [
    { label: "CO₂ Captured", value: "1,247 tons", icon: "🌱" },
    { label: "Jobs Created", value: "234", icon: "👥" },
    { label: "Communities Supported", value: "12", icon: "🏘️" },
    { label: "Forest Area Protected", value: "3,400 hectares", icon: "🌳" },
  ]

  return (
    <section id="impact" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Real Impact, Real Stories</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from investors, scientists, and community leaders who are part of the SylvanCap ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactMetrics.map((metric, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl mb-2">{metric.icon}</div>
                <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={story.avatar || "/placeholder.svg"} alt={story.name} />
                    <AvatarFallback>
                      {story.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{story.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{story.role}</p>
                    <p className="text-xs text-muted-foreground">{story.location}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-4 w-4 text-primary/30" />
                  <p className="text-muted-foreground italic pl-4">"{story.quote}"</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <Badge variant="outline">{story.impact}</Badge>
                  <Badge variant="secondary">{story.returns}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
