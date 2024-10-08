/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useCreateSlotMutation,
  useGetSlotsQuery,
  useUpdateSlotMutation,
} from "@/redux/api/SlotApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { useGetAllServicesQuery } from "@/redux/api/servicesApi";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { useAppSelector } from "@/redux/hooks";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

export enum SlotStatus {
  AVAILABLE = "available",
  BOOKED = "booked",
  CANCELLED = "cancelled",
}

const SlotManagement = () => {
  const { data: slots, refetch } = useGetSlotsQuery(undefined);
  const [updateSlot] = useUpdateSlotMutation();
  const [createSlot] = useCreateSlotMutation();
  const { data: services } = useGetAllServicesQuery(undefined);
  const { token } = useAppSelector((state) => state.user);

  const [service, setService] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!service || !date || !startTime || !endTime) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    const slotDetails = {
      service,
      date,
      startTime,
      endTime,
    };

    try {
      await createSlot({ slotDetails, token }).unwrap();
      setIsModalOpen(false); // Close the modal
      Swal.fire({
        title: "Success!",
        text: "Slot created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      refetch();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error creating the slot.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleUpdateSlotStatus = async (
    slotId: string,
    newStatus: SlotStatus
  ) => {
    const slot = slots?.data?.find((slot: any) => slot._id === slotId);
    if (slot && slot.isBooked !== SlotStatus.BOOKED) {
      try {
        await updateSlot({ id: slotId, isBooked: newStatus, token }).unwrap();
        toast.success("Slot Status Updated Successfully");
        refetch();
      } catch (error) {
        console.error("Failed to update slot status:", error);
      }
    } else {
      alert("Cannot update a booked slot.");
    }
  };

  const getStatusColor = (status: SlotStatus) => {
    switch (status) {
      case SlotStatus.AVAILABLE:
        return "bg-green-100 text-green-800";
      case SlotStatus.BOOKED:
        return "bg-red-100 text-red-800";
      case SlotStatus.CANCELLED:
        return "bg-yellow-100 text-yellow-800";
      default:
        return "";
    }
  };

  return (
    <div className="p-4">
      <Helmet>
        <title>Slot Management - Car Washing</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-6">Slot Management</h1>

      {/* Create Slot Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsModalOpen(true)} className="mb-4">
            Create New Slot
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Slot</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="space-y-4">
              {/* Service Dropdown */}
              <Select
                value={service}
                onValueChange={(value) => setService(value)}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services?.data?.map((service: any) => (
                    <SelectItem key={service._id} value={service._id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="date"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <Input
                type="time"
                placeholder="Start Time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
              <Input
                type="time"
                placeholder="End Time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="mt-4">
                Create Slot
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Manage Slots */}
      <Table>
        <TableCaption>Manage the slots for your services.</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="px-4 py-2 text-center">Date</TableHead>
            <TableHead className="px-4 py-2 text-center">Start Time</TableHead>
            <TableHead className="px-4 py-2 text-center">End Time</TableHead>
            <TableHead className="px-4 py-2 text-center">Status</TableHead>
            <TableHead className="px-4 py-2 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slots?.data?.map((slot: any) => (
            <TableRow key={slot._id} className="border-b dark:text-white">
              <TableCell className="text-center px-4 py-2">
                {new Date(slot.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center px-4 py-2">
                {slot.startTime}
              </TableCell>
              <TableCell className="text-center px-4 py-2">
                {slot.endTime}
              </TableCell>
              <TableCell
                className={`px-4 py-2 text-center font-medium rounded-lg ${getStatusColor(
                  slot.isBooked
                )}`}
              >
                {slot.isBooked.charAt(0).toUpperCase() + slot.isBooked.slice(1)}
              </TableCell>
              <TableCell className="text-center px-4 py-2 space-x-2">
                <Button
                  disabled={slot.isBooked === SlotStatus.BOOKED}
                  onClick={() =>
                    handleUpdateSlotStatus(slot._id, SlotStatus.CANCELLED)
                  }
                >
                  Set Cancelled
                </Button>
                <Button
                  disabled={slot.isBooked === SlotStatus.BOOKED}
                  onClick={() =>
                    handleUpdateSlotStatus(slot._id, SlotStatus.AVAILABLE)
                  }
                >
                  Set Available
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SlotManagement;
