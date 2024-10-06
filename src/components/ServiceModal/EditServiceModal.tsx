/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, FormEvent, useEffect } from "react";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useUpdateServiceMutation } from "@/redux/api/servicesApi";
import { useAppSelector } from "@/redux/hooks";
import axios from "axios";
import toast from "react-hot-toast";

interface EditServiceModalProps {
  service: {
    _id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    image: string; // URL of the image
  };
}

export function EditServiceModal({ service }: EditServiceModalProps) {
  const [name, setName] = useState(service.name);
  const [description, setDescription] = useState(service.description);
  const [price, setPrice] = useState<number | "">(service.price);
  const [duration, setDuration] = useState<number | "">(service.duration);
  const [image, setImage] = useState<File | null>(null); // Image file state
  const [uploading, setUploading] = useState(false); // State for upload progress
  const [isOpen, setIsOpen] = useState(false); // State to control modal open/close

  const [updateService] = useUpdateServiceMutation();
  const { token } = useAppSelector((state) => state.user);

  useEffect(() => {
    // Reset form values when the modal opens
    setName(service.name);
    setDescription(service.description);
    setPrice(service.price);
    setDuration(service.duration);
  }, [service]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const uploadImageToImgbb = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setUploading(true);
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            key: "68c40fc46fe61300befd1b168543a8b7",
            // key: process.env.NEXT_PUBLIC_IMGBB_API_KEY,
          },
        }
      );
      return response.data.data.url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !description || price === "" || duration === "") {
      alert("Please fill out all fields before submitting.");
      return;
    }

    let imageUrl = service.image; // Default to existing image URL
    if (image) {
      imageUrl = await uploadImageToImgbb(image);
      if (!imageUrl) {
        alert("Image upload failed. Please try again.");
        return;
      }
    }

    const updatedService = {
      name,
      description,
      price: Number(price),
      duration: Number(duration),
      image: imageUrl,
    };

    // console.log(updatedService);

    await updateService({ id: service._id, token, updatedService }).unwrap();
    toast.success("Service is Edited Successfully")
    // Close the modal after submission
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setIsOpen(true)} // Open the modal when button clicked
          className="bg-green-500 text-white py-1 px-3 rounded-lg mb-4"
        >
          Edit Service
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogDescription>
            Update the details of this service.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Service Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="col-span-3"
                type="number"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration (mins)
              </Label>
              <Input
                id="duration"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="col-span-3"
                type="number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "Update Service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
