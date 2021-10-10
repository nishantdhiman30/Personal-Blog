const express = require("express");
const mongoose = require("mongoose");
const _ = require('lodash');

const app = express();

const homeStartingContent = "This is Nishant";
const aboutStartingContent = "I am an Undergrad student at Graphic Era University, Dehradun";
const contactStartingContent = "You can contact me at nishantt0007@gmail.com";

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/blogDB");

const blogSchema = {
   title: String,
   content: String
};

const Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res) {
   Blog.find({}, function(err, blogs){
      res.render("home", {
         homeContent : homeStartingContent,
         posts: blogs
      });
   })
});

app.get("/about", function(req, res) {
   res.render("about", {aboutContent : aboutStartingContent});
});

app.get("/contact", function(req, res) {
   res.render("contact", {contactContent : contactStartingContent});
});

app.get("/compose", function(req, res) {
   res.render("compose");
});

app.post("/compose", function(req, res) {
   const blog = Blog({
      title: req.body.postTitle,
      content: req.body.postContent
   });
   blog.save(function(err){
      if(!err)
         res.redirect("/");
   });
});

app.get("/posts/:postID", function(req, res){
   const requestedPostId = req.params.postId;

   Blog.findOne({_id: requestedPostId}, function(err, blog) {
         res.render("posts", {postTitle : blog.title, postContent : blog.content});
   });
});

app.listen(3000, function() {
   console.log("Server Started");
});