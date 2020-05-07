const init = (app, questions) => {
  [
    '/index.html',
    '/index',
    '/'
  ].forEach(route => {
    app.get(route, (req, res) => {
      res.render('index', {
        title: 'Peloton Engineering Survey Results!',
        layout: 'layouts/default',
        questions
      });
    });
  });
}
module.exports = {
  init
};
