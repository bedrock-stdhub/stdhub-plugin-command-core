import { StdhubPluginApi } from 'stdhub-plugin-api';
import { system, world } from "@minecraft/server";

export const pluginName = 'command-core';
export const api = new StdhubPluginApi(pluginName);

api.readRootConfig({
  commandPrefix: '.'
}).then(({ commandPrefix }) => {
  world.beforeEvents.chatSend.subscribe(event => {
    if (!event.message.startsWith(commandPrefix)) {
      return;
    }

    const commandString = event.message.slice(commandPrefix.length);
    const [ commandName ] = commandString.split(' ', 2);

    // The system.run is important here!
    // You cannot call any async functions in the event handling scope.
    system.run(() => {
      api.postJson(
        `${api.backendAddress}/command/submit`,
        {
          playerId: event.sender.id,
          playerName: event.sender.name,
          commandString
        }
      ).then(({ response: { status } }) => {
        if (status === 404) {
          event.sender.sendMessage(
            `§cUnknown command: ${commandName}. Please check that the command exists and you have permission to use it.`
          );
        }
      });
    });
  });
});