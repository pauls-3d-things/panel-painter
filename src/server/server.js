const express = require('express')
const app = express()
const port = 3000

app.use(express.static('dist/'))
app.get('/api', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Hosting: http://localhost:${port}!`))