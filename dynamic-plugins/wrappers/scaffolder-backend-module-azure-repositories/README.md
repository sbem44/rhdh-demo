
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

### new registry
oc project devhub
oc new-build httpd --name=plugin-registry --binary
oc start-build plugin-registry --from-dir=$DYNAMIC_PLUGIN_ROOT_DIR --wait
oc new-app --image-stream=plugin-registry
### existing registry
oc cp $DYNAMIC_PLUGIN_ROOT_DIR/<name.tgz> <registry-pod-name>:<name.tgz>
```