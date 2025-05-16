import React from 'react';

// Utility function to reverse the text, used to simulate "Galactic" translation.
const translate = (text) => text.split('').reverse().join('');

// Higher-order component (HOC) that wraps a given component and adds
// "Galactic translation" to the pet's name and description.
export const withGalacticTranslation = (WrappedComponent) => {
  return function GalacticTranslator(props) {
    // Destructure the 'pet' object from props, with the rest of the properties in restProps.
    const { pet, ...restProps } = props;

    // Translate the pet's name and description if a pet is provided.
    const translatedPet = pet
      ? {
          ...pet, // Keep other pet properties intact
          name: translate(pet.name), // Translate the name
          description: translate(pet.description), // Translate the description
          originalDescription: pet.description // Original description passed as additional prop for details section
        }
      : pet; // If no pet, keep it as is (null or undefined)

    // Render the wrapped component, passing in translated pet data
    // and any other remaining props.
    return (
      <WrappedComponent
        name={translatedPet?.name}
        description={translatedPet?.description}
        originalDescription={translatedPet?.originalDescription}
        pet={translatedPet}
        {...restProps}
      />
    );
  };
};

export default withGalacticTranslation;
