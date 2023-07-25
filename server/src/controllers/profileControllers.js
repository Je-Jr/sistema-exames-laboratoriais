const db = require('../models/databaseConnection');

const profile = (req, res) => {
  const userId = req.userId;

  const query = 'SELECT user FROM usuarios WHERE id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Erro ao buscar nome do usuário:', err);
      res.status(500).send('Ocorreu um erro ao buscar o nome do usuário');
    } else {
      if (result.length === 0) {
        res.status(404).send('Usuário não encontrado');
      } else {
        const userName = result[0].user;
        res.json({ name: userName });
      }
    }
  });
};

module.exports = profile;