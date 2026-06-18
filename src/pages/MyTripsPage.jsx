import api from "../utils/api";
import MyTrips from "../component/MyTrips";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import MyTripsSkeleton from "../component/load/MyTripsSkeleton";

const MyTripsPage = () => {
  const { trips } = useLoaderData();

  return (
    <>
      <Suspense fallback={<MyTripsSkeleton />}>
        <Await resolve={trips}>
          {(isTripsLoad) => <MyTrips trips={isTripsLoad.savedTrips} />}
        </Await>
      </Suspense>
    </>
  );
};

export default MyTripsPage;

const trips = async () => {
  try {
    const res = await api.get("/api/saved-trip");

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const loader = async ({ req }) => {
  return {
    trips: trips(),
  };
};
