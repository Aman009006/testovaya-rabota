import React, { useState } from 'react';

const FAQ = () => {
  // Вопросы и ответы
  const faqData = [
    { question: 'How long does a cryptocurrency exchange take?', answer: 'Exchange processing time depends on the selected currencies and network congestion. Typically the exchange takes from a few minutes to several hours.' },
    { question: 'How to safely exchange cryptocurrency?', answer: 'We ensure the security of all transactions using encryption technologies. Always check the recipients address before sending funds.' },
    { question: 'What cryptocurrencies are available for exchange?', answer: 'We support many popular cryptocurrencies, including Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), Ripple (XRP), and others. The list of available currencies is updated regularly.' },
    { question: 'How to start exchanging cryptocurrency?', answer: 'To start exchanging cryptocurrency, select the currency you want to exchange and the currency you want to exchange into. After that, perform the operation by following the instructions on the screen.' },
    { question: 'What is the cryptocurrency exchange rate?', answer: 'The exchange rate depends on current market conditions and may change in real time. We provide current courses on our website.' },
    { question: 'What are the fees for cryptocurrency exchange?', answer: 'The exchange fee depends on the type of exchange and currency. You can see the exact commission on the exchange page before confirming the transaction.' },
    { question: 'Can I exchange cryptocurrency without registration?', answer: 'Yes, you can exchange on our platform without having to create an account.' },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Frequently Asked Question.</h1>
      <div style={styles.accordion}>
        {faqData.map((item, index) => (
          <AccordionItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
};

// Компонент для одного элемента аккордеона
const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={styles.item}>
      <div
        style={styles.question}
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <span style={styles.toggleIcon}>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <div style={styles.answer}>{answer}</div>}
    </div>
  );
};

// Стили
const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#4472f9',
  },
  accordion: {
    marginTop: '10px',
  },
  item: {
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  question: {
    padding: '15px',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  toggleIcon: {
    fontSize: '20px',
  },
  answer: {
    padding: '15px',
    backgroundColor: '#fff',
    borderTop: '1px solid #ddd',
    fontSize: '14px',
    color: '#555',
  },
};

export default FAQ;
