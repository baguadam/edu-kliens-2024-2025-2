/* eslint-disable react/prop-types */
import { createContext } from "react";
import useTracksService from "../hooks/useTracksService";

export const TrackServiceContext = createContext();

const TrackServiceProvider = ({ children }) => {
  const services = useTracksService();
  return <TrackServiceContext.Provider value={services}>{children}</TrackServiceContext.Provider>;
};

export default TrackServiceProvider;
