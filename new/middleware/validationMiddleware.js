function validateLogin(req, res, next) {
    console.log('Login validation middleware executed');
    next();
  }
  
  function validateRegister(req, res, next) {
    console.log('Register validation middleware executed');
    next();
  }
  
  function validateAuthorID(req, res, next) {
    const authorID = parseInt(req.params.authorId);
    if (isNaN(authorID)) {
      return res.status(400).json({ error: 'Invalid author ID' });
    }
    next();
  }
  
  module.exports.validateLogin = validateLogin;
  module.exports.validateRegister = validateRegister;
  module.exports.validateAuthorID = validateAuthorID;
  