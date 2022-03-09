#!/usr/bin/env make -f
# -*- makefile -*-

SHELL = bash -e


image:
	@docker-compose -p express-api -f docker-compose.yml build --force-rm --pull

start:
	@docker-compose -p express-api -f docker-compose.yml up --remove-orphans -d

dependencies: start
	@docker-compose -p express-api -f docker-compose.yml exec \
		--user express express-api yarn install

serve: start
	@docker-compose -p express-api -f docker-compose.yml exec \
		--user express express-api yarn start

production: start
	@docker-compose -p express-api -f docker-compose.yml exec \
		--user express express-api yarn run production

console: start
	@docker-compose -p express-api -f docker-compose.yml exec \
		--user express express-api bash

console-db: start
	@docker-compose -p express-api -f docker-compose.yml exec \
		--user root express-db bash

stop:
	@docker-compose -p express-api -f docker-compose.yml stop express-api
	@docker-compose -p express-api -f docker-compose.yml stop express-db

down:
	@docker-compose -p express-api -f docker-compose.yml down \
		--remove-orphans

destroy:
	@docker-compose -p express-api -f docker-compose.yml down \
		--rmi all --remove-orphans -v