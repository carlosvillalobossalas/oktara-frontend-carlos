import { MapProvider } from "./context/map/MapProvider";
import { PackagesProvider } from "./context/packages/PackagesProvider";
import { HomeScreen } from "./screens/HomeScreen";

export const LogisticsApp = () => {
  return (
    <PackagesProvider>
      <MapProvider>
        <HomeScreen />
      </MapProvider>
    </PackagesProvider>
  );
};
