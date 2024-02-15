
// middleware/applicationMiddleware.js

function commonMiddleware(req, res, next) {
    console.log('Common middleware executed');
    next();
}

function myMiddleware(req, res, next) {
    console.log('My middleware executed');
    next();
}

module.exports = {
    commonMiddleware,
    myMiddleware
};
