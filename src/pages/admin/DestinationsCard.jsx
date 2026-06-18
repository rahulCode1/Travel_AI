import { useState } from "react";
import api from "../../utils/api";
import UpdateDestination from "./UpdateDestination";
import Modal from "../../component/model/Modal";

const DestinationsCard = ({
  destinations,
  revalidator,
  isModalOpen,
  setModalOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [destId, setDestId] = useState(null);
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    id: "",
    destination: "",
    days: "",
    budget: "",
  });

  const editDestination = (destination) => {
    setShowEditModal(true);
    setFormData((prevStat) => ({ ...prevStat, ...destination }));
  };

  const handleDeleteDestination = async (id) => {
    try {
      setIsLoading(true);
      setDestId(id);
      const res = await api.delete(`api/top-destination/${id}`);
      console.log(res.data);
      setDestId(null);
      revalidator.revalidate();
    } catch (err) {
      console.log(
        err?.response?.data?.message || "Failed to delete destination",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 px-3">
      {showEditModal && (
        <Modal
          text="Update destination"
          onClose={() => setShowEditModal(false)}
        >
          <UpdateDestination
            formData={formData}
            setFormData={setFormData}
            setShowEditModal={setShowEditModal}
            revalidator={revalidator}
          />
        </Modal>
      )}
      {destinations && destinations.length > 0 ? (
        destinations.map((dest) => (
          <div
            key={dest.id}
            className="
    relative
    w-60
    h-72
    overflow-hidden
    rounded-2xl
    border
    border-slate-800
    bg-slate-900
    shadow-xl
    hover:shadow-cyan-500/20
    hover:-translate-y-1
    transition-all
    duration-300
    group
  "
          >
            <img
              loading="lazy"
              decoding="async"
              src={dest?.imageUrl}
              alt={dest?.destination}
              className="
      w-full
      h-full
      object-cover
      transition-transform
      duration-700
      group-hover:scale-110
    "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* Edit */}
            {dest?.createdBy === userId && (
              <button
                onClick={() => editDestination(dest)}
                className="
      absolute
      top-3
      right-3
      h-9
      w-9
      rounded-full
      bg-black/60
      backdrop-blur
      flex
      items-center
      justify-center
      hover:bg-cyan-600
      transition
      text-white
    "
              >
                ✏️
              </button>
            )}

            {/* Delete */}
            {dest?.createdBy === userId && (
              <button
                disabled={isLoading && dest.id === destId}
                onClick={() => handleDeleteDestination(dest?.id)}
                className="
      absolute
      top-3
      left-3
      h-9
      w-9
      rounded-full
      bg-black/60
      backdrop-blur
      flex
      items-center
      justify-center
      hover:bg-red-600
      transition
      text-white
    "
              >
                {dest.id === destId && isLoading ? (
                  <span className="text-[10px]">...</span>
                ) : (
                  "🗑️"
                )}
              </button>
            )}

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4
                className="
        text-white
        text-lg
        font-bold
        leading-tight
        line-clamp-2
      "
              >
                {dest?.destination}
              </h4>

              <div className="mt-2 flex items-center justify-between">
                <p className="text-cyan-400 font-semibold text-base">
                  ₹{Number(dest?.budget).toLocaleString()}
                </p>

                <p className="text-white/70 text-sm">{dest?.days} Days</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No destinations found.</p>
      )}
    </div>
  );
};

export default DestinationsCard;
