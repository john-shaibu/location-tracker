const expressAsyncHandler = require('express-async-handler');
const {
  registrationValidation,
  loginValidation,
} = require('../validation/userValidation');
const { hashPassword, comparedPassword } = require('../middlewares/hashing');
const { generateToken } = require('../middlewares/jwt');
const { PrismaClient } = require('@prisma/client');
const { InvalidRequestError, AppError, NotFoundError } = require('../utils/AppErrors');
const prisma = new PrismaClient();

// Register User
const registerUser = expressAsyncHandler(async (req, res) => {
    try {
      const { fullname, email, password, confirmpassword } = req.body;
  
      // Validate the user input
      const { error } = registrationValidation.validate(req.body);
      if (error) throw new InvalidRequestError(error.details[0].message);
  
      // Check if user exists
      const userExists = await prisma.User.findUnique({
        where: { email },
      });
      if (userExists) {
        throw new InvalidRequestError('User already Exists')
      }
  
      // Check if password and confirm password match
      if (password !== confirmpassword)
        throw new InvalidRequestError('Passwords do not match')
  
      // Hash the password
      const hashedPassword = await hashPassword(password);
  
      const user = await prisma.User.create({
        data: {
          fullname,
          email,
          password: hashedPassword,
          confirmpassword,
        },
      });
      res.status(201).json(user);
    } catch (error) {
      console.error('Error registering user:', error);
      throw new AppError(error)
    }
  });
  
  // Login User
  const loginUser = expressAsyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate the user input
      const { error } = loginValidation.validate(req.body);
      if (error) throw new InvalidRequestError(error.details[0].message);
  
      // Check if user exists
      const user = await prisma.User.findUnique({
        where: { email },
      });
      if (!user) throw new NotFoundError('User')
  
      // Compare password
      const validPassword = await comparedPassword(password, user.password);
      if (!validPassword)
        throw new InvalidRequestError('Invalid password');
  
      // Generate token
      const token = generateToken(user.id);
      res.header('auth-token', token);
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error logging in user:', error);
      throw new AppError(error)
    }
  });

module.exports = { registerUser, loginUser }