
Wrap this 
[https://github.com/Parfuemerie-Douglas/scaffolder-backend-module-azure-pipelines](https://github.com/Parfuemerie-Douglas/scaffolder-backend-module-azure-pipelines).

```bash
yarn install
yarn tsc
yarn export-dynamic
DYNAMIC_PLUGIN_ROOT_DIR=/tmp/dynamic-plugins-root 
mkdir $DYNAMIC_PLUGIN_ROOT_DIR
BACKEND_INTEGRITY_HASH=$(npm pack ./dist-dynamic --pack-destination $DYNAMIC_PLUGIN_ROOT_DIR --json | jq -r '.[0].integrity')  \
  && echo "Backend plugin integrity Hash: $BACKEND_INTEGRITY_HASH"
```