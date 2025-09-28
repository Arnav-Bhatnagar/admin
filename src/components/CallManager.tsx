import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  PhoneCall, 
  Video, 
  Mic, 
  MicOff, 
  VideoOff,
  Users,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const CallManager: React.FC = () => {
  const { t } = useLanguage();
  const [activeCalls, setActiveCalls] = useState([
    {
      id: 1,
      doctor: 'Dr. Rajesh Sharma',
      patient: 'Rajesh Kumar',
      startTime: new Date(Date.now() - 300000), // 5 minutes ago
      status: 'waiting_patient',
      type: 'video',
      room:"1"
    },
    {
      id: 2,
      doctor: 'Dr. Priya Patel',
      patient: 'Priya Singh',
      startTime: new Date(Date.now() - 600000), // 10 minutes ago
      status: 'connected',
      type: 'audio'
    }
  ]);

  const [callHistory, setCallHistory] = useState([
    {
      id: 1,
      doctor: 'Dr. Amit Mehta',
      patient: 'Amit Gupta',
      duration: '15:30',
      endTime: new Date(Date.now() - 3600000),
      status: 'completed'
     
    },
    {
      id: 2,
      doctor: 'Dr. Sunita Singh',
      patient: 'Sunita Devi',
      duration: '08:45',
      endTime: new Date(Date.now() - 7200000),
      status: 'completed'
    }
  ]);

  const formatDuration = (startTime: Date): string => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const [durations, setDurations] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newDurations: { [key: number]: string } = {};
      activeCalls.forEach(call => {
        newDurations[call.id] = formatDuration(call.startTime);
      });
      setDurations(newDurations);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeCalls]);

  const handleConnectPatient = (callId: number) => {
    setActiveCalls(prevCalls =>
      prevCalls.map(call =>
        call.id === callId
          ? { ...call, status: 'connected' }
          : call
      )
    );
  };

  const handleEndCall = (callId: number) => {
    const call = activeCalls.find(c => c.id === callId);
    if (call) {
      const newHistoryEntry = {
        id: Date.now(),
        doctor: call.doctor,
        patient: call.patient,
        duration: durations[call.id] || '00:00',
        endTime: new Date(),
        status: 'completed'
      };
      
      setCallHistory(prev => [newHistoryEntry, ...prev]);
      setActiveCalls(prev => prev.filter(c => c.id !== callId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-emerald-100 text-emerald-800';
      case 'waiting_patient': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'waiting_patient': return 'Waiting for Patient';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{t('calls.title')}</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span>{activeCalls.length} Active Calls</span>
        </div>
      </div>

      {/* Active Calls */}
      {activeCalls.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeCalls.map((call) => (
            <div key={call.id} className="card border-l-4 border-l-emerald-500">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    {call.type === 'video' ? (
                      <Video size={20} className="text-emerald-600" />
                    ) : (
                      <Phone size={20} className="text-emerald-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Call #{call.id}</h3>
                    <p className="text-sm text-gray-500 capitalize">{call.type} Call</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(call.status)}`}>
                  {getStatusText(call.status)}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">Doctor:</span>
                  </div>
                  <span className="font-medium text-gray-900">{call.doctor}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">Patient:</span>
                  </div>
                  <span className="font-medium text-gray-900">{call.patient}</span>
                </div>





                






                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">Duration:</span>
                    
                  </div>
                  
                  <span className="font-medium text-gray-900 font-mono">
                    {durations[call.id] || '00:00'}
                  </span>
                  
                </div>





                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">Room-No.:</span>
                  </div>
                  <span className="font-medium text-gray-900">1</span>
                </div>





              </div>

              <div className="flex space-x-2">
                {call.status === 'waiting_patient' ? (
                  <button
                    onClick={() => handleConnectPatient(call.id)}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2"
                  >
                    <PhoneCall size={16} />
                    <span>{t('calls.connect')}</span>
                  </button>
                ) : (
                  <div className="flex space-x-2 w-full">
                    <button className="flex-1 btn-secondary flex items-center justify-center space-x-2">
                      <Mic size={16} />
                      <span>Mute</span>
                    </button>
                    <button className="flex-1 btn-secondary flex items-center justify-center space-x-2">
                      <Video size={16} />
                      <span>Video</span>
                    </button>
                  </div>
                )}
                <button
                  onClick={() => handleEndCall(call.id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center space-x-2 transition-colors duration-200"
                >
                  <Phone size={16} />
                  <span>End</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('calls.noActive')}</h3>
          <p className="text-gray-500">When doctors initiate calls, they will appear here for patient connection.</p>
        </div>
      )}

      {/* Call History */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Call History</h3>
        <div className="space-y-3">
          {callHistory.map((call) => (
            <div key={call.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <Phone size={16} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{call.doctor} → {call.patient}</p>
                  <p className="text-sm text-gray-500">
                    Ended at {call.endTime.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{call.duration}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(call.status)}`}>
                  {getStatusText(call.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CallManager;