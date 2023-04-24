# Workflow with docker compose

## Development Workflow

1. Run development server with `docker-compose -f docker-compose-devel.yml up`
2. Make changes in `app` directory. The changes are immediately visible without restarting server.
3. Stop server using `Ctrl+C`
4. Remove containers using `docker-compose rm`.

## Development Workflow

1. Build image using `docker-compose build`. Changes in app directory will not be reflected unless we rebuild the image.
2. Run production server with `docker-compose up -d`
3. Stop server using `docker-compose stop`
4. Remove containers using `docker-compose rm`.
