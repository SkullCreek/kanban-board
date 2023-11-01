import mongoose from "mongoose";

export const connectToMongoose = () => {
    const uri = 'mongodb+srv://darpan:1977@darpan.k3zfqdd.mongodb.net/darpan?retryWrites=true&w=majority'
    mongoose.connect(uri)
    .then(e => console.log(`Connected to MongoDB: ${e.connection.host}`))
    .catch((err) => console.log(`Could not connect ${err}`))
}

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const kanbanSchema = new mongoose.Schema({
    username: String,
    title: String,
    description: String,
    tags:[String],
    stage: String
})

export const User = mongoose.model("User", userSchema)
export const Kanban = mongoose.model("Kanban", kanbanSchema)