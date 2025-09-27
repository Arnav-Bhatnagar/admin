import { useState, createContext, useContext } from 'react';

type Language = 'en' | 'hi' | 'pa';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'app.title': 'Chikitsa 365',
    'nav.dashboard': 'Dashboard',
    'nav.doctors': 'Doctors',
    'nav.patients': 'Patients',
    'nav.appointments': 'Appointments',
    'nav.calls': 'Active Calls',
    'dashboard.title': 'Admin Dashboard',
    'dashboard.totalDoctors': 'Total Doctors',
    'dashboard.totalPatients': 'Total Patients',
    'dashboard.todayAppointments': 'Today\'s Appointments',
    'dashboard.activeCalls': 'Active Calls',
    'doctors.title': 'Doctors Management',
    'doctors.name': 'Name',
    'doctors.specialty': 'Specialty',
    'doctors.status': 'Status',
    'doctors.patients': 'Patients',
    'doctors.rating': 'Rating',
    'doctors.online': 'Online',
    'doctors.offline': 'Offline',
    'doctors.busy': 'Busy',
    'patients.title': 'Patients Management',
    'patients.name': 'Name',
    'patients.age': 'Age',
    'patients.phone': 'Phone',
    'patients.lastVisit': 'Last Visit',
    'appointments.title': 'Schedule Appointment',
    'appointments.patient': 'Select Patient',
    'appointments.doctor': 'Select Doctor',
    'appointments.date': 'Date',
    'appointments.time': 'Time',
    'appointments.schedule': 'Schedule Appointment',
    'calls.title': 'Active Calls Management',
    'calls.doctor': 'Doctor',
    'calls.patient': 'Patient',
    'calls.duration': 'Duration',
    'calls.connect': 'Connect Patient',
    'calls.noActive': 'No active calls',
    'language.select': 'Select Language',
    'common.search': 'Search...',
    'common.actions': 'Actions',
    'common.view': 'View',
    'common.edit': 'Edit',
    'common.delete': 'Delete'
  },
  hi: {
    'app.title': 'चिकित्सा 365',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.doctors': 'डॉक्टर',
    'nav.patients': 'मरीज़',
    'nav.appointments': 'अपॉइंटमेंट',
    'nav.calls': 'सक्रिय कॉल',
    'dashboard.title': 'एडमिन डैशबोर्ड',
    'dashboard.totalDoctors': 'कुल डॉक्टर',
    'dashboard.totalPatients': 'कुल मरीज़',
    'dashboard.todayAppointments': 'आज के अपॉइंटमेंट',
    'dashboard.activeCalls': 'सक्रिय कॉल',
    'doctors.title': 'डॉक्टर प्रबंधन',
    'doctors.name': 'नाम',
    'doctors.specialty': 'विशेषता',
    'doctors.status': 'स्थिति',
    'doctors.patients': 'मरीज़',
    'doctors.rating': 'रेटिंग',
    'doctors.online': 'ऑनलाइन',
    'doctors.offline': 'ऑफलाइन',
    'doctors.busy': 'व्यस्त',
    'patients.title': 'मरीज़ प्रबंधन',
    'patients.name': 'नाम',
    'patients.age': 'उम्र',
    'patients.phone': 'फोन',
    'patients.lastVisit': 'अंतिम यात्रा',
    'appointments.title': 'अपॉइंटमेंट शेड्यूल करें',
    'appointments.patient': 'मरीज़ चुनें',
    'appointments.doctor': 'डॉक्टर चुनें',
    'appointments.date': 'तारीख',
    'appointments.time': 'समय',
    'appointments.schedule': 'अपॉइंटमेंट शेड्यूल करें',
    'calls.title': 'सक्रिय कॉल प्रबंधन',
    'calls.doctor': 'डॉक्टर',
    'calls.patient': 'मरीज़',
    'calls.duration': 'अवधि',
    'calls.connect': 'मरीज़ को जोड़ें',
    'calls.noActive': 'कोई सक्रिय कॉल नहीं',
    'language.select': 'भाषा चुनें',
    'common.search': 'खोजें...',
    'common.actions': 'कार्य',
    'common.view': 'देखें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं'
  },
  pa: {
    'app.title': 'ਚਿਕਿਤਸਾ 365',
    'nav.dashboard': 'ਡੈਸ਼ਬੋਰਡ',
    'nav.doctors': 'ਡਾਕਟਰ',
    'nav.patients': 'ਮਰੀਜ਼',
    'nav.appointments': 'ਮੁਲਾਕਾਤਾਂ',
    'nav.calls': 'ਸਰਗਰਮ ਕਾਲਾਂ',
    'dashboard.title': 'ਐਡਮਿਨ ਡੈਸ਼ਬੋਰਡ',
    'dashboard.totalDoctors': 'ਕੁੱਲ ਡਾਕਟਰ',
    'dashboard.totalPatients': 'ਕੁੱਲ ਮਰੀਜ਼',
    'dashboard.todayAppointments': 'ਅੱਜ ਦੀਆਂ ਮੁਲਾਕਾਤਾਂ',
    'dashboard.activeCalls': 'ਸਰਗਰਮ ਕਾਲਾਂ',
    'doctors.title': 'ਡਾਕਟਰ ਪ੍ਰਬੰਧਨ',
    'doctors.name': 'ਨਾਮ',
    'doctors.specialty': 'ਵਿਸ਼ੇਸ਼ਤਾ',
    'doctors.status': 'ਸਥਿਤੀ',
    'doctors.patients': 'ਮਰੀਜ਼',
    'doctors.rating': 'ਰੇਟਿੰਗ',
    'doctors.online': 'ਆਨਲਾਈਨ',
    'doctors.offline': 'ਆਫਲਾਈਨ',
    'doctors.busy': 'ਵਿਅਸਤ',
    'patients.title': 'ਮਰੀਜ਼ ਪ੍ਰਬੰਧਨ',
    'patients.name': 'ਨਾਮ',
    'patients.age': 'ਉਮਰ',
    'patients.phone': 'ਫੋਨ',
    'patients.lastVisit': 'ਅੰਤਿਮ ਮੁਲਾਕਾਤ',
    'appointments.title': 'ਮੁਲਾਕਾਤ ਤਿਆਰ ਕਰੋ',
    'appointments.patient': 'ਮਰੀਜ਼ ਚੁਣੋ',
    'appointments.doctor': 'ਡਾਕਟਰ ਚੁਣੋ',
    'appointments.date': 'ਤਾਰੀਖ',
    'appointments.time': 'ਸਮਾਂ',
    'appointments.schedule': 'ਮੁਲਾਕਾਤ ਤਿਆਰ ਕਰੋ',
    'calls.title': 'ਸਰਗਰਮ ਕਾਲਾਂ ਪ੍ਰਬੰਧਨ',
    'calls.doctor': 'ਡਾਕਟਰ',
    'calls.patient': 'ਮਰੀਜ਼',
    'calls.duration': 'ਅਵਧੀ',
    'calls.connect': 'ਮਰੀਜ਼ ਨੂੰ ਜੋੜੋ',
    'calls.noActive': 'ਕੋਈ ਸਰਗਰਮ ਕਾਲ ਨਹੀਂ',
    'language.select': 'ਭਾਸ਼ਾ ਚੁਣੋ',
    'common.search': 'ਖੋਜੋ...',
    'common.actions': 'ਕਾਰਵਾਈਆਂ',
    'common.view': 'ਦੇਖੋ',
    'common.edit': 'ਸੰਪਾਦਿਤ ਕਰੋ',
    'common.delete': 'ਮਿਟਾਓ'
  }
};

export const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useLanguageProvider = () => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return { language, setLanguage, t };
};