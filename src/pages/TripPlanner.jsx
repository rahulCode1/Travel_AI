import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import TripPlan from "../component/TripPlan";
import useTravelContext from "../context/TravelContext";
import { toast } from "react-toastify";
import TripForm from "../component/TripForm";
import styles from "./TripPlanner.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import TripSkeleton from "../component/load/TripSkeleton";
import {
  topVisitedDestinations,
  travelCategories,
  destinations,
} from "../utils/data";
import { useSearchParams } from "react-router-dom";

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
  const [showDestinations, setShowDestination] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { trip, setTrip } = useTravelContext();
  const topDestRef = useRef();
  const categoryRef = useRef();
  const selectedCategory = searchParams.get("category") || "";
  const filterDestinations = useMemo(
    () => destinations.filter((dest) => dest.category === selectedCategory),
    [selectedCategory],
  );

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
      toast.update(toastId, {
        autoClose: 4000,
        render: "Travel plan created successfully",
        type: "success",
        isLoading: false,
      });
    } catch (err) {
      console.log(err.response?.data?.message);
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
      console.log(err.response?.data?.message);
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

  const handleSelectCategoryAndShowDestinations = (category, key, value) => {
    handleSearchParams(key, value);
    setShowDestination(true);
  };

  const handleSearchParams = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    return setSearchParams(params);
  };

  const handleScroll = (ref, direction) => {
    if (!ref.current) return;

    ref.current.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  return (
    <main className={`${styles.main}`}>
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

      <div className="my-5">
        <h3 className="text-white text-2xl font-bold mb-5 border-l-4 border-cyan-400 pl-3">
          Top 10 Places Must Visit
        </h3>

        <div className="relative">
          <button
            onClick={() => handleScroll(topDestRef, "left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-black/70 text-white "
          >
            ←
          </button>

          <button
            onClick={() => handleScroll(topDestRef, "right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-black/70 text-white"
          >
            →
          </button>

          <div
            ref={topDestRef}
            className={`${styles.scrollbarHide} flex overflow-x-auto gap-2 md:gap-3 pb-4`}
          >
            {topVisitedDestinations.map((tripDestination) => (
              <div
                key={tripDestination.id}
                className="shrink-0 cursor-pointer mt-3 ms-2"
                onClick={(e) =>
                  handleSelectDestinationAndFind(
                    tripDestination.name,
                    tripDestination.days,
                    tripDestination.budget,
                  )
                }
              >
                <div
                  className={`
            relative
            w-52
            h-52
            md:w-64
            md:h-64
            overflow-hidden
            rounded-2xl
            transition-all
            duration-300

      
            ${
              destination === tripDestination.name
                ? "border-2 border-cyan-400 shadow-xl shadow-cyan-500/50 scale-105"
                : "border border-gray-700"
            }
          `}
                >
                  <LazyLoadImage
                    loading="lazy"
                    decoding="async"
                    src={tripDestination.image}
                    alt={tripDestination.name}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="text-white font-semibold text-sm md:text-base">
                      {tripDestination.name}
                    </h4>

                    <div className="flex justify-between mt-2 text-xs text-gray-300">
                      <span>{tripDestination.days} Days</span>
                      <span>₹{tripDestination.budget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-8">
        <h3 className="text-white text-xl md:text-2xl font-bold mb-4 border-l-4 border-cyan-400 pl-3">
          Travel by Category
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

          {/* Categories */}
          <div
            ref={categoryRef}
            className={`${styles.scrollbarHide} flex overflow-x-auto gap-3 pb-3 px-1`}
          >
            {travelCategories.map((category) => (
              <div
                key={category.id}
                className="shrink-0 cursor-pointer"
                onClick={() =>
                  handleSelectCategoryAndShowDestinations(
                    category.name,
                    "category",
                    category.name,
                  )
                }
              >
                <div
                  className={`
              relative
              mt-2
              w-32
              h-24
              sm:w-36
              sm:h-28
              md:w-40
              md:h-28
              overflow-hidden
              rounded-xl
              transition-all
              duration-300
              ${
                selectedCategory === category.name
                  ? "border-2 border-cyan-400 shadow-lg shadow-cyan-500/40 scale-105"
                  : "border border-gray-700"
              }
            `}
                >
                  <LazyLoadImage
                    loading="lazy"
                    decoding="async"
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="absolute bottom-2 left-2 right-2">
                    <h4 className="text-white text-xs sm:text-sm font-medium text-center">
                      {category.name}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Destinations */}
        {showDestinations && (
          <div className="mt-8">
            <div className="mb-5">
              <h4 className="text-cyan-400 text-lg md:text-xl font-semibold text-center">
                {selectedCategory}
              </h4>
            </div>

            <div
              className={`
          ${styles.scrollbarHide}
          flex
          flex-wrap
          justify-center
          gap-3
        `}
            >
              {filterDestinations.map((travelDest) => (
                <div
                  key={travelDest.id}
                  onClick={() =>
                    handleSelectDestinationAndFind(
                      travelDest.name,
                      travelDest.days,
                      travelDest.budget,
                    )
                  }
                  className={`
                    mt-2
              cursor-pointer
              relative
              overflow-hidden
              rounded-xl
              transition-all
              duration-300
              w-[48%]
              sm:w-[31%]
              lg:w-[23%]
              h-24
              sm:h-28
              ${
                destination === travelDest.name
                  ? "border-2 border-cyan-400 shadow-lg shadow-cyan-500/40 scale-105"
                  : "border border-gray-700"
              }
            `}
                >
                  <LazyLoadImage
                    src={`${travelDest.image}?auto=format&fm=webp&fit=crop&w=500&q=75`}
                    alt={travelDest.name}
                    threshold={200}
                    width="100%"
                    height="100%"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="absolute bottom-2 left-2 right-2">
                    <h5 className="text-white font-medium text-xs sm:text-sm truncate">
                      {travelDest.name}
                    </h5>

                    <div className="flex justify-between mt-1 text-[10px] sm:text-xs text-gray-300">
                      <span>{travelDest.days} Days</span>
                      <span>₹{travelDest.budget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isLoading && <TripSkeleton />}
      {!isLoading && trip && (
        <TripPlan
          trip={trip}
          isTripSaved={isTripSaved}
          setTripSaved={setTripSaved}
        />
      )}
    </main>
  );
};

export default TripPlanner;
