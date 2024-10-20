import { useState } from 'react';
import '../styles/Calculator.css';

export default function Calculator() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [calories, setCalories] = useState(null);
  const [activityLevel, setActivityLevel] = useState('normal'); 
  const [error, setError] = useState('');

  const activityFactors = {
    lazy: 1.2,
    normal: 1.375,
    active: 1.55,
    veryActive: 1.725,
    superActive: 1.9,
  };

  const calculateCalories = () => {
    setError('');

    if (!age || !weight || !height) {
      setError('Please fill in all fields.');
      setCalories(null); 
      return;
    }

    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    const totalCalories = bmr * activityFactors[activityLevel];
    setCalories(totalCalories);
  };

  return (
    <div className="calorie-calculator">
      <h2>Calorie Calculator</h2>
      <div className="input-group">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="gender">Gender:</label>
        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="weight">Weight (kg):</label>
        <input
          type="number"
          id="weight"
          placeholder="Enter your weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="height">Height (cm):</label>
        <input
          type="number"
          id="height"
          placeholder="Enter your height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="activity-level">Activity Level:</label>
        <select id="activity-level" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
          <option value="lazy">Lazy (little or no exercise)</option>
          <option value="normal">Normal (light exercise/sports 1-3 days/week)</option>
          <option value="active">Active (moderate exercise/sports 3-5 days/week)</option>
          <option value="veryActive">Very Active (hard exercise/sports 6-7 days a week)</option>
          <option value="superActive">Super Active (very hard exercise/sports and a physical job)</option>
        </select>
      </div>
      <button className="calculate-button" onClick={calculateCalories}>Calculate</button>
      <p className={`result ${calories !== null ? 'visible' : ''}`}>
        {calories !== null 
          ? `Your daily calorie intake should be: ${calories.toFixed(2)} kcal` 
          : error || "Please calculate your calories."
        }
      </p>
    </div>
  );
}
