"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const book_1 = __importDefault(require("./book"));
/** Class representing a library */
class Library {
    /** Initialize a library */
    constructor() {
        this.user = new user_1.default();
        this.book = new book_1.default();
    }
    /**
     * Adds a new book to the library.
     * @param book - The book object to add.
     * @returns The newly added book.
     */
    addBook(book) {
        return this.book.create(book);
    }
    /**
     * Removes a book from the library by ISBN.
     * @param isbn - The ISBN of the book to remove.
     * @returns An object containing success status and the removed book.
     */
    removeBook(isbn) {
        const book = this.book.delete(isbn);
        return { success: true, removedBook: book };
    }
    /**
     * Searches for books in the library.
     * @param query - The search query.
     * @returns The found book(s) or null if not found.
     */
    searchBook(query) {
        return this.book.findOneOrMany(query);
    }
    /**
     * Adds a new user to the library.
     * @param user - The user object to add.
     * @returns The newly added user.
     */
    addUser(user) {
        return this.user.create(user);
    }
    /**
     * Removes a user from the library by ID.
     * @param {number} id - The ID of the user to remove.
     * @returns {object} An object containing success status and the removed user.
     */
    removeUser(id) {
        const user = this.user.delete(id);
        return { success: true, removedUser: user };
    }
    /**
     * Searches for a user in the library.
     * @param {object} query - The search query.
     * @param {number} [query.id] - The ID of the user.
     * @param {string} [query.name] - The name of the user.
     * @returns {object|null} The found user or null if not found.
     */
    searchUser(query) {
        return this.user.findOne(query);
    }
    /**
     * Allows a user to borrow a book from the library.
     * @param userId - The ID of the user borrowing the book.
     * @param isbn - The ISBN of the book to borrow.
     * @returns An object containing the success status and message, or an error message.
     */
    borrowBook(userId, isbn) {
        try {
            const user = this.user.findOne({ id: userId });
            const book = this.book.findOneOrMany({ isbn })[0];
            if (!user)
                throw new Error("User not found");
            if (!book)
                throw new Error("Book not found");
            if (this.isBookAvailable(book.isbn)) {
                user.borrowedBooks.push(book.isbn);
                book.isAvailable = false;
            }
            else {
                return `Book: ${book.title} is not available at the moment`;
            }
            return {
                success: true,
                message: `User ${user.name} has successfully borrowed book ${book.title}`,
            };
        }
        catch (error) {
            return error.message;
        }
    }
    /**
     * Returns a borrowed book to the library.
     * @param userId - The ID of the user.
     * @param isbn - The ISBN of the book to return.
     * @returns An object containing the success status and message, or an error message.
     */
    returnBook(userId, isbn) {
        try {
            const user = this.user.findOne({ id: userId });
            const books = this.book.findOneOrMany({ isbn });
            if (!user)
                throw new Error("User not found");
            if (books.length === 0)
                throw new Error("Book not found");
            const book = books[0];
            const borrowedBook = user.borrowedBooks.find((bookIsbn) => bookIsbn === isbn);
            if (borrowedBook) {
                user.borrowedBooks = user.borrowedBooks.filter((book) => book !== borrowedBook);
                book.isAvailable = true;
            }
            else {
                return "User did not borrow this book";
            }
            return {
                success: true,
                message: `User ${user.name} has successfully returned book ${book.title}`,
            };
        }
        catch (error) {
            return error;
        }
    }
    /**
     * Checks if a book is available in the library.
     * @param isbn - The ISBN of the book to check.
     * @returns True if the book is available, or an error message.
     * @throws Will throw an Error if the book is not found.
     */
    isBookAvailable(isbn) {
        try {
            const foundBook = this.book.findOneOrMany({ isbn })[0];
            if (!foundBook)
                throw new Error("Book not found");
            return foundBook.isAvailable;
        }
        catch (error) {
            return error.message;
        }
    }
}
exports.default = Library;
