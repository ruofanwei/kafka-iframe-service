# Kafka Iframe Service - Deployment Guide

## Overview

This is a standalone microservice for generating dynamic iframes using Kafka messaging. It's designed to be deployed separately from your main Cordova app.

## Prerequisites

1. **Confluent Cloud Account** (Free tier - 100GB/month)
   - Already configured with your credentials
2. **Vercel Account** (Free tier)
   - Sign up at https://vercel.com

## Quick Deploy

1. **Navigate to service directory:**
   ```bash
   cd /Users/ruofan/Documents/work/kafka-iframe-service
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Deploy to Vercel:**
   ```bash
   npm run deploy
   ```

4. **Set environment variables in Vercel:**
   - Go to your Vercel dashboard
   - Select your project: `kafka-iframe-service`
   - Go to Settings > Environment Variables
   - Add these variables:
     ```
     KAFKA_BROKERS=pkc-n3603.us-central1.gcp.confluent.cloud:9092
     KAFKA_USERNAME=IHOW3ZGB2JIX4XUE
     KAFKA_PASSWORD=iWGD+6F+4kf6RSrubpWdkuAxkbQRmbqaFhYnacOp8nhlsOk962Un9OXTnWvdULtR
     KAFKA_CLIENT_ID=iframe-service-prod
     KAFKA_TOPIC_REQUESTS=iframe-requests
     KAFKA_TOPIC_RESPONSES=iframe-responses
     ```

## Update Cordova App

After deploying the service, update your Cordova app to use the new service URL:

1. **Get your Vercel URL** (e.g., `https://kafka-iframe-service.vercel.app`)

2. **Update the Cordova app:**
   ```typescript
   // In src/app/components/home/home.component.ts
   const options = {
     serviceUrl: 'https://your-actual-service-url.vercel.app/api'
   };
   ```

## Test the Service

1. **Health check:**
   ```bash
   curl https://your-service.vercel.app/api/health
   ```

2. **Iframe request:**
   ```bash
   curl -X POST https://your-service.vercel.app/api/iframe-request \
     -H "Content-Type: application/json" \
     -d '{"url": "https://example.com", "width": "100%", "height": "400px"}'
   ```

## Architecture

```
Cordova App → Kafka Iframe Service → Confluent Cloud
     ↓              ↓                      ↓
   Client        Vercel Functions       Managed Kafka
```

## Benefits of Separation

- 🔄 **Independent deployment** of service and app
- 📈 **Scalable** - service can handle multiple apps
- 🛡️ **Secure** - Kafka credentials isolated in service
- 🚀 **Reusable** - other apps can use the same service

## Development

For local development of the service:

```bash
# Set up local environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development server
npm run dev
```

The service will be available at `http://localhost:3000`