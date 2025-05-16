import React, { useState } from 'react';
import PetPowerMeter from './PetPowerMeter';
import withGalacticTranslation from '../hoc/withGalacticTranslation';

// BasePetCard component displays basic information about a pet
// Accepts 'pet' object, 'onSelect' handler, and 'detailed' flag to control additional details
export const BasePetCard = ({ pet, onSelect, detailed = false, inModal = false }) => {
    // State to manage whether the description is decoded
    const [isDecoded, setIsDecoded] = useState(false);

      // Function to toggle decoded description state
  const handleDecode = () => {
    setIsDecoded(!isDecoded);
  };

  return (
    <div 
      data-testid="pet-card" 
      className={inModal ? 'modal-card' : 'pet-card'}
      onClick={() => onSelect && onSelect(pet.id)} // Trigger onSelect with pet ID if defined
    >
      {/* Display pet name in bold */}
      <h3><strong>{pet.name}</strong></h3>

      {/* Display basic pet information */}
      <p>Species: {pet.species}</p>
      <p>Description: {isDecoded ? pet.originalDescription : pet.description}</p>

      {/* Render pet's power level using PetPowerMeter component */}
      <PetPowerMeter pet={pet} render={(powerLevel) => (
        <p className="power-level power-pulse">Power Level: {powerLevel}</p>
      )} />

      {/* Display pet's adoption status with a conditional class based on availability */}
      <p className={`status-badge ${pet.available ? 'available' : 'adopted'}`}>
        Adoption Status: {pet.available ? 'Available' : 'Adopted'}
      </p>

      {/* If 'detailed' prop is true, display additional pet details */}
      {detailed && (
        <div>
          <p>Additional Details:</p>
          <p className="pet-powers">
            Powers: {pet.powers.join(', ')} {/* List of pet's powers */}
          </p>
          {/* Show decoded or encoded description based on `isDecoded` state */}
          <button className="decode-description" onClick={handleDecode}>
            {isDecoded ? "Hide Decoded Description" : "Decode Description"}
          </button>
          
        </div>
      )}
    </div>
  );
};

// Wrap BasePetCard with withGalacticTranslation HOC to add translation functionality
export const PetCard = withGalacticTranslation(BasePetCard);

export default PetCard;
