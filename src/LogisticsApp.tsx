import { MapProvider } from "./context/map/MapProvider";
import { PackageProvider } from "./context/packages/PackageProvider";
import { PlacesProvider } from "./context/places/PlacesProvider";
import { HomeScreen } from "./screens/HomeScreen";

export const LogisticsApp = () => {
  return (
    <PlacesProvider>
      <PackageProvider>
        <MapProvider>
          <HomeScreen />
        </MapProvider>
      </PackageProvider>
    </PlacesProvider>
  );
};
