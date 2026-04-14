import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import { ChevronRight, ChevronLeft, Send } from 'lucide-react';
import axios from 'axios';

const QuestionnaireForm = ({ onComplete, onStartLoading }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    hair_type: 'Straight',
    hair_problems: '',
    scalp_condition: 'Normal',
    lifestyle_diet: 'Balanced',
    lifestyle_stress: 'Medium',
    lifestyle_sleep: '6-8 hours',
    budget_range: 'Medium'
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    onStartLoading();
    
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      if (imageFile) {
        data.append('image', imageFile);
      }

      const response = await axios.post('http://127.0.0.1:5000/api/submit-data', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      onComplete(response.data);
    } catch (error) {
      console.error(error);
      alert("Error submitting data. Ensure backend is running.");
      onComplete(null); // Return to form
    }
  };

  return (
    <div className="glass-card max-w-2xl mx-auto overflow-hidden">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2">
        <div 
          className="bg-gradient-to-r from-accent-light to-accent h-2 transition-all duration-300"
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>

      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Let's analyze your hair</h2>
        
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-700">Basic Information</h3>
              <div>
                <label className="label-text">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="Enter your name" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-text">Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} className="input-field" placeholder="E.g. 25" required />
                </div>
                <div>
                  <label className="label-text">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="input-field">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Hair Profile */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-700">Hair & Scalp Profile</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-text">Hair Type</label>
                  <select name="hair_type" value={formData.hair_type} onChange={handleChange} className="input-field">
                    <option value="Straight">Straight</option>
                    <option value="Wavy">Wavy</option>
                    <option value="Curly">Curly</option>
                    <option value="Coily">Coily</option>
                  </select>
                </div>
                <div>
                  <label className="label-text">Scalp Condition</label>
                  <select name="scalp_condition" value={formData.scalp_condition} onChange={handleChange} className="input-field">
                    <option value="Normal">Normal</option>
                    <option value="Oily">Oily</option>
                    <option value="Dry">Dry / Flaky</option>
                    <option value="Sensitive">Sensitive / Irritated</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label-text">Main Hair Problems</label>
                <textarea 
                  name="hair_problems" 
                  value={formData.hair_problems} 
                  onChange={handleChange} 
                  className="input-field h-24" 
                  placeholder="E.g., severe hair fall, thinning at crown, dandruff, split ends..."
                />
              </div>
            </div>
          )}

          {/* Step 3: Lifestyle & Budget */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-700">Lifestyle & Budget</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="label-text">Diet</label>
                  <select name="lifestyle_diet" value={formData.lifestyle_diet} onChange={handleChange} className="input-field">
                    <option value="Balanced">Balanced</option>
                    <option value="High Protein">High Protein</option>
                    <option value="Vegan/Vegetarian">Vegan / Vegetarian</option>
                    <option value="Fast Food Heavy">Fast Food Heavy</option>
                  </select>
                </div>
                <div>
                  <label className="label-text">Stress Level</label>
                  <select name="lifestyle_stress" value={formData.lifestyle_stress} onChange={handleChange} className="input-field">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="label-text">Sleep</label>
                  <select name="lifestyle_sleep" value={formData.lifestyle_sleep} onChange={handleChange} className="input-field">
                    <option value="< 5 hours">&lt; 5 hours</option>
                    <option value="5-6 hours">5-6 hours</option>
                    <option value="6-8 hours">6-8 hours</option>
                    <option value="> 8 hours">&gt; 8 hours</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="label-text">Monthly Budget Range</label>
                <div className="flex gap-4">
                  {['Low', 'Medium', 'High'].map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, budget_range: level }))}
                      className={`flex-1 py-3 rounded-xl border-2 transition-all font-semibold ${
                        formData.budget_range === level 
                          ? 'border-accent bg-accent/20 text-gray-900' 
                          : 'border-gray-200 text-gray-500 hover:border-accent-light hover:bg-gray-50'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Image Upload */}
          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-700">Final Step: AI Visual Analysis</h3>
              <ImageUpload onImageSelected={(file) => setImageFile(file)} />
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-10 pt-4 border-t border-gray-100">
            {step > 1 ? (
              <button type="button" onClick={prevStep} className="btn-outline">
                <ChevronLeft className="w-5 h-5 mr-1" /> Back
              </button>
            ) : <div></div>}

            {step < 4 ? (
              <button type="button" onClick={nextStep} className="btn-primary">
                Continue <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} className="btn-primary">
                Analyze Matches <Send className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default QuestionnaireForm;
