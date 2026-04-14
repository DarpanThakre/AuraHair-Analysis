import React, { useState } from 'react';
import QuestionnaireForm from './components/QuestionnaireForm';
import ResultsDashboard from './components/ResultsDashboard';
import { Sparkles, Activity } from 'lucide-react';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalysisComplete = (data) => {
    setAnalysisResult(data);
    setLoading(false);
  };

  const handleStartLoading = () => {
    setLoading(true);
  };

  const resetFlow = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between glass-card px-8 py-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={resetFlow}>
            <div className="bg-gradient-to-br from-accent-light to-accent p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-gray-800" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-500">
              AuraHair Analysis
            </h1>
          </div>
          <nav>
            <ul className="flex space-x-6 text-sm font-medium text-gray-600">
              <li className="hover:text-gray-900 cursor-pointer transition-colors" onClick={resetFlow}>Home</li>
              <li className="hover:text-gray-900 cursor-pointer transition-colors">How it Works</li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Area */}
      <main className="flex-grow p-6 flex flex-col items-center">
        <div className="w-full max-w-5xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center mt-20 space-y-6">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-accent-light border-t-transparent rounded-full animate-spin"></div>
                <Activity className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-gray-600 animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-gray-700">Analyzing your profile...</h2>
              <p className="text-gray-500">Our AI is running through millions of data points to generate your personalized kit.</p>
            </div>
          ) : !analysisResult ? (
            <QuestionnaireForm 
              onComplete={handleAnalysisComplete} 
              onStartLoading={handleStartLoading} 
            />
          ) : (
            <ResultsDashboard result={analysisResult} onReset={resetFlow} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        <p>© 2026 AuraHair Wellness. AI-driven personalized hair care.</p>
      </footer>
    </div>
  );
}

export default App;
