//role permissions
const tablePermissons = document.querySelector("[table-permissons]");
if (tablePermissons) {
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    let permissions = [];
    const rows = tablePermissons.querySelectorAll("[data-name]");
    rows.forEach((row) => {
      const dataName = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");

      inputs.forEach((input) => {
        console.log(input);
      });

      console.log(dataName);
      // console.log(inputs);
      if (dataName === "id") {
        inputs.forEach((input) => {
          const id = input.value;
          // console.log(id);
          permissions.push({
            id: id,
            permissions: [],
          });
        });
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked; //thuoc tinh checked xdinh true false
          if (checked) {
            permissions[index].permissions.push(dataName);
          }
        });
      }
    });
    //form permissions
    if (permissions.length > 0) {
      const formPermissions = document.querySelector(
        "#form-change-permissions"
      );
      if (formPermissions) {
        const inputPermissions = formPermissions.querySelector("input");
        inputPermissions.value = JSON.stringify(permissions);
      }
      formPermissions.submit();
    }
  });
}

// default data permissions
const dataRecords = document.querySelector("[data-records]");
if (dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-records"));
  const tablePermissons = document.querySelector("[table-permissons]");
  // console.log(records);
  records.forEach((record, index) => {
    const permissions = record.permissions;
    permissions.forEach((permission) => {
      const row = tablePermissons.querySelector(`[data-name=${permission}]`);
      const input = row.querySelectorAll("input")[index];
      input.checked = true;
    });
  });
}
