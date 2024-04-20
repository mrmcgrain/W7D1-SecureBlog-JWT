// controllers/user.js
const User = require('../models/user');
const { verifyToken } = require('../controllers/auth');
const jwt = require('jsonwebtoken')
// Function to handle user registration
const Register = async (req, res) => {
    // Your registration logic here
console.log("req", req.ip)
      const { fullname, email, password } = req.body;
  
      try {
          // Check if the user already exists
          const existingUser = await User.findOne({ email });
          if (existingUser) {
              return res.status(400).json({ message: 'User already exists' });
          }
  
          // Create a new user
          const newUser = new User({ fullname, email, password });
          await newUser.save();
  
          // Generate a JWT token
          const token = generateToken(newUser);
  
          // Send the token in the response
          res.status(201).json({ token });
  
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
      }
  };
  
  // Function to handle user login
  const Login = async (req, res) => {
    // Your login logic here
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // If user not found or password doesn't match, return an error
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = generateToken(user);

        // Send the token in the response
        res.status(200).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
  };



const wtf = (req, res) => {
  console.log("WTF hit", req.user._id)
  console.log("WTF hit", req.user)

  res.json(req.user)
}


  function generateToken(user) {

    const token = jwt.sign({ user: user }, process.env.SECRET_KEY, { expiresIn: 3600000 })
    return token
    // Implement JWT token generation logic here
    // For example, you can use the jsonwebtoken package
    // Return the generated token
}
  
  module.exports = { Register, Login, wtf };
  