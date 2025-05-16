import React from 'react';
import { PetProvider } from './context/PetContext';
import { AdoptionCenter } from './components/AdoptionCenter';

function App() {
  return (
    <div className="app min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/space-bg.jpg')" }}>
      <header className="app-header">
        <h1 className="app-title">🛸 Galactic Pet Adoption Center 👽</h1>
      </header>
      <main>
        <PetProvider>
          <AdoptionCenter />
        </PetProvider>
      </main>
    </div>
  );
}

export default App;