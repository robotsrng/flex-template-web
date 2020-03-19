import React from 'react';
import css from './ResourceItem.css';

const ResourceItem = ({
  resourceNumber,
  resourceSubTitle,
  resourceDescription,
}) => {
  return (
    <div>
      <hr></hr>  
      <div className={css.resourceNumberCircle}>
          <h3>{resourceNumber}</h3>
      </div>
      <div>
          <h2>{resourceSubTitle}</h2>
      </div>
      <div className={css.resourceDescriptionText}>
          <p>{resourceDescription}</p>
      </div>
    </div>
  );
};

export default ResourceItem;
