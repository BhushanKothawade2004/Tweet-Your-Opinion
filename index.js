const express = require("express");
const app = express(); 
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));

let posts = [
    {
        id: uuidv4(),
        username: "Franklin",
        content: "The only thing we have to fear is fear itself."
    },
    {
        id: uuidv4(),
        username: "Batman",
        content: "Nights are darkest before dawn",  
    },
    {
        id: uuidv4(),
        username: "HilaryClinton",
        content: "Snakes in your backyard won't bite only neighbours",
    },

]

app.get("/", (req, res) => {
    res.send("This is our Home Page");
});

app.get("/tweets", (req, res) => {
    res.render("tweets.ejs", { posts });
});

app.get("/tweets/new", (req, res) => {
    res.render("new.ejs")
});

app.post("/tweets", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({username, content, id});
    res.redirect("/tweets"); 
}); 

app.get("/tweets/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

app.patch("/tweets/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.Content; 
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.send("Patch request working"); 
}) ;

app.get("/tweets/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
}); 