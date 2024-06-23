import React, { useEffect, useState } from 'react';
import axios from 'axios';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import '../components/style/WorkoutGalley.css'
import '@fortawesome/fontawesome-free/css/all.css';

function WorkoutGallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const accessKey = 'ZtTH4Bwh-VOjKh_l2OuAXPxyfBcg-hBVzNSZe6KQwUE';
    const apiUrl = 'https://api.unsplash.com/search/photos/';

    const searchQuery = 'workout';
  
    axios.get(apiUrl, {
      params: {
        query: searchQuery,
        client_id: accessKey
      }
    })
    .then(response => {
      const photos = response.data.results;
      setPhotos(photos);
     /* console.log(photos)*/
    })
    .catch(error => {
      console.error('Error fetching photos:', error);
    });
  }, []);
  return (
        <div className="photos-section">
      <h1 className="section-title">Posts</h1>
      <div className="photos-container">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.urls.small} alt={photo.alt_description} className="photo-img" />
            <div className="photo-details">
              <p className="photo-created-at">{formatDistanceToNow((photo.created_at),{ addSuffix: true })}</p>
              <p className="photo-description">{photo.description}</p>
              <div className="photo-user-info">
                <p className="photo-likes"> <i class="fas fa-heart"></i>{photo.likes}</p>
                <p className="photo-username">Uploaded by: {photo.user.name}</p>
                <p className="photo-location">Location: {photo.user.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
  
}

export default WorkoutGallery;
