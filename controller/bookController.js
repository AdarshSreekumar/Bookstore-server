const books=require('../models/bookModel')


// add book
exports.addBookController=async(req,res)=>{
    console.log("inside addBookController");
    // get book details from req body, upload file from request files & seller mail from req payload
    const {title,author,pages,price,discountPrice,imageURL,abstract,language,publisher,isbn,category}=req.body
    const uploadImages=req.files.map(item=>item.filename)
    const sellerMail=req.payload
     
    console.log(title,author,pages,price,discountPrice,imageURL,abstract,language,publisher,isbn,category,uploadImages,sellerMail);
    
    try {
        // check book already exists
        const existingBook=await books.findOne({title,sellerMail})
        if(existingBook){
            res.status(401).json("Uploaded book is already exists... Request failed")
        }else{
            const newBook=await books.create({
                title,author,pages,price,discountPrice,imageURL,abstract,language,publisher,isbn,category,uploadImages,sellerMail
            })
            res.status(200).json(newBook)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }
   
    
    
    
}

// get home books
exports.getHomePageBooksController=async(req,res)=>{
    console.log("inside getHomePageBooksController");
   
    try {
        // get newly added books from db
        const homeBooks=await books.find().sort({_id:-1}).limit(4)
        res.status(200).json(homeBooks)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }

}

// get all books - user
exports.getUserAllBookPageController=async(req,res)=>{
    console.log("inside getUserAllBookPageController");
    // get query from req
    const searchKey=req.query.search
    console.log(searchKey);
    
    // get login user mail from token
    const loginUserMail=req.payload
    try {
        // get newly added books from db except user
        const allBooks=await books.find({sellerMail:{$ne:loginUserMail},title:{$regex:searchKey,$options:'i'}})
        res.status(200).json(allBooks)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }

}

// get all user uploaded books
exports.getUserUploadProfilePageController=async(req,res)=>{
    console.log("inside getUserUploadProfilePageController");
    // get login user mail from token
    const loginUserMail=req.payload
    try {
        // get newly added books from db except user
        const allUserBooks=await books.find({sellerMail:loginUserMail})
        res.status(200).json(allUserBooks)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }

}
// get all user bought books
exports.getUserBoughtBookProfilePageController=async(req,res)=>{
    console.log("inside getUserBoughtBookProfilePageController");
    // get login user mail from token
    const loginUserMail=req.payload
    try {
        // get all book from db except loggedin user
        const allUserPurchaseBooks=await books.find({buyerMail:loginUserMail})
        res.status(200).json(allUserPurchaseBooks)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }

}

// view a book
exports.viewBookController=async(req,res)=>{
    console.log("Inside viewBookController");
    // get id from req
    const {id}=req.params
    // get book details of given id from db
    try {
        const bookDetails=await books.findById({_id:id})
        res.status(200).json(bookDetails)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }
}