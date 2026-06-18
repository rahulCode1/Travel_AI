import TripDestinationForm from "./TripDestinationForm";
import Modal from "../../component/model/Modal";
import { useState } from "react";
import api from "../../utils/api";
import { useRouteLoaderData, useRevalidator } from "react-router-dom";
import DestinationsCard from "./DestinationsCard";

const AdminPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const revalidator = useRevalidator();
  const topDest = useRouteLoaderData("top_destnations");

  return (
    <main className="min-h-screen bg-slate-950">
      {isModalOpen && (
        <Modal text="Add Destination" onClose={() => setModalOpen(false)}>
          <TripDestinationForm
            setModalOpen={setModalOpen}
            revalidator={revalidator}
          />
        </Modal>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Top Destinations</h1>

            <p className="text-slate-400 mt-2">
              Manage featured destinations shown on the homepage.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="
              px-5
              py-3
              rounded-xl
              bg-cyan-600
              hover:bg-cyan-700
              text-white
              font-medium
              shadow-lg
              transition-all
              duration-300
            "
          >
            + Add Destination
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-5 py-3">
            <span className="text-2xl">🌍</span>

            <div>
              <p className="text-slate-400 text-sm">Total Destinations</p>

              <p className="text-white text-xl font-bold">
                {topDest?.destinations?.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <DestinationsCard
          destinations={topDest?.destinations}
          revalidator={revalidator}
        />
      </div>
    </main>
  );
};

export default AdminPage;

export const loader = async () => {
  try {
    const res = await api.get("/api/top-destination");

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
