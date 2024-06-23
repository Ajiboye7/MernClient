
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import WorkoutGallery from '../components/WorkoutGallery';
import MoreAboutWorkout from '../components/MoreAboutWorkout';
import Footer from '../components/footer';
import Login from '../pages/login';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="container">
      <Navbar  isLoggedIn={isLoggedIn}/>
      {isLoggedIn ? (
        <div>
          <WorkoutGallery />
          <MoreAboutWorkout />
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Home;

