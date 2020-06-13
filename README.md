# AdministrApp-api-REST

AdministrApp NodeJS MongoDB API REST

# Endpoints

## /api/mensaje

Method: GET: Get mensajes

## /api/mensaje/:mensajeId

Method GET: Get mensaje por Id

## /api/mensaje

Method POST: Crear mensaje

## /api/mensaje/:mensajeId

Method PUT: Update mensaje por Id

## /api/mensaje/:mensajeId

Method DELETE: Delete mensaje por Id

## api/signup

Method POST: Crear usuario y obtener token de seguridad

## /api/login

Method POST: Login usuario

Ejemplo de curl para login:

curl --location --request POST 'http://localhost:3001/api/login' \
--header 'authorization: Bearer tokenGenerado' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "email@prueba.com"
}'
