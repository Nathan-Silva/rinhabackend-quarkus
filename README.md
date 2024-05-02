# Projeto Rinha Backend 2024

Este projeto é uma versão espelhada do primeiro desafio da Rinha de Backend de 2024. Ele consiste em uma aplicação web com um frontend e um backend, onde o frontend é construído com React e Material UI e o backend com Java 21 e Quarkus.

## Build

Para compilar o projeto, siga os passos abaixo:

1. **Build do Projeto Backend:**

   Execute o seguinte comando na raiz do projeto para compilar o backend:

   ```bash
   mvn clean package

2. **Gerar a Imagem Docker do Backend:**

   ```bash
   docker buildx build --platform linux/amd64 -f src/main/docker/Dockerfile.jvm -t braganathan38/rinhabackend-softplan:1.0 .

3. **Gerar a Imagem Docker do Frontend**

   ```bash
   docker buildx build -f ./Dockerfile -t braganathan38/rinhafrontend-softplan:1.0 .

4. **Executar os Serviços do Docker:**

   ```bash
   docker compose up -d


**O Frontend estará disponível na porta 3000 e, o backend na porta 9999**
