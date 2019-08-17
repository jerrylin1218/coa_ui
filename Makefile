.PHONY: help
help:
	@echo "Usage:"
	@echo "    help:         Prints this screen"
	@echo "    install-deps: Installs dependencies"
	@echo "    run:          Run the react frontend in a dev mode"
	@echo "    build:        Build the react frontend for deployment"
	@echo "    prod-build:   Build the docker image for the prod mode"
	@echo "    prod-run:     Run the prod mode"
	@echo "    clean:        Clean out temporaries"
	@echo ""

.PHONY: install-deps
install-deps:
	npm install

.PHONY: run
run:
	npm start

.PHONY: build
build:
	npm run build

.PHONY: prod-build
prod-build:
	docker build . -f deployment/Dockerfile -t coa-front-end

.PHONY: prod-run
prod-run: prod-build
	docker run --rm -p 3000:80 coa-front-end

.PHONY: clean
clean:
	rm -rf node_modules/ build/
