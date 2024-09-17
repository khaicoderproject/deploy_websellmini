module.exports = (query) => {
  let filterButton = [
    {
      content: "Tất cả",
      status: "",
      class: "",
    },
    {
      content: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      content: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];

  if (query.status) {
    //item.status la truy cap vao status trong object de so sanh dkien.
    const index = filterButton.findIndex((item) => item.status == query.status);
    filterButton[index].class = "active";
  } else {
    const index = filterButton.findIndex((item) => item.status == "");
    filterButton[index].class = "active";
  }
  return filterButton;
};
