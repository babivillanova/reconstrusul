import React, {useState} from 'react';
import './App.css';
import FirebaseUI from './FirebaseUI'; // Ajuste o caminho se necessário
import Main from './components/Main'; // Certifique-se de que o caminho está correto
import { useUser } from "@clerk/clerk-react"; // Importe o hook useUser para verificar o estado de autenticação
import LandingPage from './components/LandingPage';
import { Routes, Route } from 'react-router-dom';


function App() {
  const { isSignedIn } = useUser(); // Utiliza o hook useUser para verificar se o usuário está autenticado
  const [firebaseSignedIn, setFirebaseSignedIn] = useState(false);

  return (
    <div className="App">
      <header className="header2">
        <FirebaseUI firebaseSignedIn={firebaseSignedIn} setFirebaseSignedIn={setFirebaseSignedIn}/>
      </header> <br/>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {isSignedIn && <Route path="/app" element={<Main  firebaseSignedIn={firebaseSignedIn} />} />}
        </Routes>
      </main>
    </div>
  );
}


export default App;
