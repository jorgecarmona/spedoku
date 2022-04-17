/**
 * Difficulty Button Group in React
 * 
 * Provides a group with 3 buttons for setting difficulty level
 * Buttons are color coded to convey easy, medium and hard levels
 * 
 * This group is not meant to be anything for all component. It's a
 * component meant to provide the needs of the current app, therefore
 * it does not need to be more abstract or complex than necessary
 */
import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function DifficultyButtonGroup(props) {
  return (
    <div
      className="btn-group"
    >
      <button
        className="easy"
        onClick={() => props.setDifficultyLevel('easy')}
      >
        Easy
      </button>
      <button
        className="medium"
        onClick={() => props.setDifficultyLevel('medium')}
      >
        Medium
      </button>
      <button
        className="hard"
        onClick={() => props.setDifficultyLevel('hard')}
      >
        Hard
      </button>
    </div>
  );
}

DifficultyButtonGroup.propTypes = {
  setDifficultyLevel: PropTypes.func.isRequired
};

export default DifficultyButtonGroup;