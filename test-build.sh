#!/bin/bash

echo "🔍 Testing Backend Build Process..."
echo ""

cd backend

echo "📦 Step 1: Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ npm install failed!"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

echo "🔧 Step 2: Generating Prisma Client..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo "❌ Prisma generate failed!"
    exit 1
fi
echo "✅ Prisma Client generated"
echo ""

echo "🏗️  Step 3: Building NestJS..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi
echo "✅ Build successful"
echo ""

echo "✅ All steps completed successfully!"
echo ""
echo "Build output is in: backend/dist/"
ls -la dist/

cd ..

