"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface VisualChartsProps {
  packages: any[]
  onPackageHover: (packageId: string | null) => void
}

export default function VisualCharts({ packages, onPackageHover }: VisualChartsProps) {
  const [activeTab, setActiveTab] = useState("price")

  // Colors for charts
  const colors = ["#0ea5e9", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444", "#ec4899"]

  // Prepare data for price comparison chart
  const priceData = packages.map((pkg) => ({
    name: pkg.title,
    price: pkg.price,
    id: pkg.id,
    originalPrice: pkg.discount > 0 ? Math.round(pkg.price / (1 - pkg.discount / 100)) : pkg.price,
    discount: pkg.discount > 0 ? Math.round(pkg.price / (1 - pkg.discount / 100)) - pkg.price : 0,
  }))

  // Prepare data for price per night chart
  const pricePerNightData = packages.map((pkg) => ({
    name: pkg.title,
    pricePerNight: Math.round(pkg.price / pkg.duration),
    id: pkg.id,
  }))

  // Prepare data for amenities comparison
  const amenitiesData = packages.map((pkg) => ({
    name: pkg.title,
    amenities: pkg.amenities?.length || 0,
    activities: pkg.activities?.length || 0,
    id: pkg.id,
  }))

  // Prepare data for cost breakdown pie charts
  const getCostBreakdown = (pkg: any) => {
    // This is mock data - in a real app, you'd have actual cost breakdowns
    const total = pkg.price
    return [
      { name: "Accommodation", value: Math.round(total * 0.6) },
      { name: "Meals", value: Math.round(total * 0.15) },
      { name: "Activities", value: Math.round(total * 0.15) },
      { name: "Transport", value: Math.round(total * 0.1) },
    ]
  }

  // Prepare data for radar chart
  const getRadarData = (pkg: any) => {
    // This is mock data - in a real app, you'd have actual ratings for these categories
    return [
      { category: "Value", value: Math.min(5, 5 - (pkg.price / 3000) * 5) },
      { category: "Luxury", value: pkg.type === "luxury" ? 5 : pkg.price > 1500 ? 4 : pkg.price > 1000 ? 3 : 2 },
      { category: "Activities", value: pkg.activities?.length > 5 ? 5 : pkg.activities?.length || 1 },
      { category: "Location", value: pkg.rating > 4.5 ? 5 : pkg.rating > 4 ? 4 : 3 },
      {
        category: "Food",
        value: pkg.meals === "All-inclusive" ? 5 : pkg.meals === "Full board" ? 4 : pkg.meals === "Half board" ? 3 : 2,
      },
    ]
  }

  // Custom tooltip for bar charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const pkg = packages.find((p) => p.title === label)
      if (pkg) {
        onPackageHover(pkg.id)
      }

      return (
        <div className="rounded-md bg-white p-3 shadow-md">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: ${entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div>
      <Tabs defaultValue="price" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-4">
          <TabsTrigger value="price">Price Comparison</TabsTrigger>
          <TabsTrigger value="amenities">Amenities & Activities</TabsTrigger>
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="radar">Feature Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="price" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Total Package Price</CardTitle>
                <CardDescription>Compare the total price of each package</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      price: {
                        label: "Price",
                        color: "hsl(var(--chart-1))",
                      },
                      discount: {
                        label: "Discount",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={priceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                        onMouseLeave={() => onPackageHover(null)}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} interval={0} />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar
                          dataKey="price"
                          name="Price"
                          stackId="a"
                          fill="var(--color-price)"
                          onMouseEnter={(data) => onPackageHover(data.id)}
                          onMouseLeave={() => onPackageHover(null)}
                        />
                        <Bar
                          dataKey="discount"
                          name="Discount"
                          stackId="a"
                          fill="var(--color-discount)"
                          onMouseEnter={(data) => onPackageHover(data.id)}
                          onMouseLeave={() => onPackageHover(null)}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Price Per Night</CardTitle>
                <CardDescription>Compare the cost per night of each package</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={pricePerNightData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                      onMouseLeave={() => onPackageHover(null)}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} interval={0} />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar
                        dataKey="pricePerNight"
                        name="Price Per Night"
                        fill="#10b981"
                        onMouseEnter={(data) => onPackageHover(data.id)}
                        onMouseLeave={() => onPackageHover(null)}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="amenities" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Amenities & Activities Comparison</CardTitle>
              <CardDescription>Compare the number of amenities and activities included in each package</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={amenitiesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    onMouseLeave={() => onPackageHover(null)}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} interval={0} />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="amenities"
                      name="Amenities"
                      fill="#8b5cf6"
                      onMouseEnter={(data) => onPackageHover(data.id)}
                      onMouseLeave={() => onPackageHover(null)}
                    />
                    <Bar
                      dataKey="activities"
                      name="Activities"
                      fill="#f59e0b"
                      onMouseEnter={(data) => onPackageHover(data.id)}
                      onMouseLeave={() => onPackageHover(null)}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg, index) => (
              <Card key={pkg.id} onMouseEnter={() => onPackageHover(pkg.id)} onMouseLeave={() => onPackageHover(null)}>
                <CardHeader>
                  <CardTitle className="text-base">{pkg.title}</CardTitle>
                  <CardDescription>Cost breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getCostBreakdown(pkg)}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getCostBreakdown(pkg).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="radar" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <Card key={pkg.id} onMouseEnter={() => onPackageHover(pkg.id)} onMouseLeave={() => onPackageHover(null)}>
                <CardHeader>
                  <CardTitle className="text-base">{pkg.title}</CardTitle>
                  <CardDescription>Feature comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius={90} data={getRadarData(pkg)}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="category" />
                        <PolarRadiusAxis angle={30} domain={[0, 5]} />
                        <Radar
                          name={pkg.title}
                          dataKey="value"
                          stroke={colors[packages.indexOf(pkg) % colors.length]}
                          fill={colors[packages.indexOf(pkg) % colors.length]}
                          fillOpacity={0.6}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
