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
import { useState, FormEvent } from "react";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useAddServiceMutation } from "@/redux/api/servicesApi";
import { useAppSelector } from "@/redux/hooks";
import axios from "axios";

export function AddServiceModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [duration, setDuration] = useState<number | "">("");
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

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
            key: "9e4448d39c26b95842d329e17e2c0db3",
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

    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImageToImgbb(image);
      if (!imageUrl) {
        alert("Image upload failed. Please try again.");
        return;
      }
    }

    const serviceDetails = {
      name,
      description,
      price: Number(price),
      duration: Number(duration),
      image: imageUrl,
    };

    await addService({ serviceDetails, token }).unwrap();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4">
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
              {uploading ? "Uploading..." : "Add Service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
