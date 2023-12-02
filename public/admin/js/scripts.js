// ACTIVE BUTTONS
const buttonStatus = document.querySelectorAll("[button-status]");

if (buttonStatus) {
  buttonStatus.forEach(button => {
    button.addEventListener("click", () => {
      let url = new window.URL(window.location.href);
      const status = button.getAttribute("button-status");
      if (status != "")
        url.searchParams.set("status", status);
      else 
        url.searchParams.delete("status");
      window.location.href = url.href;
    })
  })
}

// INPUT SEARCH
const inputSearch = document.querySelector('#form-search');
if (inputSearch) {
  inputSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    let url = new window.URL(window.location.href);
    const value = e.target.keyword.value;
    if (value != "") {
      url.searchParams.set("keyword", value);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  })
}

// PAGINATION
const paginationButtons = document.querySelectorAll("[pagination-button]");
if (paginationButtons.length > 0) {
  let url = new window.URL(window.location.href);

  paginationButtons.forEach(button => {
    button.addEventListener('click', () => {
      const currentPage = button.getAttribute("pagination-button");

      url.searchParams.set('page', currentPage);
      window.location.href = url.href;
    })
  })
}

// CHANGE PRODUCT STATUS
const changeStatusButtons = document.querySelectorAll('[change-status-button]');
if (changeStatusButtons.length > 0) {
  changeStatusButtons.forEach(button => {
    button.addEventListener('click', () => {
      const formChangeStatus = document.querySelector("#form-change-status");
      const path = formChangeStatus.getAttribute("data-path");

      const currentStatus = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      const newStatus = currentStatus == 'active' ? 'inactive' : 'active';
      const newAction = path + `/${newStatus}/${id}?_method=PATCH`;

      formChangeStatus.action = newAction;
      formChangeStatus.submit();
    })
  })
}

// CHANGE MULTIPLE PRODUCTS ACTIVE STATUS
const checkBoxMulti = document.querySelector('[checkbox-multi]');
if (checkBoxMulti) {
  const inputCheckAll = checkBoxMulti.querySelector("input[name='checkall']");
  const inputIds = checkBoxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener('click',() => {
    if (inputCheckAll.checked) {
      inputIds.forEach(input => {
        input.checked = true;
      })
    } else {
      inputIds.forEach(input => {
        input.checked = false;
      })
    }
  })

  inputIds.forEach(input => {
    input.addEventListener('click', () => {
      const countChecker = checkBoxMulti.querySelectorAll("input[name='id']:checked").length;   
      if (inputIds.length == countChecker) {
        inputCheckAll.checked = true
      } else {
        inputCheckAll.checked = false
      }
    })
  })
}

// form-change-multi
const formChangeMulti = document.querySelector('[form-change-multi]');
if (formChangeMulti) {
  formChangeMulti.addEventListener('submit', (e) => {
    e.preventDefault();

    const checkBoxMulti = document.querySelector('[checkbox-multi]');
    const inputsChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked");

    const typeOfChange = e.target.elements.type.value;
    if (typeOfChange == 'delete-all') {
      const deleteConfirm = confirm('Are you sure to delete those products ?');
      if (!deleteConfirm) return; 
    }

    if (inputsChecked.length > 0) {
      let checkedIds = [] 
      const inputIds = formChangeMulti.querySelector("input[name='ids']"); 

      if (typeOfChange == 'change-position') {
        inputsChecked.forEach(input => {
          const position = input.closest('tr').querySelector("input[name='position']").value;
          checkedIds.push(`${input.value}-${position}`);
        })

      } else {
        inputsChecked.forEach(input => {
          checkedIds.push(input.value);
        })
      }
      
      inputIds.value = checkedIds.join(", ");
      formChangeMulti.submit();
    } else {
      alert('Please choose products to change active status')
    }
  })
}

// DELETE PRODUCT
const deleteButtons = document.querySelectorAll('[delete-button]');
if (deleteButtons.length > 0) {
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const confirmDelete = confirm('Are you sure you want to delete ?');
        if (confirmDelete) {
          const formDeleteItem = document.querySelector("#form-delete-item");
          const path = formDeleteItem.getAttribute("data-path");

          const id = button.getAttribute("data-id");
          const newAction = path + `/${id}?_method=DELETE`;

          formDeleteItem.action = newAction;
          formDeleteItem.submit();
        }
    })
  })
}

// SHOW ALERT
const showAlert = document.querySelector('[show-alert]');
if (showAlert) {
  const displayTime = parseInt(showAlert.getAttribute('alert-time')) || 3000;
  const closeAlert = document.querySelector('[close-alert]');

  setTimeout(() => {
    showAlert.classList.add('alert-hidden');
  }, displayTime)
  
  closeAlert.addEventListener('click', () => {
    showAlert.classList.add('alert-hidden');
  })
}

// UPLOAD IMAGE
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImageReview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
      const image = URL.createObjectURL(e.target.files[0]);
      console.log(image);
      uploadImageReview.src = image;
    }
  })
}

// SORTING PRODUCTS 
const sort = document.querySelector('[sort]');
if (sort) {
  let url = new URL(window.location.href);

  const sortSelected = sort.querySelector('[sort-select]');
  const sortClear = sort.querySelector('[sort-clear]');

  sortSelected.addEventListener('change', (e) => {
    const value = e.target.value
    const [sortKey, sortValue] = value.split('-');

    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);

    window.location.href = url.href
  })

  // Display default select
  const sortKeySelected = url.searchParams.get("sortKey");
  const sortValueSelected = url.searchParams.get("sortValue");

  if (sortKeySelected && sortValueSelected) {
    const sortString = `${sortKeySelected}-${sortValueSelected}`;
    const optionSelected = sort.querySelector(`option[value=${sortString}]`);
    optionSelected.selected = true;
  }

  // Remove sorting
  sortClear.addEventListener('click', () => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");

    window.location.href = url.href
  })
}