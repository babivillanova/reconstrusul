import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import './Main.css';
import NewItemForm from './NewItemForm';

function Main({ firebaseSignedIn}) {
    const { user } = useUser();
    const [perfil, setPerfil] = useState('');
    const db = getFirestore();
    const [cadastrar, setCadastrar] = useState(null);
    const [loading, setLoading] = useState(true);  // Initialize loading state
    const [itensParaAprovar, setItensParaAprovar] = useState(0);
    const [jsonItemParaAprovar, setJsonItemParaAprovar] = useState(null); // Changed to null for better checks
    const [galpao, setGalpao] = useState('');
    const [cep, setCep] = useState('');
    const [description, setDescription] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState(''); // New state for item category
    const [photoPacked, setPhotoPacked] = useState('');
    const [photoUnpacked, setPhotoUnpacked] = useState('');
    const [dimensions, setDimensions] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageSrc, setModalImageSrc] = useState('');
    const [updateItems, setUpdateItems] = useState(false);

    const items = {
        "Esquadrias e Segurança": ["Janela", "Porta", "Portão", "Veneziana", "Grade", "Cadeado", "Corrente", "Fechadura", "Dobradiça"],
        "MOBILIÁRIO E ELETROELETRÔNICOS": ["Armário", "Bancada", "Cadeira", "Colchão", "Cortina", "Estante", "Mesa", "Sofá", "TV", "Fogão", "Microondas", "Geladeira"],
        "LOUÇAS, METAIS E HIDRÁULICA": ["Cano, sifão", "Chuveiro", "Cuba, pia", "Gancho", "Lixeira", "Papeleira", "Torneira", "Ralo", "Saboneteira", "Vaso Sanitário e tampa"],
        "ILUMINAÇÃO E ELÉTRICA": ["Luminária", "Lâmpada", "Painel de LED", "Tomada", "Interruptor", "Fiação", "Conduíte"],
        "REVESTIMENTO E PEDRA": ["Piso", "Cerâmica", "Granito", "Mármore", "Paver", "Rodapé", "Seixos"],
        "ESTRUTURA E COBERTURA": ["Areia", "Bloco", "Brita", "Cimento", "Lona", "Madeira", "Rejunte", "Telha", "Tijolo", "Tinta"],
        "FERRAMENTAS E PEÇAS METÁLICAS": ["Alicate", "Broca", "Chave", "Enxada", "Escada", "Fita veda rosca", "Furadeira", "Marreta", "Martelo", "Parafusadeira", "Parafuso, prego", "Rolo, pincel", "Trena", "Balde"]
    };

    useEffect(() => {
        if (updateItems) {
            verificarItensParaAprovar();
            setUpdateItems(false);  // Reseta o indicador de atualização
        }
    }, [updateItems]);

    const openModal = (src) => {
        setModalImageSrc(src);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {

        const verificarPerfil = async () => {
            try {
                const docRef = doc(db, "usuarios", user.id);
                const docSnap = await getDoc(docRef);
    
                if (docSnap.exists()) {
                    console.log("Perfil já está definido.");
                    setPerfil(docSnap.data().perfil);
                    console.log(docSnap.data().perfil);
                }
    
                if (docSnap.exists() && docSnap.data().perfil === 'admin') {
                    const itemsRef = collection(db, "ItemParaAprovar");
                    const q = query(itemsRef, where("status", "==", "pending"));
                    const querySnapshot = await getDocs(q);
                    setItensParaAprovar(querySnapshot.size);
    
                    if (!querySnapshot.empty) {
                        const firstDoc = querySnapshot.docs[0];
                        const firstDocData = {
                            id: firstDoc.id,
                            ...firstDoc.data()
                        };
                        setJsonItemParaAprovar(firstDocData);
                    }
                }
            } catch (error) {
                console.error("Erro ao verificar perfil:", error);
            } finally {
                setLoading(false);
            }
        };
        if (firebaseSignedIn) {
             verificarPerfil()
             verificarItensParaAprovar();
        }

    }, [user.id, db, firebaseSignedIn]);
    

    // useEffect(() => {
    //     const verificarPerfil = async () => {
    //         const docRef = doc(db, "usuarios", user.id);
    //         const docSnap = await getDoc(docRef);

    //         if (docSnap.exists()) {
    //             console.log("Perfil já está definido.");
    //             setPerfil(docSnap.data().perfil);
    //             console.log(docSnap.data().perfil);
    //         }

    //         if (docSnap.exists() && docSnap.data().perfil === 'admin') {
    //             const itemsRef = collection(db, "ItemParaAprovar");
    //             // Ajusta a consulta para incluir apenas itens que não têm o campo 'status'
    //             const q = query(itemsRef, where("status", "==", "pending"));
    //             const querySnapshot = await getDocs(q);
    //             setItensParaAprovar(querySnapshot.size);

    //             // Busca o primeiro item para ser aprovado que não tem o campo 'status'
    //             if (!querySnapshot.empty) {
    //                 const firstDoc = querySnapshot.docs[0];
    //                 const firstDocData = {
    //                     id: firstDoc.id, // Inclui o ID do documento
    //                     ...firstDoc.data() // Espalha todos os outros campos de dados
    //                 };
    //                 setJsonItemParaAprovar(firstDocData);
    //             }
    //         }

    //         setLoading(false);  // Update loading state once the Firestore check is complete

    //     };
    //     setTimeout(() => verificarPerfil(), 1000); 
    // }, [user.id, db]);

    useEffect(() => {
        // Assume jsonItemParaAprovar is fetched somewhere and eventually set
        if (jsonItemParaAprovar) {
            setGalpao(jsonItemParaAprovar.warehouse || '');
            setCep(jsonItemParaAprovar.cep || '');
            setDescription(jsonItemParaAprovar.description || '');
            setItemName(jsonItemParaAprovar.itemName || '');
            setItemCategory(jsonItemParaAprovar.itemCategory || ''); // Set item category
            setPhotoPacked(jsonItemParaAprovar.photoPacked || '');
            setPhotoUnpacked(jsonItemParaAprovar.photoUnpacked || '');
            setDimensions(jsonItemParaAprovar.dimensions || '');
            setTimestamp(jsonItemParaAprovar.timestamp || '');
        }
    }, [jsonItemParaAprovar]);

    const verificarItensParaAprovar = async () => {
        const itemsRef = collection(db, "ItemParaAprovar");
        const q = query(itemsRef, where("status", "==", "pending"));
        const querySnapshot = await getDocs(q);
        setItensParaAprovar(querySnapshot.size);

        if (!querySnapshot.empty) {
            const firstDoc = querySnapshot.docs[0];
            setJsonItemParaAprovar({
                id: firstDoc.id,
                ...firstDoc.data()
            });
        }
    };


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

    function ImageModal({ src, alt, onClose }) {
        return (
            <div className="modal-backdrop" onClick={onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <img src={src} alt={alt} style={{ maxWidth: '100%', maxHeight: '90vh', display: "block" }} />
                    <div className="magnifier-lens" style={{ backgroundImage: `url(${src})` }}></div>
                    <button onClick={onClose} className="cadastro_button" style={{ marginTop: '20px' }}>Close</button>
                </div>
            </div>
        );
    }

    const aprovarItem = async () => {
        if (!jsonItemParaAprovar) return; // Verifica se o item realmente está definido.

        const db = getFirestore();

        // Atualiza o status do item para aprovado no Firestore
        const itemRef = doc(db, "ItemParaAprovar", jsonItemParaAprovar.id); // Referência correta usando o ID do item
        await updateDoc(itemRef, {
            status: "approved"
        });

        // Buscar o e-mail do usuário baseado no userId
        const userRef = doc(db, "usuarios", jsonItemParaAprovar.userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            alert("Não foi possível encontrar o usuário correspondente ao item.");
            return;
        }

        const userEmail = userSnap.data().email;
        if (!userEmail) {
            alert("E-mail do usuário não disponível.");
            return;
        }

        // Montar o link mailto
        const subject = encodeURIComponent("Seu item foi aprovado!");
        const emailBody = encodeURIComponent(`Olá,\n\nSeu item "${jsonItemParaAprovar.itemName}" foi aprovado. Obrigado por sua contribuição!\n\nAtenciosamente,\nEquipe`);
        const mailtoLink = `mailto:${userEmail}?subject=${subject}&body=${emailBody}`;

        // Abrir o cliente de e-mail
        window.open(mailtoLink, '_blank');

        alert('Item aprovado com sucesso! O cliente de e-mail foi aberto para enviar a notificação.');

        window.location.reload();

    };

    const rejeitarItem = async () => {
        if (!jsonItemParaAprovar) return; // Verifica se o item realmente está definido.
    
        const db = getFirestore();
    
        // Coleta os motivos da rejeição dos checkboxes
        const rejectionReasons = [];
        const checkboxes = document.querySelectorAll('.rejection input[type="checkbox"]:checked');
        checkboxes.forEach(checkbox => {
            rejectionReasons.push(checkbox.value);
        });
    
        if (rejectionReasons.length === 0) {
            alert('Por favor, selecione pelo menos um motivo para a rejeição.');
            return;
        }
    
        // Atualiza o status do item para rejeitado no Firestore
        const itemRef = doc(db, "ItemParaAprovar", jsonItemParaAprovar.id); // Referência correta usando o ID do item
        await updateDoc(itemRef, {
            status: "rejected",
            rejectionReasons: rejectionReasons
        });
    
        // Buscar o e-mail do usuário baseado no userId
        const userRef = doc(db, "usuarios", jsonItemParaAprovar.userId);
        const userSnap = await getDoc(userRef);
    
        if (!userSnap.exists()) {
            alert("Não foi possível encontrar o usuário correspondente ao item.");
            return;
        }
    
        const userEmail = userSnap.data().email;
        if (!userEmail) {
            alert("E-mail do usuário não disponível.");
            return;
        }
    
        // Montar a mensagem de e-mail com os motivos da rejeição e sugestão de como prosseguir
        const subject = encodeURIComponent("Seu item foi rejeitado");
        const rejectionMessage = `Olá,\n\nSeu item "${jsonItemParaAprovar.itemName}" foi rejeitado pelos seguintes motivos:\n\n` +
            rejectionReasons.map(reason => `- ${reason}`).join('\n') +
            `\n\nSugerimos que você:\n\n- Verifique e corrija os problemas mencionados acima.\n- Certifique-se de que o item esteja em boas condições.\n- Tente novamente após as correções necessárias.\n\nObrigado pela compreensão.\n\nAtenciosamente,\nEquipe`;
    
        const mailtoLink = `mailto:${userEmail}?subject=${subject}&body=${encodeURIComponent(rejectionMessage)}`;
    
        // Abrir o cliente de e-mail
        window.open(mailtoLink, '_blank');
    
        alert('Item rejeitado com sucesso! O cliente de e-mail foi aberto para enviar a notificação.');

        window.location.reload();

    };
    


    if (loading) {
        return <p>Carregando dados...</p>;  // Display loading message while checking the profile
    }

    if (perfil) {
        return (
            <>
                <p><br /><br />Olá, {perfil}! <br /></p>

                <div className='alternativas'>
                    {cadastrar === null && perfil !== 'admin' && (<>
                        <div className='alternativa' onClick={handleCadastrar}>Cadastrar novo item</div></>)}
                    {/* <div className='alternativa' onClick={handleConsultar}>Consultar itens cadastrados</div> */}
                </div>

                {cadastrar === true && (<div className='cadastro'>
                    <NewItemForm userId={user.id} setCadastrar={setCadastrar} />
                </div>)}

                {perfil === 'admin' && (<>
                    <p>Você tem {itensParaAprovar} doações para aprovar.</p>
                    <div>
                        {/* aprove as doações  */}
                        <div className='card'>
                            {jsonItemParaAprovar ? (
                                <>
                                    <div><strong>GALPÃO:</strong> {galpao}</div>
                                    <div><strong>CEP:</strong> {cep}</div>
                                    <div><strong>CATEGORIA:</strong> {itemCategory}</div> {/* Show item category */}
                                    <div><strong>NOME:</strong> {itemName}</div>
                                    <div><strong>DESCRIÇÃO:</strong> {description}</div>
                                    <div><strong>ITEM:</strong><img className="foto_item" src={photoUnpacked || 'https://via.placeholder.com/150'} alt='Foto do item desembalado' onClick={() => openModal(photoUnpacked)} /></div>
                                    <div><strong>ITEM EMBALADO:</strong><img className="foto_item" src={photoPacked || 'https://via.placeholder.com/150'} alt='Foto do item embalado' onClick={() => openModal(photoPacked)} /></div>
                                    <div><strong>DIMENSÕES:</strong> {dimensions}</div>
                                </>
                            ) : (
                                <div>No data available</div>
                            )}
                            <button className='cadastro_button aprovar' onClick={aprovarItem}>Aprovar</button>
                            <div>
                                <div className='rejection'>
                                    <label><input type="checkbox" value="embalagem" />Embalagem</label>
                                    <label><input type="checkbox" value="danificado" />Danificado</label><br />
                                    <label><input type="checkbox" value="item" />Item não aceito</label>
                                </div> <br />
                                <button className='cadastro_button rejeitar' onClick={rejeitarItem}>Rejeitar</button>
                            </div>
                        </div>
                    </div>

                    {isModalOpen && <ImageModal src={modalImageSrc} alt="Enlarged item" onClose={closeModal} />}
                </>)}
                {cadastrar === false && <div>Consultar</div>}
            </>
        );
    }

    return (
        <div>
            <h1>Escolha seu perfil</h1>
            {/* <button onClick={() => definirPerfil('Admin')}>Admin</button> */}
            <button className='signbutton' onClick={() => definirPerfil('Doador')}>Doador</button>
            {/* <button onClick={() => definirPerfil('Gestor de Armazém')}>Gestor de Armazém</button>
            <button onClick={() => definirPerfil('Gestor de Transporte')}>Gestor de Transporte</button> */}
        </div>
    );
}

