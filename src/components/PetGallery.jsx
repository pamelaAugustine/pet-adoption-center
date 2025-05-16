import React, { useContext, useState } from 'react';
import { PetContext } from '../context/PetContext';
import { PetCard } from './PetCard';

// PetGallery component displays a gallery of pets and allows filtering by species
export const PetGallery = ({ onSelectPet }) => {
  // Consume PetContext to access pet data and functions for adoption and filtering
  const { pets, filterBySpecies, applyForAdoption } = useContext(PetContext);

  // State to store the currently selected species filter
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  // Apply species filter to pets, defaulting to all pets if no species is selected
  const filteredPets = selectedSpecies ? filterBySpecies(selectedSpecies) : pets;

  // List of species available for filtering (for example purposes)
  const species = ['Martian', 'Venusian', 'Jupiterian'];

  return (
    <div className="pet-gallery" data-testid="pet-gallery">
      
      {/* Species filter buttons for selecting specific types of pets */}
      <div className="species-filter-buttons">
        {/* Button to reset filter and show all pets */}
        <button className="species-filter-button" onClick={() => setSelectedSpecies(null)}>
          All
        </button>
        
        {/* Render a button for each species, highlighting the active filter */}
        {species.map((sp) => (
          <button 
            key={sp} 
            className={`species-filter-button ${selectedSpecies === sp ? 'active' : ''}`} 
            onClick={() => setSelectedSpecies(sp)} // Set filter to selected species
          >
            {sp}
          </button>
        ))}
      </div>

      {/* Display grid of pet cards based on the current filter */}
      <div className="pet-gallery-grid">
        {filteredPets.map((pet) => (
          <PetCard 
            key={pet.id} 
            pet={pet} 
            onSelect={() => onSelectPet(pet)} // Handler to select a pet
            onAdopt={() => applyForAdoption(pet.id)} // Handler to adopt a pet
          />
        ))}
      </div>
    </div>
  );
};

export default PetGallery;
