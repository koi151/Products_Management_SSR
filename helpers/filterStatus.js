module.exports = (query) => {
  let filterStatus = [
    {
      name: "All",
      status: "",
      class: ""
    },
    {
      name: "Active",
      status: "active",
      class: ""
    },
    {
      name: "Inactive",
      status: "inactive",
      class: ""
    }
  ]

  const curStatus = query.status || ""; // when filterStatus = undefined, curStatus = ""

// filterStatus init
  const curIndex = filterStatus.findIndex(item => {
    return item.status == curStatus;
  }) 
  filterStatus[curIndex].class = "active"; 

  return filterStatus;
}