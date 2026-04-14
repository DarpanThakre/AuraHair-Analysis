import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle, X } from 'lucide-react';

const ImageUpload = ({ onImageSelected }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(file));
        onImageSelected(file);
      } else {
        alert("Please upload a valid image file.");
      }
    }
  };

  const handleClear = () => {
    setPreview(null);
    onImageSelected(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full mt-4">
      <label className="label-text">Upload a clear picture of your scalp/hair base (Crucial for AI Analysis)</label>
      
      {!preview ? (
        <div 
          onClick={() => fileInputRef.current.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-accent hover:bg-white/50 transition-all"
        >
          <UploadCloud className="w-12 h-12 text-gray-400 mb-3" />
          <p className="text-gray-600 font-medium">Click to upload</p>
          <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 5MB</p>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-gray-200">
          <img src={preview} alt="Scalp preview" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button 
              onClick={(e) => { e.stopPropagation(); handleClear(); }}
              className="bg-white text-red-500 p-2 rounded-full absolute top-2 right-2 hover:bg-red-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center text-white">
              <CheckCircle className="w-8 h-8 mb-2 text-green-400" />
              <span className="font-semibold">Image Selected</span>
            </div>
          </div>
        </div>
      )}
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
};

export default ImageUpload;
