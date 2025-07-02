import { v4 as uuidv4 } from 'uuid';
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || 'iframe-service-vercel',
  brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'],
  ssl: process.env.KAFKA_USERNAME ? true : false,
  sasl: process.env.KAFKA_USERNAME ? {
    mechanism: 'plain',
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD
  } : undefined
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { body } = req;
    const requestId = uuidv4();
    const sessionId = body.sessionId || uuidv4();
    
    const iframeRequest = {
      requestId,
      sessionId,
      data: body,
      timestamp: new Date().toISOString()
    };

    const producer = kafka.producer();
    await producer.connect();
    
    await producer.send({
      topic: process.env.KAFKA_TOPIC_REQUESTS || 'iframe-requests',
      messages: [{
        key: requestId,
        value: JSON.stringify(iframeRequest)
      }]
    });
    
    await producer.disconnect();

    res.status(200).json({
      success: true,
      requestId,
      sessionId,
      message: 'Iframe request sent to Kafka'
    });
  } catch (error) {
    console.error('Error sending iframe request:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}