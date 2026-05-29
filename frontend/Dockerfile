FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

# 🔥 FIX PERMISSIONS
RUN chmod -R 755 node_modules

COPY . .

EXPOSE 3000

CMD ["npx", "react-scripts", "start"]