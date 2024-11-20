module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Expenses", {
      expense_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: Sequelize.FLOAT,
      description: Sequelize.STRING,
      event_id: {
        type: Sequelize.INTEGER,
        references: { model: "Events", key: "event_id" },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Expenses");
  },
};
