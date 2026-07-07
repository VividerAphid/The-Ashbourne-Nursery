async function getItemListings() {
  const url = "itemListings.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    //console.log(result);
    console.log("load success");
    data = result;
    updateUI();
  } catch (error) {
    console.error(error.message);
  }
}

function updateUI(){
    console.log(data);
}