const express = require('express')

const router = express.Router()

const userController = require('../Controller/usercontroller')

const upload = require('../configuration/multer')

const {getOtp,verifyOtp} = require('../configuration/otpgenarator')


const verifyToken = require('../configuration/authorization')


//----------------User Signup------------------
router.post('/register',userController.doSignup)


//-------------User Login----------------------
router.post('/login',userController.doLogin) 


//----------------forgot password--------------

router.post('/getotp',getOtp)


//----------------------verify OTP--------------

router.post('/verifyotp',verifyOtp)


//-------------------get individual user----------

router.get('/user/:id',userController.getInvidualUser)


//------------------Add Post--------------------

router.post('/post',[verifyToken,upload.single('image')],userController.addPost)
      

// ---------------------get all post-----------

router.get('/post',userController.getPost)


//------------like post-----------------------

router.post('/likepost',verifyToken,userController.likePost)


//-------------comment post-------------------

router.post('/comment',verifyToken,userController.commentPost)


//-------------get post comment---------------

router.get('/comment/:id',userController.getComment)


//------------------get user post-------------

router.get('/userpost/:id',userController.getUserPost)


//--------------get user details--------------

router.get('/userdetails/:id',verifyToken,userController.getUserDetails)


 //----------------edit profile---------------

router.post('/editprofile/:id',verifyToken,userController.editDetails)


//------------edit profile picture-----------------

router.post('/uploadprofilepicture/:id',[verifyToken,upload.single('image')],userController.uploadProfilePicture)


//---------------get user search result-------------

router.get('/usersearch/:result',userController.getUserSearchResult)


//----------get friend details---------------------

router.get('/frienddetails/:id',verifyToken,userController.getFriendDetails)


//------------get friend post-----------------------

router.get('/friendpost/:id',verifyToken,userController.getFriendPost)



//------------friend management----------------------

router.post('/friendmanagement/:userId/:friendId',userController.friendManagement)


//--------------user followers list--------------------

router.get('/followerslist/:id',verifyToken,userController.getUserFollwersFollowing) 


//--------------friend followers list-----------------

router.get('/friendfollowerslist/:id',verifyToken,userController.getFriendFollwersFollowing) 



//----------------new chat--------------------

router.post('/newchat',verifyToken,userController.newChat)


//----------get chatlist---------------------


router.get('/chatlist/:id',verifyToken,userController.getChatList)


//------------add messages-------------------

router.post('/addmessage',verifyToken,userController.addMessage)


//-------------get messages---------------------

router.get('/message/:chatId',verifyToken,userController.getMesssages)


router.get('/postdetails/:id',userController.getPostDetails)


router.post('/report',userController.reportPost)

module.exports = router 

