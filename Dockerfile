FROM php:8.2-fpm-alpine

WORKDIR /var/www/html

RUN apk add --no-cache \
        bash \
        curl \
        freetype-dev \
        git \
        icu-dev \
        libjpeg-turbo-dev \
        libpng-dev \
        nodejs \
        npm \
        oniguruma-dev \
        unzip \
        zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        bcmath \
        exif \
        gd \
        intl \
        mbstring \
        pcntl \
        pdo_mysql \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY composer.json composer.lock ./
RUN composer install \
        --no-dev \
        --no-interaction \
        --no-progress \
        --prefer-dist \
        --optimize-autoloader \
        --no-scripts

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

RUN mkdir -p storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
