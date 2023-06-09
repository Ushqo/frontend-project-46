install: install-deps

install-deps:
	npm ci

publish:
	npm publish --dry-run

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

gendDiff:
	node bin/gendiff

.PHONY: test