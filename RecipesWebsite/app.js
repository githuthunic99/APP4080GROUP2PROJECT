import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cors from 'cors';
import path from 'path';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files (your HTML files)
const __dirname = path.resolve();
app.use(express.static(__dirname));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL Database');
  }
});

// SIGNUP ROUTE
app.post('/signup', async (req, res) => {
  const { fname, lname, email, password } = req.body;

  // Validate input
  if (!fname || !lname || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into database
    const query =
      'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';

    db.query(
      query,
      [fname, lname, email, hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Email already registered.' });
          }
          console.error('❌ Error inserting user:', err);
          return res.status(500).json({ message: 'Database error occurred.' });
        }

        res.status(201).json({ message: 'User registered successfully!' });
      }
    );

  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
// LOGIN ROUTE
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('❌ Database error:', err);
      return res.status(500).json({ message: 'Database error occurred.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      res.status(200).json({
        message: 'Login successful!',
        user: {
          id: user.id,
          fname: user.first_name,
          lname: user.last_name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('❌ Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
});
