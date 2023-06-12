// middleware-1.js
// https://github.com/typicode/json-server/issues/453#issuecomment-343048811
//@jayce 23/05/18-16:11:45 : 将RESTFUL api alias 为 post
module.exports = function (req, res, next) {
  // if (req.method === 'POST') {
  //   req.method = 'GET';
  //   req.query = req.body;
  // }

  next();
};
