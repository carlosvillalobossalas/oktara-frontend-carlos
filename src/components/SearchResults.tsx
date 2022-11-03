import { useContext } from "react";
import { PackagesContext } from "../context/packages/PackagesContext";
import { Feature } from "../interfaces/places";

export const SearchResults = () => {
  const { places, isLoadingPlaces } = useContext(PackagesContext);

  const onPlaceClicked = (place: Feature) => {
    console.log(place);
    const [lng, lat] = place.center;
  };

  if (isLoadingPlaces) {
    return <>Loading</>;
  }

  if (places.length === 0) {
    return <></>;
  }
  return (
    <ul className="list-group mt-3">
      {places?.map((place) => (
        <li className={`list-group-item list-group-item-action`} key={place.id}>
          <h6>{place.text_es}</h6>
          <p style={{ fontSize: "12px" }}>{place.place_name}</p>
          <button
            className={`btn btn-sm btn-outline-primary`}
            onClick={() => {
              console.log(onPlaceClicked(place));
            }}
          >
            Select location
          </button>
        </li>
      ))}
    </ul>
  );
};
