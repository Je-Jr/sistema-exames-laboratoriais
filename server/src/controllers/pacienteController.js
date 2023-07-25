const moment = require('moment');
const db = require('../models/databaseConnection');


const obterTodosPacientes = (req, res) => {
  const query = 'SELECT * FROM pacientes';
  db.query(query, (err, result) => {
    if (err) {
      console.log('Erro ao buscar pacientes');
      res.status(500).send('Ocorreu um erro ao buscar pacientes');
    } else {
      if (result.length === 0) {
        res.status(404).send('Nenhum paciente encontrado');
      } else {
        const pacientes = result;
        res.json({ pacientes });
      }
    }
  });
};

const cadastrarPaciente = (req, res) => {
  const { nomeCompleto, cpf, dataNascimento, contato, email } = req.body;

  const query =
    'INSERT INTO pacientes (nome, cpf, data_nascimento, contato, email) VALUES (?, ?, ?, ?, ?)';
  const formattedDataNascimento = moment(dataNascimento, 'YYYY-MM-DD').format('YYYY-MM-DD');
  db.query(
    query,
    [nomeCompleto, cpf, formattedDataNascimento, contato, email],
    (err, result) => {
      if (err) {
        console.log('Erro ao cadastrar paciente', err);
        res.status(500).json({ error: 'Ocorreu um erro ao cadastrar paciente' });
      } else {
        console.log('Paciente cadastrado com sucesso');
        res.status(201).json({ message: 'Paciente registrado com sucesso!' });
      }
    }
  );
};

const obterPacientePorId = (req, res) => {
  const { id } = req.params; // Use "req.params" para obter o ID do paciente

  console.log(id)
  const idPaciente = parseInt(id, 10)
  const query = 'SELECT * FROM pacientes WHERE paciente_id = ?';
  db.query(query, idPaciente, (err, result) => {
    if (err) {
      console.log('Erro ao buscar paciente', err);
      res.status(500).send('Ocorreu um erro ao buscar paciente');
    } else {
      if (result.length === 0) {
        res.status(404).send('Nenhum paciente encontrado');
      } else {
        const paciente = result[0]; // Use "result[0]" para obter o primeiro paciente encontrado
        res.status(200).json( paciente );
      }
    }
  });
};

const atualizarPaciente = (req, res) => {
  const { id } = req.params; // Use "req.params" to get the ID of the patient
  const { nome, cpf, dataNascimento, contato, email } = req.body;

  const formattedDataNascimento = moment(dataNascimento, 'YYYY-MM-DD').format('YYYY-MM-DD');
  const query = 'UPDATE pacientes SET nome=?, cpf=?, data_nascimento=?, contato=?, email=? WHERE paciente_id=?';
  db.query(
    query,
    [nome, cpf, formattedDataNascimento, contato, email, id],
    (err, result) => {
      if (err) {
        console.log('Erro ao atualizar paciente', err);
        res.status(500).json({ error: 'Ocorreu um erro ao atualizar paciente' });
      } else {
        console.log('Paciente atualizado com sucesso');
        res.status(200).json({ message: 'Paciente atualizado com sucesso!' });
      }
    }
  );
};


module.exports = {
  obterTodosPacientes,
  cadastrarPaciente,
  obterPacientePorId,
  atualizarPaciente
};
