FROM serversideup/php:8.3-fpm-nginx-bookworm AS base

FROM base AS development

USER root

ARG USER_ID
ARG GROUP_ID

RUN docker-php-serversideup-set-id www-data $USER_ID:$GROUP_ID && \
    docker-php-serversideup-set-file-permissions --owner $USER_ID:$GROUP_ID --service nginx

USER www-data

FROM base AS production

COPY --chown=www-data:www-data . /var/www/html