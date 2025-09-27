import React, { useState } from 'react';
import { LanguageContext, useLanguageProvider } from './hooks/useLanguage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DoctorsList from './components/DoctorsList';
import PatientsList from './components/PatientsList';
import AppointmentScheduler from './components/AppointmentScheduler';
import CallManager from './components/CallManager';
import Analytics from './components/Analytics';
import ChatBot from './components/chatbot';



function App() {
  const languageProvider = useLanguageProvider();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderSection = () => {
    
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onSectionChange={setActiveSection} />;
      case 'doctors':
        return <DoctorsList />;
      case 'patient':
        return <PatientsList />;
      case 'appointments':
        return <AppointmentScheduler />;
      case 'calls':
        return <CallManager />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard onSectionChange={setActiveSection} />;
    }
  };

  return (
    <LanguageContext.Provider value={languageProvider}>
      <div className="min-h-screen bg-gray-50 flex">
        <ChatBot/>
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <div className="flex-1 flex flex-col lg:ml-64">
          <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="flex-1 p-6">
            {renderSection()}
          </main>
        </div>
      </div>
    </LanguageContext.Provider>
  );
}

export default App;