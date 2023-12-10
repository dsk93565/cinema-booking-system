import React, { useState } from 'react';
import axios from 'axios';
import '../stylings/temporary.css';

  const TemporaryManagePromotions = () => {
  const [promotionCode, setPromotionCode] = useState('');
  const [percent, setPercent] = useState('');
  const [removePromoCode, setRemovePromoCode] = useState('');

  const handleAddPromotion = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/admin/add-promo', {
        user_token: localStorage.getItem('userToken'),
        promotion_code: promotionCode,
        percent: percent
      });
      console.log(response.data);
      // Additional logic after successful addition
    } catch (error) {
      console.error('Error adding promotion:', error);
    }
  };

  // Implement handleRemovePromotion similarly

  const handleRemovePromotion = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/admin/remove-promo', {
        user_token: localStorage.getItem('userToken'),
        promotion_code: removePromoCode
      });
      console.log(response.data);
      // Additional logic after successful removal
    } catch (error) {
      console.error('Error removing promotion:', error);
    }
  };


  return (
    <section className='temporary section-wrapper'>
      <div className='section-container-narrow'>
        <h2>Manage promotions</h2>
        <input 
          type="text" 
          placeholder="Promotion Code" 
          value={promotionCode} 
          onChange={(e) => setPromotionCode(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Discount Percent" 
          value={percent} 
          onChange={(e) => setPercent(e.target.value)} 
        />
        <button className='CTA-button-one' onClick={handleAddPromotion}>Add promotion</button>
        <button className='CTA-button-one'>Remove promotion</button>
      </div>
    </section>
  )
}

export default TemporaryManagePromotions;
