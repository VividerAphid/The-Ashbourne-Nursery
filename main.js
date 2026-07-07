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
    //console.log(data);
    for(plant in data.plants){
      let tile = addElement(plant+"Tile", "div", document.getElementById("testInfo"), data.plants[plant].name);
      let img = addElement(plant+"Img", "img", document.getElementById(plant+"Tile"));
      img.src = "/images/" + data.plants[plant].image;
      img.width = 200;
      img.height = 200;
    }
   
}

function addElement(id, type, parent, innards){
	var child = document.createElement(type);
	child.id = id;
	parent.appendChild(child);
	child.innerHTML = innards || "";
    return child;
}