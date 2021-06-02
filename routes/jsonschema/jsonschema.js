const express = require("express");
const ExpressError = require("../../errorClass");
const router = express.Router();
const db = require("../../db");
const jsonschema = require("jsonschema");
const bookSchema = require("../../schemas/bookSchema.json")
const Book = require("../../models/book")



router.get("/", function (req, res, next){
    const testSchema = jsonschema.validate(req.body, bookSchema);
    if (!testSchema.valid){
        const listOfErrors = testSchema.errors.map(e => e.stack);
        const err = new ExpressError(listOfErrors, 400)
        console.log(listOfErrors)
        return next(err)
    }
    return res.json("That is valid")
})

router.post("/", async (req, res, next) => {
    const testSchema = jsonschema.validate(req.body, bookSchema);
    try{
        if (!testSchema.valid){
            const listOfErrors = testSchema.errors.map(e => e.stack);
            const err = new ExpressError(listOfErrors, 400)
            console.log(listOfErrors)
            return next(err)
        }
        let bookPosted = await Book.add(req.body.book)
        return res.json(bookPosted)
    }   
    catch(e){
        return next(e)
    }



})


module.exports = router;
