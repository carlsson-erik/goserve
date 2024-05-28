const paths = {
  root: "/",
  dashboard: {
    root: "/dashboard",
    id: "/dashboard/:dashboardId",
    create: "/dashboard/create",
    about: "/dashboard/about",
    tile: {
      root: "/dashboard/tile",
      create: "/dashboard/:dashboardId/tile/create/:col/:row",
    },
  },
  template: {
    id: "/template/:templateId",
    create: "/template/create",
  },
};

export default paths;
