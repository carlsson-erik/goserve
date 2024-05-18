import React from "react";
import useCreateDashboard from "../../hooks/useCreateDashboard";
import Button from "../../components/input/Button";
import Card from "../../components/Card";

const DashboardCreateScreen = () => {
  const [name, setName] = React.useState("");

  const [createDashboard, { data, loading }] = useCreateDashboard();

  const onSubmit = async () => {
    console.log("hej");
    try {

      const res = await createDashboard({ name: name });

      if (res.errors) console.log(res.errors)
      console.log(res, data);
    } catch (e) {
      console.log(e)
    }




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
