#!/bin/zsh

set -e

echo "🚀 Starting Conductor workspace setup for LucidLog..."
echo ""

# Validate required tools
echo "✓ Checking required tools..."

if ! command -v composer &> /dev/null; then
    echo "❌ Error: composer is not installed or not in PATH"
    echo "   Please install Composer: https://getcomposer.org/download/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed or not in PATH"
    echo "   Please install Node.js and npm: https://nodejs.org/"
    exit 1
fi

if ! command -v php &> /dev/null; then
    echo "❌ Error: php is not installed or not in PATH"
    echo "   Please install PHP 8.2 or higher"
    exit 1
fi

# Check PHP version
PHP_VERSION=$(php -r "echo PHP_VERSION;")
PHP_MAJOR=$(echo $PHP_VERSION | cut -d. -f1)
PHP_MINOR=$(echo $PHP_VERSION | cut -d. -f2)

if [ "$PHP_MAJOR" -lt 8 ] || ([ "$PHP_MAJOR" -eq 8 ] && [ "$PHP_MINOR" -lt 2 ]); then
    echo "❌ Error: PHP version $PHP_VERSION detected, but PHP 8.2+ is required"
    exit 1
fi

echo "  composer: $(composer --version | head -n 1)"
echo "  npm: v$(npm --version)"
echo "  php: $PHP_VERSION"
echo ""

# Setup environment file
echo "📝 Setting up environment configuration..."

if [ ! -f "$CONDUCTOR_ROOT_PATH/.env" ]; then
    echo "❌ Error: .env file not found at $CONDUCTOR_ROOT_PATH/.env"
    echo "   Please create a .env file in your repository root before running setup"
    echo "   You can copy from .env.example: cp .env.example .env"
    exit 1
fi

if [ -L ".env" ]; then
    rm .env
fi

ln -s "$CONDUCTOR_ROOT_PATH/.env" .env
echo "  ✓ Symlinked .env from repository root"
echo ""

# Install PHP dependencies
echo "📦 Installing PHP dependencies..."
composer install --no-interaction --prefer-dist
echo ""

# Install Node dependencies
echo "📦 Installing Node dependencies..."
npm install
echo ""

# Generate application key if needed
echo "🔑 Generating application key..."
if ! grep -q "APP_KEY=base64:" .env; then
    php artisan key:generate --ansi --no-interaction
    echo "  ✓ Application key generated"
else
    echo "  ✓ Application key already exists"
fi
echo ""

# Setup SQLite database
echo "🗄️  Setting up database..."
if [ ! -f "database/database.sqlite" ]; then
    touch database/database.sqlite
    echo "  ✓ Created database/database.sqlite"
else
    echo "  ✓ database/database.sqlite already exists"
fi
echo ""

# Run migrations
echo "🔧 Running database migrations..."
php artisan migrate --force --no-interaction --ansi
echo ""

# Build frontend assets
echo "🎨 Building frontend assets..."
npm run build
echo ""

echo "✅ Workspace setup complete!"
echo ""
echo "💡 Next steps:"
echo "   - Click the 'Run' button to start the development server"
echo "   - This will start Laravel server, queue worker, logs, and Vite"
echo ""
