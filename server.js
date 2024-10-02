const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, 'database.json');

// Middleware untuk parsing JSON
app.use(express.json());

// Menyajikan file statis (HTML, CSS, JS)
app.use(express.static(__dirname));

// Fungsi untuk membaca data dari database.json
function readData() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Fungsi untuk menulis data ke database.json
function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 4));
}

// Route untuk menangani POST /login
app.post('/login', (req, res) => {
    const newData = req.body;
    
    if (!newData.email || !newData.password) {
        return res.json({ message: 'Email and password are required.' });
    }

    // Baca data yang ada di database.json
    const currentData = readData();

    // Tambahkan data baru
    currentData.push(newData);

    // Tulis data baru ke database.json
    writeData(currentData);

    res.json({ message: 'Data saved successfully!' });
    console.log( message, 'Successful' )
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
