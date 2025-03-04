#!/bin/bash

echo "Starting local server to preview the resume website..."
echo "Open your browser and navigate to: http://localhost:8000"
echo "Press Ctrl+C to stop the server when done."
echo ""

# Check if Python 3 is available
if command -v python3 &>/dev/null; then
    python3 -m http.server
# Check if Python 2 is available
elif command -v python &>/dev/null; then
    python -m SimpleHTTPServer
else
    echo "Error: Python is not installed. Please install Python or use another web server to preview the website."
    exit 1
fi 