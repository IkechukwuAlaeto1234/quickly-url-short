import React from 'react';
import { PricingSection } from './PricingSection';
import { View } from '../App';

export const PricingPage: React.FC = () => {
    // A dummy function for the component since this page doesn't navigate
    const handleSetView = (view: View) => {
        console.log(`Navigate to ${view}`);
    }
  return (
    <div className="animate-fade-in">
       <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">Find the Perfect Plan</h1>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">
                Whether you're just starting out or running a full-scale enterprise, we have a plan that fits your needs.
            </p>
        </div>

        <div className="mt-12">
            <PricingSection handleSetView={handleSetView} />
        </div>
    </div>
  );
};