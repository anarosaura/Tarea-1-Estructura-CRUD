const router = require('express').Router();
const { response } = require('express');
const axios = require('axios');
const path = require('path');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('./auth');

router.get('', (req, res) => { // Página de inicio
    res.render('home', {
        title: 'Noticias'
    })
})

// REGISTER
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.redirect('/login'); // Redirigir al usuario a la página de inicio de sesión
    } catch (error) {
        console.log(error);
        res.redirect('/register');
    }
});

// LOGIN
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Encuentra el usuario y compara la contraseña
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).send("El usuario no existe");
            return;
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).send("La contraseña es incorrecta");
            return;
        }

        // Si las credenciales son correctas, genera un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true }).redirect('/news');
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor");
    }
});

// Página de noicias
router.get('/news', authenticate, async (req, res) => {
    try {
        const query = req.query.q;
        if (query) {
            const apiKey = process.env.NEWS_API_KEY;
            const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;
            const response = await axios.get(url);
            const news = response.data.articles;
            res.render('news', { news });
        } else {
            res.render('news');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al buscar noticias');
    }
});

module.exports = router;