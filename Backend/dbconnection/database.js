const mongoose = require("mongoose")
const db = "mongodb+srv://rohanhero182004:E5xracSBNmK9Gvl6@cluster0.2gmsgug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Take";
console.log(db);
mongoose.connect(db).then(console.log(`db connected`)).catch((err) => console.log("err", err));
