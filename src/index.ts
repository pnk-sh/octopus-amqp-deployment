import amqp from 'amqplib/callback_api';

import logger from "./models/logger";

require('dotenv').config()

amqp.connect(`amqp://${process.env.AMQP_HOST}`, function(error0: any, connection: any) {
  if (error0) {
    throw error0;
  }
  
  connection.createChannel((error1: any, channel: any) => {
    if (error1) {
      throw error1;
    }

    const queue = process.env.AMQP_QUEUE;

    channel.assertQueue(queue, {
      durable: false
    });

    logger.info(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, (msg: any) => {
      logger.info(" [x] Received %s", msg.content.toString());
    }, {
      noAck: true
    });
  });
});