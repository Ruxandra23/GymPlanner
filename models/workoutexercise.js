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
      },

      exerciseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      sets: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
      },

      reps: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
      },

      weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

      restTime: {
        type: DataTypes.INTEGER, // seconds
        allowNull: true,
      },

      order: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'WorkoutExercises',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['workoutId', 'exerciseId'],
        },
      ],
    }
  );

  // NU definim asocieri aici
  // Relațiile sunt gestionate din Workout și Exercise

  return WorkoutExercise;
};
