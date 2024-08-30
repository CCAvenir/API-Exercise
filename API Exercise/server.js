const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [
    { id: 1, title: 'The Hunger Games', author: 'Suzanne Collins' },
    { id: 2, title: 'Life of Pi', author: 'Yann Martel' },
    { id: 3, title: 'The Fault in Our Stars', author: 'John Green' }
];

app.get('/', (req, res) => {
    res.json(books);
});

app.get('/book', (req, res) => {
    const bookId = parseInt(req.query.id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('<h1>Book not found</h1>');
    }
});

app.get('/addbook', (req, res) => {
    res.send(`
        <form action="/addbook" method="POST">
            <input type="text" name="title" placeholder="Book Title" required>
            <input type="text" name="author" placeholder="Author Name" required>
            <button type="submit">Add Book</button>
        </form>
    `);
});

app.post('/addbook', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.send('<h1>Book added successfully!</h1>');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
