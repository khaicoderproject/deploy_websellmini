//change status
const changeStatus = document.querySelectorAll("[button-change-status]");
if (changeStatus.length > 0) {
  const changeFormStatus = document.querySelector("#form-change-status");

  if (changeFormStatus) {
    const path = changeFormStatus.getAttribute("data-path");
    changeStatus.forEach((button) => {
      button.addEventListener("click", () => {
        const status = button.getAttribute("status");
        const id = button.getAttribute("id");
        const changeStatus = status == "active" ? "inactive" : "active";
        const actions = path + `/${changeStatus}/${id}?_method=PATCH`;
        changeFormStatus.action = actions;
        changeFormStatus.submit();
      });
    });
  }
}
//end change status

//change multi status
const changeMultiStatus = document.querySelector("[checkbox-multi]");
if (changeMultiStatus) {
  const checkall = changeMultiStatus.querySelector("input[name='checkall']"); //ten name
  const inputIds = changeMultiStatus.querySelectorAll("input[name='id']"); //ten name
  checkall.addEventListener("click", () => {
    if (checkall.checked) {
      inputIds.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputIds.forEach((input) => {
        input.checked = false;
      });
    }
  });
  inputIds.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = changeMultiStatus.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      if (countChecked == inputIds.length) {
        checkall.checked = true;
      } else {
        checkall.checked = false;
      }
    });
  });
}
//end change multi status

//form change status

const formChangeStatus = document.querySelector("[form-change-multi]");
if (formChangeStatus) {
  formChangeStatus.addEventListener("submit", (e) => {
    e.preventDefault(); //ngăn chặn hành động mặc định

    const changeMultiStatus = document.querySelector("[checkbox-multi]");
    const inputChecked = changeMultiStatus.querySelectorAll(
      "input[name='id']:checked"
    );
    const value = e.target.elements.type.value;
    if (value == "delete") {
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?");
      if (!isConfirm) {
        return;
      }
    }
    if (inputChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeStatus.querySelector("input[name='ids']");
      inputChecked.forEach((input) => {
        const id = input.value;
        if (value == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;
          console.log(`${id}-${position}`);
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });
      inputIds.value = ids.join(", ");
      formChangeStatus.submit();
    } else {
      alert("Chọn nhiều hơn 1 bản ghi!");
    }
  });
}

//end form change status

//delete item
const deleteStatus = document.querySelectorAll("[button-delete]");
if (deleteStatus.length > 0) {
  const deleteForm = document.querySelector("#delete-status");
  if (deleteForm) {
    const path = deleteForm.getAttribute("data-path");
    const get = deleteForm.getAttribute("action");
    deleteStatus.forEach((button) => {
      button.addEventListener("click", () => {
        const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?");
        if (isConfirm) {
          const item = button.getAttribute("data-id");
          const action = path + `/${item}?_method=DELETE`;
          deleteForm.action = action;
          deleteForm.submit(); //gui len tren server
        }
      });
    });
  }
}
//end delete item

// sort
const sort = document.querySelector("[sort]");
if (sort) {
  const sortSelect = sort.querySelector("[sort-selected]");
  const sortButton = sort.querySelector("[sort-clear]");
  const url = new URL(window.location.href);
  sortSelect.addEventListener("change", (e) => {
    console.log(e.target.value);
    const sortValue = e.target.value;
    const [key, value] = sortValue.split("-");
    url.searchParams.set("sortKey", key);
    url.searchParams.set("sortValue", value);
    console.log(url);
    console.log(window);
    window.location.href = url.href;
  });
  //clear
  sortButton.addEventListener("click", () => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
    window.location.href = url.href;
  });
  //selected
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");
  if (sortKey && sortValue) {
    const sortString = `${sortKey}-${sortValue}`;
    const getSort = sort.querySelector(`option[value=${sortString}]`);
    getSort.selected = true;
  }
}

//end sort
