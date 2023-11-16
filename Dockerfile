FROM php:8.1-fpm

# Install base dependencies
RUN apt-get update && \
    apt install -y apt-utils && \
    apt-get install -qq -y \
        curl \
        git \
        libzip-dev \
        zlib1g-dev \
        zip \
        unzip \
        libmcrypt-dev \
        libicu-dev \
        libxml2-dev \
        libjpeg-dev \
        libpng-dev \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libmagic-dev

# Configure and install GD extension
RUN docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ && \
    docker-php-ext-install gd

# Install imagick extension
RUN apt install -y libmagickwand-dev --no-install-recommends && \
    pecl install imagick && \
    docker-php-ext-enable imagick

# Install fileinfo and other extensions
RUN docker-php-ext-install \
    bcmath \
    pdo_mysql \
    pcntl \
    zip \
    pdo \
    ctype \
    fileinfo \
    xml \
    intl

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- \
  --install-dir=/usr/local/bin --filename=composer && chmod +x /usr/local/bin/composer

# Install Node.js using NVM
ENV NODE_VERSION=18.18.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

# Copy the application code
COPY . /var/www

# Set working directory
WORKDIR /var/www

# Set ownership and permissions
RUN chown -R www-data:www-data /var/www && \
    chmod -R 775 /var/www/storage

# Start PHP-FPM
CMD php-fpm
