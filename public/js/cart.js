//Cap nhap quantity cart
const inputsQuantity = document.querySelectorAll("input[name=quantity]");
if (inputsQuantity.length > 0) {
  inputsQuantity.forEach((input) => {
    const inputId = input.getAttribute("item-id");
    input.addEventListener("change", () => {
      const quantity = input.value; // neu da hieu ro ve e.target co the su dung input.value luon, vi can ban no tra ve value
      window.location.href = `cart/update/${inputId}/${quantity}`;
    });
  });
}
//End cap nhap quantity cart
