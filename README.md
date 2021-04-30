# Octopus AMQP Deployment

Deployment services for Docker Octopus stack, connection to RabbitMQ and sending update signals to Docker Swarm clusters based what there AMQP messaget from RabbitMQ contains.

## AMQP Sample message
``` json
{
    "cluster_id": "51bb80u3dn7b3dvqn1bue20iz",
    "service_id": "nh0jrbw3no3j3ld42smbv9a4w",
    "image": "sample/image-test",
    "tag": "beta"
}
```