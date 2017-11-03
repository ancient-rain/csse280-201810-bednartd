const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json( {
        title: 'Broadway Shows Back-end'
    });
});

router.get('/api/', (req, res) => {
    res.json( {
        title: 'Broadway Shows Back-end API'
    });
});

module.exports = router;