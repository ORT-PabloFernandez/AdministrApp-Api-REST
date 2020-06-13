module.exports = {
    port: process.env.PORT || 3001,
    db: process.env.MONGODB || 'mongodb://localhost:27017/administrapp',
    SECRET_TOKEN: process.env.SECRET_TOKEN
}