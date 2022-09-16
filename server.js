const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const cors = require('cors')
app.use(cors())

require("dotenv").config();
const PORT = process.env.PORT || 2121;

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = "todo";

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
    (client) => {
        console.log(`connected to ${dbName} dataBase`);
        db = client.db(dbName);
    }
);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
    const todoItems = await db.collection("todos").find().toArray();
    const itemsLeft = await db
        .collection("todos")
        .countDocuments({ completed: false });
    res.render("index.ejs", { items: todoItems, left: itemsLeft });
});
app.post("/addTodo", (req, res) => {
    db.collection("todos")
        .insertOne({
            title: req.body.todoItem,
            completed: false,
            trashed: false,
        })
        .then((result) => {
            console.log(`${req.body.todoItem} added`);
            res.redirect("/");
        })
        .catch((err) => console.error(err));
});
app.put("/trash", (req, res) => {
    db.collection("todos")
        .updateOne(
            { title: req.body.itemFromJs },
            {
                $set: {
                    trashed: true,
                },
            },
            {
                sort: { id: -1 },
                upsert: false,
            }
        )
        .then((result) => {
            console.log(req.body.itemFromJs)
            console.log("trashed succesfully");
            res.json("Trashing complete");
            res.redirect("/");
        })
        .catch((err) => console.error(err));
});

app.delete('/deleteItem', (request, response) => {
    db.collection('todos').deleteOne({ title: request.body.itemFromJS })
        .then(result => {
            console.log(request.body.itemFromJS)
            console.log('Todo Deleted')
            response.json('Todo Deleted')
        })
        .catch(error => console.error(error))

})

app.listen(PORT, () => {
    console.log(`app running on port ${PORT} betta go catch it`);
});
