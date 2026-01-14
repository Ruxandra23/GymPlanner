export default (sequelize, DataTypes) => {
  const UserProfile = sequelize.define(
    'UserProfile',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      socialLinks: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {},
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    },
    {
      tableName: 'UserProfiles',
      timestamps: true,
    }
  );

  UserProfile.associate = (models) => {
    UserProfile.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return UserProfile;
};