install:
	npm i
	npm run build
	cd ./build && npm ci --production

restart:
	cd ./build && pm2 restart api


seedDb:
	node ace migration:run
	node ace db:seed -i

makeTest:
	node -r @adonisjs/assembler/build/register japaFile.ts
