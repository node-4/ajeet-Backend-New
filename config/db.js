const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const db = async () => {
const uri ="mongodb+srv://agrobid:QHq33yaV0Qcptah7@cluster0.fo9quvq.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    async function listDatabases(client) {
        databasesList = await client.db().admin().listDatabases();
        console.log("Databases:");
        databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
    }
    try {
        mongoose
            .connect(
                uri,
                { useNewURLParser: true, useUnifiedTopology: true },
                6000000
            )
            .then(console.log(`Database connected to ${process.env.PORT}`))
            .catch((err) => console.log(err));
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
};

module.exports = db;
