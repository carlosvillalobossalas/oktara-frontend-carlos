import { MapView } from "../components/MapView";
import { Navbar } from "../components/Navbar";
import { PackagesList } from "../components/PackagesList";

export const HomeScreen = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="map-container">
        <MapView />
        <PackagesList />
      </div>
    </div>
  );
};
