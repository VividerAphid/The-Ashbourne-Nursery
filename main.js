async function getPlantListings() {
  const url = "plantListings.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    console.log(result.plants.testPlant.hardiness);
  } catch (error) {
    console.error(error.message);
  }
}