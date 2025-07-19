#!/bin/bash

echo "Stopping existing containers..."
docker-compose down

echo "Pulling latest code from Git..."
git pull

echo "Rebuilding and starting containers..."
docker-compose up -d --build

echo "Deployment complete."