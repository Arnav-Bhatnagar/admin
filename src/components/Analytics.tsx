import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  Users,
  Calendar,
  Phone,
  Activity,
  Clock,
  Star,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const Analytics: React.FC = () => {
  const { t } = useLanguage();
  const [animatedStats, setAnimatedStats] = useState({
    totalConsultations: 0,
    avgRating: 0,
    responseTime: 0,
    patientSatisfaction: 0
  });

  // Sample data for charts
  const consultationsData = [
    { month: 'Jan', consultations: 120, revenue: 24000 },
    { month: 'Feb', consultations: 150, revenue: 30000 },
    { month: 'Mar', consultations: 180, revenue: 36000 },
    { month: 'Apr', consultations: 220, revenue: 44000 },
    { month: 'May', consultations: 280, revenue: 56000 },
    { month: 'Jun', consultations: 320, revenue: 64000 }
  ];

  const doctorPerformanceData = [
    { name: 'Dr. Sharma', consultations: 45, rating: 4.8 },
    { name: 'Dr. Patel', consultations: 38, rating: 4.9 },
    { name: 'Dr. Mehta', consultations: 32, rating: 4.6 },
    { name: 'Dr. Singh', consultations: 41, rating: 4.7 },
    { name: 'Dr. Kumar', consultations: 29, rating: 4.5 }
  ];

  const appointmentStatusData = [
    { name: 'Completed', value: 65, color: '#10B981' },
    { name: 'Scheduled', value: 25, color: '#3B82F6' },
    { name: 'Cancelled', value: 10, color: '#EF4444' }
  ];

  const dailyActivityData = [
    { time: '9 AM', calls: 5, appointments: 8 },
    { time: '11 AM', calls: 12, appointments: 15 },
    { time: '1 PM', calls: 8, appointments: 12 },
    { time: '3 PM', calls: 15, appointments: 18 },
    { time: '5 PM', calls: 10, appointments: 14 },
    { time: '7 PM', calls: 6, appointments: 9 }
  ];

  // Animate stats on component mount
  useEffect(() => {
    const targets = {
      totalConsultations: 1247,
      avgRating: 4.7,
      responseTime: 2.3,
      patientSatisfaction: 94
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedStats({
        totalConsultations: Math.floor(targets.totalConsultations * easeOutQuart),
        avgRating: Number((targets.avgRating * easeOutQuart).toFixed(1)),
        responseTime: Number((targets.responseTime * easeOutQuart).toFixed(1)),
        patientSatisfaction: Math.floor(targets.patientSatisfaction * easeOutQuart)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedStats(targets);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, suffix = '', icon: Icon, trend, trendValue, color = 'emerald' }) => {
    const colorClasses = {
      emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200'
    };

    return (
      <div className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {value}{suffix}
            </p>
            {trend && (
              <div className={`flex items-center text-sm ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                {trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                <span className="ml-1">{trendValue}% from last month</span>
              </div>
            )}
          </div>
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 ${colorClasses[color]}`}>
            <Icon size={28} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Activity className="w-4 h-4" />
          <span>Real-time data</span>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Animated Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Consultations"
          value={animatedStats.totalConsultations}
          icon={Users}
          trend="up"
          trendValue="12"
          color="emerald"
        />
        <StatCard
          title="Average Rating"
          value={animatedStats.avgRating}
          suffix="/5"
          icon={Star}
          trend="up"
          trendValue="5"
          color="blue"
        />
        <StatCard
          title="Avg Response Time"
          value={animatedStats.responseTime}
          suffix=" min"
          icon={Clock}
          trend="down"
          trendValue="8"
          color="purple"
        />
        <StatCard
          title="Patient Satisfaction"
          value={animatedStats.patientSatisfaction}
          suffix="%"
          icon={TrendingUp}
          trend="up"
          trendValue="3"
          color="orange"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consultations Trend */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Consultations Trend</h3>
            <div className="flex items-center space-x-2 text-sm text-emerald-600">
              <TrendingUp size={16} />
              <span>+18% growth</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={consultationsData}>
              <defs>
                <linearGradient id="consultationsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="consultations"
                stroke="#10B981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#consultationsGradient)"
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Doctor Performance */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Doctor Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={doctorPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="consultations" 
                fill="#10B981" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Appointment Status */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Appointment Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={appointmentStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                animationDuration={1500}
              >
                {appointmentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Daily Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="calls" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                animationDuration={2000}
              />
              <Line 
                type="monotone" 
                dataKey="appointments" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                animationDuration={2000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Calendar className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-emerald-700 font-medium">Peak Hours</p>
              <p className="text-lg font-bold text-emerald-900">3 PM - 5 PM</p>
              <p className="text-xs text-emerald-600">Highest consultation volume</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Phone className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-blue-700 font-medium">Call Success Rate</p>
              <p className="text-lg font-bold text-blue-900">96.5%</p>
              <p className="text-xs text-blue-600">Above industry average</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Users className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-purple-700 font-medium">New Patients</p>
              <p className="text-lg font-bold text-purple-900">+127</p>
              <p className="text-xs text-purple-600">This month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;