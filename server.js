const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();


app.set('view engine', 'ejs');


app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/slike', (req, res) => {
    const folderPath = path.join(__dirname, 'public', 'images');
    const files = fs.readdirSync(folderPath);

    const images = files
        .filter(file => file.match(/\.(jpg|jpeg|png|svg)$/i))
        .map((file, index) => ({
            url: `/images/${file}`,
            title: `Slika ${index + 1}`
        }));

    res.render('slike', { images });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server pokrenut na portu ${PORT}`);
});