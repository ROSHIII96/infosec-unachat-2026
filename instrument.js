const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN || 'https://b850b46d3e8455556870b8d1eea3c777@o4512347918237696.ingest.us.sentry.io/4512348011364352',
  environment: process.env.VERCEL_ENV || 'production',
  sendDefaultPii: false
});
