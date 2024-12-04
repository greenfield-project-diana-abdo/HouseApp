import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);

      // Generate a preview URL
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file!');
    }
  };

  const handleSave = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/save', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const savedImagePath = response.data.imagePath;

      // Navigate to the ViewImage page with the saved image path
      navigate(`/view-image/${encodeURIComponent(savedImagePath)}`);
    } catch (error) {
      console.error('Error saving the image:', error);
    }
  };

  return (
    <div className="m-3">

      <input type="file" onChange={handleFileChange} />

      <button 
        onClick={handleSave} 
        disabled={!selectedFile}
        className="btn btn-dark"
      >
        Save
      </button>

      {previewUrl && (
        <div>
          <h3>Image preview</h3>
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              width: '300px',
              marginTop: '10px',
              borderRadius: '10px',
              border: '1px solid #ccc',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
