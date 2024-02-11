const mongoose = require('mongoose');

const connectDatabase = async () => {
    const db = process.env.DB_LOCAL_URI
    try {
    let con = await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`MongoDB connected at ${con.connection.host}`);
    } catch (error) {
    console.log(error.message);
    process.exit(1);
    }
};


module.exports = connectDatabase

