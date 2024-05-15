import React from 'react';
import './App.css';
import FirebaseUI from './FirebaseUI'; // Ajuste o caminho se necessário
import SelecaoDePerfil from './components/SelecaoDePerfil'; // Certifique-se de que o caminho está correto
import { useUser } from "@clerk/clerk-react"; // Importe o hook useUser para verificar o estado de autenticação
import LandingPage from './components/LandingPage';
import { Routes, Route } from 'react-router-dom';


function App() {
  const { isSignedIn } = useUser(); // Utiliza o hook useUser para verificar se o usuário está autenticado

  return (
    <div className="App">
      <header className="header2">
        <FirebaseUI />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {isSignedIn && <Route path="/app" element={<SelecaoDePerfil />} />}
        </Routes>
      </main>
    </div>
  );
}


export default App;
