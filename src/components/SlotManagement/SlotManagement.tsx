import React, { useState } from "react";
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

export enum SlotStatus {
  AVAILABLE = "available",
  BOOKED = "booked",
  CANCELLED = "cancelled",
}

const SlotManagement = () => {
  const { data: slots, refetch } = useGetSlotsQuery(undefined);
  const [updateSlot] = useUpdateSlotMutation();
  const [createSlot] = useCreateSlotMutation();
  const [newSlot, setNewSlot] = useState({
    service: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    await createSlot(newSlot).unwrap();
    refetch();
  };

  const handleUpdateSlotStatus = async (slotId: string, newStatus: SlotStatus) => {
    const slot = slots?.data?.find((slot) => slot._id === slotId);
    if (slot?.isBooked !== SlotStatus.BOOKED) {
      await updateSlot({ id: slotId, status: newStatus }).unwrap();
      refetch();
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
      <h1 className="text-2xl font-bold mb-6">Slot Management</h1>
      <Table>
        <TableCaption>Manage the slots for your services.</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="px-4 py-2">Date</TableHead>
            <TableHead className="px-4 py-2">Start Time</TableHead>
            <TableHead className="px-4 py-2">End Time</TableHead>
            <TableHead className="px-4 py-2">Status</TableHead>
            <TableHead className="px-4 py-2">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slots?.data?.map((slot) => (
            <TableRow key={slot._id} className="border-b hover:bg-gray-50 my">
              <TableCell className="px-4 py-2">
                {new Date(slot.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="px-4 py-2">{slot.startTime}</TableCell>
              <TableCell className="px-4 py-2">{slot.endTime}</TableCell>
              <TableCell className={`px-4 py-2 font-medium rounded-lg ${getStatusColor(slot.isBooked)}`}>
                {slot.isBooked.charAt(0).toUpperCase() + slot.isBooked.slice(1)}
              </TableCell>
              <TableCell className="px-4 py-2 space-x-2">
                <Button
                  disabled={slot.isBooked === SlotStatus.BOOKED}
                  onClick={() => handleUpdateSlotStatus(slot._id, SlotStatus.AVAILABLE)}
                >
                  Set Available
                </Button>
                <Button
                  disabled={slot.isBooked === SlotStatus.BOOKED}
                  onClick={() => handleUpdateSlotStatus(slot._id, SlotStatus.CANCELLED)}
                >
                  Set Cancelled
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
