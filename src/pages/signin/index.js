import "../partials/inputField.css";
import "../partials/submitButton.css";
import "../partials/linkAway.css";

import {submitClickDummy, passwordEqualityValidation} from './signin.js';

document.addEventListener('DOMContentLoaded', () => {
    submitClickDummy();
    passwordEqualityValidation();
});