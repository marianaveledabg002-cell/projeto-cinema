import express from 'express'
const app = express();
const PORT = 3000;

import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });


app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

// Liberar acesso à pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '/public'))

import Filme from './models/filme.js'
import Genero from './models/genero.js'
import Diretor from './models/diretor.js'

app.get('/', (req, res) => {
    res.render("index");
})

// FILME
app.get('/filme', async (req, res) => {
    const filmes = await Filme.find()
    res.render("filme/lst", { filmes });
})

app.get('/filme/add', (req, res) => {
    res.render("filme/add");
})

app.post('/filme/add', upload.single('foto'), async (req, res) => {
    const { nome, genero, duracao, anoLancamento, classificacao, descricao } = req.body
    let foto = null
    if(req.file) foto = req.file.buffer

    await Filme.create({ nome, genero, duracao, anoLancamento, classificacao, descricao, foto })
    res.redirect("/filme");
})

app.get('/filme/del/:id',  async (req, res) => {
await Filme.findByIdAndDelete(req.params.id)
 const filmes = await Filme.find()
 res.render("filme/lst", {filmes});

})

app.get('/filme/upd/:id', async (req, res) => {
const filme = await Filme.findById(req.params.id)
  res.render("filme/upd",{filme});
})

app.post('/filme/upd/:id',  async (req, res) => {
  const {nome,genero,duracao,anoLancamento,classificacao,descricao} = req.body
 await Filme.findByIdAndUpdate(req.params.id,{nome,genero,duracao,anoLancamento,classificacao,descricao})
  const filmes = await Filme.find()
 res.render("filme/lst", {filmes});
})

app.post('/filme/add',  async (req, res) => {
  const {nome,genero,duracao,anoLancamento,classificacao,descricao} = req.body
 await Filme.create({nome,genero,duracao,anoLancamento,classificacao,descricao})
  res.render("filme/add"); 
})

app.get('/filme/foto/:id', async (req, res) => {
    const filme = await Filme.findById(req.params.id);

    if (!filme || !filme.foto) {
        return res.sendStatus(404);
    }

    res.set('Content-Type', 'image/png');
    res.send(filme.foto);
});

app.post('/filme/pesquisa', async (req, res) => {
  const { pesquisar } = req.body;
  const filmes = await Filme.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("filme/lst", { filmes });
})

// GENERO
app.get('/genero', async (req, res) => {
    const generos = await Genero.find()
    res.render("genero/lst", { generos });
})

app.get('/genero/add', (req, res) => {
    res.render("genero/add");
})

app.post('/genero/add', async (req, res) => {
    const { nome, descricao } = req.body
    await Genero.create({ nome, descricao })
    res.redirect("/genero");
})

app.get('/genero/del/:id',  async (req, res) => {
await Genero.findByIdAndDelete(req.params.id)
 const generos = await Genero.find()
 res.render("genero/lst", {generos});

})

app.get('/genero/upd/:id', async (req, res) => {
    const genero = await Genero.findById(req.params.id);
    res.render("genero/upd", { genero });
})
app.post('/genero/upd/:id', async (req, res) => {
    const { nome, descricao } = req.body;

    await Genero.findByIdAndUpdate(req.params.id, { nome, descricao });

    res.redirect("/genero");
})
app.post('/genero/pesquisa', async (req, res) => {
  const { pesquisar } = req.body;
  const generos = await Genero.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("genero/lst", { generos });
})


// DIRETOR
app.get('/diretor', async (req, res) => {
    const diretores = await Diretor.find()
    res.render("diretor/lst", { diretores });
})

app.get('/diretor/add', (req, res) => {
    res.render("diretor/add");
})

app.post('/diretor/add', async (req, res) => {
    const { nome, nascimento, filmes } = req.body
    await Diretor.create({ nome, nascimento, filmes })
    res.redirect("/diretor");
})

app.get('/diretor/del/:id',  async (req, res) => {
await Diretor.findByIdAndDelete(req.params.id)
 const diretores = await Diretor.find()
 res.render("diretor/lst", {diretores});

})
app.get('/diretor/upd/:id', async (req, res) => {
    const diretor = await Diretor.findById(req.params.id);
    res.render("diretor/upd", { diretor });
})

app.post('/diretor/upd/:id', async (req, res) => {
    const { nome, nascimento, filmes } = req.body;

    await Diretor.findByIdAndUpdate(req.params.id, { nome, nascimento, filmes });

    res.redirect("/diretor");
})

app.post('/diretor/pesquisa', async (req, res) => {
  const { pesquisar } = req.body;
  const diretores = await Diretor.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("diretor/lst", { diretores });
})

app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});
