const mongoose = require("mongoose")
const db = "mongodb://localhost:27017/Take";
console.log(db);
mongoose.connect(db).then(console.log(`db connected`)).catch((err) => console.log("err", err));