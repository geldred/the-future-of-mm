import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, TrendingUp, Eye, Gift } from 'lucide-react';
interface DashboardProps {
  onInsightClick: () => void;
}
const Dashboard = ({
  onInsightClick
}: DashboardProps) => {
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl font-bold text-blue-600">Big Lending Bank</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">Need help?</Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="text-sm font-medium">Gabe</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-900">Good Evening</h1>
        </div>

        {/* Account Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Venture X Card */}
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium mb-1">ADVENTURE Y</h3>
                  <p className="text-xs text-gray-300">...1681</p>
                </div>
                <CreditCard className="w-6 h-6 text-gray-300" />
              </div>
              <div className="mb-6">
                <div className="text-3xl font-light mb-1">
                  $3,249<span className="text-lg">.40</span>
                </div>
                <p className="text-xs text-gray-300 uppercase tracking-wider">Current Balance</p>
              </div>
              <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900 transition-colors">
                View Account
              </Button>
            </CardContent>
          </Card>

          {/* 360 Checking Card */}
          <Card className="bg-gradient-to-br from-teal-700 to-teal-800 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium mb-1">360 Checking</h3>
                  <p className="text-xs text-gray-300">...4846</p>
                </div>
                <CreditCard className="w-6 h-6 text-gray-300" />
              </div>
              <div className="mb-4">
                <div className="text-3xl font-light mb-1">
                  $42<span className="text-lg">.62</span>
                </div>
                <p className="text-xs text-gray-300 uppercase tracking-wider">Available Balance</p>
              </div>
              <div className="mb-4">
                <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white hover:text-teal-800 transition-colors mb-2">
                  View Account
                </Button>
              </div>
              <Button variant="outline" size="sm" className="bg-teal-600 border-teal-500 text-white hover:bg-teal-500 transition-colors flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View your debit card
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Spend Insight */}
          <Card className="bg-white border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group" onClick={onInsightClick}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                Monthly Spend Recap
              </h3>
              <p className="text-gray-600 mb-4">
                Take a deeper look at how you spent this month to get ahead on things for next month
              </p>
              <Button className="bg-blue-600 text-white hover:bg-blue-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                View Insight
              </Button>
            </CardContent>
          </Card>

          {/* Rewards Card */}
          <Card className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-sm font-medium mb-2 opacity-90">Explore rewards and benefits</h3>
                  <div className="text-3xl font-light mb-1">76,704</div>
                  <p className="text-xs opacity-90 uppercase tracking-wider">Miles</p>
                </div>
                <Gift className="w-8 h-8 opacity-80" />
              </div>
              <div className="flex gap-4 text-xs mb-4 opacity-90">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded"></div>
                  <span>Travel</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded"></div>
                  <span>Dining</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded"></div>
                  <span>Entertainment</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white hover:text-emerald-700 transition-colors">
                View Rewards
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8">
          <Card className="bg-gray-100 border-gray-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Explore other products</h3>
                  <p className="text-gray-600">
                    Explore all our products now to find an account that's right for you.
                  </p>
                </div>
                <Button variant="outline" className="bg-white">
                  Open a new account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>;
};
export default Dashboard;