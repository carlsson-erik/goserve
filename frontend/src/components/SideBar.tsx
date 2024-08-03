import React from "react";
import Button from "./input/Button";
import { Link, generatePath } from "react-router-dom";
import paths from "../utils/paths";
import { IconPlus } from "@tabler/icons-react";
import { Template } from "../hooks/template/useTemplateQuery";
import { Dashboard } from "../hooks/dashboard/useDashboardQuery";

export interface SideBarProps {
  className?: string;
  dashboards?: Dashboard[];
  templates?: Template[];
}

const SideBar: React.FC<SideBarProps> = ({
  dashboards,
  templates,
  className,
}) => {
  if (!dashboards) {
    return <div className={className}>loading...</div>;
  }

  return (
    <div className={className}>
      <div className="h-full p-1 flex flex-col items-stretch gap-2 bg-gray-900 border-r border-gray-800">
        <span>Dashboards {dashboards.length}</span>
        <Link to={paths.dashboard.create}>
          <Button className="flex items-center gap-1">
            New <IconPlus />
          </Button>
        </Link>
        {dashboards.map((d) => (
          <Link
            to={generatePath(paths.dashboard.id, { dashboardId: d.id })}
            key={d.id}
          >
            <Button className="w-full text-start">{d.name}</Button>
          </Link>
        ))}
        <span>Templates {templates?.length}</span>
        <Link to={paths.template.create}>
          <Button className="flex items-center gap-1">
            New <IconPlus />
          </Button>
        </Link>
        {templates?.map((t) => (
          <Link
            to={generatePath(paths.template.id, { templateId: t.id })}
            key={t.id}
          >
            <Button className="w-full text-start">{t.name}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
