import React from "react";
import useCreateDashboard from "../../hooks/useCreateDashboard";
import Button from "../../components/input/Button";

const DashboardCreateScreen = () => {
  const [name, setName] = React.useState("");

  const createDashboard = useCreateDashboard();

  const onSubmit = () => {
    createDashboard({ name: name })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full flex justify-center items-center p-8 bg-gray-900">
      <span className="text-2xl">Create new dashboard</span>
      <div>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={onSubmit}>Create</Button>
      </div>
    </div>
  );
};

export default DashboardCreateScreen;
