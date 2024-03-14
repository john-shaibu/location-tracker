const express = require('express');
const {
  updatePassword,
  updateUser,
  userMetrics,
  discover,
} = require('../controllers/userController');
const { verifyToken } = require('../middlewares/jwt');


const userRouter = express.Router();

// Update User without password
userRouter.put('/update', verifyToken, updateUser);

// Update User password
userRouter.put('/update-password', verifyToken, updatePassword);

// metrics
// userRouter.get('/metrics', userMetrics);

// discover
// userRouter.get('/discover', discover)

module.exports = userRouter;
