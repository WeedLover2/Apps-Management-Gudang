const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Sign In (Login) - DIPERBAIKI
exports.signIn = async (req, res) => {
  console.log('Login request body:', req.body);
  console.log('Login request headers:', req.headers);
  
  const { email, password } = req.body;

  // Validasi input kosong
  if (!email || !password) {
    console.log('Missing email or password');
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Cek apakah pengguna terdaftar (dengan logging)
    console.log('Searching for user with email:', email);
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    console.log('User found in database:', user ? 'YES' : 'NO');
    
    if (user) {
      console.log('User data:', {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hasPassword: !!user.password
      });
    }
    
    if (!user) {
      console.log('User not found in database');
      return res.status(401).json({ message: 'User not registered' });
    }

    // Cek password dengan logging
    console.log('Comparing passwords...');
    console.log('Input password:', password);
    console.log('Stored password:', user.password);
    console.log('Passwords match:', user.password === password);
    
    if (user.password !== password) {
      console.log('Password mismatch');
      return res.status(401).json({ message: 'Email and password did not match' });
    }

    console.log('Login successful for user:', user.email);

    // Berikan token dan informasi user
    res.json({
      _id: user._id, // DIPERBAIKI: __id -> _id
      name: user.name,
      role: user.role,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
