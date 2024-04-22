import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';

import {  ScmIntegrations } from "@backstage/integration";

import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node/alpha';
import {pushAzureRepoAction } from "@parfuemerie-douglas/scaffolder-backend-module-azure-repositories";

export const scaffolderBackendModuleAzurePipelines = createBackendModule({
  moduleId: 'scaffolder-backend-module-azure-repositories',
  pluginId: 'scaffolder',
  register(env) {
    env.registerInit({
      deps: {
        scaffolder: scaffolderActionsExtensionPoint,
        rootConfig: coreServices.rootConfig,
      },
      async init({ scaffolder, rootConfig }) {
        scaffolder.addActions(
          pushAzureRepoAction({integrations: ScmIntegrations.fromConfig(rootConfig), config:rootConfig})
        );
      },
    });
  },
});