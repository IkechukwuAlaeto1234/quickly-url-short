import React from 'react';
import { PricingPlan } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { View } from '../App';

const plans: PricingPlan[] = [
    {
        name: 'Free',
        price: '$0',
        period: '/ month',
        description: 'For personal use and trying out our core features.',
        features: ['100 links per month', 'Intelligent slug generation', 'Basic analytics', 'Email support'],
        isFeatured: false,
    },
    {
        name: 'Pro',
        price: '$15',
        period: '/ month',
        description: 'For power users and small businesses who need more.',
        features: ['1,000 links per month', 'Custom domains (coming soon)', 'Detailed analytics', 'Priority email support'],
        isFeatured: true,
    },
    {
        name: 'Business',
        price: '$49',
        period: '/ month',
        description: 'For teams and companies that require advanced features.',
        features: ['10,000 links per month', 'Team collaboration', 'API access', 'Dedicated support'],
        isFeatured: false,
    },
];

interface PricingSectionProps {
    handleSetView: (view: View) => void;
}


export const PricingSection: React.FC<PricingSectionProps> = ({ handleSetView }) => {
    return (
        <section className="my-24 sm:my-32">
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Simple, Transparent Pricing</h2>
                <p className="text-slate-500 mt-4 text-lg">
                    Choose the plan that's right for you. No hidden fees.
                </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto items-start">
                {plans.map((plan) => (
                    <div key={plan.name} className={`bg-white rounded-xl p-8 border ${plan.isFeatured ? 'border-blue-500 shadow-2xl relative' : 'border-slate-200 shadow-lg'}`}>
                        {plan.isFeatured && <span className="absolute top-0 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full left-1/2 -translate-x-1/2">MOST POPULAR</span>}
                        <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                        <p className="text-slate-500 mt-2 text-sm">{plan.description}</p>
                        <div className="mt-6">
                            <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                            <span className="text-slate-500 font-medium">{plan.period}</span>
                        </div>
                        <button className={`w-full mt-6 py-3 font-bold rounded-md transition-colors ${plan.isFeatured ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'}`}>
                            Get Started
                        </button>
                        <ul className="mt-8 space-y-3 text-slate-600">
                            {plan.features.map(feature => (
                                <li key={feature} className="flex items-center gap-3">
                                    <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};