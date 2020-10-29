const { prefix } = require('../config.json');

module.exports = {
	name: 'ayuda',
	description: 'Lista todos los comandos disponibles, o info específica acerca de un comando en particular',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		// Lista comandos disponibles.
		if (!args.length) {
			data.push('estos son mis comandos bre:');
			data.push(commands.map(commands => commands.name).join(', '));
			data.push('/n podes mandar \`${prefix}help [command name]\` para tener info específica sobre el comando');

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('te mandé un dm con mis comandos ;^)')
				})
				.catch(error => {
					console.error(`no le pude mandar un dm a ${message.author.tag}.\n`, error);
					message.reply('parece que no te puedo dmear, los tenés deshabilitados?');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) ||
			commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('ese no es un comando válido')
		}

		data.push(`**Nombre:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Descripción:** ${command.description}`);
		if (command.usage) data.push(`**Uso:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });
	},
};
