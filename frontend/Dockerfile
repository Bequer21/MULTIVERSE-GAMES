# Usa la imagen base de Nginx
FROM nginx:latest

# Copia los archivos de configuración personalizados de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia todos los archivos de tu frontend
COPY /public /usr/share/nginx/html

# Expone el puerto 3000
EXPOSE 3000