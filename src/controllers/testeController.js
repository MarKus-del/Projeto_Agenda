exports.teste = (req, res) => {
  console.log(req.params);
  console.log(req.query);
  res.send(`
    {
      params: ${JSON.stringify(req.params)},
      query: ${JSON.stringify(req.query)}
    }
  `)
}