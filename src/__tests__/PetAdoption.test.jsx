import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PetProvider, PetContext } from '../context/PetContext';
import { AdoptionCenter } from '../components/AdoptionCenter';
import { PetCard } from '../components/PetCard';
import PetGallery from '../components/PetGallery';
import { PetPowerMeter } from '../components/PetPowerMeter';
import { withGalacticTranslation } from '../hoc/withGalacticTranslation';

describe('Pet Adoption Center Tests', () => {
  describe('Component Composition', () => {
    test('AdoptionCenter renders all required components', () => {
      render(
        <PetProvider>
          <AdoptionCenter />
        </PetProvider>
      );
      
      expect(screen.getByTestId('adoption-center')).toBeInTheDocument();
      expect(screen.getByTestId('pet-gallery')).toBeInTheDocument();
    });

    test('PetGallery displays all pets', () => {
      render(
        <PetProvider>
          <AdoptionCenter />
        </PetProvider>
      );
      
      const petCards = screen.getAllByTestId('pet-card');
      expect(petCards.length).toBeGreaterThan(0);
    });
  });

  describe('Context API', () => {
    test('PetContext provides required state and functions', () => {
      const TestComponent = () => {
        const context = React.useContext(PetContext);
        return (
          <div>
            {context.pets.length > 0 && <span data-testid="has-pets">Has Pets</span>}
            {typeof context.applyForAdoption === 'function' && 
              <span data-testid="has-adopt-fn">Has Adopt Function</span>}
            {typeof context.filterBySpecies === 'function' && 
              <span data-testid="has-filter-fn">Has Filter Function</span>}
          </div>
        );
      };

      render(
        <PetProvider>
          <TestComponent />
        </PetProvider>
      );

      expect(screen.getByTestId('has-pets')).toBeInTheDocument();
      expect(screen.getByTestId('has-adopt-fn')).toBeInTheDocument();
      expect(screen.getByTestId('has-filter-fn')).toBeInTheDocument();
    });

    test('filterBySpecies function filters pets correctly', () => {
      render(
        <PetProvider>
          <PetGallery onSelectPet={() => {}} />
        </PetProvider>
      );

      // Get initial count
      const initialPets = screen.getAllByTestId('pet-card').length;
      
      // Click Martian filter button
      fireEvent.click(screen.getByText('Martian'));
      
      // Get filtered count
      const filteredPets = screen.getAllByTestId('pet-card').length;
      
      // Should have fewer pets after filtering
      expect(filteredPets).toBeLessThanOrEqual(initialPets);
      // Should have at least one pet (we know we have a Martian)
      expect(filteredPets).toBeGreaterThan(0);
    });
  });

  describe('Higher Order Component', () => {
    test('withGalacticTranslation transforms text correctly', () => {
      const TestComponent = ({ name }) => <div data-testid="translated">{name}</div>;
      const WrappedComponent = withGalacticTranslation(TestComponent);
      
      const pet = {
        name: 'Zorbo',
        description: 'A friendly alien'
      };
      
      render(<WrappedComponent pet={pet} />);
      expect(screen.getByTestId('translated')).toHaveTextContent('obroZ');
    });

    test('HOC preserves other props', () => {
      const TestComponent = ({ id, pet }) => (
        <div data-testid="component">
          <span data-testid="name">{pet.name}</span>
          <span data-testid="id">{id}</span>
        </div>
      );
      const WrappedComponent = withGalacticTranslation(TestComponent);
      
      const pet = {
        name: 'Zorbo',
        description: 'A friendly alien'
      };
      
      render(<WrappedComponent pet={pet} id={123} />);
      expect(screen.getByTestId('id')).toHaveTextContent('123');
    });
  });

  describe('Render Props', () => {
    test('PetPowerMeter calculates power level correctly', () => {
      const testPet = {
        id: 1,
        name: 'Zorbo',
        species: 'Martian',
        powers: ['telepathy', 'invisibility']
      };

      render(
        <PetPowerMeter
          pet={testPet}
          render={powerLevel => (
            <div data-testid="power-level">{powerLevel}</div>
          )}
        />
      );

      const powerLevel = parseInt(screen.getByTestId('power-level').textContent);
      expect(powerLevel).toBeGreaterThanOrEqual(1);
      expect(powerLevel).toBeLessThanOrEqual(10);
    });

    test('PetPowerMeter renders custom display component', () => {
      const testPet = {
        id: 1,
        name: 'Zorbo',
        species: 'Martian',
        powers: ['telepathy']
      };

      render(
        <PetPowerMeter
          pet={testPet}
          render={powerLevel => (
            <div data-testid="custom-display">Power: {powerLevel}</div>
          )}
        />
      );

      expect(screen.getByTestId('custom-display')).toBeInTheDocument();
      expect(screen.getByTestId('custom-display')).toHaveTextContent(/Power: \d/);
    });
  });
});
