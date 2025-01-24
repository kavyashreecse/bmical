import React, { useState } from 'react';
import './App.css';

function App() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [dietAdvice, setDietAdvice] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [resultColor, setResultColor] = useState(''); 

  const calculateBMI = (e) => {
    e.preventDefault();

    const heightInMeters = parseFloat(height) / 100; 
    const weightInKg = parseFloat(weight);

    if (!heightInMeters || !weightInKg || heightInMeters <= 0 || weightInKg <= 0 || !age) {
      setBmi(null);
      setCategory('Please enter valid values for all fields.');
      setShowResult(false);
      setRecommendation('');
      setDietAdvice('');
      setResultColor('');
      return;
    }

    const calculatedBMI = (weightInKg / (heightInMeters ** 2)).toFixed(1);
    setBmi(calculatedBMI);

 
    let bmiCategory = '';
    let bmiColor = '';
    if (calculatedBMI < 18.5) {
      bmiCategory = 'Underweight';
      bmiColor = 'underweight';
      setRecommendation('You need to gain weight to reach a healthy BMI.');
      setDietAdvice('Increase your calorie intake with nutrient-dense foods like nuts, seeds, lean proteins, and healthy fats. Include more whole grains, dairy products, and starchy vegetables in your diet.');
    } else if (calculatedBMI >= 18.5 && calculatedBMI <= 24.9) {
      bmiCategory = 'Normal weight';
      bmiColor = 'normal-weight';
      setRecommendation('You are at a healthy weight. Maintain your current lifestyle!');
      setDietAdvice('Focus on a balanced diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats. Stay hydrated and exercise regularly to maintain your weight.');
    } else if (calculatedBMI >= 25 && calculatedBMI <= 29.9) {
      bmiCategory = 'Overweight';
      bmiColor = 'overweight';
      setRecommendation('You need to lose weight to reach a healthy BMI.');
      setDietAdvice('Adopt a calorie-controlled diet with plenty of vegetables, lean proteins, and low-fat dairy. Avoid sugary and processed foods. Incorporate regular physical activity such as walking, jogging, or swimming.');
    } else {
      bmiCategory = 'Obese';
      bmiColor = 'obese';
      setRecommendation('You need to significantly reduce your weight to reach a healthy BMI.');
      setDietAdvice('Follow a structured diet plan focusing on portion control, lean proteins, whole grains, and fiber-rich foods. Minimize consumption of high-calorie, high-sugar foods. Seek advice from a nutritionist or dietitian if needed.');
    }

    setCategory(bmiCategory);
    setResultColor(bmiColor);
    setShowResult(true);
  };

  const resetForm = () => {
    setAge('');
    setGender('Male');
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
    setRecommendation('');
    setDietAdvice('');
    setShowResult(false);
    setResultColor('');
  };

  const calculateWeightToLoseOrGain = () => {
    const heightInMeters = parseFloat(height) / 100; 
    const weightInKg = parseFloat(weight);

    if (category === 'Underweight') {
      const healthyWeightMin = 18.5 * (heightInMeters ** 2);
      const weightToGain = healthyWeightMin - weightInKg;
      return `You need to gain around ${weightToGain.toFixed(1)} kg to reach a healthy weight.`;
    } else if (category === 'Overweight' || category === 'Obese') {
      const healthyWeightMax = 24.9 * (heightInMeters ** 2); 
      const weightToLose = weightInKg - healthyWeightMax;
      return `You need to lose around ${weightToLose.toFixed(1)} kg to reach a healthy weight.`;
    } else {
      return 'No weight change needed. Maintain your current weight.';
    }
  };

  return (
    <div className="bmi-container">
      <h1>BMI Calculator</h1>
      <p>Calculate your Body Mass Index (BMI) and get actionable insights.</p>
      <form onSubmit={calculateBMI}>
        <div className="input-group">
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            required
          />
        </div>
        <div className="input-group">
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="input-group">
          <label>Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height in cm"
            required
          />
        </div>
        <div className="input-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight in kg"
            required
          />
        </div>

        <div className="bmi-category-info">
          <h3>BMI Categories</h3>
          <ul>
            <li className="underweight">Underweight: &lt; 18.5</li>
            <li className="normal-weight">Normal weight: 18.5 - 24.9</li>
            <li className="overweight">Overweight: 25 - 29.9</li>
            <li className="obese">Obese: &gt; 30</li>
          </ul>
        </div>

        <button type="submit">Calculate BMI</button>
        <button type="button" onClick={resetForm} className="reset-btn">
          Reset
        </button>
      </form>

      {showResult && (
        <div className={`result ${resultColor}`}>
          <h2>Your BMI: <span>{bmi}</span></h2>
          <p>You are classified as <strong>{category}</strong>.</p>
          <p>{recommendation}</p>
          <p><strong>Diet Advice:</strong> {dietAdvice}</p>
          <p>{calculateWeightToLoseOrGain()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
