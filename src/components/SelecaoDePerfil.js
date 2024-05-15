import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import './SelecaoDePerfil.css';
import NewItemForm from './NewItemForm';

function SelecaoDePerfil() {
    const { user } = useUser();
    const [perfil, setPerfil] = useState('');
    const db = getFirestore();
    const [cadastrar, setCadastrar] = useState(null);

    useEffect(() => {
        const verificarPerfil = async () => {
            const docRef = doc(db, "usuarios", user.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Perfil já está definido.");
                setPerfil(docSnap.data().perfil);
            }
        };
        setTimeout(() => verificarPerfil(), 5000); // Adiciona um pequeno atraso para garantir que o usuário esteja autenticado
    }, [user.id, db]);

    const definirPerfil = async (perfilEscolhido) => {
        const docRef = doc(db, "usuarios", user.id);
        const userInfo = {
            perfil: perfilEscolhido,
            email: user.emailAddresses[0]?.emailAddress, // Acessa o primeiro e-mail da lista
            nome: user.firstName + " " + user.lastName // Certifique-se de que esses campos existem
        };
        await setDoc(docRef, userInfo, { merge: true });
        setPerfil(perfilEscolhido);
        console.log("Perfil e informações do usuário foram definidos.");
    };

    const handleCadastrar = () => {
        setCadastrar(true);
    }
    const handleConsultar = () => {
        setCadastrar(false);
    }

    if (perfil) {
        return (<><p><br/><br/>Olá, {perfil}! <br/>
        Informe abaixo os dados da sua doação.</p>
        
        <div className='alternativas'>
            <div className='alternativa' onClick={handleCadastrar}>Cadastrar novo item</div>
            {/* <div className='alternativa' onClick={handleConsultar}>Consultar itens cadastrados</div> */}
        </div>
        
        {cadastrar === true && (<div className='cadastro'>
            <NewItemForm userId={user.id} setCadastrar={setCadastrar}/>
            
            
            
            </div>)}
        {cadastrar === false && <div>Consultar</div>}
        
        
        </>)
    }

    return (
        <div>
            <h1>Escolha seu perfil</h1>
            {/* <button onClick={() => definirPerfil('Admin')}>Admin</button> */}
            <button onClick={() => definirPerfil('Doador')}>Doador</button>
            {/* <button onClick={() => definirPerfil('Gestor de Armazém')}>Gestor de Armazém</button>
            <button onClick={() => definirPerfil('Gestor de Transporte')}>Gestor de Transporte</button> */}
        </div>
    );
}

export default SelecaoDePerfil;
