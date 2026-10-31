require('./instrument');
const Sentry = require('@sentry/node');

// npm install para descargar los paquetes...

// libreriuas
var validation = require('./libs/unalib');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// root: presentar html
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// TEMPORAL: ruta para provocar un error de prueba (retirar luego)
app.get('/debug-sentry', async function(req, res){
  try {
    throw new Error('Error de prueba Sentry - UNA Chat');
  } catch (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);
    res.status(500).json({ ok: false, error: err.message });
  }
});

Sentry.setupExpressErrorHandler(app);

// escuchar una conexion por socket
io.on('connection', function(socket){
  // si se escucha "chat message"
  socket.on('Evento-Mensaje-Server', function(msg){

    msg =  validation.validateMessage(msg);
    // volvemos a emitir el mismo mensaje
    io.emit('Evento-Mensaje-Server', msg);
  });
});

if (require.main === module) {
  http.listen(port, function(){
    console.log('listening on *:' + port);
  });
}

module.exports = http;
