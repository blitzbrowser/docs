import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "cloud/api/blitzbrowser-cloud-api",
    },
    {
      type: "category",
      label: "User Data",
      items: [
        {
          type: "doc",
          id: "cloud/api/download-user-data",
          label: "Download user data",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "cloud/api/upload-user-data",
          label: "Upload user data",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "cloud/api/delete-user-data",
          label: "Delete user data",
          className: "api-method delete",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
