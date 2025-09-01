# 🚀 VPS Deployment Guide - Laravel Project

Panduan lengkap untuk hosting Laravel project di VPS Hostinger dengan domain custom. Contoh implementasi: **maukpintar.com**

## 📋 Prerequisites

- VPS Hostinger dengan Ubuntu 20.04/22.04
- Domain (contoh: maukpintar.com)
- Repository GitHub dengan Laravel project
- Akses SSH ke server

## 📊 Server Information

**Contoh VPS:**
- IP Address: `31.97.221.115`
- Hostname: `srv967124.hstgr.cloud`
- Domain: `maukpintar.com`

---

## 🛠️ PART 1: Initial VPS Setup (Dilakukan Sekali)

### 1. Setup DNS Domain

Masuk ke panel domain provider dan tambahkan DNS records:

```
Type: A
Name: @
Value: 31.97.221.115
TTL: 3600

Type: A  
Name: www
Value: 31.97.221.115
TTL: 3600
```

### 2. SSH ke VPS

```bash
ssh root@31.97.221.115
```

### 3. Update System

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install software-properties-common curl wget git unzip vim htop tree -y
```

### 4. Install Web Server Stack

#### A. Install Nginx
```bash
# Install Nginx
sudo apt install nginx -y

# Start dan enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

#### B. Install PHP 8.2
```bash
# Add PHP repository
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update

# Install PHP dan extensions untuk Laravel
sudo apt install php8.2 php8.2-fpm php8.2-mysql php8.2-xml php8.2-gd \
php8.2-opcache php8.2-mbstring php8.2-tokenizer php8.2-json php8.2-bcmath \
php8.2-zip php8.2-unzip php8.2-curl php8.2-sqlite3 php8.2-intl php8.2-readline -y

# Verify PHP installation
php -v
```

#### C. Install MySQL
```bash
# Install MySQL Server
sudo apt install mysql-server -y

# Start dan enable MySQL
sudo systemctl start mysql
sudo systemctl enable mysql

# Secure MySQL installation
sudo mysql_secure_installation
```

**MySQL Secure Installation Settings:**
- Set root password: **YES** (buat password kuat)
- Remove anonymous users: **YES**
- Disallow root login remotely: **YES**
- Remove test database: **YES**
- Reload privilege tables: **YES**

### 5. Install Development Tools

#### A. Install Composer
```bash
# Download dan install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
sudo chmod +x /usr/local/bin/composer

# Verify installation
composer --version
```

#### B. Install Node.js dan NPM
```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# Verify installation
node -v
npm -v
```

### 6. Setup Firewall

```bash
# Install dan configure UFW
sudo apt install ufw -y

# Set default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow essential services
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

### 7. Install SSL Certificate Tool

```bash
# Install Certbot via Snap
sudo apt install snapd -y
sudo snap install --classic certbot

# Create symlink
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

### 8. Install Process Manager

```bash
# Install Supervisor untuk queue management
sudo apt install supervisor -y

# Enable supervisor
sudo systemctl enable supervisor
sudo systemctl start supervisor
```

---

## 🌐 PART 2: Deploy First Project (maukpintar.com)

### 1. Create Database

```bash
# Login ke MySQL
mysql -u root -p
```

```sql
-- Create database
CREATE DATABASE maukpintar_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user
CREATE USER 'maukpintar_user'@'localhost' IDENTIFIED BY 'MaukPintar2025!@#';

-- Grant privileges
GRANT ALL PRIVILEGES ON maukpintar_db.* TO 'maukpintar_user'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;

-- Verify
SHOW DATABASES;

-- Exit
EXIT;
```

### 2. Clone dan Setup Project

```bash
# Go to web directory
cd /var/www

# Clone repository
sudo git clone https://github.com/goprobisnis-id/MaukProject.git

# Rename folder sesuai domain
sudo mv MaukProject maukpintar.com
cd maukpintar.com

# Install PHP dependencies
composer install --optimize-autoloader --no-dev

# Install Node.js dependencies
npm install

# Build production assets
npm run build
```

### 3. Setup Environment

```bash
# Copy environment file
cp .env.example .env

# Edit environment file
nano .env
```

