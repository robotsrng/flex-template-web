import React from 'react';
import css from './FAQItem.css';

const FAQItem = ({ img, title }) => {
  return (

    <div>
      <div className={css.FAQItemContainer}>
        <div className={css.diamond}>
          <img className={css.img} src={img} alt=""></img>
        </div>
        <div className={css.FAQItemContent}>
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
