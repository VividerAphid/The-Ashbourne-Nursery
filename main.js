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
    for(plant in data.plants){
      let cardInfo = {title: data.plants[plant].name, subName: data.plants[plant].subName, 
                image: data.plants[plant].image, 
                description: data.plants[plant].description,
                sun: data.plants[plant].sun,
                type: data.plants[plant].type,
                containerFriendly: data.plants[plant].containerFriendly,
                parent: document.getElementById("testInfo")};
      buildCard(cardInfo);
    }
    for(supply in data.supplies){
      let cardInfo = {title: data.supplies[supply].name, 
                subName: "",
                image: data.supplies[supply].image, 
                description: "",
                parent: document.getElementById("testInfo")};
      buildCard(cardInfo);
    }
    for(extra in data.extra){
      let cardInfo = {title: data.extra[extra].name, 
                subName: "",
                image: data.extra[extra].image, 
                description: "",
                price: (data.extra[extra].price) ? data.extra[extra].price : undefined,
                parent: document.getElementById("testInfo")};
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
    let price = (props.price) ? props.price : "$0";
    let currentCard = addElement({type: "div", id: props.title+"Card", class: "card", parent: props.parent, innards:""});//Card body
    addElement({type:"div", id: props.title + "-title", class:"cardTitle", parent: currentCard, innards:props.title});//Card title
    addElement({type:"div", id: props.title + "subname", class:"cardSubname", parent: currentCard, innards: "<i>"+props.subName+"</i>"});//Card subname
    let cardImg = addElement({type:"img", id: props.title + "-picture", class:"cardPicture", parent:currentCard});//Card picture
    cardImg.src = (props.image) ? "/images/" + props.image : "ANLogo.png";
    if(props.sun){
      let cardSun = addElement({type:"img", id: props.title + "-sunIcon", parent:currentCard});//Card sun level
      cardSun.src = getIconImage(props.sun);
      configureIcon(cardSun);
    }
    if(props.type){
      let cardType = addElement({type:"img", id: props.title + "-typeIcon", parent:currentCard});//Card type
      cardType.src = getIconImage(props.type);
      configureIcon(cardType);
    }
    if(props.containerFriendly){
      let cardCont = addElement({type:"img", id: props.title + "-contIcon", parent:currentCard});//Card type
      cardCont.src = getIconImage("containerFriendly");
      configureIcon(cardCont);
    }
    addElement({type:"div", id: props.title + "-description", class:"cardDescription", parent:currentCard, innards:props.description});//Card info
    addElement({type:"div", id: props.title + "-price", class:"cardPrice", parent:currentCard, innards:price});//Card price
    return currentCard;
}

function configureIcon(icon){
  icon.width = 50;
  icon.height = 50;
}
function getIconImage(type){
  console.log("Checking for "+type);
    switch(type){
      case "Full sun":
        return "/icons/FullSun.png";
      case "Full sun to part shade":
        return "/icons/PartSun.png";
      case "Flower":
        return "/icons/TypeFlower.png";
      case "Herb":
        return "/icons/TypeHerb.png";
      case "Produce":
        return "/icons/TypeProduce.png";
      case "containerFriendly":
        return "/icons/ContainerFriendly.png";
    }
    console.log("type "+type+" not found");
    return "Uh oh!";
}