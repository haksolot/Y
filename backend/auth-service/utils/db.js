const port = 3000;
// Cpnnexion à la base de données MongoDB
const connectDB = async () =>{
    try {
        await mongoose.connect("mongodb://" + process.env.MONGO_HOST + ":" + process.env.MONGO_PORT + "/" + process.env.MONGO_DATABASE_NAME)
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB