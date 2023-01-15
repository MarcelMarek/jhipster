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

# docker

./mvnw -Pprod verify job:dockerBuild

docker image ls -a

docker-compose -f src/main/docker/app.yml up -d

# start

to start the project use ./mvnw

# login

login as admin: admin, pw: admin
login as user: user, pw: user

# swagger

login as admin
Administration > API
