const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const User = require("./User");

const Event = sequelize.define("Event", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  venue: { type: DataTypes.STRING, allowNull: false },
  capacity: { type: DataTypes.INTEGER, allowNull: false },
  budget: { type: DataTypes.FLOAT, allowNull: false },
  organizerId: { type: DataTypes.INTEGER, allowNull: false },
});

Event.belongsTo(User, { foreignKey: "organizerId", as: "organizer" });

module.exports = Event;
