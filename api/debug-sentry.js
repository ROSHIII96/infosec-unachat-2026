require('../instrument');
const Sentry = require('@sentry/node');

module.exports = async function (req, res) {
  try {
    foo();
  } catch (e) {
    Sentry.captureException(e);
    await Sentry.flush(2000);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({
      ok: false,
      error: e.message,
      message: 'Excepcion capturada y enviada a Sentry correctamente.'
    }));
  }
};
