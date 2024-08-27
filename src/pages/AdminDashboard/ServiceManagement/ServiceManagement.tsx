// src/components/Admin/ServiceManagement.tsx

import {
  useAddServiceMutation,
  useDeleteServiceMutation,
  useGetServicesQuery,
  useUpdateServiceMutation,
} from "@/redux/api/servicesApi";
import { useState } from "react";

const ServiceManagement = () => {
  const { data: services = [], isLoading } = useGetServicesQuery("");
  const [addService] = useAddServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);

  const handleAddService = async (newService) => {
    await addService(newService);
    setIsModalOpen(false);
  };

  const handleUpdateService = async (updatedService) => {
    await updateService(updatedService);
    setIsModalOpen(false);
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await deleteService(serviceId);
    }
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
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Duration</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td className="py-2 px-4 border-b">{service.name}</td>
                <td className="py-2 px-4 border-b">${service.price}</td>
                <td className="py-2 px-4 border-b">{service.duration} min</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-yellow-500 text-white py-1 px-2 rounded-lg mr-2"
                    onClick={() => openModal(service)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded-lg"
                    onClick={() => handleDeleteService(service._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {/* Your form for adding/updating service */}
        </Modal>
      )}
    </div>
  );
};

export default ServiceManagement;
