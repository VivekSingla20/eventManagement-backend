module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define("Expense", {
    expense_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: DataTypes.FLOAT,
    description: DataTypes.STRING,
  });

  Expense.associate = (models) => {
    Expense.belongsTo(models.Event, { foreignKey: "event_id" });
  };

  return Expense;
};
