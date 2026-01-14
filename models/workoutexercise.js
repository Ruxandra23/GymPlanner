export default (sequelize, DataTypes) => {
  const WorkoutExercise = sequelize.define(
    'WorkoutExercise',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      workoutId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Workouts',
          key: 'id',
        },
      },
      exerciseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Exercises',
          key: 'id',
        },
      },
      sets: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reps: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

      restTime: DataTypes.INTEGER, 
      order: DataTypes.INTEGER
    },
    {
      tableName: 'WorkoutExercises',
      timestamps: true,
    }
  );

  WorkoutExercise.associate = (models) => {
    WorkoutExercise.belongsTo(models.Workout, {
      foreignKey: 'workoutId',
      as: 'workout',
    });

    WorkoutExercise.belongsTo(models.Exercise, {
      foreignKey: 'exerciseId',
      as: 'exercise',
    });
  };

  return WorkoutExercise;
};