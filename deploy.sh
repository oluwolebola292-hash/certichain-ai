#!/bin/bash

# Build Output Directory
DIST_DIR="dist"

echo "🚀 Starting Deployment Process..."

# Clean and Create Dist
rm -rf $DIST_DIR
mkdir -p $DIST_DIR

# Copy Assets
echo "📦 Copying files to $DIST_DIR..."
cp index.html $DIST_DIR/
cp script.js $DIST_DIR/
# cp -r assets $DIST_DIR/ # Uncomment if you have assets folder

echo "✅ Build Complete!"
echo " "
echo "To preview locally:"
echo "  cd $DIST_DIR && python3 -m http.server 8000"
echo " "
echo "To deploy to production (example using Vercel):"
echo "  npx vercel $DIST_DIR"