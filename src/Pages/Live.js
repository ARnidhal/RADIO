// src/pages/Live.js
import React from 'react';

const Live = ({ liveVideo }) => {
  return (
    <div className="live-page">
      {liveVideo ? (
        <div className="live-video">
          <h2>{liveVideo.snippet.title}</h2>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${liveVideo.id.videoId}`}
           
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Live Video"
          ></iframe>
        </div>
      ) : (
        <p>Il n'y a pas de live pour le moment.</p>
      )}
    </div>
  );
};

export default Live;
