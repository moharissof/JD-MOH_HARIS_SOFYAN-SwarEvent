import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Ticket, DollarSign, Plus } from "lucide-react"
import PerformanceChart from "@/components/dashboard/chart"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const stats = [
    {
      title: "My Events",
      value: "8",
      change: "+2",
      changeType: "positive" as const,
      icon: Calendar,
      color: "bg-[#f2c14b]",
    },
    {
      title: "Tickets Sold",
      value: "523",
      change: "+45",
      changeType: "positive" as const,
      icon: Ticket,
      color: "bg-[#e6b143]",
    },
    {
      title: "Total Revenue",
      value: "Rp 15,2M",
      change: "+8%",
      changeType: "positive" as const,
      icon: DollarSign,
      color: "bg-[#d4a139]",
    },
    {
      title: "Event Views",
      value: "2,341",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
      color: "bg-[#c69530]",
    },
  ]

  const recentEvents = [
    {
      name: "My Concert 2025",
      date: "October 25, 2025",
      tickets: 150,
      revenue: "Rp 4,5M",
      status: "Active",
    },
    {
      name: "Workshop Digital Marketing",
      date: "September 15, 2025",
      tickets: 85,
      revenue: "Rp 2,1M",
      status: "Active",
    },
    {
      name: "Music Festival Local",
      date: "October 10, 2025",
      tickets: 200,
      revenue: "Rp 6,8M",
      status: "Active",
    },
    {
      name: "Business Seminar",
      date: "August 20, 2025",
      tickets: 88,
      revenue: "Rp 1,8M",
      status: "Completed",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Organizer Dashboard</h1>
          <p className="text-gray-600">Manage your events and track performance</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-3">
          <Button className="bg-[#f2c14b] hover:bg-[#e6b143] text-black font-medium">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
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
                  <p className="text-sm font-medium text-gray-900">Event published</p>
                  <p className="text-xs text-gray-500">My Concert 2025</p>
                </div>
                <span className="text-xs text-gray-400">2m ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#e6b143] rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Ticket milestone reached</p>
                  <p className="text-xs text-gray-500">100+ tickets sold</p>
                </div>
                <span className="text-xs text-gray-400">1h ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#d4a139] rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Payment received</p>
                  <p className="text-xs text-gray-500">Rp 500K from ticket sales</p>
                </div>
                <span className="text-xs text-gray-400">3h ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#c69530] rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Event updated</p>
                  <p className="text-xs text-gray-500">Workshop details changed</p>
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