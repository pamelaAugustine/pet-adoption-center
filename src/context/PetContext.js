import React, { createContext, useState } from 'react';

// Create PetContext to be used across the application for sharing pet data and functions
export const PetContext = createContext();

export const PetProvider = ({ children }) => {
  // Initial state with sample pets, each having unique powers, descriptions, and availability status
  const [pets, setPets] = useState([
    {
      id: 1,
      name: 'Zorbo',
      species: 'Martian',
      powers: ['telepathy', 'invisibility'],
      description: 'A friendly Martian with mind-reading abilities',
      available: true
    },
    {
      id: 2,
      name: 'Floop',
      species: 'Venusian',
      powers: ['shape-shifting', 'time-freezing'],
      description: 'Shape-shifting blob from Venus',
      available: true
    },
    {
      id: 3,
      name: 'Glork',
      species: 'Jupiterian',
      powers: ['gravity-control', 'storm-generation'],
      description: 'Majestic creature from Jupiter\'s storms',
      available: true
    }
  ]);

  // Function to mark a pet as adopted by updating its availability status to false
  const applyForAdoption = (petId) => {
    setPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === petId ? { ...pet, available: false } : pet
      )
    );
  };

  // Function to filter pets by species; returns all pets if no species is specified
  const filterBySpecies = (species) => {
    if (!species) return pets; // Return all pets if species filter is not specified
    return pets.filter((pet) => pet.species.toLowerCase() === species.toLowerCase());
  };

  return (
    <PetContext.Provider value={{
      pets,              // Provide access to the pet list
      applyForAdoption,  // Provide function to adopt a pet
      filterBySpecies    // Provide function to filter pets by species
    }}>
      {children}
    </PetContext.Provider>
  );
};