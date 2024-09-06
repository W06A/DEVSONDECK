

const express = require('express');

const cors = require('cors');



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



require('./config/auth');
require('./config/connect');
require("./routes/devs")(app);
require("./routes/orgs")(app);

 
app.listen(8000, () => {
  console.log('Listening at Port 8000');
});

