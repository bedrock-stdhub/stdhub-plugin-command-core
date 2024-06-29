# stdhub-plugin-command-core

The core plugin for handling plugin-defined commands from players.

# Usage

Copy the plugin to the `plugins` directory. Any plugin that has custom commands must rely on this plugin.

## Configuration

```yaml
commandPrefix: .
```
The only option is the prefix of commands.

If you want to change that into other values, you'd better wrap the new value with quotes, for example:
```yaml
commandPrefix: "!"
```
or unexpected things will happen.