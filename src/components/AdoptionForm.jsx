import { useContext, useState } from 'react';
import { PetContext } from '../context/PetContext';

// AdoptionForm component handles the adoption process for a selected pet
export const AdoptionForm = ({ selectedPet, onAdoptionComplete }) => {
  
  // Form state management for adopter's details
  const [adopterName, setAdopterName] = useState(''); // Store the adopter's name
  const [contactInfo, setContactInfo] = useState(''); // Store contact information
  const [reason, setReason] = useState(''); // Store the reason for adoption

  // Access applyForAdoption function from PetContext
  const { applyForAdoption } = useContext(PetContext);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Ensure all fields are filled out before submission
    if (!adopterName || !contactInfo || !reason) {
      alert('Please fill out all fields.');
      return;
    }

    // Call applyForAdoption with the selected pet's ID to update adoption status
    applyForAdoption(selectedPet.id);

    // Trigger onAdoptionComplete callback to indicate a successful adoption
    onAdoptionComplete();

    // Reset form fields to their initial states
    setAdopterName('');
    setContactInfo('');
    setReason('');
  };

  return (
    <form 
      className="adoption-form"
      data-testid="adoption-form"
      onSubmit={handleSubmit}
    >
      <h2 className="form-title">Adopt {selectedPet.name}</h2>

      {/* Form field for adopter's name */}
      <div className="form-group">
        <label htmlFor="adopter-name">Adopter's Name</label>
        <input
          type="text"
          id="adopter-name"
          value={adopterName}
          onChange={(e) => setAdopterName(e.target.value)}
          required
        />
      </div>
      
      {/* Form field for contact information */}
      <div className="form-group">
        <label htmlFor="contact-info">Contact Information</label>
        <input
          type="text"
          id="contact-info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        />
      </div>
      
      {/* Form field for reason for adoption */}
      <div className="form-group">
        <label htmlFor="reason-for-adoption">Reason for Adoption</label>
        <textarea
          id="reason-for-adoption"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
      </div>
      
      {/* Submit button for the form */}
      <div className="form-group">
        <button className="submit-button" type="submit">Submit Adoption</button>
      </div>
    </form>
  );
};

export default AdoptionForm;