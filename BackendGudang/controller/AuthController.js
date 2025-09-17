const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Sign In (Login)
exports.signIn = async (req, res) => {
  console.log('Login request body:', req.body);
  console.log('Login request headers:', req.headers);
  
  const { name, password } = req.body;

  // Validasi input kosong
  if (!name || !password) {
    console.log('Missing name or password');
    return res.status(400).json({ message: 'name and password are required' });
  }

  try {
    // Cek apakah pengguna terdaftar 
    console.log('Searching for user with name:', name);
    const user = await User.findOne({ name: { $regex: `^${name.trim()}$`, $options: 'i' } });
    console.log('User found in database:', user ? 'YES' : 'NO');
    
    if (user) {
      console.log('User data:', {
        id: user._id,
        name: user.name,
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
      return res.status(401).json({ message: 'name and password did not match' });
    }

    console.log('Login successful for user:', user.name);

    // Berikan token dan informasi user
    res.json({
      _id: user._id, 
      name: user.name,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
