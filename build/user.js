"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Class representing a user collection */
class User {
    /** Initialize the user collection */
    constructor() {
        this.users = [
            {
                id: 1,
                name: "Harry",
                borrowedBooks: [],
            },
            {
                id: 2,
                name: "Hermione",
                borrowedBooks: [],
            },
            {
                id: 3,
                name: "Ronald",
                borrowedBooks: [],
            },
            {
                id: 4,
                name: "Nevile",
                borrowedBooks: [],
            },
            {
                id: 5,
                name: "Draco",
                borrowedBooks: [],
            },
        ];
    }
    /**
     * Create a new user and add them to the collection.
     * @param user - The user details.
     * @returns The newly created user with an added borrowedBooks property.
     */
    create(user) {
        const id = this.users.length ? this.users[this.users.length - 1].id + 1 : 1;
        const newUser = Object.assign(Object.assign({ id }, user), { borrowedBooks: [] });
        // Save user to database
        this.users.push(newUser);
        return newUser;
    }
    /**
     * Find a user by ID or name.
     * @param query - The search query.
     * @returns The found user, or null if no user is found.
     */
    findOne({ id, name }) {
        // Find user by id
        if (id) {
            const user = this.users.find((user) => user.id === id);
            return user || null;
        }
        // Find user by name
        if (name) {
            const user = this.users.find((user) => user.name === name);
            return user || null;
        }
        return null;
    }
    /**
     * Delete a user from the collection by ID.
     * @param id - The ID of the user to delete.
     * @returns The deleted user.
     * @throws If the user is not found.
     */
    delete(id) {
        const removedUser = this.findOne({ id });
        if (!removedUser) {
            throw new Error("User not found");
        }
        // Delete user from database
        this.users = this.users.filter((user) => user.id !== id);
        return removedUser;
    }
}
exports.default = User;
