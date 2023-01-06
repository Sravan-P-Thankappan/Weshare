
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const userModel = require('../Model/usermodel')
const postModel = require('../Model/postmodel')
const commentModel = require('../Model/commentmodel')
const friendModel = require('../Model/friendmodel')
const chatModel = require('../Model/chat')
const messageModel = require('../Model/message')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')



module.exports = {

    doSignup: 
        
    (req, res) => {

        userModel.findOne({ email: req.body.email }).then((existingUser) => {

            if (existingUser) {

                res.status(403).json({ message: 'Email Id Is Already Exist ' })
            }

            else {

                bcrypt.hash(req.body.password, 10).then((password) => {

                    req.body.phone = Number(req.body.phone)
                    req.body.password = password

                    userModel.create(req.body).then((response) => {

                        const payload = {
                            id: response._id.toString(),
                            name: response.name
                        }

                        const token = jwt.sign(payload, process.env.jwtSecret, { expiresIn: '3d' })

                        res.status(200).json({ message: 'register success', usertoken: 'Bearer ' + token })

                    })
                        .catch(err => console.log(err.message))

                })
                    .catch((er) => console.log(er.message))

            }
        })
            .catch((err) => console.log(err.message))

    },


    doLogin: (req, res) => {

        userModel.findOne({ email: req.body.email }).then((user) => {

            if (user) {

                if (user.status) {

                    res.status(401).json({ message: 'This Account Is Blocked' })
                }
                else {

                    bcrypt.compare(req.body.password, user.password).then((status) => {

                        if (status) {

                            const payload = {
                                id: user._id.toString(),
                                name: user.name
                            }

                            const token = jwt.sign(payload, process.env.jwtSecret, { expiresIn: '3d' })

                            res.status(200).json({ message: 'Login success', usertoken: 'Bearer ' + token })

                        }

                        else res.status(401).json({ message: 'Incorrect Passowrd' })
                    })
                        .catch(er => console.log('error message checking    ', er.message))

                }

            }
            else {

                res.status(404).json({ message: 'Incorrect Email' })
            }

        })
    },



    getInvidualUser:(req,res)=>{

         const id = req.params.id

         userModel.findById(id).then((user)=>{
             
            res.status(200).json(user)
         })
         .catch((er)=>{

            res.status(500).json({message:er.message})
         })
    },



    addPost: (req, res) => {

        const id = ObjectId(req.body.user)
        let image = req.file.filename

        postModel.findOne({ userid: id }).then((response) => {

            if (response) {

                let data = {
                    images: [image],
                    description: req.body.description
                }

                postModel.updateOne({ _id: response._id },
                    { $push: { post: data } })
                    .then(() => {
                        res.status(200).json({ message: 'post is added successfully' })
                    })
                    .catch((er) => {
                        res.status(500).json({ message: er.message })
                    })
            }
            else {

                let data = {
                    userid: id,
                    post: [{
                        images: [image],
                        description: req.body.description
                    }]
                }


                postModel.create(data)
                    .then(() => {
                        res.status(200).json({ message: 'post is added successfully' })
                    })
                    .catch(err => res.status(500).json({ message: err.message }))
            }

        })
    },


    getPost: (req, res) => {

        postModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userid',
                    foreignField: '_id',
                    as: 'user'
                }
            },

            { $unwind: '$post' }, { $unwind: '$user' }, 
             
            {
                $match:{'post.reportStatus':false}
            }
            ,
            
            { $project: { userid: 0, "post.reportStatus": 0} },
            {
                $project: {
                    user: '$user.name', profile: '$user.profilePicture', image: '$post.images', likes: { $size: '$post.like' }, like: '$post.like', description: '$post.description', postId: '$post._id',
                 
                    time:'$post.date'
                   
                }
            }, {
                $sort: { time: -1 }
            }

        ])
            .then((post) => {
                res.status(200).json(post)
            })
            .catch((err) => res.status(500).json({ message: err.message }))

    },





    likePost: (req, res) => {


        postModel.findOne({ 'post._id': ObjectId(req.body.postId) }, { post: { $elemMatch: { _id: ObjectId(req.body.postId) } } }).then((response) => {


            let result = response.post[0].like.includes(ObjectId(req.body.userId))

            if (!result) {

                postModel.updateOne({ 'post._id': ObjectId(req.body.postId) }, {
                    $push: { 'post.$.like': ObjectId(req.body.userId) }
                }).then(() => {

                    res.status(200).json({ message: 'Post liked', liked: true })

                }).catch((err) => {

                    res.status(500).json({ message: err.message })
                })

            } else {

                postModel.updateOne({ 'post._id': ObjectId(req.body.postId) }, {

                    $pull: { 'post.$.like': ObjectId(req.body.userId) }

                }).then(() => {

                    res.status(200).json({ message: 'Post unliked', liked: false })

                }).catch((err) => {

                    res.status(500).json({ message: err.message })
                })

            }

        }).catch((er) => {

            res.status(500).json({ message: er.message })
        })

    },





    commentPost: (req, res) => {

        console.log(req.body);

        commentModel.findOne({ postId: ObjectId(req.body.postId) }).then((response) => {
            if (response) {

                console.log('comment exist');

                let data = [
                    {
                        userId: ObjectId(req.body.userId),
                        comment: req.body.comment
                    }
                ]
                commentModel.updateOne({ postId: ObjectId(req.body.postId) },
                    {
                        $push: { comments: data }

                    })
                    .then(() => {
                        console.log('cmnt added');
                        res.status(200).json({ message: 'comment added successfully' })
                    })
                    .catch((err) => {
                        res.status(500).json({ message: err.message })
                    })

            }
            else {

                console.log('no comment');
                let data = {
                    postId: ObjectId(req.body.postId),
                    comments:
                        [
                            {
                                userId: ObjectId(req.body.userId),
                                comment: req.body.comment,
                            }
                        ]
                }

                commentModel.create(data).then(() => {
                    console.log('post added');
                    res.status(200).json({ message: 'comment added successfully' })
                })
            }
        })
            .catch((er) => {
                console.log('er', er.message);
                res.status(500).json({ message: er.message })
            })

    },



    getComment: (req, res) => {

        console.log('reqqqqq  ', req.params.id);
        let postId = ObjectId(req.params.id)

        commentModel.aggregate([

            { $match: { postId: postId } }, { $unwind: "$comments" },
            {
                $lookup: {
                    from: 'users',
                    localField: 'comments.userId',
                    foreignField: '_id',
                    as: 'user'
                }
            }, { $project: { postId: 1, comment: '$comments.comment', profilepic:'$user.profilePicture', user: '$user.name', time: "$comments.time" } },

            { $sort: { time: -1 } }


        ]).then((response) => {


            res.json({ response })
        })
            .catch((er) => {

                res.status(500).json({ message: er.message })
            })


    },


    getUserPost: (req, res) => {

        const id = ObjectId(req.params.id)
        postModel.aggregate([
            { $match: { userid: id } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userid',
                    foreignField: '_id',
                    as: 'user'

                }
            }, { $unwind: '$post' }, { $unwind: '$user' }, { $project: { post: 1 } }
        ])
            .then((response) => {
                res.status(200).json(response)
            })
            .catch((er) => {
                res.status(500).json({ message: er.message })
            })
    },


    getUserDetails: (req, res) => {

        let id = req.params.id

        userModel.findById(id, '-password -status -createdAt -updatedAt -__v').then((response) => {
            
              

            res.status(200).json(response)

        })
            .catch((er) => {

                res.status(500).json({ message: er.message })
            })

    },


    editDetails: (req, res) => {

        const id = req.params.id
        console.log(req.body);

        delete req.body._id


        console.log('after delete  ', req.body);

        userModel.findByIdAndUpdate(id, req.body).then((response) => {

            res.status(200).json({ message: 'update successfully' })

        }).catch((err) => {

            res.status(500).json({ message: err.message })
        })
    },


    uploadProfilePicture: (req, res) => {

        let id = req.params.id
        let image = req.file.filename

        console.log(image, id);
        console.log('profileee');
        userModel.findByIdAndUpdate(id,
            {
                $set: { profilePicture: image }

            })
            .then(() => {

                console.log('then  blockkkkkkk');

                res.status(200).json({ message: 'profile picture uploaded successfully' })
            })
            .catch((err) => {

                res.status(500).json({ message: err.message })
            })

    },



    getUserSearchResult: (req, res) => {

        console.log(req.params.result);
        let result = req.params.result

        console.log(result)

        userModel.find({ name: { $regex: '^' + result, $options: 'i' } }, 'name profilePicture').then((response) => {

            res.status(200).json(response)


        }).catch((er) => {

            res.status(500).json({ message: er.message })
        })

    },

    getFriendDetails: (req, res) => {

        console.log('friend id checkinggggggg', req.params.id);

        let id = req.params.id

        userModel.findById(id, '-password -status -createdAt -updatedAt -__v').then((response) => {

            res.status(200).json(response)

        })
            .catch((er) => {

                res.status(500).json({ message: er.message })
            })

    },


    getFriendPost: (req, res) => {

        const id = ObjectId(req.params.id)
        postModel.aggregate([
            { $match: { userid: id } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userid',
                    foreignField: '_id',
                    as: 'user'

                }
            }, { $unwind: '$post' }, { $unwind: '$user' }, { $project: { post: 1 } }
        ])
            .then((response) => {
                res.status(200).json(response)
            })
            .catch((er) => {
                res.status(500).json({ message: er.message })
            })
    },




    friendManagement: (req, res) => {
   
        
        let userId = ObjectId(req.params.userId)
        let friendId = ObjectId(req.params.friendId)

        friendModel.findOne({ user: userId })
            .then((data) => {

                if (data) {

                    let result = data.following.includes(friendId)

                    if (result) {

                        friendModel.updateOne({ user: userId }, { $pull: { following: friendId } })
                            .then(() => {

                                friendModel.updateOne({ user: friendId }, { $pull: { followers: userId } })
                                    .then(() => {

                                        res.status(200).json({ message: 'unfollowed' })

                                    })

                                    .catch((er) => {

                                        res.status(500).json({ message: er.message })

                                    })

                            })
                            .catch((er) => {

                                res.status(500).json({ message: er.message })
                            })
                    }

                    else {

                        friendModel.updateOne({ user: userId }, { $push: { following: friendId } })
                            .then(() => {

                                friendModel.findOne({ user: friendId })
                                    .then((data) => {
                                        if (data) {
                                            friendModel.updateOne({ user: friendId }, { $push: { followers: userId } })
                                                .then(() => {

                                                    res.status(200).json({ message: 'followed' })
                                                })
                                                .catch((er) => {

                                                    res.status(500).json({ message: er.message })
                                                })
                                        }
                                        else {

                                            let details = {
                                                user: friendId,
                                                following: [],
                                                followers: [userId]
                                            }

                                            friendModel.create(details).then(() => {

                                                res.status(200).json({ message: 'followed' })
                                            })
                                                .catch((er) => {

                                                    res.status(500).json({ message: er.message })
                                                })

                                        }

                                    })
                                    .catch((er) => {

                                        res.status(500).json({ message: er.message })
                                    })

                            })
                            .catch((er) => {

                                res.status(500).json({ message: er.message })
                            })

                    }
                }

                else {
                    let details = {
                        user: userId,
                        following: [friendId],
                        followers: []
                    }

                    friendModel.create(details).then(() => {

                        friendModel.findOne({ user: friendId })
                            .then((data) => {
                                if (data) {

                                    friendModel.updateOne({ user: friendId }, { $push: { followers: userId } })
                                        .then(() => {

                                            res.status(200).json({ message: 'followed' })

                                        })
                                        .catch((er) => {

                                            res.status(500).json({ message: er.message })
                                        })
                                }

                                else {

                                    let details = {
                                        user: friendId,
                                        following: [],
                                        followers: [userId]
                                    }

                                    friendModel.create(details).then(() => {

                                        res.status(200).json({ message: 'followed' })
                                    })
                                        .catch((er) => {
                                            res.status(500).json({ message: er.message })
                                        })


                                }
                            })
                            .catch((er) => {

                                res.status(500).json({ message: er.message })
                            })
                    })
                        .catch((er) => {

                            res.status(500).json({ message: er.message })
                        })
                }
            })
            .catch((er) => {

                res.status(500).json({ message: er.message })
            })


    },


    getUserFollwersFollowing: (req, res) => {

        let userId = ObjectId(req.params.id)
        friendModel.aggregate([{
            $match: { user: userId }
        }, { $project: { following: 1, followers: 1, followerscount: { $size: '$followers' }, followingcount: { $size: '$following' }, user: 1 } },

        { $unwind: {path:'$followers',preserveNullAndEmptyArrays:true} }, 
        { $unwind: {path:'$following',preserveNullAndEmptyArrays:true} },
        {
            $lookup: {
                from: 'users',
                localField: 'followers',
                foreignField: '_id',
                as: 'totalfollowers'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'following',
                foreignField: '_id',
                as: 'totalfollowing'
            }
        }, 
        { $project: { followerscount: 1, followingcount: 1, followers: { $arrayElemAt: ['$totalfollowers', 0] }, following: { $arrayElemAt: ['$totalfollowing', 0] }, user: 1 } },
        {
            $project: {
                'followers.password': 0, 'followers.createdAt': 0, 'followers.updatedAt': 0, 'followers.phone': 0, 'followers.email': 0, 'followers.status': 0, 'followers.__v': 0,
                'following.password': 0, 'following.createdAt': 0, 'following.updatedAt': 0, 'following.phone': 0, 'following.email': 0, 'following.status': 0, 'following.__v': 0

            }
        },
        {
            $group:{_id:'$user',followers:{$addToSet:'$followers'},following:{$addToSet:'$following'}}
        }

        ])
            .then((data) => {

                res.status(200).json(data)
            })
    },


    getFriendFollwersFollowing: (req, res) => {

        let userId = ObjectId(req.params.id)
        friendModel.aggregate([
        {
            $match: { user: userId }
        },
        
        { $project: { following: 1, followers: 1, followerscount: { $size: '$followers' }, followingcount: { $size: '$following' }, user: 1 } },


        { $unwind: {path:'$followers',preserveNullAndEmptyArrays:true} }, 
        { $unwind: {path:'$following',preserveNullAndEmptyArrays:true} },
        {
            $lookup: {
                from: 'users',
                localField: 'followers',
                foreignField: '_id',
                as: 'totalfollowers'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'following',
                foreignField: '_id',
                as: 'totalfollowing'
            }
        }, { $project: { followerscount: 1, followingcount: 1, followers: { $arrayElemAt: ['$totalfollowers', 0] }, following: { $arrayElemAt: ['$totalfollowing', 0] }, user: 1 } },
        {
            $project: {
                'followers.password': 0, 'followers.createdAt': 0, 'followers.updatedAt': 0, 'followers.phone': 0, 'followers.email': 0, 'followers.status': 0, 'followers.__v': 0,
                'following.password': 0, 'following.createdAt': 0, 'following.updatedAt': 0, 'following.phone': 0, 'following.email': 0, 'following.status': 0, 'following.__v': 0

            }
        },
        {
            $group:{_id:'$user',followers:{$addToSet:'$followers'},following:{$addToSet:'$following'}}
        }


        ])
            .then((data) => {

                res.status(200).json(data)
            })

    },



    newChat:(req,res)=>{
        
        chatModel.findOne({members:{$all:[req.body.senderId,req.body.recieverId]}}).then((response)=>{
            if(response){
                res.status(200).json(response)
            }

            else{

                let data = {
                    members:[req.body.senderId,req.body.recieverId]
                }
        
                chatModel.create(data).then((response)=>{
                     res.status(200).json(response)
                })
                .catch((er)=>{
                     
                    res.status(500).json({message:er.message})
                })

            }
        })
        .catch((er)=>{
            res.status(500).json({message:er.message})
        })

       

    },

    getChatList:(req,res)=>{
             
        chatModel.find({members:{$in:[req.params.id]}}).sort({updatedAt:-1})
        .then((data)=>{

            res.status(200).json(data)
        })
        .catch((er)=>{

            res.status(500).json({message:er.message})
        })
    },


    addMessage:(req,res)=>{
        
        console.log(req.body)
        messageModel.create(req.body)

        .then((data)=>{
        
         chatModel.updateOne({_id:ObjectId(req.body.chatId)},{
            $currentDate:{
                updatedAt:true
            }
         }).then((r)=>{
             
            console.log('updated',r)
             res.status(200).json(data)
         })
         .catch((er)=>{

            res.status(500).json({message:err.message})
         })

        })
        .catch((er)=>{

            res.status(500).json({message:er.message})
        })

    },



    getMesssages:(req,res)=>{
           
        const id = req.params.chatId

        messageModel.find({chatId:id})
        .then((messages)=>{
                
            res.status(200).json(messages)
        })
        .catch((er)=>{

            res.status(500).json({message:er.message})
        })
    },

    getPostDetails:(req,res)=>{
        let pId = ObjectId(req.params.id)
        console.log(pId)
        
        postModel.aggregate([{$unwind:"$post"},{$match:{'post._id':pId}},

        
        
    ])
        
        .then((response)=>{
            res.json(response)
        })

        .catch((er)=>{
            res.status(500).json({message:er.message})
        })
             
    },

    reportPost:(req,res)=>{
            console.log('firstggg',req.body)

            postModel.updateOne({'post._id': ObjectId(req.body.postId) },

            {$push:{'post.$.report':{user:req.body.userId,reason:req.body.type}}}
            )
            .then((data)=>{
                  
                res.status(200).json(data)
             

            })  
            .catch((er)=>{

                res.status(500).json({message:er.message})
            })
               
        }
    
    
}


