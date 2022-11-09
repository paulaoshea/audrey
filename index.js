/* Global Variables */
const numQuestions = 8;

const answerArr = [0, 3, 2, 1, 3, 3, 2, 3, 1];

const modal = document.querySelector(".modal");
const modalMessage = document.getElementById("modalMessage");

/* Add event listeners */
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", doResults);

const playAgainButton = document.getElementById("playAgainButton");
playAgainButton.addEventListener("click", clearFields);

const closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", toggleModal);

window.addEventListener("click", windowOnClick);

/* Clears text area*/
function clearFields() {
  let textArea = document.getElementById("resultsContainer");
  textArea.innerHTML = "";

  const radios = document.getElementsByTagName("input");
  for (i = 0; i < radios.length; i++) {
    if (radios[i].type == "radio" && radios[i].checked) {
      radios[i].checked = false;
    }
  }
}

function doResults() {
  document.getElementById("resultsContainer").innerHTML = "";
  /* First check if all the questions were answered */
  let valid = true;
  for (let i = 0; i < numQuestions; i++) {
    let radioButtonGroup = document.getElementsByName(`q${i + 1}`);
    if (
      !(
        radioButtonGroup[0].checked ||
        radioButtonGroup[1].checked ||
        radioButtonGroup[2].checked
      )
    ) {
      valid = false;
    }
  }
  if (!valid) {
    document.getElementById("resultsContainer").innerHTML =
      "Please answer all questions before submitting.";
  } else {
    calcTotal();
  }
}

function calcTotal() {
  let radioButtonGroup;
  let totalCorrect = 0;
  let answer = 0;
  for (let i = 1; i <= numQuestions; i++) {
    radioButtonGroup = document.getElementsByName(`q${i}`);
    answer = answerArr[i];
    if (radioButtonGroup[answer - 1].checked) {
      totalCorrect++;
    }
  }
  let resultsMessage = "";
  if (totalCorrect === numQuestions) {
    resultsMessage =
      "Are you Audrey's twin? Wow - you are almost exactly like Audrey!";
  } else if (totalCorrect > numQuestions - 4) {
    resultsMessage =
      "So close ... you're mostly like Audrey but not completely!";
  } else {
    resultsMessage = "Sadly, you are nothing like Audrey!";
  }
  modalMessage.innerHTML = resultsMessage;
  toggleModal();
}

/* Modal code below */
function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}
