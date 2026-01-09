export default (sequelize, DataTypes) => {
  const WorkoutSession = sequelize.define(
    'WorkoutSession',
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

      workoutId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      endTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: 'WorkoutSessions',
      timestamps: true,
    }
  );

  WorkoutSession.associate = (models) => {
    WorkoutSession.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    WorkoutSession.belongsTo(models.Workout, {
      foreignKey: 'workoutId',
      onDelete: 'CASCADE',
    });
  };

  return WorkoutSession;
};
