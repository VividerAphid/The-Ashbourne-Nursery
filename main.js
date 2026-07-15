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
    addElement({type:"div", id: props.title + "-description", class:"cardDescription", parent:currentCard, innards:props.description});//Card info
    addElement({type:"div", id: props.title + "-price", class:"cardPrice", parent:currentCard, innards:price});//Card price
    return currentCard;
}