#!/bin/bash

echo "🚀 LA Media & Communications - Setup Script"
echo "=========================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
  echo "📝 Creating .env file from .env.example..."
  cp .env.example .env
  echo "✅ .env created! Please update DATABASE_URL and other variables."
  echo ""
else
  echo "✅ .env file exists"
  echo ""
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
  echo ""
else
  echo "✅ Dependencies already installed"
  echo ""
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate
echo ""

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update DATABASE_URL in .env with your PostgreSQL connection"
echo "2. Run: npm run db:migrate (to create database tables)"
echo "3. Run: npm run dev (to start development server)"
echo ""
echo "🌐 Access points:"
echo "   - Public site: http://localhost:3000"
echo "   - Admin panel: http://localhost:3000/admin"
echo ""
