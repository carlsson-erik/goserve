import React from "react";
import useCreateDashboard from "../../hooks/useCreateDashboard";
import Button from "../../components/input/Button";
import TileEditor from "../../components/TileEditor";

const DashboardCreateScreen = () => {
  const [name, setName] = React.useState("");

  const [createDashboard, { data, loading }] = useCreateDashboard();

  const onSubmit = async () => {
    console.log("hej");
    const res = await createDashboard({ name: name });

    console.log(res, data);
  };

  return (
    <div className="w-full flex justify-center items-center p-8">
      <span className="text-2xl">Create new dashboard</span>
      <div>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Button loading={loading} onClick={onSubmit}>
          Create
        </Button>
        <TileEditor />
      </div>
    </div>
  );
};

export default DashboardCreateScreen;
