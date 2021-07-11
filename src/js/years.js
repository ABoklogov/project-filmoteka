export function getReleaseYear(data) {
  const years = data.map(elem => {
    // // if()
    // console.log(data);
    // console.log(elem.release_date);
    if (elem.release_date === "" || !elem.release_date) elem.release_date = '';
      return elem.release_date.slice(0, 4);
  });

  const arrayOfYears = document.querySelectorAll('.year-list');

  [...arrayOfYears].forEach((elem, index) => {
  elem.innerText = years[index]})
}
