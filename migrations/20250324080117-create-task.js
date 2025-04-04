'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING, // ✅ Added title column
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING, // ✅ Added status column
        allowNull: false,
        defaultValue: 'pending',
      },
      assignedTo: {
        type: Sequelize.INTEGER, // ✅ Matches model
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('bug', 'task', 'story'),
        allowNull: false,
        defaultValue: 'task',
      },
      priority: {
        type: Sequelize.ENUM('high', 'medium', 'low'),
        allowNull: false,
        defaultValue: 'medium',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // ✅ Correct placement of indexes
    await queryInterface.addIndex('Tasks', ['type']);
    await queryInterface.addIndex('Tasks', ['priority']);
    await queryInterface.addIndex('Tasks', ['assignedTo']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};
