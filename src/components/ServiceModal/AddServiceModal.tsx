
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useAddServiceMutation } from "@/redux/api/servicesApi";
import { useAppSelector } from "@/redux/hooks";
import axios from "axios";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";

export function AddServiceModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [duration, setDuration] = useState<number | "">("");
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [addService] = useAddServiceMutation();
  const { token } = useAppSelector((state) => state.user);

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
  type Inputs = {
    name: string;
    description: string;
    image: string;
    price: string;
    duration: string;
  };

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // data.preventDefault();

    if (!name || !description || price === "" || duration === "") {
      alert("Please fill out all fields before submitting.");
      return;
    }

    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImageToImgbb(image);
      if (!imageUrl) {
        alert("Image upload failed. Please try again.");
        return;
      }
    }

    // const serviceDetails = {
    //   name,
    //   description,
    //   price: Number(price),
    //   duration: Number(duration),
    //   image: imageUrl,
    // };

    const serviceDetails = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      duration: Number(data.duration),
      image: imageUrl,
    };

    // console.log(serviceDetails);

    try {
      // Add the service
      await addService({ serviceDetails, token }).unwrap();

      // Close the modal after adding the service
      setIsOpen(false);

      // Reset form fields
      setName("");
      setDescription("");
      setPrice("");
      setDuration("");
      setImage(null);

      // Show success message
      toast.success("Service Added Successfully");
    } catch (error) {
      // Assuming the error might have a 'data' field with a 'message'
      const err = error as { data?: { message?: string } };

      if (err.data?.message === "This Service is Already Exist") {
        toast.error(
          "This Service already exists. Please choose a different name."
        );
      } else {
        // Generic error message for other cases
        toast.error("Failed to add service. Please try again.");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#30415A] text-white py-2 px-4 rounded-lg mb-4"
        >
          Add Service
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Service</DialogTitle>
          <DialogDescription>
            Fill out the details to add a new service.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Service Name
              </Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
              {/* {errors.name?.type === "required" && (
                <p className="text-red-500">Service name is required</p>
              )} */}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                id="image"
                type="file"
                {...register("image", { required: true })}
                accept="image/*"
                onChange={handleImageChange}
                className="col-span-3"
                required
              />
              {/* {errors.image?.type === "required" && (
                <p className="text-red-500">Service Image is required</p>
              )} */}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                {...register("description", { required: true })}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
              {/* {errors.description?.type === "required" && (
                <p className="text-red-500">Service Description is required</p>
              )} */}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                {...register("price", { required: true })}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="col-span-3"
                type="number"
              />
              {/* {errors.price?.type === "required" && (
                <p className="text-red-500">Service Price is required</p>
              )} */}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration (mins)
              </Label>
              <Input
                id="duration"
                {...register("duration", { required: true })}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="col-span-3"
                type="number"
              />
              {/* {errors.duration?.type === "required" && (
                <p className="text-red-500">Service Duration is required</p>
              )} */}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "Add Service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
