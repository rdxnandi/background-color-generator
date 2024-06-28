const button = document.querySelector("#change");
const output = document.querySelector("#outputHex");
let isCopying = false;

// ******hex*********
const changeColor = () => {
  const hex = "0123456789ABCDEF";
  let color = "#";
  let length = 6;
  for (let i = 0; i < length; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  return color;
};

// ********HSL**********
function changeColorHSL() {
  return `hsl(${~~(360 * Math.random())}, 72%, 72%)`;
}

// ********RGB************
const changeColorRGB = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

document.getElementById("change").addEventListener("click", () => {
  const newHexColor = changeColor();
  const newHSLColor = changeColorHSL();
  const newRGBColor = changeColorRGB();

  document.getElementById("outputHex").value = newHexColor;
  document.getElementById("outputHSL").value = newHSLColor;
  document.getElementById("outputRGB").value = newRGBColor;

  document.querySelector(".color-box").style.backgroundColor = newHexColor;
});

// Transition in color-box
const setGradient = (newColor) => {
  const colorBox = document.querySelector(".color-box");
  const currentColor = window.getComputedStyle(body).backgroundColor;
  colorBox.style.background = `linear-gradient(45deg, ${currentColor}, ${newColor})`;
  colorBox.style.transition = "background 0.3s ease-in";
};

// Updates colors by indivitualy
document.getElementById("outputHex").addEventListener("keyup", updateValues);
document.getElementById("outputHSL").addEventListener("keyup", updateValues);
document.getElementById("outputRGB").addEventListener("keyup", updateValues);

function updateValues(e) {
  if (isCopying) return;

  const colors = e.target.value;
  if (
    colors &&
    (changeColor(colors) || changeColorHSL(colors) || changeColorRGB(colors))
  ) {
    document.querySelector(".color-box").style.backgroundColor = colors;
  }
}

// Copy button
document.querySelectorAll("button[id^='copy']").forEach((button) => {
  console.log(button);
  button.addEventListener("click", copyButton);
});

function copyButton(e) {
  const targetId = e.target.getAttribute("data-target");
  console.log(targetId);
  const copyText = document.getElementById(targetId).value;
  console.log(copyText);

  isCopying = true;

  navigator.clipboard
    .writeText(copyText)
    .then(() => {
      console.log(`${copyText} copied to clipboard`);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    })
    .finally(() => {
      isCopying = false;
    });
}
