module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Roles", [
      { name: "Admin", createdAt: new Date(), updatedAt: new Date() },
      { name: "Manager", createdAt: new Date(), updatedAt: new Date() },
      { name: "User", createdAt: new Date(), updatedAt: new Date() },
      { name: "Viewer", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
