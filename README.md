# Piiquante - Projet 6 de la formation Web Developer OpenclassRooms 

![Piiquante logo](https://github.com/imbertf/Piiquante_API/blob/master/images/piiquante_logo.jpg)

L'objectif de ce projet est de développer une API, pour la marque de condiments à base de piment "Piiquante", une application web de critique des sauces piquantes appelée « Hot Takes » .


## Dependencies

### Backend

    "bcrypt": "^5.1.0",
    "dotenv": "^16.0.3",
    "email-validator": "^2.0.4",
    "express": "^4.18.2",
    "express-rate-limit": "^6.7.0",
    "helmet": "^6.0.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.7.0",
    "mongoose-unique-validator": "^3.1.0",
    "multer": "^1.4.5-lts.1",
    "password-validator": "^5.3.0"

## Installation

### Backend
Demarrer le serveur : A partir du fichier backend, taper la commande "**npm start**".
Par défault : *http://localhost:3000/*

### Frontend
Demarrer le serveur : A partir du fichier frontend, taper la commande "**npm start**".
Par défault : *http://localhost:4200/*

## Postman

### Routes
Les routes nécéssitent une authentification par TOKEN (jwt)

### Routes POST
login: http://localhost:3000/api/auth/login

    body : 
        {
          "email": "exemple@test.com",
          "password": "Exemple1234"
        }

signup: http://localhost:3000/api/auth/signup

    body : 
        {
          "email": "exemple@test.com",
          "password": "Exemple1234"
        }

postSauce: http://localhost:3000/api/sauces

### Routes GET

getAll: http://localhost:3000/api/sauces

getOne: http://localhost:3000/api/sauces/:id

### Routes PUT

putOne: http://localhost:3000/api/sauces/:id

### Routes DELETE

deleteOne: http://localhost:3000/api/sauces/:id

## Security

- bcrypt : hash le mot de passe
- dotenv : stocke les informations sensibles en dehors de l'application
- email-validator : test l'email de l'utilisateur et valide son format
- password-validator : test le mot de passe de l'utilisateur et valide son format
- helmet : définit des en-têtes HTTP pour sécuriser l'application Express
- JSWT : JSon Web Token, sécurise l'authentification par l'utilisation d'un TOKEN
- express-rate-limit : limite le nombre de requêtes envoyées par l'utilisateur

### Contact

- github : https://github.com/imbertf
- mail : f.imbert4@gmail.com
