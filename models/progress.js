export default (sequelize, DataTypes) => {
  const Progress = sequelize.define(
    'Progress',
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

      exerciseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

      reps: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      sets: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'Progresses',
      timestamps: true,
    }
  );

  Progress.associate = (models) => {
    Progress.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Progress.belongsTo(models.Exercise, {
      foreignKey: 'exerciseId',
      onDelete: 'CASCADE',
    });
  };

  return Progress;
};
