const mongoose = require("mongoose");

const connect = async () => mongoose.connect(process.env.DB_URL);
module.exports = connect;
