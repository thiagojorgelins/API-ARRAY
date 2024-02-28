const express = require('express')
const app = express()

const PORT = 3000 || process.env.PORT
app.use(express.json())


let books = [
    { id: 1, title: 'livro 1'},
    { id: 2, title: 'livro 2'},
    { id: 3, title: 'livro 3'}
]

app.get("/book", (req, res)=>{
    res.send(books)
})

app.post("/book", (req, res)=>{
    const newBook = req.body;
    books.push(newBook)
    res.send(newBook)
})

app.put("/book/:id", (req, res)=>{
    const bookId = parseInt(req.params.id)
    const newTitle = req.body.title
    
    const bookToUpdate = books.find(book => book.id === bookId)
    if(bookToUpdate){
        bookToUpdate.title = newTitle
        res.json(bookToUpdate)
    } else {
        res.status(404).send("Livro não encontrado!")
    }

})

app.delete("/book/:id", (req, res)=>{
    const bookId = parseInt(req.params.id)
    const bookToRemove = books.findIndex(book => book.id === bookId)
    if(bookToRemove !== -1){
        const removedBook = books.splice(bookToRemove, 1)
        res.send(removedBook[0])
    } else{
        res.status(404).send("Livro não encontrado!")
    }

})
app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
})