export default Main;



// import React, { useState, useEffect } from 'react';
// import { useUser } from "@clerk/clerk-react";
// import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
// import './Main.css';
// import NewItemForm from './NewItemForm';

// function Main() {
//     const { user } = useUser();
//     const [perfil, setPerfil] = useState('');
//     const db = getFirestore();
//     const [cadastrar, setCadastrar] = useState(null);
//     const [loading, setLoading] = useState(true);  // Initialize loading state
//     const [itensParaAprovar, setItensParaAprovar] = useState(0);
//     const [jsonItemParaAprovar, setJsonItemParaAprovar] = useState(null); // Changed to null for better checks
//     const [cep, setCep] = useState('');
//     const [description, setDescription] = useState('');
//     const [itemName, setItemName] = useState('');
//     const [photoPacked, setPhotoPacked] = useState('');
//     const [photoUnpacked, setPhotoUnpacked] = useState('');
//     const [dimensions, setDimensions] = useState('');
//     const [timestamp, setTimestamp] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalImageSrc, setModalImageSrc] = useState('');
//     const [updateItems, setUpdateItems] = useState(false);

    
//     useEffect(() => {
//         if (updateItems) {
//             verificarItensParaAprovar();
//             setUpdateItems(false);  // Reseta o indicador de atualização
//         }
//     }, [updateItems]);

