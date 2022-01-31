const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(express.json(), express.urlencoded({ extended: true }), cors());

require("./server/config/config");


require("./server/routes/pet.routes")(app);

const server = app.listen(port, () => console.log(`Listening on port: ${port}`));

// TODO SOCKETS
// const io = require('socket.io')(server, {cors: true})

// io.on('connection', socket => {
//   socket.on('event_from_client', data => {
//     io.emit('send_data_to_all_other_clients', data);
//   })
// })