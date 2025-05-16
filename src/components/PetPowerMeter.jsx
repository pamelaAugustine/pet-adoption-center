import React from 'react';

// PetPowerMeter component calculates a pet's power level and displays it using a render prop or a 
//default render function
export const PetPowerMeter = ({ pet, render }) => {
  
  // Function to calculate the pet's power level based on species and special powers
  const calculatePowerLevel = (pet) => {
    let basepower = pet.powers.length;
    let speciesBonus = 0;

    // Assign species-based bonus points
    if (pet.species === 'Martian') speciesBonus = 2;
    if (pet.species === 'Venusian') speciesBonus = 3;
    if (pet.species === 'Jupiterian') speciesBonus = 4;

    // Calculate special power bonuses for specific powers
    let specialBonuses = 0;
    if (pet.powers.includes('telepathy')) specialBonuses += 2;
    if (pet.powers.includes('shape-shifting')) specialBonuses += 3;
    if (pet.powers.includes('gravity-control')) specialBonuses += 4;
    if (pet.powers.includes('time-freezing')) specialBonuses += 5;
    if (pet.powers.includes('invisibility')) specialBonuses += 1;
    if (pet.powers.includes('storm-generation')) specialBonuses += 3;

    // Calculate the total power and normalize it between 1 and 10
    const totalPower = basepower + speciesBonus + specialBonuses;
    const normalizedPower = Math.min(10, Math.max(1, totalPower / 2));

    return normalizedPower;
  };

  // Default render function if no custom render function is provided
  const defaultRender = (powerLevel) => (
    <div>
      <p>Power Level: {powerLevel}</p>
    </div>
  );

  // Calculate the power level and choose the appropriate render function
  const powerLevel = calculatePowerLevel(pet);
  const renderResult = render ? render(powerLevel) : defaultRender(powerLevel);

  return <div>{renderResult}</div>; // Display the calculated power level
};

export default PetPowerMeter;