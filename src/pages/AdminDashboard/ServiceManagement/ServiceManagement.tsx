/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
} from "@/redux/api/servicesApi";
import { useAppSelector } from "@/redux/hooks";
import { AddServiceModal } from "@/components/ServiceModal/AddServiceModal";
import { EditServiceModal } from "@/components/ServiceModal/EditServiceModal";
import { Helmet } from "react-helmet-async";

const ServiceManagement = () => {
  const { data: services = [], isLoading } = useGetAllServicesQuery(undefined);
  const { token } = useAppSelector((state) => state.user);
  const [deleteService] = useDeleteServiceMutation();

  const handleDeleteService = async (serviceId: string) => {
    Swal.fire({
      title: "Are you sure you want to delete this service?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteService({ serviceId, token }).unwrap(); // Pass an object with serviceId and token
          Swal.fire({
            title: "Deleted!",
            text: "Your service has been deleted.",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was an error deleting the service.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="p-4">
      <Helmet>
        <title> Service Management - Car Washing</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Service Management</h2>
      <AddServiceModal></AddServiceModal>

      {isLoading ? (
        <img></img>
      ) : (
        <Table>
          <TableCaption>A list of your services.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px] text-center">Name</TableHead>
              <TableHead className="text-center">Image</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Duration</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services?.data.map((service: any) => (
              <TableRow key={service._id}>
                <TableCell className="text-center font-medium">
                  {service.name}
                </TableCell>
                <TableCell className="text-center">
                  <img src={service.image} alt="" className="mx-auto rounded-full h-10 w-10" />
                </TableCell>
                <TableCell className="text-center">
                  ${service.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  {service.duration} mins
                </TableCell>
                <TableCell className="text-center">
                  {service.isDeleted ? "Deleted" : "Active"}
                </TableCell>
                <TableCell className="text-center">
                  <button>
                    <EditServiceModal service={service}></EditServiceModal>
                  </button>

                  <button
                    className="bg-red-500 text-white py-1 px-3 ml-2 rounded-lg"
                    onClick={() => handleDeleteService(service._id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ServiceManagement;
