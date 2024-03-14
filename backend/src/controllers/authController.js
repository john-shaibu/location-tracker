const expressAsyncHandler = require('express-async-handler');
const {
  registrationValidation,
  loginValidation,
} = require('../validation/userValidation');
const { hashPassword, comparedPassword } = require('../middlewares/hashing');
const { generateToken } = require('../middlewares/jwt');
const { PrismaClient } = require('@prisma/client');
const {
  InvalidRequestError,
  AppError,
  NotFoundError,
} = require('../utils/AppErrors');
const {
  generateVerificationCode,
  sendVerificationEmail,
} = require('../middlewares/emailVerify');
const prisma = new PrismaClient();

// Register a new user
const registerUser = expressAsyncHandler(async (req, res) => {
  const { error } = registrationValidation.validate(req.body);
  if (error) {
    throw new InvalidRequestError(error.details[0].message);
  }
  const { fullname, email, password, confirmpassword } = req.body;
  const user = await prisma.User.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    throw new InvalidRequestError('User already exists');
  }
  const verificationCode = generateVerificationCode();
  const hashedVerificationCode = await hashPassword(
    verificationCode.toString()
  );
  const hashedPassword = await hashPassword(password);
  await prisma.User.create({
    data: {
      fullname,
      email,
      password: hashedPassword,
      confirmpassword,
      verificationCode: hashedVerificationCode,
    },
  });
  await sendVerificationEmail(email, verificationCode);
  res.json({
    status: 'PENDING',
    message: 'Verification OTP email sent',
    data: { email },
  });
});

// Verify OTP
const verifyOTP = expressAsyncHandler(async (req, res) => {
  const { email, verificationCode } = req.body;
  const user = await prisma.User.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new NotFoundError('User not found');
  }
  if (user.isVerified) {
    return res.status(400).json({
      message: 'User already verified',
    });
  }
  const matchedVerificationCode = await comparedPassword(
    verificationCode.toString(),
    user.verificationCode
  );

  if (!matchedVerificationCode) {
    throw new InvalidRequestError('Invalid verification code');
  }

  const verificationCodeExpirationTime = new Date(user.createdAt);
  verificationCodeExpirationTime.setMinutes(
    verificationCodeExpirationTime.getMinutes() + 5
  );

  if (verificationCodeExpirationTime < new Date()) {
    throw new InvalidRequestError('Verification code has expired');
  }

  await prisma.User.update({
    where: {
      email,
    },
    data: {
      isVerified: true,
    },
  });

  res.status(200).json({
    message: 'User verified successfully',
  });
});

// Login user
const loginUser = expressAsyncHandler(async (req, res) => {
  const { error } = loginValidation.validate(req.body);
  if (error) {
    throw new InvalidRequestError(error.details[0].message);
  }
  const { email, password } = req.body;
  const user = await prisma.User.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new NotFoundError('User not found');
  }
  const isPasswordValid = await comparedPassword(password, user.password);
  if (!isPasswordValid) {
    throw new InvalidRequestError('Invalid password');
  }
  const token = generateToken(user);
  res.status(200).json({
    message: 'User logged in successfully',
    token,
  });
});

module.exports = { registerUser, verifyOTP, loginUser };
