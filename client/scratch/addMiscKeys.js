const fs = require('fs');
const path = require('path');
const locales = ['ar.json', 'de.json', 'en.json', 'es.json', 'fr.json', 'pt.json', 'zh.json'];

locales.forEach(file => {
    const fp = path.join(__dirname, '../messages', file);
    if (!fs.existsSync(fp)) return;
    const c = JSON.parse(fs.readFileSync(fp, 'utf8'));
    if (!c.global) c.global = {};
    c.global.noContent = "No content found matching your current filters.";
    c.global.all = "All";
    c.global.topRating = "Top Rating";
    
    // Also adding some from PersonCard
    c.button.addFavorite = "Add favorite";
    
    // AvatarCropperDialog
    if(!c.user) c.user = {};
    c.user.cropImage = "Crop Image";
    c.button.cancel = "Cancel";
    c.button.save = "Save";

    fs.writeFileSync(fp, JSON.stringify(c, null, 2), 'utf8');
});
