include .env
export

deploy:
	${MAKE} --directory=./web3webdeploy deploy
.PHONY: deploy

# Sends 100 ETH to ADDRESS (example usage: make fundme ADDRESS="0xaF7E68bCb2Fc7295492A00177f14F59B92814e70")
local-fund:
	cast send --value 100000000000000000000 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 ${ADDRESS}
.PHONY: local-fund

# Update all submodules (and submodules of submodules of submodules etc.) to the latest version
# This will by default get the latest head or whatever branch is specific in .gitmodules
update:
	git submodule update --init --recursive --remote
.PHONY: update

# Discard any commits/updates done to submodules
revert-submodules:
	git submodule deinit -f .
	git submodule update --init --recursive --checkout
.PHONY: revert-submodules

# Merge preferring our commits over the template changes
template-update:
	git remote add template https://github.com/Plopmenz/foundry-template.git
	git fetch template
	git merge template/main -X ours --squash --allow-unrelated-histories || true
	git remote remove template
	${MAKE} empty
	${MAKE} clean
.PHONY: template-update

# Merge without preference in merge conflicts
template-update-manual:
	git remote add template https://github.com/Plopmenz/foundry-template.git
	git fetch template
	git merge template/main --squash --allow-unrelated-histories || true
	git remote remove template
	${MAKE} empty
	${MAKE} clean
.PHONY: template-update-manual

# Remove template example files
empty:
	rm -rf deploy/counters/Counter.ts
	rm -rf deploy/counters/ProxyCounter.ts
	rmdir deploy/counters || true
	rm -rf src/Counter.sol
	rm -rf src/ProxyCounter.sol
	rm -rf test/Counter.t.sol
	rm -rf test/ProxyCounter.t.sol
.PHONY: empty

# Ideally these also take the configuration in consideration
clean:
	rm -rf ./web3webdeploy/.next 
	rm -rf cache
	rm -rf out
.PHONY: clean

# Analyzers
analyze:
	${MAKE}  --directory=./analyzers all
.PHONY: analyze

slither:
	${MAKE}  --directory=./analyzers slither
.PHONY: slither

mythril:
	${MAKE}  --directory=./analyzers mythril
.PHONY: mythril