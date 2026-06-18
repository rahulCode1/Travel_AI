import axios from "axios";
import { useEffect, useRef, useState } from "react";
import TripPlan from "../component/TripPlan";
import useTravelContext from "../context/TravelContext";
import { toast } from "react-toastify";
import TripForm from "../component/TripForm";
import styles from "./TripPlanner.module.css";
import { useRouteLoaderData } from "react-router-dom";
import TripModal from "../component/model/TripModal";

const TripPlanner = () => {
  const initialState = {
    duration: "",
    budget: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isTripSaved, setTripSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const topPlaceToVisit = useRouteLoaderData("top_destnations")?.destinations;
  const { trip, setTrip } = useTravelContext();
  const categoryRef = useRef();

  const handleOnChange = (e) => {
    setFormData((prevStat) => ({
      ...prevStat,
      [e.target.name]: e.target.value,
    }));
  };

  const generateTrip = async ({ destination, duration, budget }) => {
    if (isLoading) {
      return;
    }

    const toastId = toast.loading("Generating trip...");
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/travel-planner`,
        {
          destination,
          duration,
          budget,
        },
      );

      setTrip(res.data?.trip);
      setShowModal(true);
      toast.update(toastId, {
        autoClose: 4000,
        render: "Travel plan created successfully",
        type: "success",
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
      toast.update(toastId, {
        autoClose: 4000,
        render: err.response?.data?.message || "Failed to create Travel plan.",
        type: "error",
        isLoading: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (trip) {
      setTrip("");
    }

    try {
      await generateTrip({
        destination,
        duration: formData.duration,
        budget: formData.budget,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleShowAutoSuggestion = async () => {
      if (isSelecting) {
        return;
      }
      if (!destination) {
        return setSuggestions([]);
      }

      const delay = setTimeout(async () => {
        const res = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${destination}.json?autocomplete=true&types=place,country&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`,
        );

        setSuggestions(res.data?.features);
      }, 500);

      return () => clearTimeout(delay);
    };

    handleShowAutoSuggestion();
  }, [destination, isSelecting]);

  const handleSetSuggestion = (suggestion) => {
    setDestination(suggestion);
    setSuggestions([]);
    setIsSelecting(true);
  };

  const removeTripAndSuggestion = () => {
    setDestination("");
    setSuggestions([]);
  };

  const handleSelectDestinationAndFind = async (travelDest, days, budget) => {
    if (isLoading) {
      return;
    }

    setDestination(travelDest);
    setFormData((prevStat) => ({
      ...prevStat,

      duration: days,
      budget,
    }));
    setIsSelecting(true);

    await generateTrip({
      destination: travelDest,
      duration: days,
      budget: budget,
    });
  };

  console.log(formData)

  const handleScroll = (ref, direction) => {
    if (!ref.current) return;

    ref.current.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  return (
    <>
      <main className={`${styles.main}`}>
        {showModal && trip ? (
          <TripModal text={"New trip"} onClose={() => setShowModal(false)}>
            <TripPlan
              trip={trip}
              isTripSaved={isTripSaved}
              setTripSaved={setTripSaved}
            />
          </TripModal>
        ) : (
          <p> no trip found </p>
        )}

        <div className={styles.container}>
          <div className={styles.planLayout}>
            <TripForm
              formData={formData}
              handleFormSubmit={handleFormSubmit}
              handleOnChange={handleOnChange}
              handleSetSuggestion={handleSetSuggestion}
              isLoading={isLoading}
              removeTripAndSuggestion={removeTripAndSuggestion}
              suggestions={suggestions}
              setIsSelecting={setIsSelecting}
              setDestination={setDestination}
              setSuggestions={setSuggestions}
              destination={destination}
            />
          </div>
        </div>

        {trip && !showModal && (
          <button
            style={{ maxWidth: "600px" }}
            onClick={() => setShowModal(true)}
            className="btn d-block mx-auto cursor-pointer bg-white my-3 w-100"
          >
            Show Generated trip
          </button>
        )}

        <div className="my-8">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-4 border-l-4 border-cyan-400 pl-3">
            Most visited place in wrold
          </h3>

          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => handleScroll(categoryRef, "left")}
              className="
        hidden md:flex
        absolute
        left-2
        top-1/2
        -translate-y-1/2
        z-20
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        bg-black/70
        text-white
        hover:bg-cyan-500
        transition
      "
            >
              ←
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => handleScroll(categoryRef, "right")}
              className="
        hidden md:flex
        absolute
        right-2
        top-1/2
        -translate-y-1/2
        z-20
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        bg-black/70
        text-white
        hover:bg-cyan-500
        transition
      "
            >
              →
            </button>

            {/* Top Place must visit */}
            <div
              ref={categoryRef}
              className={`${styles.scrollbarHide} flex overflow-x-auto gap-3 pb-3 px-1`}
            >
              {topPlaceToVisit.map((topDesti) => (
                <div
                  key={topDesti?.id}
                  className="
    relative
    mt-2
    w-52
    h-64
    flex-shrink-0
    overflow-hidden
    rounded-2xl
    cursor-pointer
    border border-white/10
    bg-slate-900
    shadow-lg
    hover:shadow-cyan-500/20
    hover:-translate-y-1
    transition-all
    duration-300
    group
  "
                  onClick={() =>
                    handleSelectDestinationAndFind(
                      topDesti.destination,
                      topDesti.days,
                      topDesti.budget,
                    )
                  }
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={topDesti?.imageUrl}
                    alt={topDesti?.destination}
                    className="
      w-full
      h-full
      object-cover
      transition-transform
      duration-700
      group-hover:scale-110
    "
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

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
                      {topDesti?.destination}
                    </h4>

                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-cyan-400 font-semibold text-base">
                        ₹{Number(topDesti?.budget).toLocaleString()}
                      </p>

                      <p className="text-white/70 text-sm">
                        {topDesti?.days} Days
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TripPlanner;
