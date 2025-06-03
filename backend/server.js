require('dotenv').config();
const app = require('./app');
const connectDB = require('./utils/db');

connectDB();

// const PORT = process.env.PORT || 5000; // For release build

const PORT = process.env.PORT || 80; // For dev env

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
