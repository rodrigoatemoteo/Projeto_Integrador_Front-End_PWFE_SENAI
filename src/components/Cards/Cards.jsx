import { useState } from 'react';

import './Cards.css';

export default function Cards(){
  
  const [ cards ] = useState([
    {
      title: 'Extrato',
      text: 'Lorem ipsum dolor sit'+ 
      'amet consectetur adipisicing'+ 
      'elit. Laboriosam esse molestiae'
    },
    {
      title: 'PIX',
      text: 'Lorem ipsum dolor sit'+ 
      'amet consectetur adipisicing'+ 
      'elit. Laboriosam esse molestiae'
    },
    {
      title: 'Empréstimo',
      text: 'Lorem ipsum dolor sit'+ 
      'amet consectetur adipisicing'+ 
      'elit. Laboriosam esse molestiae'
    },
    {
      title: 'Transferência',
      text: 'Lorem ipsum dolor sit'+ 
      'amet consectetur adipisicing'+ 
      'elit. Laboriosam esse molestiae'
    },
    {
      title: 'Pagamentos',
      text: 'Lorem ipsum dolor sit'+ 
      'amet consectetur adipisicing'+ 
      'elit. Laboriosam esse molestiae'
    },{
      title: 'Investimentos',
      text: 'Lorem ipsum dolor sit'+ 
      'amet consectetur adipisicing'+ 
      'elit. Laboriosam esse molestiae'
    },
  ]);

  return(
    <>
      <div>
        <section className='containerCards'>
          <div className='container'>
            <h1 className='titleCards'>Saldo disponível:</h1>
            <div className='cards'>
              {cards.map((card, i) => (
                <div key={i} className='card'>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}