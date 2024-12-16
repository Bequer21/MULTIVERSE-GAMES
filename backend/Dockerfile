FROM node:18

WORKDIR /app

COPY package*.json ./

# instala las dependencias
RUN npm install

# copia el resto del código
COPY . .

# puerto en el que correrá la API (ajusta si no es 3000)
EXPOSE 5000

# iniciar la aplicación
CMD ["npm", "start"]
