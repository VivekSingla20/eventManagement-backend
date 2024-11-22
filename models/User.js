module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      otp: {
        type: DataTypes.STRING,
        allowNull: true, // OTP can be null until issued
      },
      otpExpires: {
        type: DataTypes.DATE,
        allowNull: true, // Stores OTP expiration timestamp
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  // Define relationships
  User.associate = (models) => {
    // One user can create many events
    User.hasMany(models.Event, {
      foreignKey: "created_by", // Foreign key in Event table
      as: "createdEvents",
    });
  };

  return User;
};
