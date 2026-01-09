import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactForm = ({ onContactAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'name':
                if (!value) error = 'Name is required';
                else if (value.length < 2) error = 'Name must be at least 2 characters';
                break;
            case 'email':
                if (!value) error = 'Email is required';
                else if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email format';
                break;
            case 'phone':
                if (!value) error = 'Phone is required';
                else if (!/^\d+$/.test(value)) error = 'Phone must be numeric';
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
    };

    useEffect(() => {
        const nameError = validateField('name', formData.name);
        const emailError = validateField('email', formData.email);
        const phoneError = validateField('phone', formData.phone);
        
        setIsFormValid(!nameError && !emailError && !phoneError && formData.name && formData.email && formData.phone);
    }, [formData]);

    const API_URL = import.meta.env.VITE_API_URL || '/api';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await axios.post(`${API_URL}/contacts`, formData);
            setStatus({ type: 'success', message: 'Contact saved successfully!' });
            setFormData({ name: '', email: '', phone: '', message: '' });
            if (onContactAdded) onContactAdded(response.data);
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.message || 'Failed to save contact' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass p-8 rounded-[2rem] shadow-2xl border border-white/20">
            <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">Add Contact</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                    <label className="block text-sm font-semibold text-blue-50 mb-1.5 ml-1 opacity-90">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-white/10 border-0 rounded-2xl p-3.5 text-white placeholder-white/40 focus:ring-2 focus:ring-white/50 transition-all duration-300 neumorphic-inset outline-none ${errors.name ? 'ring-2 ring-red-400/50' : ''}`}
                        placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-300 text-xs mt-1.5 ml-2 font-medium">{errors.name}</p>}
                </div>

                <div className="group">
                    <label className="block text-sm font-semibold text-blue-50 mb-1.5 ml-1 opacity-90">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-white/10 border-0 rounded-2xl p-3.5 text-white placeholder-white/40 focus:ring-2 focus:ring-white/50 transition-all duration-300 neumorphic-inset outline-none ${errors.email ? 'ring-2 ring-red-400/50' : ''}`}
                        placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-300 text-xs mt-1.5 ml-2 font-medium">{errors.email}</p>}
                </div>

                <div className="group">
                    <label className="block text-sm font-semibold text-blue-50 mb-1.5 ml-1 opacity-90">Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full bg-white/10 border-0 rounded-2xl p-3.5 text-white placeholder-white/40 focus:ring-2 focus:ring-white/50 transition-all duration-300 neumorphic-inset outline-none ${errors.phone ? 'ring-2 ring-red-400/50' : ''}`}
                        placeholder="+1 (234) 567-890"
                    />
                    {errors.phone && <p className="text-red-300 text-xs mt-1.5 ml-2 font-medium">{errors.phone}</p>}
                </div>

                <div className="group">
                    <label className="block text-sm font-semibold text-blue-50 mb-1.5 ml-1 opacity-90">Message (Optional)</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="3"
                        className="w-full bg-white/10 border-0 rounded-2xl p-3.5 text-white placeholder-white/40 focus:ring-2 focus:ring-white/50 transition-all duration-300 neumorphic-inset outline-none resize-none"
                        placeholder="Share your thoughts..."
                    ></textarea>
                </div>

                {status.message && (
                    <div className={`p-4 rounded-2xl backdrop-blur-md animate-float ${status.type === 'success' ? 'bg-green-400/20 text-green-100 border border-green-400/30' : 'bg-red-400/20 text-red-100 border border-red-400/30'}`}>
                        <div className="flex items-center space-x-2">
                            <span className="text-lg">{status.type === 'success' ? '✨' : '⚠️'}</span>
                            <span className="font-medium">{status.message}</span>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className={`shiny-button w-full py-4 px-6 rounded-2xl text-lg font-bold text-white shadow-xl transition-all duration-300 transform active:scale-95 ${!isFormValid || loading ? 'bg-white/10 cursor-not-allowed opacity-50' : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-indigo-500/40 hover:-translate-y-1'}`}
                >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Processing...</span>
                            </>
                        ) : 'Save Contact'}
                    </span>
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
