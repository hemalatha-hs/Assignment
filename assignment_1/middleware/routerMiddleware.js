function routerMiddleware(req, res, next) {
    console.log('Router middleware executed');
    next();
  }
  
  module.exports.routerMiddleware = routerMiddleware;
  