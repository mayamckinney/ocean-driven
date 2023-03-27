const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const fs = require("fs");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const multer = require("multer");
// Create multer object

const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = `../client/public/images/${req.params.id}`;
      // If directory does not exist, create it
      if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

const router = require("express").Router();

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

router.post('/image/:id', imageUpload.single('image'), (req, res) => { 
  res.json('/image api'); 
});

router.get('/images/:id', (req, res) => {
  // Find the names of all files in the directory
  const dir = `../client/public/images/${req.params.id}`;
  // Check if directory exists
  let files = [];
  if(fs.existsSync(dir)) 
    files = fs.readdirSync(dir);
  // Send the names of the files in the directory
  res.json(files);
});


app.use("/api/boat/", router);
// Serve up static assets
app.use("/images", express.static(path.join(__dirname, "../client/images")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
