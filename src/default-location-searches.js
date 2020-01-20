import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-canada',
    predictionPlace: {
      address: 'Canada',
      bounds: new LatLngBounds(
        new LatLng(86.553514, -47.932547),
        new LatLng(41.6735625916635, -141.10275)
      ),
    },
  },
  {
    id: 'default-usa',
    predictionPlace: {
      address: 'United States of America',
      bounds: new LatLngBounds(new LatLng(71.540724, -66.885444), new LatLng(18.765563, -179.9)),
    },
  },
];
