FROM php:8.1-fpm

RUN apt-get update
RUN apt install -y apt-utils

# Install dependencies
RUN apt-get install -qq -y \
  curl \
  git \
  libzip-dev \
  zlib1g-dev \
  zip unzip

RUN apt install -y libmcrypt-dev libicu-dev libxml2-dev
RUN apt-get install -y libjpeg-dev libpng-dev libfreetype6-dev libjpeg62-turbo-dev
RUN docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/
RUN docker-php-ext-install gd

RUN apt install -y libmagickwand-dev --no-install-recommends && \
  pecl install imagick && docker-php-ext-enable imagick

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
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

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- \
  --install-dir=/usr/local/bin --filename=composer && chmod +x /usr/local/bin/composer

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

ENV NODE_VERSION=18.18.0

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

ENV NVM_DIR=/root/.nvm

RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

COPY . /var/www

WORKDIR /var/www

RUN chown -R www-data:www-data /var/www
RUN chmod -R 775 /var/www/storage

CMD php-fpm
