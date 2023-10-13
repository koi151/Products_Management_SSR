// Change product category status by button
const changeStatusButtons = document.querySelectorAll("[change-status-button]");
if (changeStatusButtons.length > 0) {
  statusButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const formChangeStatus = document.querySelector("#form-change-status");
      const path = formChangeStatus.getAttribute("data-path");

      const currentStatus = btn.getAttribute("data-status");
      const currentID = btn.getAttribute("data-id");
      
      const newStatus = currentStatus == "active" ? "inactive" : "active";
      const newAction = path + `/${newStatus}/${currentID}?_method=PATCH`;

      formChangeStatus.action = newAction; 
      formChangeStatus.submit();
    })
  })
} 

// Delete product by button
// const deleteButtons = document.querySelectorAll("[button-delete]");
// deleteButtons.forEach(btn => {
//   btn.addEventListener('click', () => {
//     console.log('CLICKED');
//   })
// })