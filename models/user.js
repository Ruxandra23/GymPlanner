export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      height: {
        type: DataTypes.FLOAT, // cm
        allowNull: true,
      },

      weight: {
        type: DataTypes.FLOAT, // kg
        allowNull: true,
      },

      goal: {
        type: DataTypes.ENUM('gain', 'lose', 'maintain'),
        allowNull: true,
      },
    },
    {
      tableName: 'Users',
      timestamps: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Workout, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    User.hasMany(models.Progress, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    User.hasMany(models.Goal, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    User.hasMany(models.Favorite, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    User.hasMany(models.WorkoutSession, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return User;
};
