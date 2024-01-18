include .env
export

deploy:
	${MAKE} --directory=./web3webdeploy deploy
.PHONY: deploy

# Analyzers
slither:
	${MAKE}  --directory=./analyzers/slither dev
	. ./analyzers/slither/env/bin/activate && slither .
.PHONY: slither

# TODO, add mythril analzer: https://github.com/ConsenSys/mythril