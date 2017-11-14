require('dotenv').config();
const seneca = require('seneca')();
const data = require('../sandbox-data');

seneca.add({ role: 'item', cmd: 'deleteItem' }, (message, reply) => {
  if (!message.id) {
    return reply(null, { error: 'ItemIdentifierRequired' });
  }
  data.Item
    .findById(message.id)
    .then(item => {
      if (!item) {
        return reply(null, { error: 'ItemNotFound' });
      }
      return item.destroy();
    })
    .then(reply(null, { response: message.id }))
    .catch(error => reply(error, null));
});

seneca.listen({
  port: process.env.PORT,
  host: process.env.HOST || 'localhost',
});
