const mongoose = require('mongoose')

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log('Database is Connected')
    }catch(err){
        console.log('Database is Not connected.')
    }
}

module.exports = connectDB