//     const openModal = (src) => {
//         setModalImageSrc(src);
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//     };
//     useEffect(() => {
//         const verificarPerfil = async () => {
//             const docRef = doc(db, "usuarios", user.id);
//             const docSnap = await getDoc(docRef);

//             if (docSnap.exists()) {
//                 console.log("Perfil já está definido.");
//                 setPerfil(docSnap.data().perfil);
//                 console.log(docSnap.data().perfil);
//             }

//             if (docSnap.exists() && docSnap.data().perfil === 'admin') {
//                 const itemsRef = collection(db, "ItemParaAprovar");
//                 // Ajusta a consulta para incluir apenas itens que não têm o campo 'status'
//                 const q = query(itemsRef, where("status", "==", "pending"));
//                 const querySnapshot = await getDocs(q);
//                 setItensParaAprovar(querySnapshot.size);
    
//                 // Busca o primeiro item para ser aprovado que não tem o campo 'status'
//                 if (!querySnapshot.empty) {
//                     const firstDoc = querySnapshot.docs[0];
//                     const firstDocData = {
//                         id: firstDoc.id, // Inclui o ID do documento
//                         ...firstDoc.data() // Espalha todos os outros campos de dados
//                     };
//                     setJsonItemParaAprovar(firstDocData);
//                 }
//             }

