import "../signin";

import {submitClickDummy, passwordEqualityValidation} from './signin.js';

document.addEventListener('DOMContentLoaded', () => {
    submitClickDummy();
    passwordEqualityValidation();
});