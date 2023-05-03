const express = require('express');
// express app initialization
const app = express();
app.use(express.json());

app.get('/home', (req, res) => {
    res.status(200).json({
        body: {
            name: 'Bangladesh',
            Description: 'Bangladesh is a beautiful country',
            status: 'active',
        },
    });
});

app.get('/', (req, res) => {
    res.send('Hello world');
});
// default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}
const port = 3000;
app.listen(port, () => {
    console.log(`server is running at ${port}/`);
});
