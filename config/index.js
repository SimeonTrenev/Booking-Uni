const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 9999,
        dbUrl: 'mongodb://localhost:27017/Booking',
        cookie: 'x-token',
        secret: 'SuperSecret',
        saltRounds: 10
    }
};

module.exports = config[env];