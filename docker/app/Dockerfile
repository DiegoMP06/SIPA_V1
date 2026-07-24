FROM php:8.2-fpm-alpine

USER root

RUN addgroup -g 1000 -S lomi && \
    adduser -u 1000 -S lomi -G lomi -h /home/lomi -s /bin/sh

RUN mkdir -p /var/www/html /home/lomi/.composer && \
    chown -R lomi:lomi /var/www/html /home/lomi

WORKDIR /var/www/html

RUN apk add --no-cache \
    bash \
    curl \
    git \
    freetype-dev \
    icu-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    libwebp-dev \
    libzip-dev \
    nodejs \
    npm \
    oniguruma-dev \
    postgresql-dev \
    unzip \
    zip \
    $PHPIZE_DEPS

RUN npm install -g pnpm && \
    docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp && \
    docker-php-ext-install \
    bcmath \
    gd \
    intl \
    mbstring \
    pdo \
    pdo_pgsql \
    zip

COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer

RUN apk del $PHPIZE_DEPS && \
    rm -rf /var/cache/apk/*

EXPOSE 9000

CMD ["php-fpm", "-F"]

USER lomi
