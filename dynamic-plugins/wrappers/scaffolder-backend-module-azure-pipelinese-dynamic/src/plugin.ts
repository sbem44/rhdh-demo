import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';

import {  ScmIntegrations } from "@backstage/integration";

import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node/alpha';
import {
  createAzurePipelineAction
} from "@parfuemerie-douglas/scaffolder-backend-module-azure-pipelines";

export const scaffolderBackendModuleAzurePipelines = createBackendModule({
  moduleId: 'scaffolder-backend-module-azure-pipelines',
  pluginId: 'scaffolder',
  register(env) {
    env.registerInit({
      deps: {
        scaffolder: scaffolderActionsExtensionPoint,
        rootConfig: coreServices.rootConfig,
      },
      async init({ scaffolder, rootConfig }) {
        scaffolder.addActions(
          createAzurePipelineAction({integrations: ScmIntegrations.fromConfig(rootConfig)})
        );
      },
    });
  },
});