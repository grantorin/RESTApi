const express = require('express')
const path = require('path')
const {v4} = require('uuid')
const app = express()

app.use(express.json()) // <== поддержка сервером JSON

// DB
let CONTACTS = [
    { id: v4(), marked: false, name:"John Doe", value:"value from DB" }
]

//***************************************
//               ROUTES
//***************************************

// GET
app.get('/api/contacts', (req, res) => {
    // TODO: искусственный timeOut сервера
    setTimeout(() => {
        res.status(200).json(CONTACTS)
    }, 1000)
})

// POST
app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: v4(), marked: false}
    CONTACTS.push(contact)
    res.status(201).json(contact) // 201 елемент был создан
})

// DELETE
app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
    res.status(200).json({ message: 'OK' })
})

// PUT (полностью меняет модель)
app.put('/api/contacts/:id', (req, res) => {
    const idx = CONTACTS.findIndex(c => c.id === req.params.id)
    CONTACTS[idx] = req.body
    res.json(CONTACTS[idx]) // <== по умолчанию статус 200
})

// PATCH (частично меняет модель)...



app.use(express.static(path.resolve(__dirname, 'client'))) // <== делаем папку статической

/**
 * При выполнении GET запросов на любые/все роуты
 * отдавать index.html
 */
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})
app.listen(3000, () => console.log('Server has been started on port 3000...'))