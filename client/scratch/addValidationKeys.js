const fs = require('fs');
const path = require('path');
const locales = ['ar.json', 'de.json', 'en.json', 'es.json', 'fr.json', 'pt.json', 'zh.json'];

const validationKeys = {
    invalidEmail: "Please enter a valid email address",
    passwordLength: "Password must be at least 8 characters",
    passwordTooLong: "Password is too long",
    firstNameLength: "First name must be at least 2 characters",
    firstNameTooLong: "First name is too long",
    lastNameLength: "Last name must be at least 2 characters",
    lastNameTooLong: "Last name is too long"
};

locales.forEach(file => {
    const fp = path.join(__dirname, '../messages', file);
    if (!fs.existsSync(fp)) return;
    const c = JSON.parse(fs.readFileSync(fp, 'utf8'));
    if (!c.validation) c.validation = {};
    for (const [k, v] of Object.entries(validationKeys)) {
        c.validation[k] = v;
    }
    fs.writeFileSync(fp, JSON.stringify(c, null, 2), 'utf8');
});
