import React from 'react';
import { useParams } from 'react-router-dom';

const ViewImage = () => {
  const { imagePath } = useParams(); // Extract the image path from the URL

  return (
    <div>
      <h1>Saved Image</h1>
      <img
        src={`http://localhost:5000${decodeURIComponent(imagePath)}`}
        alt="Saved"
        style={{
          width: '300px',
          marginTop: '10px',
          borderRadius: '10px',
          border: '1px solid #ccc',
        }}
      />
    </div>
  );
};

export default ViewImage;
