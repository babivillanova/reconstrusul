import { db } from './firebaseConfig';
import { collection, addDoc } from "firebase/firestore"; 

const addTestData = async () => {
  try {
    const docRef = await addDoc(collection(db, "testCollection"), {
      nome: "Teste",
      descrição: "Este é um documento de teste no Firestore.",
      timestamp: new Date()
    });
    console.log("Documento adicionado com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar documento: ", e);
  }
};

export default addTestData;
