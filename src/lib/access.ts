import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  project: ["create", "share", "update", "delete"],
} as const;

const ac = createAccessControl(statement);

const admin = ac.newRole({
  project: ["create", "update"],
  ...adminAc.statements,
});

const superadmin = ac.newRole({
  project: ["create", "update", "delete"],
  ...adminAc.statements,
});

export { ac, admin, superadmin };
