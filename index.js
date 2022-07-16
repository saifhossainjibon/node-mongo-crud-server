const express = require('express')
const app = express();
const cors = require('cors');
const port = 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('running my CRUD server...')
})



const uri = "mongodb+srv://mydbuser2:KGR1ltP7vpbcSQ23@cluster0.4vhi1hx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const database = client.db("foodMaster");
        const usersCollection = database.collection("users");
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            console.log(newUser);
            const result = await usersCollection.insertOne(newUser)
            res.json(result);
            // console.log(`A document was inserted with the _id: ${result.insertedId}`);
        })

        // 
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log('listening on port ', port);
})