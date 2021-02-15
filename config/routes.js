module.exports = (express, app) => {
    const routers = require('../routes')(express.Router());

    app.use('/home', routers.homeRouter);
    app.use('/user', routers.userRouter);
    app.use('/hotels', routers.hotelRouter)
};