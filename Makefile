##

EXEC_PHP        = php
CONSOLE         = $(EXEC_PHP) bin/console
COMPOSER        = composer

##Symfony
##-------------

first-install: ## First install (DB/Schema/fixtures)
	$(COMPOSER) install
	$(CONSOLE) doctrine:database:drop --force
	$(CONSOLE) doctrine:database:create
	$(CONSOLE) doctrine:schema:create
	$(CONSOLE) doctrine:fixtures:load -vvv --no-interaction  --group=base
	$(CONSOLE) translation:download
	$(CONSOLE) cache:clear --env=prod

fixtures: ## Replay fixtures
	$(CONSOLE) search:clear
	$(CONSOLE) doctrine:schema:drop --force
	$(CONSOLE) doctrine:schema:update --force
	$(CONSOLE) doctrine:fixtures:load --env=dev -vvv --no-interaction  --group=base

reload-db: ## Reload initial db
	$(CONSOLE) doctrine:schema:drop --force
	bzip2 -dk ./db/dump.sql.bz2
	$(CONSOLE) doctrine:database:import ./db/dump.sql
	rm ./db/dump.sql

schema: ## Update database schema
	$(CONSOLE) doctrine:schema:update --force

update: ## Stop the crap and start working
	$(COMPOSER) install
	$(CONSOLE) doctrine:schema:update --force
	$(CONSOLE) translation:download
	#$(CONSOLE) search:clear
	#$(CONSOLE) search:import
	$(CONSOLE) cache:clear
	$(CONSOLE) cache:clear --env=prod
	php bin/opcache.php

cache: .env vendor
	$(CONSOLE) cache:clear

run: ## Run local server (with multi-sessions)
	if [ ! -x "$(command -v tmux)" ]; then brew install tmux; fi
	tmux   new-session "make run-back; read" \;  \
	       split-window -h \; \
	       select-pane -t 0  \; \
	       split-window -v "make run-front; read" \; \
	       select-pane -t 2

run-back: ## Run symfony local server
	$(CONSOLE) server:run 127.0.0.1:8091

run-front: ## Run node local server
	(cd ../uniflow-io && ACTIVE_ENV=development gatsby develop -p 8090)

build-front: ## Build node
	(cd front/frontend && yarn build)

##
##DevOps
##-------------
fix-cs: ## Fix PHP Coding style
	vendor/bin/php-cs-fixer fix src  --verbose --show-progress=estimating \
    --rules='{"@Symfony" : true, "binary_operator_spaces": {"default" : "align"}, "phpdoc_summary" : false, "phpdoc_no_package" : false, "concat_space": {"spacing": "one"}, "phpdoc_no_empty_return" : false, "trailing_comma_in_multiline_array" : false, "yoda_style" : false}'

# DEFAULT
.DEFAULT_GOAL := help
help:
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
.PHONY: help

##
