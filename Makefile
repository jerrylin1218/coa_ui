.PHONY: help
help:
	@echo "Usage:"
	@echo "    help:         Prints this screen"
	@echo "    install-deps: Installs dependencies"
	@echo "    run:          Run the react frontend in a dev mode"
	@echo "    prod-run:     Run the react frontend in a prod mode"
	@echo "    clean:        Clean out temporaries"
	@echo ""

.PHONY: install-deps
install-deps:
	npm install

.PHONY: run
run:
	npm start

.PHONY: prod-run
prod-run:
	npm run build

.PHONY: clean
clean:
	@echo TODO
