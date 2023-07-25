const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/databaseConnection');


const userLogin = (req, res) => {
  const { user, password } = req.body;

  const query = 'SELECT * FROM usuarios WHERE user = ?';
  db.query(query, [user], async (err, result) => {
    if (err) {
      console.error('Erro ao realizar login:', err);
      res.status(500).json({ error: 'Ocorreu um erro ao realizar o login' });
    } else {
      if (result.length === 0) {
        res.status(401).json({ error: 'Usuário não encontrado' });
      } else {
        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
          console.log('Login realizado com sucesso');
          res.status(200).json({ token, redirectUrl: '/profile', id: user.id });
        } else {
          res.status(401).json({ error: 'Senha incorreta' });
        }
      }
    }
  });
};

const userRegister = async (req, res) => {
  const { user, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO usuarios (user, password) VALUES (?, ?)';
  db.query(query, [user, hashedPassword], (err, result) => {
    if (err) {
      console.error('Erro ao registrar usuário:', err);
      res.status(500).json({ error: 'Ocorreu um erro ao registrar o usuário' });
    } else {
      console.log('Usuário registrado com sucesso');
      res.status(201).json({ message: 'Usuário registrado com sucesso' });
    }
  });
};

module.exports = {
  userLogin,
  userRegister,
};
