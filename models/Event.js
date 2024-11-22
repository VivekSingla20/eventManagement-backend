const { v4: uuidv4 } = require("uuid"); // Import the uuid library

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      event_id: {
        type: DataTypes.UUID, // Change to UUID
        defaultValue: uuidv4, // Automatically generate UUIDs
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      event_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
    },
    {
      tableName: "events",
      timestamps: true, // Enable createdAt and updatedAt fields
    }
  );

  Event.associate = (models) => {
    Event.belongsTo(models.User, { foreignKey: "created_by" }); // Each event belongs to a user
    Event.hasMany(models.Expense, { foreignKey: "event_id" }); // Each event can have multiple expenses
  };

  return Event;
};
