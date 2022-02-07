const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });
const config = require("./config.json");
const request = require("request");

client.login(config.token);

client.once('ready', async() => {

    console.log("✅ - Estou online!")

})

/* Criado por W-Team Development */
client.on("ready", () => {
    let snap = [
            `W-Team Development`
        ],
        fera = 0;
    setInterval(() => client.user.setActivity(`${snap[fera++ % snap.length]}`, {
        type: "PLAYING" //mais tipos: WATCHING / LISTENING
    }), 1000 * 30);
});

client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
        console.error('Erro:' + err);
    }
});