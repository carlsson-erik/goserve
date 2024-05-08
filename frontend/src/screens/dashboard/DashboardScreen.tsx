import React from "react";
import { Link, useParams } from "react-router-dom";
import useDashboardQuery from "../../hooks/useDashboardQuery";
import paths from "../../utils/paths";
import Button from "../../components/input/Button";

const DashboardScreen = () => {
  const name = React.useState("");

  const { dashboardId } = useParams();

  const { data } = useDashboardQuery(dashboardId ?? "skip");

  console.log(name, data);

  return (
    <div>
      <div className="text-black">
        <span>No dasboard created</span>
        <Link to={paths.dashboard.create}>
          <Button>Create dashboard</Button>
        </Link>
      </div>
      <span className="text-2xl">Create new dashboard</span>
    </div>
  );
};

export default DashboardScreen;
