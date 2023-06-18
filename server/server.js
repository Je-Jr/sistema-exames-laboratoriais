const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('../server/config/database')

const app = express();
app.use(express.json());
app.use(cors());


// Rota de registro de usuário
app.post('/register', async (req, res) => {
  const { user, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (user, password) VALUES (?, ?)';
  db.query(query, [user, hashedPassword], (err, result) => {
    if (err) {
      console.error('Erro ao registrar usuário:', err);
      res.status(500).json({ error: 'Ocorreu um erro ao registrar o usuário' });
    } else {
      console.log('Usuário registrado com sucesso');
      res.status(201).json({ message: 'Usuário registrado com sucesso' });
    }
  });
});

// Rota de login
app.post('/login', (req, res) => {
  const { user, password } = req.body;

  const query = 'SELECT * FROM users WHERE user = ?';
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
          console.log('Login realizado com sucesso');
          res.status(200).json({ message: 'Login realizado com sucesso' });
        } else {
          res.status(401).json({ error: 'Senha incorreta' });
        }
      }
    }
  });
});

// Outras rotas e configurações do servidor...

// Iniciar o servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