**Environment Configuration (.env):**
```env
APP_NAME="Mauk Pintar"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://maukpintar.com

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=maukpintar_db
DB_USERNAME=maukpintar_user
DB_PASSWORD=MaukPintar2025!@#

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync

MAIL_MAILER=smtp
MAIL_HOST=localhost
MAIL_PORT=587
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@maukpintar.com"
MAIL_FROM_NAME="Mauk Pintar"
```

### 4. Setup Laravel

```bash
# Generate application key
php artisan key:generate

# Test database connection
php artisan tinker
# Type: DB::connection()->getPdo();
# Press Ctrl+C to exit if no error

# Run migrations
php artisan migrate --force

# Run seeders
php artisan db:seed --force

# Create storage symlink
php artisan storage:link

# Cache untuk production
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 5. Set File Permissions

```bash
# Set ownership
sudo chown -R www-data:www-data /var/www/maukpintar.com

# Set directory permissions
sudo find /var/www/maukpintar.com -type d -exec chmod 755 {} \;

# Set file permissions
sudo find /var/www/maukpintar.com -type f -exec chmod 644 {} \;

# Set writable permissions untuk storage dan cache
sudo chmod -R 775 /var/www/maukpintar.com/storage
sudo chmod -R 775 /var/www/maukpintar.com/bootstrap/cache
```

### 6. Configure Nginx Virtual Host

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/maukpintar.com
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name maukpintar.com www.maukpintar.com;
    root /var/www/maukpintar.com/public;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    index index.php index.html;
    charset utf-8;

    # Main location
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # Handle favicon and robots
    location = /favicon.ico { 
        access_log off; 
        log_not_found off; 
    }
    
    location = /robots.txt { 
        access_log off; 
        log_not_found off; 
    }

    # Error pages
    error_page 404 /index.php;

    # PHP handling
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
        
        # Security and performance
        fastcgi_param HTTP_PROXY "";
        fastcgi_read_timeout 300;
        fastcgi_buffer_size 128k;
        fastcgi_buffers 4 256k;
        fastcgi_busy_buffers_size 256k;
    }

    # Deny access to hidden files
    location ~ /\.(?!well-known).* {
        deny all;
    }

    # Optimize static files
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
}
```

### 7. Enable Site dan SSL

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/maukpintar.com /etc/nginx/sites-enabled/

# Remove default site
sudo rm -f /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Setup SSL certificate
sudo certbot --nginx -d maukpintar.com -d www.maukpintar.com

# Follow prompts:
# Enter email address
# Agree to terms: Y
# Share email with EFF: N (optional)
# Redirect HTTP to HTTPS: 2 (recommended)
```

### 8. Setup Auto SSL Renewal

```bash
# Test renewal
sudo certbot renew --dry-run

# Setup cron job untuk auto-renewal
sudo crontab -e

# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

### 9. Setup Queue Worker (Optional)

```bash
# Create supervisor configuration
sudo nano /etc/supervisor/conf.d/maukpintar-worker.conf
```

**Supervisor Configuration:**
```ini
[program:maukpintar-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/maukpintar.com/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/maukpintar.com/storage/logs/worker.log
stopwaitsecs=3600
```

```bash
# Start worker
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start maukpintar-worker:*

# Check status
sudo supervisorctl status
```

### 10. Setup Scheduled Tasks

```bash
# Edit crontab
sudo crontab -e

# Add Laravel scheduler
* * * * * cd /var/www/maukpintar.com && php artisan schedule:run >> /dev/null 2>&1

# Add log cleanup (weekly)
0 1 * * 0 cd /var/www/maukpintar.com && php artisan log:clear --keep=30
```

---

## 🔄 PART 3: Update Existing Project

Untuk update project yang sudah di-deploy:

### Manual Update

