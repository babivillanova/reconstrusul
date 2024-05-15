import React, { useState, useEffect } from 'react';
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function NewItemForm({ userId, setCadastrar }) {
    const [formData, setFormData] = useState({
        cep: '',
        itemName: '',
        description: '',
        photoUnpacked: null,
        photoPacked: null,
        dimensions: ''
    });
    const [photoUnpackedUrl, setPhotoUnpackedUrl] = useState('');
    const [photoPackedUrl, setPhotoPackedUrl] = useState('');


    const db = getFirestore();
    const storage = getStorage();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleFileChangeUnpacked = async (e) => {
        const { name, files } = e.target;
        //convert image to b64
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = async () => {
            const b64 = reader.result;
            setPhotoUnpackedUrl(b64);
    }
    }

    const handleFileChangePacked = async (e) => {
        const { name, files } = e.target;
        //convert image to b64
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = async () => {
            const b64 = reader.result;
            setPhotoPackedUrl(b64);
        }   }



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(db, userId)

        //transform image from formData to b64
        // const unpackedUrl = await uploadFile(formData.photoUnpacked, 'unpacked');
        // const packedUrl = await uploadFile(formData.photoPacked, 'packed');

        // console.log(unpackedUrl, packedUrl);

        // Prepare the document to be saved in Firestore
        const itemDoc = {
            userId: userId,
            cep: formData.cep,
            itemName: formData.itemName,
            description: formData.description,
            photoUnpacked: photoUnpackedUrl,
            photoPacked: photoPackedUrl,
            dimensions: formData.dimensions,
            timestamp: new Date()
        };

        
        try {
            // Add document to Firestore
            await addDoc(collection(db, "ItemParaAprovar"), itemDoc);
            alert('Item cadastrado com sucesso! Aguarde o contato da equipe de aprovação.');
            setCadastrar(null)

        } catch (error) {
            alert('Erro ao enviar dados: ' + error.message);
        }
    };

    const testSendDoc = async () => {
        const testDoc = {
            test: 23
        }
        try {
            await addDoc(collection(db, "test"), testDoc);
            alert('Item cadastrado com sucesso!');
        } catch (error) {
            alert('Erro ao enviar dados: ' + error.message);
        }
    }

    return (<>
        <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
        }} className='cadastro_form'>
            <input type="text" name="cep" placeholder="CEP de onde irá partir com a doação" value={formData.cep} onChange={handleInputChange} required />
            <input type="text" name="itemName" placeholder="Nome do Item (ex.: cadeira)" value={formData.itemName} onChange={handleInputChange} required />
            <textarea name="description" placeholder="Descrição complementar" value={formData.description} onChange={handleInputChange} required />
            <label htmlFor="photoUnpacked">Foto do item desembalado (até 2mb)</label>
            <input type="file" name="photoUnpacked" onChange={handleFileChangeUnpacked} required />
            <label htmlFor="photoPacked">Foto do item embalado (até 2mb)</label>
            <input type="file" name="photoPacked" onChange={handleFileChangePacked} required />
            <input type="text" name="dimensions" placeholder="Dimensões" value={formData.dimensions} onChange={handleInputChange} required />
            <br />
            <button type="submit" className='cadastro_button'>Cadastrar Item</button>
        </form>
        {/* <button onClick={testSendDoc}>Testar</button> */}
        </>
    );
}

export default NewItemForm;
