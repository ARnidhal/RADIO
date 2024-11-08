import React from 'react';
import './Videos.css'; // Assurez-vous d'importer le fichier CSS

const Videos = ({ videos, selectedVideo, onVideoSelect, playlists, onPlaylistSelect, selectedPlaylist, onSearch, onSort, searchTerm, sortOrder }) => {
  return (
    <div className="container">
      <div className="left-panel">
        {selectedVideo ? (
          <div className="video-player-container">
            <iframe
              className="video-iframe"
              src={`https://www.youtube.com/embed/${selectedVideo.snippet.resourceId?.videoId || selectedVideo.id?.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Selected Video"
            ></iframe>
            <h2 className="video-title">{selectedVideo.snippet.title}</h2>
          </div>
          
        ) : (
          <p>No video selected</p>
        )}
      </div>
      <div className="right-panel">
        <h2>Playlists</h2>
        
        <select onChange={(e) => onPlaylistSelect(e.target.value)} value={selectedPlaylist || ''}>
          <option value="all">toutes les vidéos</option>
          {playlists.map((playlist) => (
            <option key={playlist.id} value={playlist.id}>
              {playlist.snippet.title}
            </option>
          ))}
        </select>
        
        <h2>Recherche</h2>
        <input type="text" value={searchTerm} onChange={(e) => onSearch(e.target.value)} placeholder="chercher les vidéos par titre..." />
       
        <h2>Trier par</h2>
        <select onChange={(e) => onSort(e.target.value)} value={sortOrder}>
          <option value="date">Date</option>
          <option value="title">Titre</option>
        </select>

        <div className="video-list">
          <h2>Videos</h2>
          {videos.map((video, index) => (
            <div key={index} className="video-item" onClick={() => onVideoSelect(video)}>
              <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
              <p>{video.snippet.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;
