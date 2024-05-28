const express = require('express');
const router = express.Router();
const { Posts,Likes } = require('../models');
const { validateToken } = require('../middleware/AuthMiddleware');

router.get('/',validateToken, async (req,res)=>{
    const listoOfPosts = await Posts.findAll({include: [Likes]})
    const likedPosts = await Posts.findAll({where:{UserId:req.user.id}})
    res.json({listoOfPosts:listoOfPosts,likedPosts:likedPosts});
});

router.post('/',validateToken, async (req,res)=>{
    const postReq = req.body;
    postReq.username = req.user.username;
    postReq.UserId = req.user.id;
    const postRes = await Posts.create(postReq);
    res.json(postRes);
});
router.put('/',validateToken, async (req,res)=>{
    const postReq = req.body;
    await Posts.update({title:postReq.title,postText:postReq.postText},{where:{id:postReq.id}});
    res.json(await Posts.findByPk(postReq.id));
});

router.get('/:id', async (req,res)=>{
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
});
router.get('/user/:id', async (req,res)=>{
    const id = req.params.id;
    const listOfPosts = await Posts.findAll({where:{UserId:id},include:[Likes]});
    res.json(listOfPosts);
});

router.delete('/:postId',validateToken, async (req,res)=>{
    const postId = req.params.postId;
    const postRes = await Posts.destroy({where:{id:postId}});
    res.json(postRes);
});

module.exports = router;