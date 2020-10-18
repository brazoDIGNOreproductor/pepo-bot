const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').
	filter(file => file.endsWith('.js'));

// fetch comandos
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// avisar disponibilidad por consola
client.once('ready', () => {
	console.log('Listo!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

// separar argumentos del mensaje
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

// buscar el comando
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('hubo un temita ejecutando tu comando bro');
	}
});

client.login(token);
