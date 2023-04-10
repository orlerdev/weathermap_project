// function reformatDate(date) {
//     let today = new Date();
//     let year = today.getFullyYear();
//     let dateParts = date.split(" ");
//     let month = dateParts[1].split("/")[0];
//     let day = dateParts[1].split("/")[1];
//     let newDateString = `${month}/${day}/${year}`;
//     if (month === 12 && today.getMonth() === 0) {
//         year -= 1;
//         newDateString = `${month}/${day}/${year}`;
//     }
//     return newDateString;
// }

function formatCurrency(num, lang = "en", country = "US", style = "currency", currency = "USD") {
    return parseFloat(num).toLocaleString(`${lang}-${country}`, { style: style, currency: currency });
}

export function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function removeDuplicates(arr) {
    if (!Array.isArray(arr)) {
        return [...new Set(arr)];
    }
}

const setStylesOnElement = function (styles, element) {
    Object.assign(element.style, styles);
};

function debounce(func, delay) {
  let timer;
  return function(...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
}