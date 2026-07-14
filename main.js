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
      // let tile = addElement(plant+"Tile", "div", document.getElementById("testInfo"), data.plants[plant].name);
      // let img = addElement(plant+"Img", "img", document.getElementById(plant+"Tile"));
      // img.src = "/images/" + data.plants[plant].image;
      // img.width = 200;
      // img.height = 200;
      let cardInfo = {title: data.plants[plant].name, subName: data.plants[plant].subName, 
                image: data.plants[plant].image, 
                description: data.plants[plant].description, 
                parent: document.getElementById("testInfo")};
      //console.log(cardInfo);
      buildCard(cardInfo);
    }
   
}

function addElement(properties){
  //console.log(properties);
	var child = document.createElement(properties.type);
	child.id = properties.id;
  child.className = properties.class;
	properties.parent.appendChild(child);
	child.innerHTML = properties.innards;
    return child;
}

function buildCard(props){
    //Takes in title, desc, parent
    //console.log(props);
    let currentCard = addElement({type: "div", id: props.title+"Card", class: "card", parent: props.parent, innards:""});//Card body
    addElement({type:"div", id: props.title + "-title", class:"cardTitle", parent: currentCard, innards:props.title});//Card title
    addElement({type:"div", id: props.title + "-title", class:"cardSubname", parent: currentCard, innards: "<i>"+props.subName+"</i>"});//Card subname
    let cardImg = addElement({type:"img", id: props.title + "-picture", class:"cardPicture", parent:currentCard});//Card picture
    cardImg.src = "/images/" + props.image;
    addElement({type:"div", id: props.title + "-description", class:"cardDescription", parent:currentCard, innards:props.description});//Card info
    return currentCard;
}