export default (context, inject) => {
  const apiApptus = window.esalesAPI({
    market: "UK",
    clusterId: "wFE4AE5CF",
  });
  inject('apptusAPI', () => {
    return apiApptus;
  })
}