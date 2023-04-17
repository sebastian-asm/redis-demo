# Redis Demo

Utilizando [Redis](https://redis.io/) de forma sencilla para conocer la tecnología. Se utiliza con la API de [Rick and Mortin](https://rickandmortyapi.com/) donde la primera consulta es de unos **500ms** y al implementar Redis baja a unos **6ms** aproxidamente el tiempo de respuesta.

Levantar el contenedor en Docker: 
`docker run -p 6379:6379 --name demo-redis -d redis`