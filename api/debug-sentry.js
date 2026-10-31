require('../instrument');
const Sentry = require('@sentry/node');

module.exports = async function (req, res) {
  try {
    throw new Error('Error de prueba Sentry - UNA Chat (Vercel)');
  } catch (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({
      ok: false,
      error: err.message,
      message: 'Excepcion capturada y enviada a Sentry correctamente.'
    }));
  }
};
