const express = require('express');
const {
  getDinners,
  getDinner,
  createDinner,
  deleteDinner,
  updateDinner,
} = require('../controllers/dinnerController');

const router = express.Router();

// GET all dinners
router.get('/', getDinners);

// GET a single dinner
router.get('/:id', getDinner);

// POST a new dinner
router.post('/', createDinner);

//DELETE a dinner
router.delete('/:id', deleteDinner);

//UPDATE a dinner
router.patch('/:id', updateDinner);

module.exports = router;
