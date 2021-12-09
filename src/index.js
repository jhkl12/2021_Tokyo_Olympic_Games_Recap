/* eslint-disable new-cap */
/* eslint-disable no-new */
import Data from "./scripts/data";
import Map from "./scripts/map";
import Modal from "./scripts/modal";

document.addEventListener("DOMContentLoaded", () => {
  new Map();
  new Data.countryComparison();
  const modal = new Modal();
  modal.render();
  const modalContainer = document.getElementById("about-modal-container");

  const aboutButton = document.getElementById("about-button");
  aboutButton.addEventListener("click", () => {
    modalContainer.id =
      modalContainer.id === "about-modal-container"
        ? "about-modal-container-clicked"
        : "about-modal-container";
  });
  const continueButton = document.getElementById("continue-button");
  continueButton.addEventListener("click", () => {
    modalContainer.id =
      modalContainer.id === "about-modal-container"
        ? "about-modal-container-clicked"
        : "about-modal-container";
  });
});
