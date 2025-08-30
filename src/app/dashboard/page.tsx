import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Ticket, DollarSign } from "lucide-react"
import PerformanceChart from "@/components/dashboard/chart"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Events",
      value: "24",
      change: "+12%",
      changeType: "positive" as const,
      icon: Calendar,
      color: "bg-[#f2c14b]",
    },
    {
      title: "Tickets Sold",
      value: "1,247",
      change: "+23%",
      changeType: "positive" as const,
      icon: Ticket,
      color: "bg-[#e6b143]",
    },
    {
      title: "Total Revenue",
      value: "Rp 45,8M",
      change: "+18%",
      changeType: "positive" as const,
      icon: DollarSign,
      color: "bg-[#d4a139]",
    },
    {
      title: "Active Users",
      value: "892",
      change: "+7%",
      changeType: "positive" as const,
      icon: Users,
      color: "bg-[#c69530]",
    },
  ]

  const recentEvents = [
    {
      name: "TUTTI 2025 Concert",
      date: "October 25, 2025",
      tickets: 450,
      revenue: "Rp 12,5M",
      status: "Active",
    },
    {
      name: "INSYFEST 2025",
      date: "September 1, 2025",
      tickets: 320,
      revenue: "Rp 8,9M",
      status: "Active",
    },
    {
      name: "Nongan Village Festival",
      date: "October 12, 2025",
      tickets: 275,
      revenue: "Rp 6,2M",
      status: "Active",
    },
    {
      name: "Anniversary PSK",
      date: "September 9, 2025",
      tickets: 180,
      revenue: "Rp 4,1M",
      status: "Completed",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back to SwarEvent Admin Panel</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Last updated:</span>
            <span className="font-medium">2 minutes ago</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <stat.icon className="w-6 h-6 text-black" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>

        {/* Recent Activity */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#f2c14b] rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New event created</p>
                  <p className="text-xs text-gray-500">TUTTI 2025 Concert</p>
                </div>
                <span className="text-xs text-gray-400">2m ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#e6b143] rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Ticket sales milestone</p>
                  <p className="text-xs text-gray-500">1000+ tickets sold</p>
                </div>
                <span className="text-xs text-gray-400">1h ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#d4a139] rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New user registered</p>
                  <p className="text-xs text-gray-500">25 new users today</p>
                </div>
                <span className="text-xs text-gray-400">3h ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#c69530] rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Event completed</p>
                  <p className="text-xs text-gray-500">Anniversary PSK</p>
                </div>
                <span className="text-xs text-gray-400">1d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Recent Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Event Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Tickets Sold</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentEvents.map((event, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{event.name}</td>
                    <td className="py-3 px-4 text-gray-600">{event.date}</td>
                    <td className="py-3 px-4 text-gray-600">{event.tickets}</td>
                    <td className="py-3 px-4 text-gray-600">{event.revenue}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          event.status === 'Active'
                            ? 'bg-[#f2c14b]/10 text-[#f2c14b]'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
