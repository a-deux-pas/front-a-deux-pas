export const environment = {
  production: false,
  mapboxToken: '${{ secrets.MAPBOX_ACCESS_TOKEN }}',
  stripeToken: '${{ secrets.STRIPE_TOKEN }}',
  apiUrl: 'http://localhost:8081/api'
};
