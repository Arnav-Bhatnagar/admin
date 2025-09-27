import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical,
  Calendar,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const PatientsList: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const patients = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      age: 45,
      phone: '+91 98765 43220',
      email: 'rajesh.kumar@email.com',
      lastVisit: '2024-01-15',
      condition: 'Hypertension',
      doctor: 'Dr. Sharma',
      location: 'Delhi',
      status: 'active',
      image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Priya Singh',
      age: 32,
      phone: '+91 98765 43221',
      email: 'priya.singh@email.com',
      lastVisit: '2024-01-10',
      condition: 'Diabetes',
      doctor: 'Dr. Patel',
      location: 'Mumbai',
      status: 'active',
      image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Amit Gupta',
      age: 28,
      phone: '+91 98765 43222',
      email: 'amit.gupta@email.com',
      lastVisit: '2024-01-08',
      condition: 'Skin Allergy',
      doctor: 'Dr. Mehta',
      location: 'Bangalore',
      status: 'inactive',
      image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Sunita Devi',
      age: 38,
      phone: '+91 98765 43223',
      email: 'sunita.devi@email.com',
      lastVisit: '2024-01-12',
      condition: 'Pregnancy Care',
      doctor: 'Dr. Singh',
      location: 'Pune',
      status: 'active',
      image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-emerald-100 text-emerald-800' 
      : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">{t('patients.title')}</h2>
        <button className="btn-primary">Add New Patient</button>
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

      {/* Patients Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">{t('patients.name')}</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">{t('patients.age')}</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Condition</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Doctor</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">{t('patients.lastVisit')}</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={patient.image}
                        alt={patient.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{patient.name}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Phone size={12} />
                            <span>{patient.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-900">{patient.age}</td>
                  <td className="py-4 px-4 text-gray-900">{patient.condition}</td>
                  <td className="py-4 px-4 text-gray-900">{patient.doctor}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Calendar size={14} />
                      <span>{patient.lastVisit}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                        {t('common.view')}
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                        {t('common.edit')}
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical size={16} className="text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientsList;