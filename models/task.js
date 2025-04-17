'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     */
    static associate(models) {
      // If tasks are assigned to a User model
      Task.belongsTo(models.User, { foreignKey: 'assignedTo', as: 'assignee' });
    }
  }

  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false, // Enforce non-null titles
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'in-progress', 'completed'), // Better status management
        allowNull: false,
        defaultValue: 'pending',
      },
      assignedTo: {
        type: DataTypes.STRING,
        allowNull: true, // If a task can exist without an assignee
        references: {
          model: 'Users', // Should match your users table
          key: 'email',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'Tasks', // Explicitly set table name
      timestamps: true, // Ensures createdAt and updatedAt are included
    }
  );

  return Task;
};
