import React, { useState } from 'react';
import axios from 'axios';
import '../components/style/WorkoutForm.css';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';

function WorkoutForm() {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState(''); 
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // confirmation if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to add a workout');
      console.log(error)
      return;
    }

    try {
      const response = await axios.post('/workouts',{title,load,repeat}, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      navigate('/routine');

      console.log(response.data); 
      setError(null);
    // clear the form fields
      setTitle('');
      setLoad('');
      setRepeat('');
    } catch (error) {
      console.error(error);
      setError(error.response.data.error || 'An error occurred');
    }
  };
  return (
    <div className="form-container">
      <h2 style={{ color: '#e74c3c' }}>Add New Routine</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label><i className="fas fa-book"></i> Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label><i className="fas fa-weight"></i> Load (in kg):</label>
          <input
            type="number"
            id="load"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label><i className="fas fa-redo"></i> Repeat:</label>
          <input
            type="number"
            id="repeat"
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
            required
          />
        </div>
        <button type="submit"><i className="fas fa-check"></i> Add Routine</button>
      </form>
    </div>
  );
}

export default WorkoutForm;
