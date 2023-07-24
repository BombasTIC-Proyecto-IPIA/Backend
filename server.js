const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

const db = require('./models')
const Paciente = db.pacientes;
const Doctor = db.doctors;

const routerAuth = require("./routes/auth")
const routerAPI = require("./routes/api");
const routerUtilities = require("./routes/utilities");
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
// Configurar el middleware CORS
app.use(cors());

// app.use("/auth", routerLogin);
app.use("/api", routerAPI);
app.use("/auth", routerAuth);
app.use("/utilities", routerUtilities);

db.sequelize.sync().then((req) => {
    app.listen(3000)
})
