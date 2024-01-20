import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const connectionInatance = await mongoose.connect(process.env.MONGOOSE_URL)
        console.log("DB Connected")
    } catch (error) {
        console.log(` Mongoose connection error :  ${error}`);
    }

}

export default connectDB;

//  this is second way to connect to the database server and connect to the database server.
    

/*
mongoose.connect(process.env.MONGOOSE_URL)
 .then(() => {
    console.log("database connection established");
 })
 .catch ((error) => {
    console.log(`database connection error: ${ error } `);
 })

*/