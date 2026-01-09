import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactList = ({ contacts, setContacts, fetchContacts }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_URL = import.meta.env.VITE_API_URL || '/api';

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this contact?')) return;
        
        try {
            await axios.delete(`${API_URL}/contacts/${id}`);
            setContacts(contacts.filter(contact => contact._id !== id));
        } catch (error) {
            alert('Failed to delete contact');
        }
    };

    if (loading) return <div className="text-center py-4">Loading contacts...</div>;
    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

    return (
        <div className="glass p-8 rounded-[2rem] shadow-2xl border border-white/20 min-h-[400px]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                <h2 className="text-3xl font-bold text-white tracking-tight">Connections</h2>
                <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md">
                    <span className="text-blue-100 font-semibold">{contacts.length} Total</span>
                </div>
            </div>

            {contacts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="text-5xl mb-4 opacity-40">📭</div>
                    <p className="text-white/60 font-medium text-lg italic">Your contact list is waiting for its first entry...</p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-white/10">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-white/10">
                            <thead>
                                <tr className="bg-white/5">
                                    <th className="px-6 py-4 text-left text-xs font-bold text-blue-100 uppercase tracking-widest">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-blue-100 uppercase tracking-widest">Email</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-blue-100 uppercase tracking-widest">Phone</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-blue-100 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 bg-transparent">
                                {[...contacts].sort((a, b) => a.name.localeCompare(b.name)).map((contact) => (
                                    <tr key={contact._id} className="hover:bg-white/5 transition-colors duration-200 group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg mr-3 group-hover:scale-110 transition-transform duration-300">
                                                    {contact.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="text-sm font-semibold text-white">{contact.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100/80">{contact.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100/80">{contact.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleDelete(contact._id)}
                                                className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 border border-red-500/20 active:scale-95 font-bold"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactList;
