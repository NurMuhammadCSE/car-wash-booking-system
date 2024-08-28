import ServiceManagement from "./ServiceManagement/ServiceManagement";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
        <ServiceManagement />
        {/* <SlotManagement />
        <UserManagement /> */}
      {/* </div> */}
    </div>
  );
};

export default AdminDashboard;
