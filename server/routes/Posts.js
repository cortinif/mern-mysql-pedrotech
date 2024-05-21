const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

router.get('/', async (req,res)=>{
    res.json(await Posts.findAll());
});

router.post('/', async (req,res)=>{
    const postReq = req.body;
    const postRes = await Posts.create(postReq);
    res.json(postRes);
});

router.put('/', (req,res)=>{
    res.json();
});

router.delete('/', (req,res)=>{
    res.json();
});

router.get('/:id', async (req,res)=>{
    const id = req.params.id;
    res.json(await Posts.findByPk(id));
});

module.exports = router;