//             setLoading(false);  // Update loading state once the Firestore check is complete

//         };
//         setTimeout(() => verificarPerfil(), 1000); // Adiciona um pequeno atraso para garantir que o usuário esteja autenticado
//     }, [user.id, db]);

//     useEffect(() => {
//         // Assume jsonItemParaAprovar is fetched somewhere and eventually set
//         if (jsonItemParaAprovar) {
//             setCep(jsonItemParaAprovar.cep || '');
//             setDescription(jsonItemParaAprovar.description || '');
//             setItemName(jsonItemParaAprovar.itemName || '');
//             setPhotoPacked(jsonItemParaAprovar.photoPacked || '');
//             setPhotoUnpacked(jsonItemParaAprovar.photoUnpacked || '');
//             setDimensions(jsonItemParaAprovar.dimensions || '');
//             setTimestamp(jsonItemParaAprovar.timestamp || '');
//         }
//     }, [jsonItemParaAprovar]);


//     const verificarItensParaAprovar = async () => {
//         const itemsRef = collection(db, "ItemParaAprovar");
//         const q = query(itemsRef, where("status", "==", "pending"));
//         const querySnapshot = await getDocs(q);
//         setItensParaAprovar(querySnapshot.size);
    
//         if (!querySnapshot.empty) {
//             const firstDoc = querySnapshot.docs[0];
//             setJsonItemParaAprovar({
//                 id: firstDoc.id,
//                 ...firstDoc.data()
//             });
//         }
//     };
    
