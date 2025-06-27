console.log('Hello World');

// fetch(url);

// fetch('https://api.sampleapis.com/cartoons/cartoons2D')
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error("Error: ", error));

function fetchCartoons(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error: ", error));
}

fetchCartoons('https://api.sampleapis.com/cartoons/cartoons2D');

// Same request with async/await
async function getCartoonsAsync(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error: ", error);
  }
}

getCartoonsAsync('https://api.sampleapis.com/cartoons/cartoons3D');
