module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Permissions", [
      { name: "CREATE_BOARDS", createdAt: new Date(), updatedAt: new Date() },
      { name: "MANAGE_TASKS", createdAt: new Date(), updatedAt: new Date() },
      { name: "ASSIGN_TASKS", createdAt: new Date(), updatedAt: new Date() },
      { name: "CHANGE_TASK_STATUS", createdAt: new Date(), updatedAt: new Date() },
      { name: "VIEW_REPORTS", createdAt: new Date(), updatedAt: new Date() },
      { name: "VIEW_TASKS", createdAt: new Date(), updatedAt: new Date() },
      { name: "ADD_COMMENTS", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("Permissions", null, {});
  },
};
