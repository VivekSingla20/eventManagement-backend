module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    event_date: DataTypes.DATE,
    capacity: DataTypes.INTEGER,
    location: DataTypes.STRING,
    created_by: {
      type: DataTypes.UUID, // Matches User's id type
      allowNull: false,
    },
  });

  Event.associate = (models) => {
    Event.belongsTo(models.User, { foreignKey: "created_by" });
    Event.hasMany(models.Expense, { foreignKey: "event_id" });
  };

  return Event;
};
