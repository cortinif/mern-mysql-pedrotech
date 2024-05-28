const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middleware/AuthMiddleware');

router.post('/', async (req,res)=>{
    const {username,password} = req.body;
    bcrypt.hash(password,10).then((hash)=>{
        Users.create({username: username, password: hash});
    });
    res.json("success");
});
router.post('/login', async (req,res)=>{
    const {username, password} = req.body;
    const user = await Users.findOne({where: {username: username}});
    if(!user) return res.json({error: "Wrong credentials"});
    bcrypt.compare(password, user.password).then((match)=>{
        if(!match) return res.json({error: "Wrong credentials"});

        const accessToken = sign({username: user.username, id: user.id},
            "importantsecret");
        res.json({token: accessToken,username: username,id: user.id});
    });
});

router.get("/auth", validateToken, (req, res) =>{
    res.json(req.user);
});

router.get("/basicInfo/:id", async(req, res) =>{
    const id = req.params.id;
    const basicInfo = await Users.findByPk(id,{attributes: {exclude: ['password']}});
    res.json(basicInfo);
});

router.put("/change-password", validateToken, async(req, res) =>{
    const {oldPassword,newPassword} = req.body;
    const user = await Users.findOne({where: {username: req.user.username}});
    bcrypt.compare(oldPassword, user.password).then((match)=>{
        if(!match) return res.json({error: "Wrong password enter"});
        bcrypt.hash(newPassword,10).then((hash)=>{
            Users.update({password: hash},{where:{id:user.id}});
        });
    });
    res.json("Success");
});

module.exports = router;