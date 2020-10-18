module.exports = {
  name: 'flex',
  description: 'llamado al pueblo para jugar una clasificatoria flexible',
  execute (message, args) {
// borra el llamado al bot
		message.delete();

// llamado default
		if (!args.length) {
// buscar emojis
			const gold = "<:gold:747271978846519329>";
			const ama = "<:amafoas:747277948326903849>";

			return message.channel.
				send(`${ama}${gold}${gold}SE BUSCA GENTE PARA FLEX!!!${gold}${gold}${ama}`);
		}
// llamado con timer
		let timer = args[0];
		if (isNaN(timer)) timer = "10";

		const code = "<:code:750173444150132746>";
		const iron = "<:iron:747272314344701962>";

		return message.channel.
			send(`${code}${iron}${iron}EN ${timer} SE PICA ESA FLEXIBLE LOCO${iron}${iron}${code}`);
	},
};
