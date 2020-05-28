// Code for the country selection object

// VARIABLES
let inputField;

// Adds the event listeners to the DOM objects
function refresh(){

  // Initializations
  inputField = document.querySelector('.country');
  let dropdown = document.querySelector('.country_list');
  let dropdownArray = [... document.querySelectorAll('li')];
  inputField.value = "GLOBAL";


  let valueArray = [];
  dropdownArray.forEach(item => {
    valueArray.push(item.textContent);
  });

  // To close the dropdown menu
  const closeDropdown = () => {
    dropdown.classList.remove('open');
  }

  // When the user writes in the search field
  inputField.addEventListener('input', () => {
    dropdown.classList.add('open');
    let inputValue = inputField.value.toLowerCase();
    let valueSubstring;
    if (inputValue.length > 0) {
      for (let j = 0; j < valueArray.length; j++) {
        if (!(inputValue.substring(0, inputValue.length) === valueArray[j].substring(0, inputValue.length).toLowerCase())) {
          dropdownArray[j].classList.add('closed');
        } else {
          dropdownArray[j].classList.remove('closed');
        }
      }
    } else {
      for (let i = 0; i < dropdownArray.length; i++) {
        dropdownArray[i].classList.remove('closed');
      }
    }
  });

  // When the user clicks on one of the items
  dropdownArray.forEach(item => {
    item.addEventListener('click', (evt) => {
      inputField.value = item.textContent;
      dropdownArray.forEach(dropdown => {
        dropdown.classList.add('closed');
      });
      // Update the bar plot based on the current question and chosen country
      update_bar_plot(current_question_id, inputField.value);
    });
  })

  // When the user clicks on the search bar
  inputField.addEventListener('focus', () => {
     inputField.placeholder = 'Type to filter';
     dropdown.classList.add('open');
     dropdownArray.forEach(dropdown => {
       dropdown.classList.remove('closed');
     });
  });


  // When the user doesn't focus on the search bar
  inputField.addEventListener('blur', () => {
    inputField.placeholder = 'Select country';
    dropdown.classList.remove('open');
  });

  // When the user clicks outside of the search bar while he was focusing it
  document.addEventListener('click', (evt) => {
    const isDropdown = dropdown.contains(evt.target);
    const isInput = inputField.contains(evt.target);
    if (!isDropdown && !isInput) {
      dropdown.classList.remove('open');
    }
  });
};

function get_search_value(){
  return inputField.value;
}
