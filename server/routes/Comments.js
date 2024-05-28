const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { validateToken } = require('../middleware/AuthMiddleware');

router.get('/:postId', async (req,res)=>{
    const postId = req.params.postId;
    console.log(postId);
    res.json(await Comments.findAll({
        where: {postId:postId}
    }));
});

router.post('/',validateToken, async (req,res)=>{
    console.log(req.body);
    const commentReq = req.body;
    const username = req.user.username;
    commentReq.username = username;
    const commentRes = await Comments.create(commentReq);
    res.json(commentRes);
});

router.delete('/:commentId',validateToken, async (req,res)=>{
    const {commentId} = req.params;
    const commentRes = await Comments.destroy({where:{id:commentId}});
    res.json(commentRes);
});

module.exports = router;