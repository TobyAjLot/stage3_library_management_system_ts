interface BookDetails {
  title: string;
  author: string;
  isbn: number;
  isAvailable: boolean;
}

interface NewBook {
  title: string;
  author: string;
  isbn: number;
}

interface Query {
  title?: string;
  author?: string;
  isbn?: number;
}

/** Class representing a collection of books */
export default class Book {
  private books: BookDetails[];
  /** Initialize the book collection */
  constructor() {
    this.books = [
      {
        title: "Harry Potter and the Philosopher's stone",
        author: "J.K Rowling",
        isbn: 12345,
        isAvailable: true,
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: 57369,
        isAvailable: true,
      },
      {
        title: "Harry Potter and the Chamber of Secrets",
        author: "J.K Rowling",
        isbn: 12346,
        isAvailable: true,
      },
      {
        title: "1984",
        author: "George Orwell",
        isbn: 28903,
        isAvailable: true,
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: 20943,
        isAvailable: true,
      },
    ];
  }

  /**
   * Creates a new book and adds it to the collection.
   * @param book - The book details.
   * @returns The newly created book object.
   */
  create(book: NewBook): BookDetails {
    // Check if a book with the same ISBN already exists
    if (this.books.some((b) => b.isbn === book.isbn)) {
      console.log(book.isbn);
      throw new Error("A book with this ISBN already exists.");
    }

    const newBook = { ...book, isAvailable: true };

    // Save book to database
    this.books.push(newBook);

    return newBook;
  }

  /**
   * Find a book by title or ISBN, or find books by author.
   * @param query - The search query containing title, isbn, or author.
   * @returns The found book object, an array of books by the author, or null if no book is found.
   */
  findOneOrMany({ title, isbn, author }: Query): BookDetails[] {
    // Find book by title
    if (title) {
      const book = this.books.find((book) => book.title === title);
      return book ? [book] : [];
    }

    // Find book by isbn
    if (isbn) {
      const book = this.books.find((book) => book.isbn === isbn);
      return book ? [book] : [];
    }

    // Find book(s) by author
    if (author) {
      const books = this.books.filter((book) => book.author === author);
      return books;
    }

    return [];
  }

  /**
   * Delete a book from the collection by ISBN.
   * @param isbn - The ISBN of the book to delete.
   * @returns The deleted book.
   * @throws If the book is not found.
   */
  delete(isbn: number): BookDetails {
    const removedBook = this.books.find((book) => book.isbn === isbn);

    if (!removedBook) {
      throw new Error("Book not found ");
    }
    // Delete book from database
    this.books = this.books.filter((book) => book.isbn !== isbn);

    return removedBook;
  }
}
