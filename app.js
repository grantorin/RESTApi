const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.resolve(__dirname, 'client'))) // <== делаем папку статической

/**
 * При выполнении GET запросов на любые/все роуты
 * отдавать index.html
 */
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})
app.listen(3000, () => console.log('Server has been started on port 3000...'))