import React, { useState } from 'react';
import { getFirestore, addDoc, collection } from "firebase/firestore";

function Receber({ userId, setCadastrar }) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        cpf: '',
        cityState: '',
        fullAddress: '',
        mobileWhatsapp: '',
        employmentStatus: '',
        workAddress: '',
        familyMembers: '',
        mainNeeds: '',
        photos: []
    });

    const db = getFirestore();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const readers = files.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise(resolve => {
                reader.onload = () => resolve(reader.result);
            });
        });
        Promise.all(readers).then(images => {
            setFormData({ ...formData, photos: images });
        });
    };

    const handleCheckboxChange = (item, category) => {
        const itemIndex = selectedItems.findIndex(si => si.item === item && si.category === category);
        if (itemIndex !== -1) {
            const newSelectedItems = [...selectedItems];
            newSelectedItems.splice(itemIndex, 1);
            setSelectedItems(newSelectedItems);
        } else {
            setSelectedItems([...selectedItems, { category, item }]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const confirmSubmit = async () => {
        const needDoc = {
            ...formData,
            items: selectedItems,
            userId,
            timestamp: new Date(),
            status: 'pending'
        };

        try {
            setLoading(true);
            await addDoc(collection(db, "NeedsToApprove"), needDoc);
            alert('Cadastro realizado com sucesso! Aguarde o contato da equipe de aprovação.');
            setCadastrar(null);
        } catch (error) {
            alert('Erro ao enviar dados: ' + error.message);
        } finally {
            setLoading(false);
            setShowConfirmation(false);
        }
    };

    const items = {
        "Esquadrias e Segurança": ["Janela", "Porta", "Portão", "Veneziana", "Grade"],
        "Mobiliário e Eletroeletrônicos": ["Armário", "Cadeira", "Mesa", "Sofá", "TV"],
        "Louças, Metais e Hidráulica": ["Cano", "Chuveiro", "Cuba, pia", "Torneira"],
        "Iluminação e Elétrica": ["Luminária", "Lâmpada", "Interruptor", "Tomada"],
        "Revestimento e Pedra": ["Piso", "Cerâmica", "Granito", "Mármore"],
        "Estrutura e Cobertura": ["Bloco", "Cimento", "Madeira", "Telha"],
        "Ferramentas e Peças Metálicas": ["Alicate", "Chave", "Furadeira", "Martelo"]
    };

    return (
        <>
            {loading && <div className="loading">Carregando...</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '350px' }} className='cadastro_form'>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                <input type="text" name="fullName" placeholder="Nome Completo" value={formData.fullName} onChange={handleInputChange} required />
                <input type="text" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleInputChange} required />
                <input type="text" name="cityState" placeholder="Cidade/Estado" value={formData.cityState} onChange={handleInputChange} required />
                <input type="text" name="fullAddress" placeholder="Endereço Completo" value={formData.fullAddress} onChange={handleInputChange} required />
                <input type="text" name="mobileWhatsapp" placeholder="Celular/Whatsapp" value={formData.mobileWhatsapp} onChange={handleInputChange} required />
                <div>
                    <label>Ocupação:</label>
                    <div style={{ display: 'flex', flexDirection: 'row', fontSize:"12px", alignItems:"center", marginBottom:"10px" }}>
                    <input type="radio" name="employmentStatus" value="Empregado" onChange={handleInputChange} /> Empregado
                    <input type="radio" name="employmentStatus" value="Desempregado" onChange={handleInputChange} /> Desempregado
                    <input type="radio" name="employmentStatus" value="Do Lar" onChange={handleInputChange} /> DoLar
                    <input type="radio" name="employmentStatus" value="Outro" onChange={handleInputChange} /> Outro
                    </div>
                </div>
                {formData.employmentStatus === 'Empregado' && (
                    <input type="text" name="workAddress" placeholder="Endereço do Trabalho" value={formData.workAddress} onChange={handleInputChange} required />
                )}
                <input type="number" name="familyMembers" placeholder="Nº de membros da Família que residem no local" value={formData.familyMembers} onChange={handleInputChange} required />
                <textarea name="mainNeeds" placeholder="Descritivo das Necessidades Principais" value={formData.mainNeeds} onChange={handleInputChange} required />
                <label>Fotos (até 4mb):</label>
                <input type="file" multiple onChange={handleFileChange} required />

                <label>Descritivo das perdas na residência:</label> <br/>
                {Object.entries(items).map(([category, itemList]) => (
    <div key={category} style={{ display: 'flex', flexDirection: 'column', fontSize: "14px", alignItems: "center" }}>
        <label style={{fontStyle:'italic'}}>{category}</label>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' , gap:"5px"}}>
            {itemList.map(item => (
                <div key={item} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={selectedItems.some(si => si.item === item && si.category === category)}
                            onChange={() => handleCheckboxChange(item, category)}
                            style={{ marginRight: '5px' }}  // Espaço entre o checkbox e o texto
                        /> {item}
                    </label>
                </div>
            ))}
        </div>
    </div>
))}


                <button type="submit" className='cadastro_button'>Solicitar Doações</button>
            </form>
        </>
    );
}

export default Receber;
