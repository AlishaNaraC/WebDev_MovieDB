// hashPassword.js
const bcrypt = require('bcrypt');

async function hashPassword() {
    try {
        const password = 'admin123'; // Replace with Admin's actual password
        const hashedPassword = await bcrypt.hash(password.toString(), 10);
        console.log('Hashed Password:', hashedPassword);
    } catch (err) {
        console.error('Error hashing password:', err);
    }
}

hashPassword();
