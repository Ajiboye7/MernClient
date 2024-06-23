
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from '../src/pages/Home';
import CreateWorkout from './pages/WorkoutForm';
import WorkoutRoutine from '../src/pages/WorkoutRoutin';
import WorkoutGallery from './components/WorkoutGallery';
import Login from '../src/pages/login';
import Signup from '../src/pages/Signup';

function App() {
  const [token, setToken] = useState(null);
  

  return (
    <div className="App">
      <Router>
        <Routes>
          {!token && (
            <>
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/signup" element={<Signup setToken={setToken} />} />
            </>
          )}
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateWorkout /> } />
          <Route path="/routine" element={<WorkoutRoutine />} />
          <Route path="/gallery" element={ <WorkoutGallery />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
