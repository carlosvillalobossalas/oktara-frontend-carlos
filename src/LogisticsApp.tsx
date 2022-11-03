import { MapProvider } from "./context/map/MapProvider";
import { PlacesProvider } from "./context/places/PlacesProvider";
import { HomeScreen } from "./screens/HomeScreen";

export const LogisticsApp = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomeScreen />
      </MapProvider>
    </PlacesProvider>
  );
};
