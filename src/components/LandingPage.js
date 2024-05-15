import React from 'react';
import './LandingPage.css';
 // Supondo que você tenha um arquivo CSS para estilização

function LandingPage() {
    return (
        <div className="landing-container">
            <div className="header">
                <img src="/reconstrusul.png"  alt="Logo ReconstruSul" />
                <h3>CAMPANHA INDEPENDENTE FRUTO DA UNIÃO DE ARQUITETOS DO BRASIL TODO EM PROL DA RECONSTRUÇÃO DO SUL</h3>
            </div>
            <div className="content">
                {/* botão Clique aqui para doar */}
                <section className="donate">
                    <h2>Clique  <a href="/app" className="donate-button">AQUI</a> para doar</h2>
                    {/* route /app */}
                   
                </section>
                <section className="mission">
                    <h2>Qual a Missão da Campanha?</h2>
                    <p>Unir o maior número de arquitetos, designers, engenheiros, lojistas e empresários do segmento de Arquitetura & Construção, para conscientizar seus clientes e prestadores de serviço a doar TODO e qualquer item de obra que iria ser DESCARTADO.</p>
                </section>
                <section className="donation-info">
                    <h2>O que Preciso Saber Sobre a Campanha?</h2>
                    <ul>
                        <li>Não aceitamos dinheiro! Se pedirem PIX, NÃO FAÇA (já já estão dando golpe com nosso nome...)</li>
                        <li>Cada um é responsável pela sua região, faça o que for possível para arrecadar, conscientizar e ajudar.</li>
                        <li>Saiba que fazer trabalho voluntário dá muito trabalho, mas o retorno faz carinho na alma! É sobre propósito!</li>
                        <li>Não tem prazo de validade! Vai levar tempo até que eles consigam se reconstruir.</li>
                        <li>Não ache que você sozinho não pode ajudar! Todo mundo pode e juntos somos um exército!</li>
                    </ul>
                </section>
                <section className="recipients">
                    <h2>Quem Vai Receber as Doações?</h2>
                    <p>As arquitetas do Rio Grande do Sul que fazem parte desta iniciativa são:</p>
                    <ul>
                        <li>Aline Vilela</li>
                        <li>Sabrina Marques</li>
                        <li>Francini Mello</li>
                        <li>Andrea Tessaro</li>
                        <li>Carlem Dorigon</li>
                    </ul>
                    <p>As doações vão atender cidades pequenas do interior do RS, onde a ajuda é mais difícil de chegar.</p>
                </section>
                <section className="donation-items">
                    <h2>O Que Doar?</h2>
                    <p>Lista de itens que podem ser doados:</p>
                    <ul>
                        <li>Esquadrias e Segurança (Janelas, Portas, etc.)</li>
                        <li>Mobiliário e Eletroeletrônicos (Armários, Bancadas, etc.)</li>
                        <li>Louças, Metais e Hidráulica (Cano, Chuveiro, etc.)</li>
                        <li>Iluminação e Elétrica (Luminárias, Lâmpadas, etc.)</li>
                        <li>Revestimento e Pedra (Piso, Cerâmica, etc.)</li>
                        <li>Estrutura e Cobertura (Areia, Bloco, etc.)</li>
                        <li>Ferramentas e Peças Metálicas (Alicate, Broca, etc.)</li>
                    </ul>
                </section>
                <section className="faqs">
                    <h2>FAQs - ReconstruSul</h2>
                    <ul>
                        <li>Vocês fazem retiradas das doações? Não</li>
                        <li>Quais cidades estão participando do Projeto? São Paulo, São Caetano, etc.</li>
                        <li>Quais Locais posso deixar minhas doações? Na cidade de São Paulo, Galpão Sé, Praça da Sé 393 - São Paulo -SP</li>
                        <li>Será direcionado direto para as famílias? Será direcionado para um Galpão onde as arquitetas responsáveis irão direcionar para as famílias de cidades menores, com idosos e portadores de deficiência física.</li>
                    </ul>
                </section>
            </div>
            <div className="contact">
                <h2>Dúvidas?</h2>
                <p>Entre em contato conosco através do email: reconstrusul.sos@gmail.com</p>
            </div>
        </div>
    );
}

export default LandingPage;
