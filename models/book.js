const db = require("../db");
const ExpressError = require("../errorClass");

class Book{
    constructor(isbn, amazon_url, author, language, pages, publisher, title, year ){
        this.isbn = isbn;
        this.amazon_url = amazon_url;
        this.author = author;
        this.language = language;
        this.pages = pages;
        this.publisher = publisher;
        this.title = title;
        this.year = year;
    }
    static async add(book){
        const {isbn, amazon_url, author, language, pages, publisher, title, year} = book;
        const results = await db.query(`
        INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING isbn, amazon_url, author, language, pages, publisher, title, year`,
        [isbn, amazon_url, author, language, pages, publisher, title, year])
        return this.returnResult(results)
    }
    static async returnResult(results){
        const {isbn, amazon_url, author, language, pages, publisher, title, year} = results.rows[0];
        return new Book(isbn, amazon_url, author, language, pages, publisher, title, year )

    }
}

module.exports = Book