```bash
# SSH ke server
ssh root@31.97.221.115

# Masuk ke project directory
cd /var/www/maukpintar.com

# Pull latest changes
git pull origin main

# Update dependencies (jika ada perubahan)
composer install --optimize-autoloader --no-dev
npm install
npm run build

# Update database (jika ada migration baru)
php artisan migrate --force

# Clear dan rebuild cache
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Fix permissions jika diperlukan
sudo chown -R www-data:www-data /var/www/maukpintar.com
sudo chmod -R 775 /var/www/maukpintar.com/storage
sudo chmod -R 775 /var/www/maukpintar.com/bootstrap/cache

# Restart services jika diperlukan
sudo systemctl reload nginx
sudo systemctl restart php8.2-fpm
```

### Automated Deploy Script

```bash
# Create deployment script
sudo nano /root/deploy-maukpintar.sh
```

**Deploy Script:**
```bash
#!/bin/bash

echo "🚀 Starting deployment for maukpintar.com..."

# Project directory
PROJECT_DIR="/var/www/maukpintar.com"

# Go to project directory
cd $PROJECT_DIR

# Put application in maintenance mode
echo "📝 Enabling maintenance mode..."
php artisan down

# Pull latest changes
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# Install/update dependencies
echo "📦 Installing dependencies..."
composer install --optimize-autoloader --no-dev

# Update frontend assets
echo "🎨 Building frontend assets..."
npm install
npm run build

# Run database migrations
echo "🗄️ Running database migrations..."
php artisan migrate --force

# Clear and cache configurations
echo "🧹 Clearing and caching configurations..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Fix permissions
echo "🔒 Fixing permissions..."
chown -R www-data:www-data $PROJECT_DIR
chmod -R 775 $PROJECT_DIR/storage
chmod -R 775 $PROJECT_DIR/bootstrap/cache

# Restart services
echo "🔄 Restarting services..."
systemctl reload nginx
systemctl restart php8.2-fpm

# Restart queue workers (if using supervisor)
supervisorctl restart maukpintar-worker:*

# Bring application back online
echo "✅ Disabling maintenance mode..."
php artisan up

echo "🎉 Deployment completed successfully!"
echo "🌐 Website: https://maukpintar.com"
```

```bash
# Make script executable
sudo chmod +x /root/deploy-maukpintar.sh

# Usage:
/root/deploy-maukpintar.sh
```

---

## 🆕 PART 4: Add New Website to Same Server

Untuk hosting website kedua, ketiga, dst. di server yang sama:

### 1. Setup Domain DNS

Set DNS untuk domain baru (contoh: `projectbaru.com`) ke IP yang sama: `31.97.221.115`

### 2. Clone Project Baru

```bash
# SSH ke server
ssh root@31.97.221.115

# Masuk ke web directory
cd /var/www

# Clone project baru
sudo git clone https://github.com/username/ProjectBaru.git

# Rename sesuai domain
sudo mv ProjectBaru projectbaru.com
cd projectbaru.com

# Install dependencies
composer install --optimize-autoloader --no-dev
npm install
npm run build
```

### 3. Create Database Baru

```bash
# Login ke MySQL
mysql -u root -p
```

```sql
-- Create database baru
CREATE DATABASE projectbaru_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user baru
CREATE USER 'projectbaru_user'@'localhost' IDENTIFIED BY 'ProjectBaru2025!@#';

-- Grant privileges
GRANT ALL PRIVILEGES ON projectbaru_db.* TO 'projectbaru_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 4. Setup Environment

```bash
# Copy dan edit .env
cp .env.example .env
nano .env
```

```env
APP_NAME="Project Baru"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://projectbaru.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=projectbaru_db
DB_USERNAME=projectbaru_user
DB_PASSWORD=ProjectBaru2025!@#

# ... konfigurasi lainnya
```

### 5. Setup Laravel

```bash
# Generate key dan setup database
php artisan key:generate
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 6. Create Nginx Virtual Host Baru

```bash
# Buat konfigurasi nginx baru
sudo nano /etc/nginx/sites-available/projectbaru.com
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name projectbaru.com www.projectbaru.com;
    root /var/www/projectbaru.com/public;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    index index.php index.html;
    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
}
```

### 7. Enable Site dan SSL

```bash
# Enable site baru
sudo ln -s /etc/nginx/sites-available/projectbaru.com /etc/nginx/sites-enabled/

# Test konfigurasi
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Setup SSL untuk domain baru
sudo certbot --nginx -d projectbaru.com -d www.projectbaru.com
```

