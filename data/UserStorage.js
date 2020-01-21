let userList = [];
let currentUser = {};

/**
 * Class responsible for the user storage
 */
class UserStorage {
    static addUser (user) {
        userList.push(user);
    }

    static removeUser (userName) {
        const index = userList.indexOf(userName);
        if (index > -1) {
            userList.splice(index, 1);
        }
    }

    static setCurrentUser (user) {
        currentUser = user;
    }

    static getCurrentUser () {
        return currentUser;
    }

    static getUser (userName) {
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].getName() === userName) {
                return userList[i];
            }
        }
    }

    static getAllUsers () {
        return userList;
    }
}

module.exports = UserStorage;
