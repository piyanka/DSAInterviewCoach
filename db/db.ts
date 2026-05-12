import mongoose from "mongoose";

declare global {
    // eslint-disable-next-line no-var
    var mongooseConnectPromise: Promise<typeof mongoose> | undefined;
    // eslint-disable-next-line no-var
    var mongooseListenersAttached: boolean | undefined;
}

export async function connect(){
    try{
        if (mongoose.connection.readyState === 1) {
            return;
        }
        if (!globalThis.mongooseConnectPromise) {
            globalThis.mongooseConnectPromise = mongoose.connect(process.env.MONGO_URI!);
        }
        if (!globalThis.mongooseListenersAttached) {
            const connection = mongoose.connection;

            connection.on('connected', () => {
                console.log("MongoDb connected");
            })

            connection.on('error',(err) => {
                console.log("MongoDB connection error, please make sure db is running" + err);
                process.exit();
            })

            globalThis.mongooseListenersAttached = true;
        }

        await globalThis.mongooseConnectPromise;
    } catch(error){
        console.log("Something went wrong in connecting to db");
        console.log(error);
    }
}