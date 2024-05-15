import React , {useState} from 'react';
import './LandingPage.css';
import Chuva from './chuva.jpg';
 // Supondo que você tenha um arquivo CSS para estilização

function LandingPage() {
    const [ui, setUi] = useState('sobre');
    return (
        <div className="landing-container">
            <div className="landing_header">
                {/* <section className="title"> */}
                <img src={Chuva} className='back_image' alt="Chuva" />
                {/* <h3>CAMPANHA INDEPENDENTE FRUTO DA UNIÃO DE ARQUITETOS DO BRASIL TODO EM PROL DA RECONSTRUÇÃO DO SUL</h3> */}

                <img className='header_logo' src="/reconstrusul.png"  alt="Logo ReconstruSul" />
                {/* </section> */}
             
            </div>
            <div className="content">
                {/* botão Clique aqui para doar */}
                <section className="donate">
                <a href="/app" className="donate-button"> <h2>Clique aqui para doar</h2></a>
                    {/* route /app */}
                   
                </section>
                {ui === 'sobre'&& (<>
                <div className="about">
                <section className="mission">
                    <h2>Nossa Missão</h2>
                    <p>Unir o maior número de arquitetos, designers, engenheiros, lojistas e empresários do segmento de Arquitetura & Construção, para conscientizar seus clientes e prestadores de serviço a doar TODO e qualquer item de obra que iria ser DESCARTADO.</p>
                </section>
                <section className="recipients">
                    <h2>Quem Vai Receber as Doações?</h2>
                    <p>As arquitetas do Rio Grande do Sul que fazem parte desta iniciativa são:</p>
                    <ul>
                        <li>Aline Vilela, Sabrina Marques, Francini Mello</li>
                        <li>Andrea Tessaro, Carlem Dorigon</li>
         
                    </ul>
                    <p>As doações vão atender cidades pequenas do interior do RS, onde a ajuda é mais difícil de chegar.</p>
                </section>
                </div>
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
                <br/><br/>
                </>)}
                
                {ui === 'oquedoar' && (
  <>
    <section className="donation-items">
      <h2>O Que Doar?</h2>
      <p>Lista de itens que podem ser doados, detalhada por categoria:</p> <br/>
      <div className='donation_categories'>
      <div>
      <h3>Esquadrias e Segurança</h3>
      <ul>
        <li>Janela</li>
        <li>Porta</li>
        <li>Portão</li>
        <li>Veneziana</li>
        <li>Grade</li>
        <li>Cadeado</li>
        <li>Corrente</li>
        <li>Fechadura</li>
        <li>Dobradiça</li>
      </ul>
      </div><div>
      <h3>Mobiliário e Eletroeletrônicos</h3>
      <ul>
        <li>Armário</li>
        <li>Bancada</li>
        <li>Cadeira</li>
        <li>Colchão</li>
        <li>Cortina</li>
        <li>Estante</li>
        <li>Mesa</li>
        <li>Sofá</li>
        <li>TV</li>
        <li>Fogão</li>
        <li>Microondas</li>
        <li>Geladeira</li>
      </ul>
      </div><div>
      <h3>Louças, Metais e Hidráulica</h3>
      <ul>
        <li>Cano, sifão</li>
        <li>Chuveiro</li>
        <li>Cuba, pia</li>
        <li>Gancho</li>
        <li>Lixeira</li>
        <li>Papeleira</li>
        <li>Torneira</li>
        <li>Ralo</li>
        <li>Saboneteira</li>
        <li>Vaso Sanitário e tampa</li>
      </ul>
      </div><div>
      <h3>Iluminação e Elétrica</h3>
      <ul>
        <li>Luminária</li>
        <li>Lâmpada</li>
        <li>Painel de LED</li>
        <li>Tomada</li>
        <li>Interruptor</li>
        <li>Fiação</li>
        <li>Conduíte</li>
      </ul>
      </div><div>
      <h3>Revestimento e Pedra</h3>
      <ul>
        <li>Piso</li>
        <li>Cerâmica</li>
        <li>Granito</li>
        <li>Mármore</li>
        <li>Paver</li>
        <li>Rodapé</li>
        <li>Seixos</li>
      </ul>
      </div>
      <div>
      <h3>Ferramentas e Peças Metálicas</h3>
      <ul>
        <li>Alicate</li>
        <li>Broca</li>
        <li>Chave</li>
        <li>Enxada</li>
        <li>Escada</li>
        <li>Fita veda rosca</li>
        <li>Furadeira</li>
        <li>Marreta</li>
        <li>Martelo</li>
        <li>Parafusadeira</li>
        <li>Parafuso, prego</li>
        <li>Rolo, pincel</li>
        <li>Trena</li>
        <li>Balde</li>
      </ul> </div>
      <div>
      <h3>Estrutura e Cobertura</h3>
      <ul>
        <li>Areia</li>
        <li>Bloco</li>
        <li>Brita</li>
        <li>Cimento</li>
        <li>Lona</li>
        <li>Madeira</li>
        <li>Rejunte</li>
        <li>Telha</li>
        <li>Tijolo</li>
        <li>Tinta</li>
      </ul>
      </div>
     
      </div>
    </section>
  </>
)}

                {ui === 'faq'&& (<><section className="faqs">
                    <h2>FAQs</h2>
                    <ul>
                    <p><strong> Vocês fazem retiradas das doações? </strong></p>
                    <p> Não.</p>

                    <p><strong>Quais cidades estão participando do Projeto?</strong></p>
                    <p>São Paulo, São Caetano, etc.</p>

                    <p><strong>Quais locais posso deixar minhas doações?</strong></p>
                    <p>Cadastre seu item neste portal para receber o endereço do galpão disponível.</p>

                    <p><strong>Será direcionado direto para as famílias?</strong></p>
                    <p>Será direcionado para um Galpão no RS, onde as arquitetas responsáveis irão direcionar para as famílias de cidades menores, com idosos e portadores de deficiência física.</p>

                       
                    </ul>
                </section>
                <div className="contact">
                <h2>Dúvidas?</h2>
                <p>Entre em contato conosco através do email: <br/>
                <a href='mailto:reconstrusul.sos@gmail.com' style={{textDecoration:"none", color:"black"}}>reconstrusul.sos@gmail.com</a>
                    </p>
            </div><br/><br/>
            </>)}
            </div>
      
        
            <footer>
                <div className='footer'>
                <div className='sobre' onClick={()=>{setUi('sobre')}}> Sobre
                    </div>
                <div className='faq'
                onClick={()=>{setUi('faq')}}>FAQ</div>
    
                <div className='oquedoar' onClick={()=>{setUi('oquedoar')}}>O que doar</div>

                </div>
            </footer>

        
        
        </div>

    );
}

export default LandingPage;
