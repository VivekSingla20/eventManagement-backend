const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const User = require("./User");
const Event = require("./Event");

const Ticket = sequelize.define("Ticket", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

Ticket.belongsTo(User, { foreignKey: "userId" });
Ticket.belongsTo(Event, { foreignKey: "eventId" });

module.exports = Ticket;
