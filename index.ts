import Library from "./library";

/** Function to test the Library Management System */
function main() {
  // Usage example
  const library = new Library();

  // Adding a new user
  const newUser = library.addUser({ name: "Tobi" });
  console.log(newUser);

  // Adding a new book
  const newBook = library.addBook({
    title: "Harry Potter and the Prisoner of Azkaban",
    author: "J.K Rowling",
    isbn: 12347,
  });
  console.log(newBook);

  // Searching for a user
  const user = library.searchUser({ id: 1 });
  console.log(user);

  // Searching for a book
  const book = library.searchBook({ author: "J.K Rowling" });
  console.log(book);

  // Borrowing a book
  console.log(library.borrowBook(1, 12345)); // Should return success message

  // Checking book availability
  console.log(library.isBookAvailable(12345)); // Should return false

  // Returning a book
  console.log(library.returnBook(1, 12345)); // Should return success message

  // Checking book availability
  console.log(library.isBookAvailable(12345)); // Should return true

  // Removing a user
  const removedUser = library.removeUser(1);
  console.log(removedUser);

  // Removing a book
  const removedBook = library.removeBook(12345);
  console.log(removedBook);
}

main();
