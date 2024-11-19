const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const AuditLog = sequelize.define("AuditLog", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  action: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = AuditLog;
