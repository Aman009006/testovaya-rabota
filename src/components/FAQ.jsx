import React, { useState } from 'react';

const FAQ = () => {
  // Вопросы и ответы
  const faqData = [
    { question: 'How long does a cryptocurrency exchange take?', answer: 'Exchange processing time depends on the selected currencies and network congestion. Typically the exchange takes from a few minutes to several hours.' },
    { question: 'Is it safe to use your exchanger?', answer: 'We pay special attention to safety. We use advanced data encryption, two-factor authentication and other measures to protect your funds and personal information.' },
    { question: 'Can I cancel the exchange?', answer: 'Once an exchange has been confirmed, it is usually not possible to cancel it, as the processing process begins immediately. Please check the exchange details carefully before confirming.' },
    { question: 'What should I do if I made a mistake when entering data?', answer: 'If you made a mistake when entering your details, please contact our support team immediately. The sooner you report an error, the greater the chance of fixing it.' },
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
