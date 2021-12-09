class Modal {
  render() {
    const modalContainer = document.createElement("div");
    modalContainer.id = "about-modal-container";

    const modal = document.createElement("div");
    modal.id = "about-modal";
    modalContainer.append(modal);

    const header = document.createElement("h2");
    header.innerText = "Welcome to the 2021 Olympic Games Recap";

    const instructions = document.createElement("p");
    instructions.innerText =
      "This project is a data visualization of the Olympic medals won around the world for the 2021 Tokyo Olympic games.";

    const featureOne = document.createElement("li");
    featureOne.innerText =
      "Countries that have won more medals will be colored darker than those with less medals.";
    const featureTwo = document.createElement("li");
    featureTwo.innerText =
      "Hover over a country to see the amount of gold, silver, and bronze medals that country has won";
    const featureThree = document.createElement("li");
    featureThree.innerText =
      "Click on a country to see both the medal distribution and athelete(s) participating for that country.";
    const featureList = document.createElement("ul");
    featureList.append(featureOne, featureTwo, featureThree);

    const instructionsContainer = document.createElement("div");
    instructionsContainer.append(instructions, featureList);

    const continueButton = document.createElement("div");
    continueButton.innerText = "Go to the Data";
    continueButton.id = "continue-button";

    const body = document.getElementsByTagName("body")[0];
    body.appendChild(modalContainer);

    modal.append(header, instructionsContainer, continueButton);

    return modal;
  }
}

export default Modal;
