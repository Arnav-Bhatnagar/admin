import React, { useState } from 'react';
import { Calendar, Clock, User, Stethoscope, Plus } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const AppointmentScheduler: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const patients = [
    { id: 1, name: 'Rajesh Kumar' },
    { id: 2, name: 'Priya Singh' },
    { id: 3, name: 'Amit Gupta' },
    { id: 4, name: 'Sunita Devi' }
  ];

  const doctors = [
    { id: 1, name: 'Dr. Rajesh Sharma', specialty: 'Cardiologist' },
    { id: 2, name: 'Dr. Priya Patel', specialty: 'Pediatrician' },
    { id: 3, name: 'Dr. Amit Mehta', specialty: 'Dermatologist' },
    { id: 4, name: 'Dr. Sunita Singh', specialty: 'Gynecologist' }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: 'Rajesh Kumar',
      doctor: 'Dr. Sharma',
      date: '2024-01-20',
      time: '10:00 AM',
      status: 'confirmed'
    },
    {
      id: 2,
      patient: 'Priya Singh',
      doctor: 'Dr. Patel',
      date: '2024-01-20',
      time: '11:30 AM',
      status: 'pending'
    },
    {
      id: 3,
      patient: 'Amit Gupta',
      doctor: 'Dr. Mehta',
      date: '2024-01-21',
      time: '02:00 PM',
      status: 'confirmed'
    }
  ];

  const handleScheduleAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPatient && selectedDoctor && selectedDate && selectedTime) {
      alert('Appointment scheduled successfully!');
      // Reset form
      setSelectedPatient('');
      setSelectedDoctor('');
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('appointments.title')}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointment Form */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center space-x-2 mb-6">
            <Plus className="text-emerald-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">Schedule New Appointment</h3>
          </div>

          <form onSubmit={handleScheduleAppointment} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User size={16} className="inline mr-1" />
                  {t('appointments.patient')}
                </label>
                <select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a patient</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.name}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Stethoscope size={16} className="inline mr-1" />
                  {t('appointments.doctor')}
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar size={16} className="inline mr-1" />
                  {t('appointments.date')}
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock size={16} className="inline mr-1" />
                  {t('appointments.time')}
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              <Calendar size={16} />
              <span>{t('appointments.schedule')}</span>
            </button>
          </form>
        </div>

        {/* Upcoming Appointments */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Appointments</h3>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{appointment.patient}</p>
                    <p className="text-sm text-gray-600">{appointment.doctor}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{appointment.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;