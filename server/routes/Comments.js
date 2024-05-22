const express = require('express');
const router = express.Router();
const { Comments } = require('../models');

router.get('/:postId', async (req,res)=>{
    const postId = req.params.postId;
    console.log(postId);
    res.json(await Comments.findAll({
        where: {postId:postId}
    }));
});

router.post('/', async (req,res)=>{
    const commentReq = req.body;
    const commentRes = await Comments.create(commentReq);
    res.json(commentRes);
});

module.exports = router;