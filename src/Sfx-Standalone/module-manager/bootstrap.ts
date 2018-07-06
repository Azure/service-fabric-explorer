//-----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// Licensed under the MIT License. See License file under the project root for license information.
//-----------------------------------------------------------------------------

/**
 * Bootstrap the host environment for modules. 
 */

import { IModuleManagerConstructorOptions } from "sfx.module-manager";

import "../utilities/utils";

import * as electron from "electron";

import * as appUtils from "../utilities/appUtils";
import { Communicator } from "../modules/ipc/communicator";
import { ModuleManager } from "./module-manager";

const brootstrapPromise: Promise<void> = ((): Promise<any> => {
    appUtils.logUnhandledRejection();

    if (electron.ipcMain) {
        appUtils.injectModuleManager(new ModuleManager(appUtils.getAppVersion()));
        return;
    }

    const constructorOptions: IModuleManagerConstructorOptions = JSON.parse(appUtils.getCmdArg(ModuleManager.ConstructorOptionsCmdArgName));
    const moduleManager = new ModuleManager(constructorOptions.hostVersion, Communicator.fromChannel(electron.ipcRenderer || process));

    appUtils.injectModuleManager(moduleManager);

    if (Array.isArray(constructorOptions.initialModules)) {
        return Promise.all(
            constructorOptions.initialModules.map<Promise<void>>(
                (moduleLoadingInfo) => moduleManager.loadModuleAsync(moduleLoadingInfo.location, undefined, true)));
    }

    return Promise.resolve();
})();

export default brootstrapPromise;
