const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const cors = require('cors');
const users = [{
    email: 'emiliomayorgapina@outlook.com',
    password: 'HolaMundo1!',
}]

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

// Endpoint POST
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    user = users.find((u) => u.email == email && u.password == password)
    if (user) {
        return res.json({
            token: 'Token-Auth-Demo',
            message: 'Acceso Autorizado'
        });
    }

    return res.status(403).json({ message: 'Credenciales incorrectas' });
});

app.post('/create-account', (req, res) => {
    const { email, password } = req.body;
    user = users.find((u) => u.email == email && u.password == password)

    if (!user) {
        users.push({ email, password })
        return res.json({
            toke: 'Token-Auth-Demo',
            message: 'Acceso Autorizado'
        });
    }
    return res.status(400).json({ message: 'El correo ya se encuentra registrado' });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
