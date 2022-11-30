import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text } from "@keystone-6/core/fields";
import { permissionFields } from "./fields";


const Role = list({
  access: allowAll, /* {
    create: permissions.canManageRoles,
    read: permissions.canManageRoles,
    update: permissions.canManageRoles,
    delete: permissions.canManageRoles,
  },*/
  /* ui: {
     hideCreate: (args) => !permissions.canManageRoles(args),
     hideDelete: (args) => !permissions.canManageRoles(args),
     isHidden: (args) => !permissions.canManageRoles(args),
   },*/
  fields: {
    name: text({ validation: { isRequired: true } }),
    ...permissionFields,
    assignedTo: relationship({
      ref: 'User.role', // TODO: Add this to the User
      many: true,
      ui: {
        itemView: { fieldMode: 'read' },
      },
    }),
  },
});

export default Role