# jhipster

this is an jhipster full stack application with an todo entity

# full stack

Monolithic application
JWT authentication (stateless, with a token)
PostgresSQL for Prod Database
H2 with disk-based persistence for Dev Database
Ehcache for Spring cache abstraction
Maven for building backend
Vue for frontend

# start

```
docker-compose -f src/main/docker/app.yml up -d
```

```
docker run -e POSTGRES_PASSWORD=secrect -e POSTGRES_USER=postgres postgres:14.5
```

```
mvn
```

# login

login as admin: admin, pw: admin
login as user: user, pw: user

# swagger

login as admin
Administration > API
