import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, TreePine, Users } from "lucide-react"

export function InvestmentMetrics() {
  const metrics = [
    {
      icon: DollarSign,
      title: "Total Value Locked",
      value: "$2.4M",
      change: "+23%",
      description: "Across all tokenized forests",
    },
    {
      icon: TreePine,
      title: "Trees Tokenized",
      value: "12,847",
      change: "+156",
      description: "Active tree NFTs",
    },
    {
      icon: Users,
      title: "Active Investors",
      value: "1,234",
      change: "+89",
      description: "Unique wallet holders",
    },
    {
      icon: TrendingUp,
      title: "Average APY",
      value: "8.5%",
      change: "+0.3%",
      description: "Historical returns",
    },
  ]

  const forestLocations = [
    { name: "Ghana Teak Forest", progress: 75, trees: 3200 },
    { name: "Kenya Pine Plantation", progress: 45, trees: 2800 },
    { name: "Uganda Eucalyptus", progress: 90, trees: 4200 },
    { name: "Tanzania Mahogany", progress: 30, trees: 2647 },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Investment Performance</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track the growth of our tokenized forest ecosystem across Africa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-primary">{metric.change} from last month</p>
                <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Forest Locations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {forestLocations.map((forest, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{forest.name}</span>
                    <span className="text-sm text-muted-foreground">{forest.trees} trees</span>
                  </div>
                  <Progress value={forest.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground">{forest.progress}% to maturity</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Distribution Model</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span>TST Token Holders</span>
                  <span className="font-semibold">70%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span>Forest Management</span>
                  <span className="font-semibold">20%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span>Platform Operations</span>
                  <span className="font-semibold">7%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span>Insurance Reserve</span>
                  <span className="font-semibold">3%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
