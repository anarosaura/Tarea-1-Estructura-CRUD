const {response} = require('express');
const User = require('../models/user');
const ResponseStatus = require('./../../utils/response-status')
const fetch = require('node-fetch');

class usersController {
    getUsers(req, res){
        const users = fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => res.send(data))
        .catch(error => console.log(error));
   }

   getUserById(req, res){
    const users = fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(users => {
            const userId = parseInt(req.params.id, 10);  // se asegura que es un entero
            const user = users.find(u => u.id === userId);
            if (user) {
                res.json(user);
            } else {
            res.status(ResponseStatus.BAD_REQUEST).send('User not found');
        }})
        .catch(error => {
            console.error(error);
            res.status(500).send('An error occurred');
   })
}

   createUser(req, res){
    const customHeaders = {
        'Content-Type': 'application/json',
    };
    const {newUser} = req.body;
    console.log(newUser);

    if (!newUser) {
        return res.status(400).send('newUser is undefined');
    }

    fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(newUser),
    })
        .then((response) => response.json())
        .then((data) => {
            res.json({
                message: "Usuario creado exitosamente",
                data: data
            });
        })
        .catch((error) => {
            console.error('error in execution', error);
        });

};

   updateUser(req, res){
    const customHeaders = {
        'Content-Type': 'application/json',
    };
    const { updatedUser } = req.body; // Datos del usuario a actualizar
    const userId = parseInt(req.params.id, 10); 

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            // Encuentra el usuario
            const user = users.find(u => u.id === userId);
            if (!user) {
                return res.status(404).send('User not found');
            }

            return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
                    method: 'PUT',
                    headers: customHeaders,
                    body: JSON.stringify(updatedUser)
                })
                .then(response => response.json())
                .then(data => {
                    res.json({
                        message: "Usuario actualizado exitosamente",
                        data: data
                    });
                });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('An error occurred');
        });
}

   deleteUser(req, res){
    const userId = parseInt(req.params.id, 10); // Se asegura de que es un entero
    const customHeaders = {
        'Content-Type': 'application/json',
    };

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
            method: 'DELETE',
            headers: customHeaders,
        })
        .then(response => response.json())
        .then(() => {
            res.status(200).json({
                message: "Usuario eliminado exitosamente"
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Ocurrió un error al intentar eliminar el usuario');
        });
}}

module.exports = new usersController();