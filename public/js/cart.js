// //Cap nhap quantity cart
const inputsQuantity = document.querySelectorAll("input[name=quantityCart]");
if (inputsQuantity.length > 0) {
  inputsQuantity.forEach((input) => {
    const inputId = input.getAttribute("item-id");
    input.addEventListener("change", () => {
      const quantity = input.value; // neu da hieu ro ve e.target co the su dung input.value luon, vi can ban no tra ve value
      console.log(inputId, quantity);
      window.location.href = `/cart/update/${inputId}/${quantity}`;
    });
  });
}
// //End cap nhap quantity cart

// document.addEventListener("DOMContentLoaded", function () {
//   const inputsQuantity = document.querySelectorAll("input[name=quantity]");

//   if (inputsQuantity.length > 0) {
//     inputsQuantity.forEach((input) => {
//       const inputId = input.getAttribute("item-id");

//       input.addEventListener("change", async () => {
//         const quantity = input.value;
//         try {
//           const response = await fetch(`/cart/update/${inputId}/${quantity}`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ quantity }),
//           });

//           if (!response.ok) {
//             throw new Error("Có lỗi xảy ra khi cập nhật giỏ hàng");
//           }

//           // Optionally update UI or show a message
//           alert("Giỏ hàng đã được cập nhật!");
//         } catch (error) {
//           console.error(error);
//           alert("Không thể cập nhật giỏ hàng, vui lòng thử lại.");
//         }
//       });
//     });
//   }
// });
