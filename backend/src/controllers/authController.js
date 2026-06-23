const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users(name, email, password, role)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `;

    const values = [
      name,
      email,
      hashedPassword,
      role
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: "User registered",
      user: result.rows[0]
    });

  } catch (err) {

    console.log(err);

    if (err.code === "23505") {
      return res.status(400).json({
        error: "Email already exists"
      });
    }

    res.status(500).json({
      error: err.message
    });
  }

};
exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const query = `
      SELECT * FROM users
      WHERE email = $1
    `;

    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid password"
      });

    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        role: user.role
      }
    });
  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

};