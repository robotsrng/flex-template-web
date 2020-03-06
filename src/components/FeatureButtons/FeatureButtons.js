import React from 'react';
import css from './FeatureButtons.css';
import config from '../../config';

const FeatureButtons = props => {
  return (
    <div className={css.linkAccountContainer}>
      {config.custom.postCategories.map(c =>
        props.list.includes(c.label) ? (
          <div className={css.colButtonsSelected} key={c.label}>
            <button value={c.label} onClick={props.handleOnClick}>
              {c.label}
            </button>
          </div>
        ) : (
          <div className={css.colButtons} key={c.label}>
            <button value={c.label} onClick={props.handleOnClick}>
              {c.label}
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default FeatureButtons;
