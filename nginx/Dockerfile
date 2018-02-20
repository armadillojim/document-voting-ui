FROM nginx:1.13-alpine

ARG API_PORT

COPY nginx.conf /etc/nginx/
RUN sed -i "s/\${API_PORT}/$API_PORT/;" /etc/nginx/nginx.conf

RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log
