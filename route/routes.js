const adRoutes = require('./manageAd');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('welcome');
    });

    // // other routes
    adRoutes(app, fs);

};

module.exports = appRouter;