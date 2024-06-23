import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/style/MoreAboutWorkout.css'



function MoreAboutWorkout() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
        params: { muscle: 'biceps' },
        headers: {
          'X-RapidAPI-Key': 'cdd55f2df6msh1337361e79a64f1p1b12c6jsn48d27f4e316a',
          'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        /*console.log(response)*/
        setExercises(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <div className="container">
      <h1 className="title">Exercises for Biceps</h1>
      <div className="exercise-list">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="exercise-card">
            <h2 className="exercise-name">{exercise.name}</h2>
            <p className="exercise-difficulty">Difficulty: {exercise.difficulty}</p>
            <p className="exercise-equipment">Equipment: {exercise.equipment}</p>
            <p className="exercise-instructions"> {exercise.instructions}</p>
            <p className="exercise-type">Type: {exercise.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoreAboutWorkout;



/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/style/Home.css';

function Home() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    async function fetchExercises() {
      try {
        const response = await axios.get('EXERCISES_API_URL_HERE');
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    }

    fetchExercises();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Exercises for Biceps</h1>
      <div className="exercise-list">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="exercise-card">
            <h2 className="exercise-name">{exercise.name}</h2>
            <p className="exercise-difficulty">Difficulty: {exercise.difficulty}</p>
            <p className="exercise-equipment">Equipment: {exercise.equipment}</p>
            <p className="exercise-instructions">Instructions: {exercise.instructions}</p>
            <p className="exercise-type">Type: {exercise.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;*/



