const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;
const db = require('./models');

//Routers
const postsRoutes = require('./routes/Posts');
app.use("/posts", postsRoutes);
const commentsRoutes = require('./routes/Comments');
app.use("/comments", commentsRoutes);
const usersRoutes = require('./routes/Users');
app.use("/auth", usersRoutes);
const likesRoutes = require('./routes/Likes');
app.use("/likes", likesRoutes);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log('Server running port', port);
    });
});

