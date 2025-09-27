import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Star,
  MapPin,
  Phone,
  Mail,
  Users
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const DoctorsList: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const doctors = [
    {
      id: 1,
      name: 'Dr. Rajesh Sharma',
      specialty: 'Cardiologist',
      status: 'online',
      patients: 156,
      rating: 4.8,
      phone: '+91 98765 43210',
      email: 'rajesh.sharma@chikitsa365.com',
      location: 'Delhi',
      experience: '12 years',
      image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Dr. Priya Patel',
      specialty: 'Pediatrician',
      status: 'busy',
      patients: 203,
      rating: 4.9,
      phone: '+91 98765 43211',
      email: 'priya.patel@chikitsa365.com',
      location: 'Mumbai',
      experience: '8 years',
      image: 'https://images.pexels.com/photos/5407764/pexels-photo-5407764.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Dr. Amit Mehta',
      specialty: 'Dermatologist',
      status: 'offline',
      patients: 89,
      rating: 4.6,
      phone: '+91 98765 43212',
      email: 'amit.mehta@chikitsa365.com',
      location: 'Bangalore',
      experience: '15 years',
      image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Dr. Sunita Singh',
      specialty: 'Gynecologist',
      status: 'online',
      patients: 178,
      rating: 4.7,
      phone: '+91 98765 43213',
      email: 'sunita.singh@chikitsa365.com',
      location: 'Pune',
      experience: '10 years',
      image: 'https://images.pexels.com/photos/5407764/pexels-photo-5407764.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    }
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'online': return 'status-online';
      case 'offline': return 'status-offline';
      case 'busy': return 'status-busy';
      default: return 'status-offline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return t('doctors.online');
      case 'offline': return t('doctors.offline');
      case 'busy': return t('doctors.busy');
      default: return t('doctors.offline');
    }
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">{t('doctors.title')}</h2>
        <button className="btn-primary">Add New Doctor</button>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="card hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </div>
              </div>
              <div className="relative">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical size={16} className="text-gray-400" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(doctor.status)}`}>
                  {getStatusText(doctor.status)}
                </span>
                <div className="flex items-center space-x-1">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{doctor.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users size={14} />
                  <span>{doctor.patients} patients</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin size={14} />
                  <span>{doctor.location}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Phone size={14} />
                    <span>{doctor.phone}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                  <Mail size={14} />
                  <span className="truncate">{doctor.email}</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-3">
                <button className="flex-1 btn-primary text-sm">
                  {t('common.view')}
                </button>
                <button className="flex-1 btn-secondary text-sm">
                  {t('common.edit')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;