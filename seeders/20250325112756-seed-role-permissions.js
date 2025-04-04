module.exports = {
  async up(queryInterface) {
    const roles = await queryInterface.sequelize.query(`SELECT id, name FROM "Roles";`);
    const permissions = await queryInterface.sequelize.query(`SELECT id, name FROM "Permissions";`);

    const roleMap = Object.fromEntries(roles[0].map((r) => [r.name, r.id]));
    const permissionMap = Object.fromEntries(permissions[0].map((p) => [p.name, p.id]));

    const rolePermissions = [
      // Admin permissions
      { roleId: roleMap["Admin"], permissionId: permissionMap["CREATE_BOARDS"], createdAt: new Date(), updatedAt: new Date() },
      { roleId: roleMap["Admin"], permissionId: permissionMap["MANAGE_TASKS"], createdAt: new Date(), updatedAt: new Date() },
      { roleId: roleMap["Admin"], permissionId: permissionMap["ASSIGN_TASKS"], createdAt: new Date(), updatedAt: new Date() },
      { roleId: roleMap["Admin"], permissionId: permissionMap["CHANGE_TASK_STATUS"], createdAt: new Date(), updatedAt: new Date() },
      { roleId: roleMap["Admin"], permissionId: permissionMap["VIEW_REPORTS"], createdAt: new Date(), updatedAt: new Date() },

      // Manager permissions
      { roleId: roleMap["Manager"], permissionId: permissionMap["MANAGE_TASKS"], createdAt: new Date(), updatedAt: new Date() },
      { roleId: roleMap["Manager"], permissionId: permissionMap["ASSIGN_TASKS"], createdAt: new Date(), updatedAt: new Date() },
      { roleId: roleMap["Manager"], permissionId: permissionMap["CHANGE_TASK_STATUS"], createdAt: new Date(), updatedAt: new Date() },
      { roleId: roleMap["Manager"], permissionId: permissionMap["VIEW_REPORTS"], createdAt: new Date(), updatedAt: new Date() },

      // User permissions
      { roleId: roleMap["User"], permissionId: permissionMap["VIEW_TASKS"], createdAt: new Date(), updatedAt: new Date() },
      { roleId: roleMap["User"], permissionId: permissionMap["CHANGE_TASK_STATUS"], createdAt: new Date(), updatedAt: new Date() },
      { roleId: roleMap["User"], permissionId: permissionMap["ADD_COMMENTS"], createdAt: new Date(), updatedAt: new Date() },

      // Viewer permissions
      { roleId: roleMap["Viewer"], permissionId: permissionMap["VIEW_TASKS"], createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert("RolePermissions", rolePermissions);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("RolePermissions", null, {});
  },
};
