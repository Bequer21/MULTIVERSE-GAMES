FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

# instala las dependencias del frontend
RUN npm install

# copia el resto del código del frontend
COPY . .

# puerto en el que corre el servidor de desarrollo del frontend
EXPOSE 3000

# iniciar el servidor de desarrollo
CMD ["npm", "start"]
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

# instala las dependencias del frontend
RUN npm install

# copia el resto del código del frontend
COPY . .

# puerto en el que corre el servidor de desarrollo del frontend
EXPOSE 3000

# iniciar el servidor de desarrollo
CMD ["npm", "start"]
