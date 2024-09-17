// filter (fe)
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  //   console.log(url);

  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        //searchParam va cac cau lệnh dưới giúp đoạn code có thể truy cập đến path bộ lọc mới !!
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
//end-filter

//search-form (fe)

const formSearch = document.querySelector("#form-search");
if (formSearch) {
  const url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      //searchParam va cac cau lệnh dưới giúp đoạn code có thể truy cập đến path bộ lọc mới !!
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
//end search form

//pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination.length > 0) {
  const url = new URL(window.location.href);
  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      if (page) {
        url.searchParams.set("page", page);
      } else {
        url.searchParams.delete("page");
      }
      window.location.href = url.href;
    });
  });
}
//end-pagination

//show-alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
//end show-alert
//uploaded-preview
const formPreview = document.querySelector("[form-preview]");
if (formPreview) {
  const imgUploaded = document.querySelector("[img-uploaded]");
  const imgPreview = document.querySelector("[img-preview]");

  imgUploaded.addEventListener("change", (e) => {
    const [file] = e.target.files;
    if (file) {
      imgPreview.src = URL.createObjectURL(file);
      // imgPreview.style.display = "block"; // Hiển thị ảnh
    }

    // Nếu ảnh có src, thêm nút "X"
    if (imgPreview.src) {
      let removeBtn = document.querySelector(".btn-remove"); // Kiểm tra xem nút đã tồn tại chưa
      if (!removeBtn) {
        // Nếu chưa có nút, tạo mới
        removeBtn = document.createElement("button"); // Tạo nút
        removeBtn.className = "btn-remove";
        removeBtn.textContent = "X";
        formPreview.appendChild(removeBtn); // Thêm nút vào formPreview
        removeBtn.addEventListener("click", () => {
          imgUploaded.value = "";
          imgPreview.src = "";
          removeBtn.remove();
        });
      }
    }
  });
}
