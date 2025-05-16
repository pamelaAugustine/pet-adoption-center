import React, { useState } from 'react';
import PetGallery from './PetGallery';
import PetCard from './PetCard';
import AdoptionForm from './AdoptionForm';
import Modal from './Modal'; // Import the Modal component

export const AdoptionCenter = () => {
  // State to store the currently selected pet for adoption
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Function to handle pet selection, setting the chosen pet in state
  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true); // Open the modal when a pet is selected
  };

  // Function to handle the adoption process
  const handleAdoptionComplete = () => {
    alert(`Thank you for adopting ${selectedPet.name}!`);
    selectedPet.available = false; 
    setSelectedPet(null); 
    setIsModalOpen(false); // Close the modal after adoption
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPet(null);
  };

  return (
    <div className="adoption-center" data-testid="adoption-center">
      {/* Display the gallery of pets; allows user to select a pet */}
      <PetGallery onSelectPet={handleSelectPet} />
      
      {/* Display the adoption form as a modal if a pet is selected */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedPet && (
          <>
            {/* Detailed view of the selected pet */}
            <PetCard pet={selectedPet} detailed={true} inModal={true}/>
            
            {/* Adoption form for the selected pet */}
            <AdoptionForm
              selectedPet={selectedPet}
              onAdoptionComplete={handleAdoptionComplete}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default AdoptionCenter;
