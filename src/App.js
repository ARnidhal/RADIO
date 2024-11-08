import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Videos from './Pages/Videos';
import Live from './Pages/Live';
import Services from './Pages/Services';
import About from './Pages/About';
import Footer from './components/Footer';
import './App.css';
import './components/Footer.css'; 

const API_KEY = 'AIzaSyBK8I-zGDspMBZDJVbvrRq-gEfN0QKgHkQ'; // Replace with your actual API key
const CHANNEL_ID = 'UCCjm3IVRTaXY4GqS8YHAGhQ'; // Replace with your actual channel ID

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('all');
  const [liveVideo, setLiveVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('date'); // Can be 'date' or 'title'

  useEffect(() => {
    const initialize = async () => {
      const fetchedPlaylists = await fetchPlaylists();
      setPlaylists(fetchedPlaylists);

      const fetchedVideos = await fetchAllVideos();
      setVideos(fetchedVideos);
      setSelectedVideo(fetchedVideos[0]);

      fetchVideos(); // Ensure this is called to set liveVideo
    };

    initialize();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,contentDetails&maxResults=50`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return [];
    }
  };

  const fetchAllVideos = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=50`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Error fetching all videos:', error);
      return [];
    }
  };

  const fetchPlaylistVideos = async (playlistId) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${playlistId}&part=snippet&maxResults=50`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Error fetching playlist videos:', error);
      return [];
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const videoItems = data.items || [];
      setVideos(videoItems);

      // If selectedVideo is not defined, set the first video found
      if (!selectedVideo && videoItems.length > 0) {
        setSelectedVideo(videoItems[0]);
      }

      // Find and set the live video
      const live = videoItems.find(video => video.snippet.liveBroadcastContent === 'live');
      setLiveVideo(live);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handlePlaylistSelect = async (playlistId) => {
    if (playlistId === 'all') {
      const fetchedVideos = await fetchAllVideos();
      setVideos(fetchedVideos);
      setSelectedVideo(fetchedVideos[0]);
    } else {
      const fetchedVideos = await fetchPlaylistVideos(playlistId);
      setVideos(fetchedVideos);
      setSelectedVideo(fetchedVideos[0]);
    }
    setSelectedPlaylist(playlistId);
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  // Filter and sort the videos
  const filteredVideos = videos.filter(video => 
    video.snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedVideos = filteredVideos.sort((a, b) => {
    if (sortOrder === 'date') {
      return new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt);
    } else if (sortOrder === 'title') {
      return a.snippet.title.localeCompare(b.snippet.title);
    }
    return 0;
  });

  return (
    <Router>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={
            <Videos 
              videos={sortedVideos} 
              selectedVideo={selectedVideo} 
              onVideoSelect={handleVideoSelect} 
              playlists={playlists}
              onPlaylistSelect={handlePlaylistSelect}
              selectedPlaylist={selectedPlaylist}
              onSearch={handleSearch}
              onSort={handleSort}
              searchTerm={searchTerm}
              sortOrder={sortOrder}
            />} 
          />
          <Route path="/live" element={<Live liveVideo={liveVideo} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
