import { useState } from "react";
import { toast } from "react-toastify";

import privateApi from "../../utils/api";

const UpdateDestination = ({
  setShowEditModal,
  revalidator,
  formData,
  setFormData,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Updating destination...");

    try {
      setIsLoading(true);
      const data = new FormData(e.target);
      const destinationData = Object.fromEntries(data);

      const response = await privateApi.patch(
        `/api/top-destination/${formData.id}`,
        destinationData,
      );

      setFormData({
        destination: "",
        budget: "",
        days: "",
      });

      setShowEditModal(false);
      revalidator.revalidate();
      toast.update(toastId, {
        render: response.data?.message || "Destination update successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      toast.update(toastId, {
        render: err.response?.data?.message || "Failed to update destinations",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.log("Error:", err);
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
              value={formData.destination}
              onChange={handleChange}
              placeholder="Paris"
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">Budget</label>

            <input
              type="number"
              name="budget"
              value={formData.budget}
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
              value={formData.days}
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

            {isLoading ? "Saving..." : "Update Destination"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDestination;
