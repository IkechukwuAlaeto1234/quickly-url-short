import React from 'react';

const teamMembers = [
  { name: 'Alex Johnson', role: 'Founder & CEO', imageUrl: 'https://picsum.photos/seed/team1/400/400' },
  { name: 'Maria Garcia', role: 'Lead Engineer', imageUrl: 'https://picsum.photos/seed/team2/400/400' },
  { name: 'Sam Chen', role: 'Product Designer', imageUrl: 'https://picsum.photos/seed/team3/400/400' },
];

export const AboutPage: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-16">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">Simplifying the Way We Share</h1>
        <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">
          At Quickly, we believe that sharing a link should be simple, powerful, and insightful. We're on a mission to transform long, clunky URLs into short, memorable links that drive engagement and build brand recognition.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <img src="https://picsum.photos/seed/about/800/600" alt="Team working together" className="rounded-xl shadow-lg" />
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
          <p className="text-slate-600 mt-4">
            In a digital world cluttered with information, clarity is key. A clean, descriptive link is more than just a convenience; it's a statement of professionalism and a gesture of trust towards your audience. Our goal is to provide a tool that is not only functional but also intelligent, helping you create links that are not just shorter, but smarter.
          </p>
          <p className="text-slate-600 mt-4">
            We're dedicated to building a platform that empowers creators, marketers, and businesses of all sizes to share their content with confidence and measure its impact effectively.
          </p>
        </div>
      </div>
      
      {/* Team Section */}
      <div>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Meet the Team</h2>
            <p className="text-slate-500 mt-4 text-lg">
                The passionate individuals behind Quickly, dedicated to improving your link-sharing experience.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {teamMembers.map(member => (
                  <div key={member.name} className="bg-white p-8 rounded-xl shadow-sm text-center">
                      <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mx-auto shadow-md" />
                      <h3 className="text-xl font-bold text-slate-900 mt-6">{member.name}</h3>
                      <p className="text-blue-600 font-semibold mt-1">{member.role}</p>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};
