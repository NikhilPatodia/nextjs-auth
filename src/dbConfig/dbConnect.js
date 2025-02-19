import mongoose from "mongoose"

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;
        connection.on("connected", ()=>{
            console.log("Database connection Successfully!")
        })
        connection.on("error", (err)=>{
            console.log(err)
        })
    } catch (error) {
        console.log("Error while connecting to the Database: ", error)
    }
}

export { connectDB }