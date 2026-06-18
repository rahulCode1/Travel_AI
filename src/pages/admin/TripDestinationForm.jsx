import { useState } from "react";
import { toast } from "react-toastify";

import privateApi from "../../utils/api";

const TripDestinationForm = ({ setModalOpen, revalidator }) => {
  const [userData, setFormData] = useState({
    destination: "",
    budget: "",
    days: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Adding destination...");

    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("destination", userData.destination);
      formData.append("days", userData.days);
      formData.append("budget", userData.budget);
      formData.append("image", image);
      const response = await privateApi.post("/api/top-destination", formData);

      setFormData({
        destination: "",
        budget: "",
        days: "",
      });
      setImage("");
      setModalOpen(false);
      revalidator.revalidate();
      toast.update(toastId, {
        render: response.data?.message || "Destination added successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      toast.update(toastId, {
        render: err.response?.data?.message || "Failed to add destinations",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.log(err.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-slate-900 rounded-2xl p-3 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Destination */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Destination
            </label>

            <input
              type="text"
              name="destination"
              value={userData.destination}
              onChange={handleChange}
              placeholder="Paris"
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          {/* Image  */}
          <div>
            <label
              className="block text-sm text-slate-300 mb-2"
              htmlFor="image"
            >
              Destination Image
            </label>

            <input
              type="file"
              name="image"
              onChange={handleImageSelect}
              placeholder="Paris"
              required
              className="w-full px-4 py-3 bg-slate-800  rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">Budget</label>

            <input
              type="number"
              name="budget"
              value={userData.budget}
              onChange={handleChange}
              placeholder="50000"
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Days */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">Days</label>

            <input
              type="number"
              name="days"
              value={userData.days}
              onChange={handleChange}
              placeholder="5"
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-60 text-white font-medium py-3 rounded-lg transition"
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}

            {isLoading ? "Saving..." : "Add Destination"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TripDestinationForm;
