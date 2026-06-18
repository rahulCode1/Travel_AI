import { Await, useLoaderData } from "react-router-dom";
import api from "../utils/api";
import TripDetails from "../component/TripDetails";
import { Suspense } from "react";
import TripSkeleton from "../component/load/TripSkeleton";

const TripDetailsPage = () => {
  const { trip } = useLoaderData();

  return (
    <Suspense fallback={<TripSkeleton />}>
      <Await resolve={trip}>
        {(isTripLoad) => <TripDetails trip={isTripLoad.trip} />}
      </Await>
    </Suspense>
  );
};

export default TripDetailsPage;

const trip = async (tripId) => {
  try {
    const res = await api.get(`/api/${tripId}/trip-details`);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const loader = async ({ params }) => {
  const tripId = params.id;

  return {
    trip: trip(tripId),
  };
};
