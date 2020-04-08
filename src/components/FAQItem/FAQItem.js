import React from 'react';
import css from './FAQItem.css';

const FAQItem = ({ img, title }) => {
  return (
    <div>
      <div className={css.FAQItemContainer}>
        <img className={css.img} src={img} alt=""></img>

        <div className={css.FAQItemContent}>
          {title}
          </div>

      </div>
    </div>
  );
};

export default FAQItem;
