import React, { useState, useEffect } from 'react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const users = [
    {
      id: 1736349690673,
      name: "Peter",
      rating: 5,
      review: "Great exchange, fast and reliable!"
    },
    {
      id: 1736349690674,
      name: "User3109",
      rating: 5,
      review: "👍👍"
    },
    {
      id: 1736349690675,
      name: "Arjun Sharma",
      rating: 4,
      review: "सुव्यवस्थित लेनदेन, अत्यधिक सिफारिश करता हूँ!"
    },
    {
      id: 1736349690676,
      name: "Anish Kapoor",
      rating: 4,
      review: "Quick and efficient crypto exchange"
    },
    {
      id: 1736349690677,
      name: "User0023",
      rating: 4,
      review: "Great platform, fast and secure!"
    },
    {
      id: 1736349690678,
      name: "Neha Mehta",
      rating: 5,
      review: "Best exchange I've used, highly recommended!"
    },
  ];
  
  // Загрузка отзывов из Local Storage
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    console.log(storedReviews);
    
    if (storedReviews && !storedReviews.length) {
        localStorage.setItem('reviews', JSON.stringify(users))
    }
    setReviews(storedReviews);
  }, []);

  return (
    <div className='rv_content'>
      <h1 style={styles.title}>Reviews</h1>

    {/* Блок отображения отзывов */}
    <ReviewsList reviews={reviews} />
        
    <div style={styles.container}>

     

      {/* Блок написания отзыва */}
      <ReviewForm
        onNewReview={(newReview) => {
          const updatedReviews = [newReview, ...reviews];
          setReviews(updatedReviews);
          localStorage.setItem('reviews', JSON.stringify(updatedReviews));
        }}
      />
    </div>
    </div>
  );
};

// Компонент отображения отзывов
const ReviewsList = ({ reviews }) => (
  <div style={styles.reviewsList}>
    {reviews.length > 0 ? (
      reviews.map((item) => (
        <div key={item.id} style={styles.reviewItem}>
          <h4>{item.name}</h4>
          <p>{item.review}</p>
          <div>
            {Array(item.rating)
              .fill('★')
              .map((star, index) => (
                <span key={index} style={styles.starFilled}>
                  {star}
                </span>
              ))}
            {Array(5 - item.rating)
              .fill('☆')
              .map((star, index) => (
                <span key={index} style={styles.starEmpty}>
                  {star}
                </span>
              ))}
          </div>
        </div>
      ))
    ) : (
      <p>There are no reviews yet. Be the first!</p>
    )}
  </div>
);

// Компонент формы написания отзыва
const ReviewForm = ({ onNewReview }) => {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !review || rating === 0) {
      alert('Please fill in all fields and rate.');
      return;
    }

    const newReview = {
      id: Date.now(),
      name,
      review,
      rating,
    };

    onNewReview(newReview);

    // Очистка полей после отправки
    setName('');
    setReview('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <textarea
        placeholder="Your feedback"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        style={styles.textarea}
      />
      <div style={styles.ratingContainer}>
        <label>Grade:</label>
        <div style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={star <= rating ? styles.starFilled : styles.starEmpty}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <button type="submit" style={styles.button}>
      Send feedback
      </button>
    </form>
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
    color: '#333',
  },
  reviewsList: {
    marginBottom: '30px',
    display: 'flex',
    overflowX: 'auto', // Горизонтальный скролл
    scrollSnapType: 'x mandatory', // Привязка к слайдам
    gap: '20px', // Расстояние между слайдами
    padding: '10px',
  },
  reviewItem: {
    borderBottom: '1px solid #ddd',
    padding: '10px 10px',
    width: '400px !important',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    flexShrink: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    minHeight: '80px',
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  stars: {
    marginLeft: '10px',
    cursor: 'pointer',
  },
  starFilled: {
    color: '#FFD700',
    fontSize: '24px',
    cursor: 'pointer',
  },
  starEmpty: {
    color: '#ddd',
    fontSize: '24px',
    cursor: 'pointer',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Reviews;
