module.exports = {
	name: 'reload',
	description: 'Refresca el comando',
	execute(message, args) {
		if (!args.length) return message.channel.
			send(`no me dijiste qué reloadear, ${message.author}`);

		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

// si no está el comando pedido
		if (!command) return message.channel.
			send(`no encontré un comando con ese nombre \`${commandName}\`, ${message.author}`);

// borrar cache existente
		delete require.cache[require.resolve(`./${command.name}.js`)];

// reloadear
		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`se reloadeó el comando \`${command.name}\``);
		} catch (error) {
			console.error(error);
			message.channel.send(`hubo un temita reoladeando \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};
