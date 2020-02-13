import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import axios from 'axios';
import { ListingCalculatorResultCard } from '../../components';

import css from './SectionCalculator.css';
import { SocialMediaButtons } from '../../components';

const SectionCalculator = props => {
  const { rootClassName, className, title, description } = props;

  const classes = classNames(rootClassName || css.root, className);
  const [socialMediaSelected, setSocialMediaSelected] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [calculatedData, setCalculatedData] = useState();
  const handleOnClick = e => {
    setSocialMediaSelected(e.target.value);
  };
  const handleCalculate = _ => {
    const data = { service: socialMediaSelected, username: inputValue };
    axios
      .post('/api/calculate', data)
      .then(res => {
        setCalculatedData(res);
      })
      .catch(err => console.log(err));
  };
  const handleOnChange = value => {
    setInputValue(value);
  };
  const calculatorResult = calculatedData ? (
    calculatedData.data.error ? (
      <p className={css.alert}>
        There was a problem loading your information, please verify your username and be sure the
        account is public
      </p>
    ) : (
      <ListingCalculatorResultCard
        img={calculatedData.data.data.photo}
        username={inputValue}
        audience={calculatedData.data.followers}
        platform={socialMediaSelected}
        engagementRate={calculatedData.data.calculations.engagementRate}
        estimatedLowPrice={calculatedData.data.calculations.lowerPrice}
        estimatedHighPrice={calculatedData.data.calculations.price}
      />
    )
  ) : null;
  return (
    <div className={classes}>
      <div className={css.title}>
        <h1>{title}</h1>
      </div>
      <div className={css.description}>
        <p>{description}</p>
      </div>
      <SocialMediaButtons handleOnClick={handleOnClick} />
      <div className={css.calculatorInput}>
        <p className={css.inputTitle}>Username</p>
        <input
          placeholder="username"
          onChange={e => handleOnChange(e.target.value)}
          value={inputValue}
        ></input>
        <button className={css.button} onClick={handleCalculate}>
          Calculate
        </button>
        <div className={css.calculator}>{calculatorResult}</div>
      </div>
    </div>
  );
};

SectionCalculator.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionCalculator.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionCalculator;
