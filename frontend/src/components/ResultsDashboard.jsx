import React from 'react';
import { ArrowLeft, ExternalLink, ShieldCheck, Zap, Droplets, Leaf, Sparkles, Activity } from 'lucide-react';

const ResultsDashboard = ({ result, onReset }) => {
  if (!result) return null;
  const { analysis, recommendations } = result;

  const renderIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'shampoo': return <Droplets className="w-5 h-5 text-blue-500" />;
      case 'conditioner': return <ShieldCheck className="w-5 h-5 text-purple-500" />;
      case 'oil': return <Leaf className="w-5 h-5 text-green-500" />;
      case 'serum': return <Zap className="w-5 h-5 text-yellow-500" />;
      default: return <Sparkles className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="w-full space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between glass-card p-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Your Personalized Hair Report</h2>
          <p className="text-gray-500 mt-1">Based on our AI visual analysis and your profile.</p>
        </div>
        <button onClick={onReset} className="mt-4 md:mt-0 btn-outline text-sm py-2 px-4 whitespace-nowrap">
          <ArrowLeft className="w-4 h-4 mr-2" /> Start Over
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Analysis Results */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 border-l-4 border-accent">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-accent" />
              AI Diagnostics
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Hair Fall Stage</span>
                <span className="font-semibold text-red-500">{analysis.hair_fall_stage}</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Hair Density</span>
                <span className="font-semibold text-gray-800">{analysis.hair_density}</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Scalp Health</span>
                <span className="font-semibold text-gray-800">{analysis.scalp_health}</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Dandruff Level</span>
                <span className="font-semibold text-gray-800">{analysis.dandruff_level}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Damage/Split Ends</span>
                <span className="font-semibold text-gray-800">{analysis.damage_level}</span>
              </li>
            </ul>
          </div>

          {/* Tips */}
          <div className="glass-card p-6 bg-gradient-to-br from-green-50 to-white">
            <h3 className="font-bold text-gray-800 mb-2">💡 Quick Tips</h3>
            <div className="space-y-4 mt-4">
              <div>
                <span className="text-xs font-bold text-green-600 uppercase">Do's</span>
                <ul className="text-sm text-gray-600 list-disc pl-5 mt-1">
                  {recommendations.tips.dos.map((t, idx) => <li key={idx}>{t}</li>)}
                </ul>
              </div>
              <div>
                <span className="text-xs font-bold text-red-600 uppercase">Don'ts</span>
                <ul className="text-sm text-gray-600 list-disc pl-5 mt-1">
                  {recommendations.tips.donts.map((t, idx) => <li key={idx}>{t}</li>)}
                </ul>
              </div>
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase">Diet</span>
                <ul className="text-sm text-gray-600 list-disc pl-5 mt-1">
                  {recommendations.tips.diet.map((t, idx) => <li key={idx}>{t}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Product Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-accent inline-block pb-1">Recommended Kit</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {recommendations.products.map((product, idx) => (
                <div key={idx} className="p-5 border border-gray-100 rounded-xl hover:shadow-xl hover:border-accent-light bg-white transition-all relative group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                        {renderIcon(product.category)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{product.name}</h4>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{product.brand}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 h-10">{product.reason}</p>
                  </div>
                  
                  <div className="flex justify-between items-end mt-4">
                    <div>
                      <span className="block text-2xl font-black text-gray-800">{product.price}</span>
                      <span className="text-xs text-yellow-500 font-bold">★ {product.rating}/10</span>
                    </div>
                    <a href={product.link} target="_blank" rel="noopener noreferrer" className="btn-primary py-2 px-4 shadow text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Buy
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
             <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-accent inline-block pb-1 mb-6">Your Routine</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="p-6 rounded-xl bg-gradient-to-tr from-blue-50 to-white border border-blue-100">
                 <h4 className="font-bold text-blue-800 mb-3 flex items-center">
                    Daily Routine
                 </h4>
                 <ul className="space-y-3">
                   {recommendations.routine.daily.map((task, idx) => (
                     <li key={idx} className="flex items-start text-sm text-gray-700">
                       <span className="text-blue-400 mr-2 flex-shrink-0">✓</span> <span>{task}</span>
                     </li>
                   ))}
                 </ul>
               </div>
               <div className="p-6 rounded-xl bg-gradient-to-tr from-purple-50 to-white border border-purple-100">
                 <h4 className="font-bold text-purple-800 mb-3 flex items-center">
                    Weekly Routine
                 </h4>
                 <ul className="space-y-3">
                   {recommendations.routine.weekly.map((task, idx) => (
                     <li key={idx} className="flex items-start text-sm text-gray-700">
                       <span className="text-purple-400 mr-2 flex-shrink-0">✓</span> <span>{task}</span>
                     </li>
                   ))}
                 </ul>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
