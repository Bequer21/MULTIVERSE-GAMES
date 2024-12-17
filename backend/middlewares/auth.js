const basicAuth = require('basic-auth');

const auth = (req, res, next) => {
    const user = basicAuth(req);
    if (!user || user.name !== /* process.env.BASIC_AUTH_USER */ "admin" || user.pass !== "admin123"/* process.env.BASIC_AUTH_PASSWORD */) {
        res.set('WWW-Authenticate', 'Basic realm="Restricted Area"');
        return res.status(401).send('Unauthorized');
    }
    next();
};

module.exports = auth;
