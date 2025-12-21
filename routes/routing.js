// import express
const express=require('express')
const userController=require('../controller/userController')
const bookController=require('../controller/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware=require('../middlewares/multerMiddleware')

// create router object
const router=new express.Router()

// define path for client api request
// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// google login
router.post('/google/sign-in',userController.googleLoginController)

// get home books
router.get('/books/home',bookController.getHomePageBooksController)

// ----------------------authorised user---------------------------

// add book - request body content is form data (file type) so we use "multer"
router.post('/user/book/add',jwtMiddleware,multerMiddleware.array('uploadImages',3),bookController.addBookController)

// get all books page
router.get('/books/all',jwtMiddleware,bookController.getUserAllBookPageController)

// get all user upload books page
router.get('/user-books/all',jwtMiddleware,bookController.getUserUploadProfilePageController)

// get all user bought books page
router.get('/user-boughtbooks/all',jwtMiddleware,bookController.getUserBoughtBookProfilePageController)

// get single book
router.get('/books/:id/view',jwtMiddleware,bookController.viewBookController)

module.exports=router