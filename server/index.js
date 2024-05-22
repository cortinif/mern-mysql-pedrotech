const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;
const db = require('./models');

//Routers
const postRoutes = require('./routes/Posts');
app.use("/posts", postRoutes);
const commentRoutes = require('./routes/Comments');
app.use("/comments", commentRoutes);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log('Server running port', port);
    });
});

