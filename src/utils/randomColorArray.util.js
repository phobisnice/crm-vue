function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomColor() {
  return `rgb(${+getRandomInt(0, 255)},${+getRandomInt(0, 255)},${+getRandomInt(
    0,
    255
  )})`;
}

function generateRandomRedColor() {
  return `rgb(255,${+getRandomInt(0, 255)},${+getRandomInt(0, 255)})`;
}

function generateRandomBlueColor() {
  return `rgb(${+getRandomInt(0, 255)},${+getRandomInt(0, 255)},255)`;
}

function generateRandomGreenColor() {
  return `rgb(${+getRandomInt(0, 255)},255,${+getRandomInt(0, 255)})`;
}

export default function generateColorArray(length, color) {
  const colorArray = [];
  let generate;

  switch (color) {
    case "red":
      generate = generateRandomRedColor;
      break;
    case "blue":
      generate = generateRandomBlueColor;
      break;
    case "gren":
      generate = generateRandomGreenColor;
      break;
    default:
      generate = generateRandomColor;
      break;
  }

  while (length) {
    colorArray.push(generate());
    length--;
  }

  return colorArray;
}
