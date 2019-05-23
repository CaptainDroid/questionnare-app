const express = require('express');
const router = express.Router();
const path = require('path');
const questions = require('../src/assets/questions/cloudQuestions.json');

router.get('/survey', (req, res, next) => {
    res.send(questions.survey);
});

module.exports = router;