export default (sequelize, DataTypes) => {
  const Exercise = sequelize.define(
    'Exercise',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      muscleGroup: {
        type: DataTypes.ENUM(
          'chest',
          'back',
          'legs',
          'shoulders',
          'arms',
          'core'
        ),
        allowNull: false,
      },

      difficulty: {
        type: DataTypes.ENUM(
          'beginner',
          'intermediate',
          'advanced'
        ),
        allowNull: false,
      },

      equipment: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      videoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'Exercises',
      timestamps: true,
    }
  );

  Exercise.associate = (models) => {
    // many-to-many cu Workout
    Exercise.belongsToMany(models.Workout, {
      through: models.WorkoutExercise,
      foreignKey: 'exerciseId',
      otherKey: 'workoutId',
      onDelete: 'CASCADE',
    });

    Exercise.hasMany(models.Progress, {
      foreignKey: 'exerciseId',
      onDelete: 'CASCADE',
    });

    Exercise.hasMany(models.Favorite, {
      foreignKey: 'exerciseId',
      onDelete: 'CASCADE',
    });
  };

  return Exercise;
};
