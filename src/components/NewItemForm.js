import React, { useState } from 'react';
import { getFirestore, addDoc, collection } from "firebase/firestore";

function NewItemForm({ userId, setCadastrar }) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        warehouse: 'Sé',
        cep: '',
        itemCategory: 'Esquadrias e Segurança',
        itemName: 'Janela',
        description: '',
        photoUnpacked: null,
        photoPacked: null,
        dimensions: '',
        quantity: ''
    });
    const [photoUnpackedUrl, setPhotoUnpackedUrl] = useState('');
    const [photoPackedUrl, setPhotoPackedUrl] = useState('');

    const db = getFirestore();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChangeUnpacked = (e) => {
        const { files } = e.target;
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
            setPhotoUnpackedUrl(reader.result);
        };
    };

    const handleFileChangePacked = (e) => {
        const { files } = e.target;
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
            setPhotoPackedUrl(reader.result);
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };


    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const itemDoc = {
    //         userId: userId,
    //         warehouse: formData.warehouse,
    //         cep: formData.cep,
    //         itemCategory: formData.itemCategory,
    //         itemName: formData.itemName,
    //         description: formData.description,
    //         photoUnpacked: photoUnpackedUrl,
    //         photoPacked: photoPackedUrl,
    //         dimensions: formData.dimensions,
    //         quantity: formData.quantity,
    //         timestamp: new Date(),
    //         status: 'pending'
    //     };

    //     try {
    //         await addDoc(collection(db, "ItemParaAprovar"), itemDoc);
    //         alert('Item cadastrado com sucesso! Aguarde o contato da equipe de aprovação.');
    //         setCadastrar(null);
    //     } catch (error) {
    //         if (error.message.includes('Request payload size exceeds the limit')) {
    //             alert('Erro ao enviar dados: As imagens enviadas são muito grandes. O tamanho máximo permitido é de 2 MB.');
    //         } else {
    //             alert('Erro ao enviar dados: ' + error.message);
    //         }
    //     }
    // };

    const confirmSubmit = async () => {
        const itemDoc = {
            userId: userId,
            warehouse: formData.warehouse,
            cep: formData.cep,
            itemCategory: formData.itemCategory,
            itemName: formData.itemName,
            description: formData.description,
            photoUnpacked: photoUnpackedUrl,
            photoPacked: photoPackedUrl,
            dimensions: formData.dimensions,
            quantity: formData.quantity,
            timestamp: new Date(),
            status: 'pending'
        };

        try {
            setLoading(true)
            await addDoc(collection(db, "ItemParaAprovar"), itemDoc);
            alert('Item cadastrado com sucesso! Aguarde o contato da equipe de aprovação.');
            setCadastrar(null);
        } catch (error) {
            if (error.message.includes('Request payload size exceeds the limit')) {
                alert('Erro ao enviar dados: As imagens enviadas são muito grandes. O tamanho máximo permitido é de 2 MB.');
            } else {
                alert('Erro ao enviar dados: As imagens enviadas são muito grandes. O tamanho máximo permitido é de 2 MB. ' + error.message);
            }
        } finally {
            setShowConfirmation(false);
            setLoading(false);
        }
    };


    const items = {
        "ESQUADRIAS E SEGURANÇA": ["Janela", "Porta", "Portão", "Veneziana", "Grade", "Cadeado", "Corrente", "Fechadura", "Dobradiça"],
        "MOBILIÁRIO E ELETROELETRÔNICOS": ["Armário", "Bancada", "Cadeira", "Colchão", "Cortina", "Estante", "Mesa", "Sofá", "TV", "Fogão", "Microondas", "Geladeira"],
        "LOUÇAS, METAIS E HIDRÁULICA": ["Cano, sifão", "Chuveiro", "Cuba, pia", "Gancho", "Lixeira", "Papeleira", "Torneira", "Ralo", "Saboneteira", "Vaso Sanitário e tampa"],
        "ILUMINAÇÃO E ELÉTRICA": ["Luminária", "Lâmpada", "Painel de LED", "Tomada", "Interruptor", "Fiação", "Conduíte"],
        "REVESTIMENTO E PEDRA": ["Piso", "Cerâmica", "Granito", "Mármore", "Paver", "Rodapé", "Seixos"],
        "ESTRUTURA E COBERTURA": ["Areia", "Bloco", "Brita", "Cimento", "Lona", "Madeira", "Rejunte", "Telha", "Tijolo", "Tinta"],
        "FERRAMENTAS E PEÇAS METÁLICAS": ["Alicate", "Broca", "Chave", "Enxada", "Escada", "Fita veda rosca", "Furadeira", "Marreta", "Martelo", "Parafusadeira", "Parafuso, prego", "Rolo, pincel", "Trena", "Balde"]
    };

    

    return (
        <>
        {loading && <div className="loading"></div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }} className='cadastro_form'>
                <label htmlFor="warehouse">Selecione o Galpão</label>
                <select name="warehouse" value={formData.warehouse} onChange={handleInputChange} required>
                    <option value="Sé">Galpão Sé</option>
                    <option value="Mooca">Galpão Mooca</option>
                </select>
                <input type="text" name="cep" placeholder="CEP de onde irá partir com a doação" value={formData.cep} onChange={handleInputChange} required />
                <label htmlFor="itemCategory">Categoria do Item</label>
                <select name="itemCategory" value={formData.itemCategory} onChange={handleInputChange} required>
                    {Object.keys(items).map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <label htmlFor="itemName">Nome do Item</label>
                <select name="itemName" value={formData.itemName} onChange={handleInputChange} required>
    {items[formData.itemCategory] ? (
        items[formData.itemCategory].map(item => (
            <option key={item} value={item}>{item}</option>
        ))
    ) : (
        <option>Selecione uma categoria válida</option>
    )}
</select>

                <textarea name="description" placeholder="Descrição complementar e quantidade" value={formData.description} onChange={handleInputChange} required />
                <input type="number" name="quantity" placeholder="Quantidade" value={formData.quantity} onChange={handleInputChange} required />
                <label htmlFor="photoUnpacked">Foto do item desembalado (até 2mb)</label>
                <input type="file" name="photoUnpacked" onChange={handleFileChangeUnpacked} required />
                <label htmlFor="photoPacked">Foto do item embalado (até 2mb)</label>
                <input type="file" name="photoPacked" onChange={handleFileChangePacked} required />
                <input type="text" name="dimensions" placeholder="Dimensões" value={formData.dimensions} onChange={handleInputChange} />
                <br />
                <button type="submit" className='cadastro_button'>Cadastrar Item</button>
            </form>
            {showConfirmation && (
                <div className="confirmation-modal">
                    <div className="confirmation-modal-content">
                        <h3>Conferir se os seus itens não estão:</h3>
                        <ul>
                            <li>Trincados</li>
                            <li>Rachados</li>
                            <li>Mofados</li>
                            <li>Enferrujados</li>
                        </ul> 
                        <br/>
                        <p>Doação não é descarte, doação é o que tem de melhor dentro de você.</p>
                        <br/><button className='cadastro_button aprovar' style={{marginLeft:"-10px", marginRight:"10px"}}onClick={confirmSubmit}>Clique aqui para confirmar</button>
                        <button className='cadastro_button' onClick={() => setShowConfirmation(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default NewItemForm;
