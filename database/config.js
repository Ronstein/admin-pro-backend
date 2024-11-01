const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
        });
        console.log('Database online');
    } catch (error) {
        console.log(error);
        throw new Error('Error starting the database');
    }
}

module.exports = {
    dbConnection
}