### 8. Set Permissions

```bash
# Set ownership dan permissions
sudo chown -R www-data:www-data /var/www/projectbaru.com
sudo find /var/www/projectbaru.com -type d -exec chmod 755 {} \;
sudo find /var/www/projectbaru.com -type f -exec chmod 644 {} \;
sudo chmod -R 775 /var/www/projectbaru.com/storage
sudo chmod -R 775 /var/www/projectbaru.com/bootstrap/cache
```

### 9. Automated Setup Script

```bash
# Create script untuk setup project baru
sudo nano /root/setup-new-project.sh
```

**New Project Setup Script:**
```bash
#!/bin/bash

# Usage: ./setup-new-project.sh domain-name repo-url db-name

DOMAIN=$1
REPO_URL=$2
DB_NAME=$3
DB_USER="${DB_NAME}_user"
DB_PASS="${DB_NAME}2025!@#"

if [ -z "$DOMAIN" ] || [ -z "$REPO_URL" ] || [ -z "$DB_NAME" ]; then
    echo "Usage: $0 <domain> <repo-url> <db-name>"
    echo "Example: $0 projectbaru.com https://github.com/user/project.git projectbaru_db"
    exit 1
fi

echo "🚀 Setting up new project: $DOMAIN"

# Clone repository
cd /var/www
git clone $REPO_URL
mv $(basename $REPO_URL .git) $DOMAIN
cd $DOMAIN

# Install dependencies
composer install --optimize-autoloader --no-dev
npm install
npm run build

# Setup database
mysql -u root -p -e "
CREATE DATABASE $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;"

# Setup environment
cp .env.example .env
sed -i "s/APP_NAME=Laravel/APP_NAME=\"$DOMAIN\"/" .env
sed -i "s/APP_URL=http:\/\/localhost/APP_URL=https:\/\/$DOMAIN/" .env
sed -i "s/DB_DATABASE=laravel/DB_DATABASE=$DB_NAME/" .env
sed -i "s/DB_USERNAME=root/DB_USERNAME=$DB_USER/" .env
sed -i "s/DB_PASSWORD=/DB_PASSWORD=$DB_PASS/" .env

# Laravel setup
php artisan key:generate
php artisan migrate --force
php artisan storage:link
php artisan config:cache

# Create nginx config
cat > /etc/nginx/sites-available/$DOMAIN << 'EOF'
server {
    listen 80;
    server_name DOMAIN_PLACEHOLDER www.DOMAIN_PLACEHOLDER;
    root /var/www/DOMAIN_PLACEHOLDER/public;
    
    index index.php;
    charset utf-8;
    
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
    
    location ~ /\.(?!well-known).* {
        deny all;
    }
}
EOF

# Replace placeholder
sed -i "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" /etc/nginx/sites-available/$DOMAIN

# Enable site
ln -s /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Setup SSL
certbot --nginx -d $DOMAIN -d www.$DOMAIN

# Set permissions
chown -R www-data:www-data /var/www/$DOMAIN
chmod -R 755 /var/www/$DOMAIN
chmod -R 775 /var/www/$DOMAIN/storage /var/www/$DOMAIN/bootstrap/cache

echo "✅ Project setup completed!"
echo "🌐 Website: https://$DOMAIN"
echo "📄 Database: $DB_NAME"
echo "👤 DB User: $DB_USER"
echo "🔑 DB Pass: $DB_PASS"
EOF

# Make executable
sudo chmod +x /root/setup-new-project.sh
```

**Usage:**
```bash
# Setup project baru dengan 1 command
/root/setup-new-project.sh projectbaru.com https://github.com/username/ProjectBaru.git projectbaru_db
```

---

## 🔧 Troubleshooting

### Common Issues dan Solutions

#### 1. Website tidak bisa diakses
```bash
# Check services status
sudo systemctl status nginx
sudo systemctl status php8.2-fpm
sudo systemctl status mysql

# Check logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/www/maukpintar.com/storage/logs/laravel.log
```

