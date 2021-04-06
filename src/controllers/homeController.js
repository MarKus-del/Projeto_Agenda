const HomeModel = require('../models/HomeModel');

// HomeModel.create({
//   titulo: "Um titulo de testes",
//   descricao: "Uma descrição de teste"
// })
// HomeModel.find()
//   .then(dados => console.log(dados))
//   .catch(e => console.log(e));

exports.paginaInicial = (req, res) => {
  // req.session.usuario = {name: 'Marcos', logado: true}
  console.log(req.session.usuario);
  // req.flash('info', "Hello World!!")  
  console.log(req.flash('info'));

  res.render('index');
  return;
}

exports.trataPost = (req, res) => {
  console.log(req.body);
  res.send(`Recebi o formulário com o dado : ${JSON.stringify(req.body)}`);
  return;
}