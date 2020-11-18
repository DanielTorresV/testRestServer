const exrpress = require('express');
const bcrypt = require('bcrypt')
const User = require('../models/user.js');
const user = require('../models/user.js');

const app = exrpress();

//Get all Users
app.get('/user', (req, res)=>{

    let limit = req.query.limit || 0;
    limit = Number(limit)

    let skip = req.query.skip || 0;
    skip = Number(skip);
    
    user.find({}).skip(skip).limit(limit).exec((err, usersDB)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.json({
            ok: true,
            users: usersDB
        })
    })
})

//Create User
app.post('/user', (req, res)=>{

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
    })
    
    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok:false,
                err: err
            })
        }

        res.json({
            ok: true,
            user: userDB
        })
    })

})

//Update User
app.put('/user/:id', (req, res)=>{

    let id = req.params.id;
    let body = req.body;

    user.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, userDB) =>{

        if (err) {
            return res.status(400).json({
                ok:false,
                err: err
            })
        }

        res.json({
            ok: true,
            user: userDB
        })
    });
})

app.delete('/user', (req, res)=>{
    res.json('delete user');
})

module.exports = app;