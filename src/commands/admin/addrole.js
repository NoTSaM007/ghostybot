module.exports = {
  name: "addrole",
  description: "Add a role to a user",
  category: "admin",
  async execute(bot, message, args) {
    if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      return message.reply(
        "I don't have the correct permissions to add a role to somebody! (Manage Roles)"
      );

    if (!message.member.hasPermission("MANAGE_ROLES" || "ADMINISTRATOR"))
      return message.channel.send("You don't have permissions for that!");

    const needsRole =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]);
    const role =
      message.guild.roles.cache.find(
        (role) => role.name === args.join(" ").slice(23)
      ) || message.mentions.roles.first();

    if (!needsRole) return message.channel.send("User wasn't found");
    if (!role) return message.channel.send("Please provide a valid role");
    if (needsRole.roles.cache.some((r) => role.id === r.id))
      return message.channel.send("User already has that role");

    needsRole.roles.add(role.id);

    message.channel.send(`Successfully Added **${role.name}** to ${needsRole}`);
  },
};
