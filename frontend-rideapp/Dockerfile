# Etapa 1: Construir o código do React
FROM node:18 as build
WORKDIR /app

# Copiar os arquivos necessários
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código-fonte
COPY . .

# Gerar a build de produção
RUN npm run build

# Etapa 2: Configurar o NGINX para servir o build
FROM nginx:latest

# Copiar os arquivos estáticos do build para o NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Expor a porta padrão do NGINX
EXPOSE 80

# Comando padrão para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]
