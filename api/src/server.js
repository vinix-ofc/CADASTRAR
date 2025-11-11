const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Configurando o banco de dados SQLite
const dbPath = path.join(__dirname, 'maquinas.db');
const db = new sqlite3.Database(dbPath);

// Criando a tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS maquinas (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  idMaquina TEXT NOT NULL UNIQUE,
  oficina TEXT NOT NULL,
  conjuntos TEXT,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
)`);

app.use(cors());
app.use(express.json());

// Listar todas as máquinas
app.get('/maquinas', (req, res) => {
  db.all('SELECT * FROM maquinas ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Criar uma nova máquina
app.post('/maquinas', (req, res) => {
  const { nome, idMaquina, oficina, conjuntos } = req.body;
  
  if (!nome || !idMaquina || !oficina) {
    return res.status(400).json({ error: 'Nome, ID da máquina e oficina são obrigatórios' });
  }

  const maquina = {
    id: uuidv4(),
    nome,
    idMaquina,
    oficina,
    conjuntos: conjuntos || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.run(
    'INSERT INTO maquinas (id, nome, idMaquina, oficina, conjuntos, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [maquina.id, maquina.nome, maquina.idMaquina, maquina.oficina, maquina.conjuntos, maquina.createdAt, maquina.updatedAt],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'ID da máquina já existe' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json(maquina);
    }
  );
});

// Atualizar uma máquina
app.put('/maquinas/:id', (req, res) => {
  const { nome, idMaquina, oficina, conjuntos } = req.body;
  const { id } = req.params;
  const updatedAt = new Date().toISOString();

  let sql = 'UPDATE maquinas SET';
  const params = [];
  const updates = [];

  if (nome !== undefined) {
    updates.push(' nome = ?');
    params.push(nome);
  }
  if (idMaquina !== undefined) {
    updates.push(' idMaquina = ?');
    params.push(idMaquina);
  }
  if (oficina !== undefined) {
    updates.push(' oficina = ?');
    params.push(oficina);
  }
  if (conjuntos !== undefined) {
    updates.push(' conjuntos = ?');
    params.push(conjuntos);
  }

  updates.push(' updatedAt = ?');
  params.push(updatedAt);
  params.push(id);

  sql += updates.join(',') + ' WHERE id = ?';

  db.run(sql, params, function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'ID da máquina já existe' });
      }
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Máquina não encontrada' });
    }
    
    // Buscar a máquina atualizada
    db.get('SELECT * FROM maquinas WHERE id = ?', [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(row);
    });
  });
});

// Excluir uma máquina
app.delete('/maquinas/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM maquinas WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Máquina não encontrada' });
    }
    res.status(204).send();
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});