// EyeIcon.js
import React from 'react';
import './eyeIcon.css';
import PropTypes from "prop-types";
import eye from '../img/eye.jpg';
const EyeIcon = ({ direction }) => {
    return (
        <div className={`eye-icon eye-icon-${direction}`}>
            <img src={eye} alt={`Eye ${direction}`} />
        </div>
    );
}
EyeIcon.propTypes = {
    direction: PropTypes.string.isRequired,
};
export default EyeIcon;
