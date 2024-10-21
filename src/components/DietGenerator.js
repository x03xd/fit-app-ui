import { useState, useEffect } from 'react';
import '../styles/DietGenerator.css';
import { baseDiet, parsedCookies } from '../consts.js';


export default function DietGenerator() {
  const [calorieIntake, setCalorieIntake] = useState('');
  const [dietType, setDietType] = useState('balanced');
  const [diet, setDiet] = useState(null);
  const [error, setError] = useState('');

  const generateDiet = () => {
    const calories = parseInt(calorieIntake, 10);

    if (isNaN(calories) || calories <= 0) {
      setError('Please enter a positive number for calorie intake.');
      return;
    } else {
      setError('');
    }

    const dietPlan = baseDiet[dietType];
    if (!dietPlan) return;

    const adjustedIngredients = Object.fromEntries(
      Object.entries(dietPlan.ingredients).map(([ingredient, { grams, protein, fat, carbs }]) => {
        const adjustedGrams = (grams / 2000) * calories;
        const adjustedNutrients = {
          protein: ((protein * adjustedGrams) / grams).toFixed(2),
          fat: ((fat * adjustedGrams) / grams).toFixed(2),
          carbs: ((carbs * adjustedGrams) / grams).toFixed(2),
        };
        return [ingredient, { grams: adjustedGrams.toFixed(2), ...adjustedNutrients }];
      })
    );

    const adjustedDiet = {
      ingredients: adjustedIngredients,
      meals: dietPlan.meals,
      totalCalories: calories,
    };

    setDiet(adjustedDiet);
  };

  useEffect(() => {
    if (diet) {
      saveDiet();
    }
  }, [diet]);
  
  const saveDiet = async () =>  {
      try {
          const response = await fetch(`${process.env.REACT_APP_API_URL || 'localhost:8000/api'}/save-diet/${parsedCookies.username}/`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(diet),
          });
          const data = await response.json();
          if (response.ok) {
              alert('Your diet has been saved');
          } else {
              alert('Error: ', data.msg);
          }
      } catch (error) {
          alert('An error occurred while saving the diet.');
      }
  };

  return (
    <div className="diet-generator">
      <h2>Generate Your Diet Plan</h2>
      <input
        type="number"
        placeholder="Enter desired calorie intake (e.g., 2000)"
        value={calorieIntake}
        onChange={(e) => setCalorieIntake(e.target.value)}
      />
      <select value={dietType} onChange={(e) => setDietType(e.target.value)}>
        <option value="highProtein">High Protein</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="keto">Keto</option>
        <option value="lazy">Lazy</option>
        <option value="balanced">Balanced</option>
        <option value="paleo">Paleo</option>
        <option value="mediterranean">Mediterranean</option>
      </select>
      <button className="nav-button" onClick={generateDiet}>Generate & Save Diet</button>
      {error && <p className="error">{error}</p>}
      {diet && (
        <div className="diet-plan">
          <h3>Your Diet Plan:</h3>
          <p><strong>Meals:</strong></p>
          <ul>
            {Object.entries(diet.meals).map(([meal, description]) => (
              <li key={meal}>
                <strong>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</strong> {description}
              </li>
            ))}
          </ul>
          <p><strong>Ingredients (grams):</strong></p>
          <ul>
            {Object.entries(diet.ingredients).map(([ingredient, { grams, protein, fat, carbs }]) => (
              <li key={ingredient}>
                {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}: {grams}g - Protein: {protein}g, Fat: {fat}g, Carbs: {carbs}g
              </li>
            ))}
          </ul>
          <p><strong>Total Calories:</strong> {diet.totalCalories} kcal</p>
        </div>
      )}
      <p className="api-info">You can access the diet information at <strong>/api/show-diet/{parsedCookies.username}/</strong>.</p>
    </div>
  );
}
