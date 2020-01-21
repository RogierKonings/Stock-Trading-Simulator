const express = require('express');
const router = express.Router();
const UserStorage = require('./../../data/UserStorage');

/**
 * Get specific user information
 */
router.get('/:user_name', (req, res, next) => {
    res.send(UserStorage.getUser(req.params.user_name));
});

/**
 * Get all the users
 */
router.get('/all', (req, res, next) => {
    res.send(UserStorage.getAllUsers());
});

module.exports = router;
