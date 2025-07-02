# Kafka Iframe Service

A serverless microservice for generating dynamic iframes using Kafka messaging.

## Features

- 🚀 **Serverless**: Deploy to Vercel Functions
- ☁️ **Kafka Integration**: Uses Confluent Cloud
- 🔄 **Real-time**: WebSocket support (development)
- 🎯 **Iframe Generation**: Dynamic iframe content via Kafka

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Confluent Cloud credentials
   ```

3. **Development:**
   ```bash
   npm run dev
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

## API Endpoints

- `GET /api/health` - Service health check
- `POST /api/iframe-request` - Request iframe generation

## Environment Variables

```env
KAFKA_BROKERS=your-confluent-bootstrap-server
KAFKA_USERNAME=your-api-key
KAFKA_PASSWORD=your-api-secret
KAFKA_CLIENT_ID=iframe-service-prod
KAFKA_TOPIC_REQUESTS=iframe-requests
KAFKA_TOPIC_RESPONSES=iframe-responses
```

## Usage from Client Apps

```javascript
// Example usage in your Cordova/web app
const response = await fetch('https://your-service.vercel.app/api/iframe-request', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: 'https://example.com',
    width: '100%',
    height: '400px'
  })
});
```

## Deployment

This service is designed to be deployed as Vercel Functions. See deployment guide for full instructions.# kafka-iframe-service