#### 2. Permission issues
```bash
# Fix all permissions
sudo chown -R www-data:www-data /var/www/maukpintar.com
sudo find /var/www/maukpintar.com -type d -exec chmod 755 {} \;
sudo find /var/www/maukpintar.com -type f -exec chmod 644 {} \;
sudo chmod -R 775 /var/www/maukpintar.com/storage
sudo chmod -R 775 /var/www/maukpintar.com/bootstrap/cache
```

#### 3. Database connection error
```bash
# Test database connection
cd /var/www/maukpintar.com
php artisan tinker
# Type: DB::connection()->getPdo();
```

#### 4. Quick Database Reset (When No Important Data)
```bash
# Complete database reset - USE WITH CAUTION!
mysql -u root -p
```

```sql
-- Drop everything and start fresh
DROP DATABASE IF EXISTS maukpintar_db;
DROP USER IF EXISTS 'mauk_user'@'localhost';
DROP USER IF EXISTS 'maukpintar_user'@'localhost';

-- Recreate database and user (match your .env file)
CREATE DATABASE maukpintar_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'mauk_user'@'localhost' IDENTIFIED BY 'MaukPintar2025!@#';
GRANT ALL PRIVILEGES ON maukpintar_db.* TO 'mauk_user'@'localhost';
FLUSH PRIVILEGES;

-- Verify setup
SHOW DATABASES;
SELECT User, Host FROM mysql.user WHERE User LIKE 'mauk%';
EXIT;
```

```bash
# Then run migrations and seeders
cd /var/www/maukpintar.com
php artisan migrate --force
php artisan db:seed --force
```

#### 5. Clear all cache
```bash
cd /var/www/maukpintar.com
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear
```

#### 6. SSL certificate issues
```bash
# Renew SSL manually
sudo certbot renew

# Check certificate status
sudo certbot certificates
```

### Website Health Check

```bash
# Check if website is accessible
curl -I https://maukpintar.com
curl -I http://maukpintar.com

# Check with detailed response
curl -v https://maukpintar.com

# Check DNS resolution
nslookup maukpintar.com
dig maukpintar.com

# Check from different location (using external service)
curl -I "https://httpstat.us/200?url=https://maukpintar.com"

# Check SSL certificate
openssl s_client -connect maukpintar.com:443 -servername maukpintar.com

# Quick website availability test
ping maukpintar.com
```

### Performance Monitoring

```bash
# System monitoring commands
htop                    # System resources
sudo nginx -t          # Test Nginx config
sudo systemctl status nginx php8.2-fpm mysql
df -h                   # Disk usage
free -h                 # Memory usage
```

---

## 📚 Useful Commands

### Server Management
```bash
# Restart services
sudo systemctl restart nginx
sudo systemctl restart php8.2-fpm
sudo systemctl restart mysql

# Check service logs
sudo journalctl -u nginx -f
sudo journalctl -u php8.2-fpm -f

# Monitor system resources
htop
iotop
```

### Laravel Management
```bash
# Clear all cache
php artisan optimize:clear

# Generate cache for production
php artisan optimize

# Check queue status
php artisan queue:work --once

# View logs
tail -f storage/logs/laravel.log
```

### Backup Commands
```bash
# Database backup
mysqldump -u username -p database_name > backup.sql

# Files backup
tar -czf backup.tar.gz /var/www/domain.com

# Restore database
mysql -u username -p database_name < backup.sql
```

---

## 🎯 Summary

### ✅ Yang Sudah di Setup (Server Level)
- Nginx Web Server
- PHP 8.2 + Extensions
- MySQL Database Server
- Composer & Node.js
- SSL Certificate (Let's Encrypt)
- Firewall (UFW)
- Process Manager (Supervisor)

### 🔄 Untuk Setiap Project Baru
- Database & User baru
- Virtual Host Nginx baru
- SSL Certificate baru
- Environment configuration
- File permissions
- Laravel setup (migrate, seed, cache)

### 🚀 Quick Deploy
- **First setup**: 30-45 menit
- **Additional projects**: 5-10 menit
- **Updates**: 2-3 menit

---

**Website Live:** [https://maukpintar.com](https://maukpintar.com) 🎉

Untuk pertanyaan atau masalah, check troubleshooting section atau contact server administrator.
