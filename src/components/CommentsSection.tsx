import React from 'react';

const mockComments = [
    {
        id: 1,
        author: 'John Smith',
        avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
        date: '2 days ago',
        text: 'This is a fantastic breakdown! The point about memorable URLs being like a digital handshake really resonates. It\'s something so simple but so often overlooked.'
    },
    {
        id: 2,
        author: 'Emily White',
        avatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
        date: '1 day ago',
        text: 'Great insights! I\'ve started using Quickly for my marketing campaigns, and the custom slugs have definitely improved our click-through rates. Keep up the great content!'
    }
];


export const CommentsSection: React.FC = () => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your comment! This is a demo form.');
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="mt-16 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{mockComments.length} Comments</h2>

            {/* Comment Form */}
            <div className="bg-slate-100 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-bold text-slate-800 mb-3">Leave a Reply</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <textarea
                            rows={4}
                            required
                            className="w-full px-4 py-2 rounded-md border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2 transition-colors"
                            placeholder="Write your comment here..."
                        ></textarea>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            required
                            className="flex-1 w-full px-4 py-2 rounded-md border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2 transition-colors"
                            placeholder="Your Name"
                        />
                        <input
                            type="email"
                            required
                            className="flex-1 w-full px-4 py-2 rounded-md border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2 transition-colors"
                            placeholder="Your Email"
                        />
                    </div>
                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-bold px-6 py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
                        >
                            Post Comment
                        </button>
                    </div>
                </form>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                {mockComments.map(comment => (
                    <div key={comment.id} className="flex gap-4">
                        <img src={comment.avatarUrl} alt={comment.author} className="w-12 h-12 rounded-full flex-shrink-0" />
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <h4 className="font-bold text-slate-800">{comment.author}</h4>
                                <span className="text-xs text-slate-400">{comment.date}</span>
                            </div>
                            <p className="text-slate-600 mt-1">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};