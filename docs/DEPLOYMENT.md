# Deployment Guide

## Single Server Deployment (Recommended)

This temple website is designed to run as a single Next.js application, which is the best practice for this type of project.

## Why Single Server?

### ✅ Benefits:
- **Simplified Architecture**: One codebase, one deployment
- **Better Performance**: No network latency between frontend/backend
- **Cost Effective**: Single server instance
- **Easier Maintenance**: Unified logging, monitoring, and updates
- **Shared Code**: Types, utilities, and validation logic reused
- **SEO Friendly**: Server-side rendering built-in

### ❌ Avoid Separate Servers When:
- Building small to medium websites
- Limited DevOps resources
- Need rapid development cycles
- Tight frontend/backend integration required

## Deployment Options

### 1. Vercel (Recommended for Production)

**Pros:**
- Automatic deployments from Git
- Built-in CDN and edge functions
- Zero-config Next.js optimization
- Automatic HTTPS
- Preview deployments

**Setup:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**Environment Variables in Vercel:**
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add all variables from `.env.example`

### 2. Railway

**Pros:**
- Simple deployment process
- Built-in database hosting
- Automatic scaling
- Git-based deployments

**Setup:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

### 3. DigitalOcean App Platform

**Pros:**
- Managed platform
- Auto-scaling
- Built-in monitoring
- Database integration

**Setup:**
1. Connect your GitHub repository
2. Configure build settings:
   - Build Command: `npm run build`
   - Run Command: `npm start`
3. Add environment variables
4. Deploy

### 4. Traditional VPS (Ubuntu/CentOS)

**For full control and custom configurations:**

```bash
# 1. Set up Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Install PM2 for process management
npm install -g pm2

# 3. Clone and setup project
git clone <your-repo>
cd shri-jagannath-temple
npm ci --production
npm run build

# 4. Start with PM2
pm2 start npm --name "temple-website" -- start
pm2 startup
pm2 save
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. Docker Deployment

**Dockerfile:**
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mysql://user:password@db:3306/templedb
      - NEXTAUTH_SECRET=your-secret
    depends_on:
      - db

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: templedb
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"

volumes:
  mysql_data:
```

## Database Setup

### MySQL Configuration

**For production, ensure:**
```sql
-- Create database
CREATE DATABASE templedb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user
CREATE USER 'temple_user'@'%' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON templedb.* TO 'temple_user'@'%';
FLUSH PRIVILEGES;
```

### Database Migration

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed initial data
npm run db:seed
```

## Environment Variables

**Production Environment Variables:**
```env
# Database
DATABASE_URL="mysql://user:password@host:3306/templedb"

# NextAuth
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-secret-key"

# Admin
SUPERADMIN_EMAIL="admin@your-domain.com"
SUPERADMIN_PASSWORD="secure-admin-password"

# GetePay (Production)
GETEPAY_MID=your-production-mid
GETEPAY_TERMINAL_ID="your-production-terminal"
GETEPAY_KEY="your-production-key"
GETEPAY_IV="your-production-iv"
GETEPAY_URL="https://pay1.getepay.in:8443/getepayPortal/pg/generateInvoice"

# Email (Optional)
SMTP_HOST="smtp.your-provider.com"
SMTP_PORT=587
SMTP_USER="your-email@domain.com"
SMTP_PASS="your-email-password"
```

## SSL/HTTPS Setup

### Using Certbot (Let's Encrypt)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring and Logging

### PM2 Monitoring
```bash
# View logs
pm2 logs temple-website

# Monitor performance
pm2 monit

# Restart application
pm2 restart temple-website
```

### Log Rotation
```bash
# Install PM2 log rotate
pm2 install pm2-logrotate

# Configure
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

## Backup Strategy

### Database Backup
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u user -p templedb > backup_$DATE.sql
aws s3 cp backup_$DATE.sql s3://your-backup-bucket/
```

### File Backup
```bash
# Backup uploaded files
tar -czf uploads_$DATE.tar.gz public/uploads/
aws s3 cp uploads_$DATE.tar.gz s3://your-backup-bucket/
```

## Performance Optimization

### Next.js Configuration
```javascript
// next.config.js
module.exports = {
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable experimental features
  experimental: {
    optimizeCss: true,
  },
}
```

### Database Optimization
```sql
-- Add indexes for better performance
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_donations_status ON donations(payment_status);
```

## Security Checklist

- [ ] HTTPS enabled
- [ ] Strong admin passwords
- [ ] Database user with limited privileges
- [ ] Regular security updates
- [ ] Firewall configured
- [ ] Rate limiting enabled
- [ ] Input validation in place
- [ ] Error logging configured
- [ ] Backup strategy implemented

## Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules
rm -rf node_modules package-lock.json
npm install
```

**Database Connection Issues:**
```bash
# Test database connection
npx prisma db pull
```

**Memory Issues:**
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

## Support

For deployment issues:
1. Check application logs
2. Verify environment variables
3. Test database connectivity
4. Review Next.js documentation
5. Contact technical support