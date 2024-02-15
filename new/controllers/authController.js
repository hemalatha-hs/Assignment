const users = []; 

// Controller function for handling user login
const login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful' });
};

// Controller function for handling user registration
const register = (req, res) => {
  const { username, password } = req.body;

  if (users.some(user => user.username === username)) {
    return res.status(400).json({ error: 'Username is already taken' });
  }

  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);

  res.json({ message: 'Registration successful' });
};

module.exports = { login, register };
