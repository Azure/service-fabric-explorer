//-----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// Licensed under the MIT License. See License file under the project root for license information.
//-----------------------------------------------------------------------------

import { ChannelType, ICommunicatorConstructorOptions } from "sfx.ipc";
import { IModuleInfo } from "sfx.module-manager";
import { ILog } from "sfx.logging";

import { Communicator } from "./communicator";
import * as appUtils from "../../utilities/appUtils";

export function getModuleMetadata(): IModuleInfo {
    return {
        name: "ipc",
        version: appUtils.getAppVersion(),
        loadingMode: "Always",
        components: [
            {
                name: "ipc.communicator",
                version: appUtils.getAppVersion(),
                deps: ["logging"],
                descriptor: (log: ILog, channel: ChannelType, options?: ICommunicatorConstructorOptions) => new Communicator(channel, options)
            }
        ]
    };
}
