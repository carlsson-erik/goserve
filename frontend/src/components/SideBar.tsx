import React from "react";
import Button from "./input/Button";
import { Link, generatePath } from "react-router-dom";
import paths from "../utils/paths";
import useDashboardQuery from "../hooks/useDashboardQuery";

export interface SideBarProps {
  className?: string;
}

const SideBar: React.FC<SideBarProps> = (props) => {
  const { data: dashboards, loading } = useDashboardQuery();
  console.log(dashboards);
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div {...props} className="flex flex-col gap-2 bg-gray-900">
      <Link to={paths.dashboard.create}>
        <Button>New</Button>
      </Link>
      {dashboards?.map((d) => (
        <Link
          to={generatePath(paths.dashboard.root, { dashboardId: d.id })}
          key={d.id}
        >
          <Button>{d.name}</Button>
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
