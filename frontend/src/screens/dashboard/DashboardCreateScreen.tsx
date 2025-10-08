import Card from "../../components/Card";
import DashboardCreateForm, {
  DashboardCreateData,
} from "../../components/feature/dashboard/DashboardCreateFormDialog";
import useCreateDashboard from "../../hooks/dashboard/useCreateDashboard";

const DashboardCreateScreen = () => {
  const [createDashboard] = useCreateDashboard();

  const onSubmit = (data: DashboardCreateData) => {
    createDashboard({ name: data.name });
  };
  return (
    <div className="w-full flex justify-center items-center p-8">
      <Card className="flex flex-col space-y-6">
        <span className="text-2xl">Create new dashboard</span>
        <DashboardCreateForm onSubmit={onSubmit} />
      </Card>
    </div>
  );
};

export default DashboardCreateScreen;
