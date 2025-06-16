#!/bin/bash

# Start Ory Tunnel
# This creates a secure tunnel between your local app and Ory Cloud
# 
# How it works:
# - Your React app runs on localhost:5173 (as usual)
# - Ory Tunnel creates a proxy on localhost:4000
# - Access your app through http://localhost:4000 (NOT :5173)
# - The tunnel handles cookie domains automatically

echo "Starting Ory Tunnel..."
echo ""
echo "IMPORTANT: Access your app at http://localhost:4000 (not :5173)"
echo ""
echo "Press Ctrl+C to stop the tunnel"

source .env

if [ -z "$ORY_PROJECT_ID" ]; then
  echo "Error: ORY_PROJECT_ID is not set in .env file"
  exit 1
fi

ory tunnel \
  --project $ORY_PROJECT_ID \
  --port 4000 \
  http://localhost:5173