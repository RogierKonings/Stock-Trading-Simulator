let express = require('express');
let router = express.Router();

/**
 * Gets the main server side page
 */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'YEX exchange' });
});

module.exports = router;
