module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Expenses", {
      expense_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      description: Sequelize.STRING,
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Events", key: "event_id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Expenses");
  },
};
