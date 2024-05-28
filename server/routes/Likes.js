const express = require('express');
const router = express.Router();
const { Likes } = require('../models');
const { validateToken } = require('../middleware/AuthMiddleware');

router.post('/', validateToken,async (req,res)=>{
    const userId = req.user.id;
    const {PostId} = req.body;
    // if like to the Post from the user.id just exist, it cannot be created
    const le = await Likes.findOne({where:{PostId:PostId,UserId:userId}});
    console.log(le);
    let postRes;
    if(le){
        const tld = await Likes.destroy({where:{PostId:userId,UserId:userId}});
        postRes = {totalLikesDeleted:tld,LikesDeleted:le}
    }
    else{
        postRes = await Likes.create({PostId:PostId,UserId:userId});
    }
    res.json(postRes);
});

module.exports = router;