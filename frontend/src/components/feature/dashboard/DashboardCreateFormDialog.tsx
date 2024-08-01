import React from "react";
import useCreateDashboard from "../../../hooks/dashboard/useCreateDashboard";

export interface DashboardCreateFormProps {
  onSumbit: () => void;
}

const DashboardCreateForm: React.FC<DashboardCreateFormProps> = () => {
  const [name, setName] = React.useState("");
  const [createDashboard, { loading }] = useCreateDashboard();
  console.log(createDashboard, loading, name);
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
    </form>
  );
};

export default DashboardCreateForm;
