// EyeIcon.js
import React from 'react';
import './eyeIcon.css';
import PropTypes from "prop-types";
const EyeIcon = ({ direction }) => {
    return (
        <div className={`eye-icon eye-icon-${direction}`}>
            <img src="../../img/eye.jpg" alt={`Eye ${direction}`} />
        </div>
    );
}
EyeIcon.propTypes = {
    direction: PropTypes.string.isRequired,
};
export default EyeIcon;
