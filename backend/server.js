// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const confRoutes = require('./routes/confRoutes');
const purchesRoutes = require('./routes/purchesRoutes');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes, ticketRoutes, confRoutes, purchesRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});