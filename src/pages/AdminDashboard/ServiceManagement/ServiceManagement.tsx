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
  useAddServiceMutation,
  useDeleteServiceMutation,
  useGetServicesQuery,
  useUpdateServiceMutation,
} from "@/redux/api/servicesApi";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";

const ServiceManagement = () => {
  const { data: services = [], isLoading } = useGetServicesQuery("");
  const { token } = useAppSelector((state) => state.user);

  const [addService] = useAddServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);

  const handleAddService = async (newService) => {
    await addService({ newService, token });
    setIsModalOpen(false);
  };

  const handleUpdateService = async (updatedService) => {
    await updateService({ id: updatedService._id, ...updatedService, token });
    setIsModalOpen(false);
  };

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

  const openModal = (service = null) => {
    setServiceToEdit(service);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Service Management</h2>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
        onClick={() => openModal()}
      >
        Add Service
      </button>

      {isLoading ? (
        <p>Loading services...</p>
      ) : (
        <Table>
          <TableCaption>A list of your services.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services?.data.map((service) => (
              <TableRow key={service._id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>${service.price.toFixed(2)}</TableCell>
                <TableCell>{service.duration} mins</TableCell>
                <TableCell>
                  {service.isDeleted ? "Deleted" : "Active"}
                </TableCell>
                <TableCell className="text-right">
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded-lg mr-2"
                    onClick={() => openModal(service)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded-lg"
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
