import amqp from 'amqplib/callback_api';
import axios from 'axios';

import logger from "./models/logger";

require('dotenv').config()

amqp.connect(`${process.env.AMQP_HOST}`, function(error0: any, connection: any) {
  if (error0) {
    throw error0;
  }
  
  connection.createChannel((error1: any, channel: any) => {
    if (error1) {
      throw error1;
    }
    
    axios.get(`${process.env.REST_API_HOST}info`).then((resp) => {
      const cluster_id = resp.data.resualt.Swarm.Cluster.ID;
      
      const queue = `${process.env.AMQP_QUEUE}-${cluster_id}`;

      channel.assertQueue(queue, {
        durable: false
      });

      logger.info(" [*] Waiting for messages in %s.", queue);

      channel.consume(queue, (msg: any) => {
        const json_data = JSON.parse(msg.content.toString());

        logger.info(" [x] Received %s", json_data);

        axios.post(`${process.env.REST_API_HOST}service/${json_data.service_id}/update`, {
          image: json_data.image,
          tag: json_data.tag,
          webhook_id: json_data.webhook_id,
        }).then((resp) => {
          logger.info(resp)
        }).catch((err) => {
          logger.error(err)
        })
      }, {
        noAck: true
      });
    })
    
  });
});