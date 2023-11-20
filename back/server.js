import express from 'express';


const app = express();

// create a GET route sending hello world
app.get('/', (req, res) => {
    res.send('Hello World');
});


// Serve at localhost:3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});