//     useEffect(() => {
//         setTimeout(() => {
//             verificarItensParaAprovar();
//         }, 1000);
//     }, [user.id, db]);

//     const definirPerfil = async (perfilEscolhido) => {
//         const docRef = doc(db, "usuarios", user.id);
//         const userInfo = {
//             perfil: perfilEscolhido,
//             email: user.emailAddresses[0]?.emailAddress, // Acessa o primeiro e-mail da lista
//             nome: user.firstName + " " + user.lastName // Certifique-se de que esses campos existem
//         };
//         await setDoc(docRef, userInfo, { merge: true });
//         setPerfil(perfilEscolhido);
//         console.log("Perfil e informações do usuário foram definidos.");
//     };

//     const handleCadastrar = () => {
//         setCadastrar(true);
//     }
//     const handleConsultar = () => {
//         setCadastrar(false);
//     }

//     function ImageModal({ src, alt, onClose }) {
 
    
//         return (
//             <div className="modal-backdrop" onClick={onClose}>
//                 <div className="modal-content" onClick={e => e.stopPropagation()}>
//                     <img  src={src} alt={alt}   style={{ maxWidth: '100%', maxHeight: '90vh', display:"block" }} />
//                     <div  className="magnifier-lens" style={{ backgroundImage: `url(${src})` }}></div>
//                     <button onClick={onClose} className="cadastro_button" style={{ marginTop: '20px' }}>Close</button>
//                 </div>
//             </div>
//         );
//     }


// const aprovarItem = async () => {
//     if (!jsonItemParaAprovar) return; // Verifica se o item realmente está definido.

//     const db = getFirestore();

//     // Atualiza o status do item para aprovado no Firestore
//     const itemRef = doc(db, "ItemParaAprovar", jsonItemParaAprovar.id); // Referência correta usando o ID do item
//     await updateDoc(itemRef, {
//         status: "approved"
//     });

//     // Buscar o e-mail do usuário baseado no userId
//     const userRef = doc(db, "usuarios", jsonItemParaAprovar.userId);
//     const userSnap = await getDoc(userRef);

