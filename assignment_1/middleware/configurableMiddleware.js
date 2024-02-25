function configurableMiddleware(config) {
    return function(req, res, next) {
      console.log(`Configurable middleware executed with config: ${config}`);
      next();
    };
  }
  
  module.exports = configurableMiddleware;
  