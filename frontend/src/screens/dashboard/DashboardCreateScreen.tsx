import React from "react";
import Button from "../../components/input/Button";
import Card from "../../components/Card";
import { generatePath, useNavigate } from "react-router-dom";
import paths from "../../utils/paths";
import useCreateDashboard from "../../hooks/dashboard/useCreateDashboard";

const DashboardCreateScreen = () => {
  const [name, setName] = React.useState("");

  const [createDashboard, { data, loading }] = useCreateDashboard();
  console.log(data);

  const navigate = useNavigate();

  const onSubmit = async () => {
    const res = await createDashboard({ name: name });

    if (res.isErr()) {
      console.log(res.error);
      return;
    }
    navigate(
      generatePath(paths.dashboard.id, {
        dashboardId: res.value.data?.createDashboard.id,
      })
    );
  };

  return (
    <div className="w-full flex justify-center items-center p-8">
      <Card className="flex flex-col space-y-6">
        <span className="text-2xl">Create new dashboard</span>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Button loading={loading} onClick={onSubmit}>
            Create
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DashboardCreateScreen;
