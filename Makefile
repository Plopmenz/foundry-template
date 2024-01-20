include .env
export

deploy:
	${MAKE} --directory=./web3webdeploy deploy
.PHONY: deploy

# Update all direct submodules
# Init all submodules of submodules (of submodules, etc.)
update:
	git submodule update --init --remote
	git submodule update --init --recursive
.PHONY: update

# Rebase preferring our commits over the template changes
# Submodules updates will throw a merge error (those are skipped and need to be updated with the regular update command)
template-update:
	git remote add template https://github.com/Plopmenz/foundry-template.git
	git fetch template
	git rebase template/main -X theirs --autosquash || true
	git rebase --skip || true
	git remote remove template
	${MAKE} clean
.PHONY: template-update

# Possible we could also add the following, but is there a need?
# Ideally these also take the configuration in consideration
clean:
	rm -rf ./web3webdeploy/.next 
	rm -rf cache
	rm -rf out
.PHONY: clean

# Analyzers
slither:
	${MAKE}  --directory=./analyzers/slither dev
	. ./analyzers/slither/env/bin/activate && slither .
.PHONY: slither

# TODO, add mythril analzer: https://github.com/ConsenSys/mythril