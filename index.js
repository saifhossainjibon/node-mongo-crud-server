const express = require('express')
const app = express();
const cors = require('cors');
const port = 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

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
        // data send to mongodb server
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            console.log(newUser);
            const result = await usersCollection.insertOne(newUser)
            res.json(result);
        })
        // get API from database
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        })
        // delete user from database
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            console.log('delleted user', result);
            res.json(result);
        });
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await usersCollection.findOne(query);
            res.send(user);
        })

    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log('listening on port ', port);
})