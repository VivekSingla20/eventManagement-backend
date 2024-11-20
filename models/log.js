module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define("Log", {
    log_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    log_message: DataTypes.STRING,
  });

  return Log;
};
