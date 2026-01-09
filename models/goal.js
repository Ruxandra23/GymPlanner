export default (sequelize, DataTypes) => {
  const Goal = sequelize.define(
    'Goal',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      targetValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      currentValue: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },

      unit: {
        type: DataTypes.STRING, // kg / lbs / reps
        allowNull: false,
      },

      deadline: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: 'Goals',
      timestamps: true,
    }
  );

  Goal.associate = (models) => {
    Goal.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Goal;
};
