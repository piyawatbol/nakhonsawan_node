const mongoose = require('mongoose');

const {MONGO_URI} = process.env


exports.connect = () => {
    mongoose.connect('mongodb+srv://piyawatbol:1234@cluster0.dovzycy.mongodb.net/nakornsawan?retryWrites=true&w=majority',{
        useNewUrlParser : true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    }).then(()=>{
    console.log("Successfully connected to database");
    })
    .catch((error)=>{
        console.log("Error connecting to database");
        console.error(error);
        process.exit(1);
    }); 
}