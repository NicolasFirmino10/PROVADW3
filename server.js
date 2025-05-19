const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const port = 3000;

app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Arquivo não enviado');
  }

  const fileContent = req.file.buffer.toString('utf-8').trim();

  if (!fileContent) {
    return res.status(400).send('Arquivo vazio');
  }


  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.send(fileContent);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
