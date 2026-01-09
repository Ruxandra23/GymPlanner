export default (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    'Favorite',
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

      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'Favorites',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['userId', 'exerciseId'],
        },
      ],
    }
  );

  Favorite.associate = (models) => {
    Favorite.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Favorite.belongsTo(models.Exercise, {
      foreignKey: 'exerciseId',
      onDelete: 'CASCADE',
    });
  };

  return Favorite;
};
