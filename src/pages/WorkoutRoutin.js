import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Footer from '../components/footer';
import '@fortawesome/fontawesome-free/css/all.css';
import '../components/style/WorkoutRoutine.css'
import Login from '../pages/login';

function WorkoutRoutine(isLoggedIn) {
  const [workouts, setWorkouts] = useState([]);
  const [editingWorkout, setEditingWorkout] = useState(null); 
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedLoad, setUpdatedLoad] = useState('');
  const [updatedRepeat, setUpdatedRepeat] = useState('');

  useEffect(() => {
    async function fetchWorkouts() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/workouts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setWorkouts(response.data);
      } catch (error) { 
        console.error('Error fetching workouts:', error);
      }
    }

    fetchWorkouts();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token')
    try {
      await axios.delete(`/workouts/${id}`,{
        headers:{
          'Authorization' : `Bearer ${token}`
        }
      });
      setWorkouts(workouts.filter((workout) => workout._id !== id));
      console.log(token)
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  const handleEdit = (workout) => {
    setEditingWorkout(workout);
    setUpdatedTitle(workout.title);
    setUpdatedLoad(workout.load);
    setUpdatedRepeat(workout.repeat); 
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token')
    try {
      await axios.put(`/workouts/${editingWorkout._id}`, {title: updatedTitle,load: updatedLoad,repeat: updatedRepeat},
      {
        headers:{
          'Authorization' : `Bearer ${token} `
        }
      });
      const response = await axios.get('/workouts',{
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      });
      setWorkouts(response.data);
      setEditingWorkout(null);
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };
  

  return (
    <div className="container">
      <Navbar isLoggedIn={isLoggedIn} />
      {isLoggedIn ? (
        <>
          <h1 className="title">My Routines</h1>
          <div className="workout-list">
            {workouts.map((workout) => (
              <div key={workout._id} className="workout-card">
                {editingWorkout === workout ? (
                  <div>
                    <input
                      type="text"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                    <input
                      type="number"
                      value={updatedLoad}
                      onChange={(e) => setUpdatedLoad(e.target.value)}
                    />
                    <input
                      type="number"
                      value={updatedRepeat}
                      onChange={(e) => setUpdatedRepeat(e.target.value)}
                    />
                    <button onClick={handleUpdate}><i class="fas fa-save"></i>Update</button>
                  </div>
                ) : (
                  <div>
                    <h2 className="workout-title">{workout.title}</h2>
                    <p className="workout-info">Load (kg): {workout.load}</p>
                    <p className="workout-info">Repeat: {workout.repeat}</p>
                    <p className="workout-info">{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
                    <button onClick={() => handleDelete(workout._id)}><i class="fas fa-trash-alt"></i>Delete</button>
                    <button onClick={() => handleEdit(workout)}><i class="fas fa-edit"></i>Edit</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <Login />
      )}
      <Footer />
    </div>
  );
}

export default WorkoutRoutine;
