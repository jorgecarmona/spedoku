/**
 * Button group React component
 * 
 * Provides a button group with:
 * - button as trigger that results in update to textSectionLabel
 * - section to display status text (textSectionLabel)
 * 
 * Component allows selection of placement of both trigger button
 * and text section.
 * 
 * If trigger prop not passed, component will add 
 * not-allowed cursor class to button
 */
import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function StatusButtonGroup(props) {
  const {
    buttonLabel,
    buttonLocation,
    textSectionLabel,
    trigger
  } = props;

  if (buttonLocation === 'right') {
    return (
      <div
        className="status-btn-group"
      >
        <button
          className="text-section left-text"
        >
          {textSectionLabel}
        </button>
        {
          trigger &&
          <button
            className="right-btn"
            onClick={() => trigger()}
          >
            {buttonLabel}
          </button>
        }
        {
          !trigger &&
          <button
            className="right-btn not-allowed"
          >
            {buttonLabel}
          </button>
        }
      </div>
    );
  }

  return (
    <div
      className="status-btn-group"
    >
      {
        trigger &&
        <button
          className="left-btn"
          onClick={() => trigger()}
        >
          {buttonLabel}
        </button>
      }
      {
        !trigger &&
        <button
          className="left-btn not-allowed"
        >
          {buttonLabel}
        </button>
      }
      <button
        className="text-section right-text"
      >
        {textSectionLabel}
      </button>
    </div>   
  );
};

StatusButtonGroup.propTypes = {
  buttonLocation: PropTypes.oneOf(['left', 'right']),
  buttonLabel: PropTypes.string,
  textSectionLabel: PropTypes.string,
  trigger: PropTypes.func
};

StatusButtonGroup.defaultProps = {
  buttonLocation: 'left',
  buttonLabel: 'Label not set'
};

export default StatusButtonGroup;