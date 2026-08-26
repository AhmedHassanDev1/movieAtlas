const fs = require('fs');
const path = require('path');
const locales = ['ar.json', 'de.json', 'en.json', 'es.json', 'fr.json', 'pt.json', 'zh.json'];

locales.forEach(file => {
    const fp = path.join(__dirname, '../messages', file);
    if (!fs.existsSync(fp)) return;
    const c = JSON.parse(fs.readFileSync(fp, 'utf8'));
    
    if(!c.global) c.global = {};
    c.global.searchMovies = "Search movies";
    
    fs.writeFileSync(fp, JSON.stringify(c, null, 2), 'utf8');
});