//     if (!userSnap.exists()) {
//         alert("Não foi possível encontrar o usuário correspondente ao item.");
//         return;
//     }

//     const userEmail = userSnap.data().email;
//     if (!userEmail) {
//         alert("E-mail do usuário não disponível.");
//         return;
//     }

//     // Montar o link mailto
//     const subject = encodeURIComponent("Seu item foi aprovado!");
//     const emailBody = encodeURIComponent(`Olá,\n\nSeu item "${jsonItemParaAprovar.itemName}" foi aprovado. Obrigado por sua contribuição!\n\nAtenciosamente,\nEquipe`);
//     const mailtoLink = `mailto:${userEmail}?subject=${subject}&body=${emailBody}`;

//     // Abrir o cliente de e-mail
//     window.open(mailtoLink, '_blank');

//     alert('Item aprovado com sucesso! O cliente de e-mail foi aberto para enviar a notificação.');
// };

    
//     if (loading) {
//         return <p>Carregando dados...</p>;  // Display loading message while checking the profile
//     }


//     if (perfil) {
//         return (<><p><br/><br/>Olá, {perfil}! <br/></p>
        
//         <div className='alternativas'>
//            {cadastrar === null && perfil !== 'admin' && ( <>       
// <div className='alternativa' onClick={handleCadastrar}>Cadastrar novo item</div></>)}
//             {/* <div className='alternativa' onClick={handleConsultar}>Consultar itens cadastrados</div> */}
//         </div>
        
//         {cadastrar === true && (<div className='cadastro'>
//             <NewItemForm userId={user.id} setCadastrar={setCadastrar}/>
//             </div>)}

//         {perfil === 'admin' && (<>       
//          <p>Você tem {itensParaAprovar} doações para aprovar.</p>
//          <div>

//             {/* aprove as doações  */}
//             <div className='card'>
//                 {/* <div >doação 1 de 20</div> */}
//                 {jsonItemParaAprovar ? (    
//                                 <>
//                     <div><strong>CEP:</strong> {cep}</div>
//                     <div><strong>NOME:</strong> {itemName}</div>
//                     <div><strong>DESCRIÇÃO:</strong> {description}</div>
//                     <div><strong>ITEM:</strong><img className="foto_item" src={photoUnpacked || 'https://via.placeholder.com/150'} alt='Foto do item desembalado' onClick={() => openModal(photoUnpacked)}/></div>
//                     <div><strong>ITEM EMBALADO:</strong><img className="foto_item" src={photoPacked || 'https://via.placeholder.com/150'} alt='Foto do item embalado' onClick={() => openModal(photoPacked)}/></div>
//                     <div><strong>DIMENSÕES:</strong> {dimensions}</div>
//                 </>
//             ) : (
//                 <div>No data available</div>
//             )}
//                 <button className='cadastro_button aprovar'onClick={aprovarItem}>Aprovar</button>
//                 <div> 
                        
//     <div className='rejection'>
//       <label><input type="checkbox" value="embalagem"/>Embalagem</label>
//       <label><input type="checkbox" value="danificado"/>Danificado</label><br/>
//       <label><input type="checkbox" value="item"/>Item não aceito</label>
//     </div>           <br/>     
//     <button className='cadastro_button rejeitar'>Rejeitar</button>

//                 </div>
//             </div>


//         </div>

//         {isModalOpen && <ImageModal src={modalImageSrc} alt="Enlarged item" onClose={closeModal} />}

//         </>)}    
//         {cadastrar === false && <div>Consultar</div>}
        
        
//         </>)
//     }



//     return (
//         <div>
//             <h1>Escolha seu perfil</h1>
//             {/* <button onClick={() => definirPerfil('Admin')}>Admin</button> */}
//             <button className='signbutton' onClick={() => definirPerfil('Doador')}>Doador</button>
//             {/* <button onClick={() => definirPerfil('Gestor de Armazém')}>Gestor de Armazém</button>
//             <button onClick={() => definirPerfil('Gestor de Transporte')}>Gestor de Transporte</button> */}
//         </div>
//     );
// }

// export default Main;
