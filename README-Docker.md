# Docker Setup for Laravel + React Project

This project includes a complete Docker setup for both development and production environments.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

### Production Environment

1. **Build and start all services:**
   ```bash
   docker-compose up -d --build
   ```

2. **Run Laravel migrations:**
   ```bash
   docker-compose exec backend php artisan migrate
   ```

3. **Generate application key:**
   ```bash
   docker-compose exec backend php artisan key:generate
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost/api
   - Database: localhost:3306

### Development Environment

1. **Build and start development services:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d --build
   ```

2. **Run Laravel migrations:**
   ```bash
   docker-compose -f docker-compose.dev.yml exec backend php artisan migrate
   ```

3. **Generate application key:**
   ```bash
   docker-compose -f docker-compose.dev.yml exec backend php artisan key:generate
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000 (with hot reloading)
   - Backend API: http://localhost/api
   - Database: localhost:3306

## Services

### Production Services
- **mysql**: MySQL 8.0 database
- **nginx**: Nginx web server (port 80)
- **backend**: Laravel PHP-FPM application
- **frontend**: React application (port 3000)

### Development Services
- **mysql**: MySQL 8.0 database
- **nginx**: Nginx web server (port 80)
- **backend**: Laravel PHP-FPM application with development settings
- **frontend**: React application with hot reloading (port 3000)

## Useful Commands

### General Commands
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild services
docker-compose up -d --build
```

### Laravel Commands
```bash
# Run migrations
docker-compose exec backend php artisan migrate

# Run seeders
docker-compose exec backend php artisan db:seed

# Clear cache
docker-compose exec backend php artisan cache:clear

# Generate application key
docker-compose exec backend php artisan key:generate

# Create JWT secret
docker-compose exec backend php artisan jwt:secret
```

### Development Commands
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# View development logs
docker-compose -f docker-compose.dev.yml logs -f

# Access backend container
docker-compose -f docker-compose.dev.yml exec backend bash

# Access frontend container
docker-compose -f docker-compose.dev.yml exec frontend sh
```

## Environment Variables

### Database Configuration
- `DB_CONNECTION=mysql`
- `DB_HOST=mysql`
- `DB_PORT=3306`
- `DB_DATABASE=laravel`
- `DB_USERNAME=laravel`
- `DB_PASSWORD=password`

### Laravel Configuration
- `APP_ENV=local` (development) or `production`
- `APP_DEBUG=true` (development) or `false`

## File Structure

```
.
├── docker-compose.yml          # Production Docker Compose
├── docker-compose.dev.yml      # Development Docker Compose
├── Dockerfile.backend          # Production backend Dockerfile
├── Dockerfile.backend.dev      # Development backend Dockerfile
├── Dockerfile.frontend         # Production frontend Dockerfile
├── Dockerfile.frontend.dev     # Development frontend Dockerfile
├── nginx.conf                  # Nginx configuration
├── .dockerignore               # Docker ignore file
├── backend/                    # Laravel application
└── frontend/                   # React application
```

## Troubleshooting

### Common Issues

1. **Permission Issues:**
   ```bash
   # Fix storage permissions
   docker-compose exec backend chmod -R 775 storage
   docker-compose exec backend chown -R www-data:www-data storage
   ```

2. **Database Connection Issues:**
   - Ensure MySQL container is running: `docker-compose ps`
   - Check database logs: `docker-compose logs mysql`

3. **Frontend Build Issues:**
   - Clear node_modules and rebuild: `docker-compose exec frontend rm -rf node_modules && npm install`

4. **Port Conflicts:**
   - Change ports in docker-compose.yml if 80, 3000, or 3306 are already in use

### Logs
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f nginx
docker-compose logs -f mysql
```

## Production Deployment

For production deployment:

1. Set appropriate environment variables
2. Use production Docker Compose file
3. Configure proper SSL certificates
4. Set up proper database backups
5. Configure proper logging and monitoring

## Development Tips

1. **Hot Reloading**: The development setup includes hot reloading for both frontend and backend
2. **Database Persistence**: MySQL data is persisted in Docker volumes
3. **Code Changes**: Changes to your code will be reflected immediately in development mode
4. **Debugging**: Use `docker-compose logs` to debug issues

## Security Notes

- Change default database passwords in production
- Use environment variables for sensitive data
- Configure proper firewall rules
- Keep Docker images updated
- Use specific image tags instead of `latest` 