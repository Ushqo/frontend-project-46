install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

gen-diff:
	node bin/gendiff