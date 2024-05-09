import React from "react";
import Button from "./input/Button";
import { Link, generatePath } from "react-router-dom";
import paths from "../utils/paths";
import { Dashboard } from "../hooks/useDashboardQuery";

export interface SideBarProps {
  dashboards?: Dashboard[];
}

const SideBar: React.FC<SideBarProps> = ({ dashboards }) => {
  if (!dashboards) {
    return <div>loading...</div>;
  }
  return (
    <div className="flex flex-col gap-2 bg-gray-900">
      {dashboards.length}
      <Link to={paths.dashboard.create}>
        <Button>New</Button>
      </Link>
      {dashboards.map((d) => (
        <Link
          to={generatePath(paths.dashboard.id, { dashboardId: d.id })}
          key={d.id}
        >
          <Button>{d.name}</Button>
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
