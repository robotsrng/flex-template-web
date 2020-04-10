import React from 'react';
import { richText } from '../../util/richText';

import css from './ListingPage.css';

const MIN_LENGTH_FOR_LONG_WORDS_IN_DESCRIPTION = 20;

const SectionDescriptionMaybe = props => {
  const { description, title } = props;
  return description && title ? (
    <div className={css.sectionDescription}>
      <h1 className={css.title}>{title}</h1>
      <p className={css.description}>
        {richText(description, {
          longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_DESCRIPTION,
          longWordClass: css.longWord,
        })}
      </p>
    </div>
  ) : null;
};

export default SectionDescriptionMaybe;
