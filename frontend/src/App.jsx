import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || '/api';

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/contacts`);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleContactAdded = (newContact) => {
    setContacts([newContact, ...contacts]);
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/30 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/30 blur-[120px] animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">Management</span>
          </h1>
          <p className="text-blue-100 text-lg font-medium opacity-80">
            A premium experience for managing your connections
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 xl:col-span-4 sticky top-8">
            <ContactForm onContactAdded={handleContactAdded} />
          </div>
          <div className="lg:col-span-7 xl:col-span-8">
            {loading ? (
              <div className="flex justify-center items-center h-64 glass rounded-3xl">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-2 w-2 bg-white rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>
            ) : (
              <ContactList 
                contacts={contacts} 
                setContacts={setContacts} 
                fetchContacts={fetchContacts} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
