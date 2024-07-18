const url = "http://localhost:8000/buy/getdata";
async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
  } catch (err) {
    throw new Error(err);
  }
  const displayArea = document.getElementById("card");
  console.log(displayArea);
}
fetchData();
