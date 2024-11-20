module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Events", {
      event_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.STRING,
      description: Sequelize.TEXT,
      event_date: Sequelize.DATE,
      capacity: Sequelize.INTEGER,
      location: Sequelize.STRING,
      created_by: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "user_id" },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Events");
  },
};
