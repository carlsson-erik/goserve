import React from "react";
import useCreateDashboard from "../../../hooks/dashboard/useCreateDashboard";
import Button from "../../input/Button";

export interface DashboardCreateData {
  name: string;
}

export interface DashboardCreateFormProps {
  onSubmit: (data: DashboardCreateData) => void;
}

const DashboardCreateForm: React.FC<DashboardCreateFormProps> = ({
  onSubmit,
}) => {
  const [name, setName] = React.useState("");
  const [createDashboard, { loading }] = useCreateDashboard();

  console.log(createDashboard, loading, name);
  return (
    <form className="space-y-2" onSubmit={() => onSubmit({ name: name })}>
      <div className="flex items-center gap-2">
        <input
          className="w-full"
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-row-reverse">
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
};

export default DashboardCreateForm;
