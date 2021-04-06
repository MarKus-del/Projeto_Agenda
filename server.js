require('dotenv').config();

// Server
const express = require('express');
const path = require('path');

// Banco de dados
const mongoose = require('mongoose');
const URL_BD = process.env.CONNECTIONSTRING;

// dados de sessões ou cookies
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

// segurança
const helmet = require('helmet');
const csrf = require('csurf');

// funções das rotas
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');
const routes = require('./routes');

// iniciando conexão com banco de dados
mongoose.connect(URL_BD, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Banco de dados conectado com sucesso")
    app.emit('pronto')
  })
  .catch(e => console.log(e));

// iniciando app 
const app = express();

// adicionando algumas medidas de segurança
app.use(helmet());
app.use(csrf());

// adicionando arquivos estaticos, parseando de arquivos json e texto
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

// criando configurações de sessões
const sessionOptions = session({
  secret: 'bananacomaveia',
  store: MongoStore.create({ mongoUrl: URL_BD }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});

// utilizando as sessões
app.use(sessionOptions);
app.use(flash());

// adicionando paginas e template engine
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// adicionando middlewares e rotas
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

// iniciando server
app.on('pronto', () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server está rodando na porta http://localhost:${process.env.PORT}`)
  })
});
