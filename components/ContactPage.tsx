import React from 'react';

export const ContactPage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your message! This is a demo form.');
    };

    return (
        <div className="animate-fade-in">
            <div className="text-center">
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">Get in Touch</h1>
                <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">
                    Have a question, feedback, or a partnership inquiry? We'd love to hear from you.
                </p>
            </div>

            <div className="mt-16 max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            className="w-full px-4 py-2 rounded-md bg-slate-100 border-2 border-transparent focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2 transition-colors"
                            placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            required
                            className="w-full px-4 py-2 rounded-md bg-slate-100 border-2 border-transparent focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2 transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-1">Message</label>
                        <textarea
                            id="message"
                            rows={5}
                            required
                            className="w-full px-4 py-2 rounded-md bg-slate-100 border-2 border-transparent focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2 transition-colors"
                            placeholder="How can we help?"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold px-6 py-3 rounded-md hover:bg-blue-700 transition-all duration-200"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};
