import React from 'react';
import { 
  Users, 
  Stethoscope, 
  Calendar, 
  Phone,
  TrendingUp,
  Clock,
  Activity
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface DashboardProps {
  onSectionChange: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSectionChange }) => {
  const { t } = useLanguage();

  const stats = [
    {
      title: t('dashboard.totalDoctors'),
      value: '24',
      change: '+2',
      changeType: 'increase',
      icon: Stethoscope,
      color: 'emerald'
    },
    {
      title: t('dashboard.totalPatients'),
      value: '1,247',
      change: '+18',
      changeType: 'increase',
      icon: Users,
      color: 'blue'
    },
    {
      title: t('dashboard.todayAppointments'),
      value: '42',
      change: '+5',
      changeType: 'increase',
      icon: Calendar,
      color: 'purple'
    },
    {
      title: t('dashboard.activeCalls'),
      value: '7',
      change: '2',
      changeType: 'neutral',
      icon: Phone,
      color: 'orange'
    }
  ];

  const recentAppointments = [
    { id: 1, patient: 'Rajesh Kumar', doctor: 'Dr. Sharma', time: '10:00 AM', status: 'confirmed' },
    { id: 2, patient: 'Priya Singh', doctor: 'Dr. Patel', time: '11:30 AM', status: 'pending' },
    { id: 3, patient: 'Amit Gupta', doctor: 'Dr. Mehta', time: '2:00 PM', status: 'completed' },
    { id: 4, patient: 'Sunita Devi', doctor: 'Dr. Sharma', time: '3:30 PM', status: 'confirmed' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: 'bg-emerald-500 text-emerald-500 bg-emerald-50',
      blue: 'bg-blue-500 text-blue-500 bg-blue-50',
      purple: 'bg-purple-500 text-purple-500 bg-purple-50',
      orange: 'bg-orange-500 text-orange-500 bg-orange-50'
    };
    return colors[color] || colors.emerald;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = getColorClasses(stat.color).split(' ');
          
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp size={14} className="text-emerald-500 mr-1" />
                    <span className="text-sm text-emerald-600">{stat.change}</span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[2]}`}>
                  <Icon size={24} className={colorClasses[1]} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
            <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Users size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{appointment.patient}</p>
                    <p className="text-sm text-gray-500">{appointment.doctor}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    {appointment.time}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => onSectionChange('appointments')}
              className="w-full btn-primary text-left flex items-center space-x-3"
            >
              <Calendar size={16} />
              <span>Schedule Appointment</span>
            </button>
            <button 
              onClick={() => onSectionChange('doctors')}
              className="w-full btn-secondary text-left flex items-center space-x-3"
            >
              <Stethoscope size={16} />
              <span>Add New Doctor</span>
            </button>
            <button 
              onClick={() => onSectionChange('patients')}
              className="w-full btn-secondary text-left flex items-center space-x-3"
            >
              <Users size={16} />
              <span>Add New Patient</span>
            </button>
            <button 
              onClick={() => onSectionChange('analytics')}
              className="w-full btn-secondary text-left flex items-center space-x-3"
            >
              <Activity size={16} />
              <span>View Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;