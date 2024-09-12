const search = document.querySelector(".input-group input"),
  table_rows = document.querySelectorAll("tbody tr"),
  table_headings = document.querySelectorAll("thead th");

// 1. Searching for specific data of HTML table
search.addEventListener("input", searchTable);

function searchTable() {
  table_rows.forEach((row, i) => {
    let table_data = row.textContent.toLowerCase(),
      search_data = search.value.toLowerCase();

    row.classList.toggle("hide", table_data.indexOf(search_data) < 0);
    row.style.setProperty("--delay", i / 25 + "s");
  });

  document.querySelectorAll("tbody tr:not(.hide)").forEach((visible_row, i) => {
    visible_row.style.backgroundColor =
      i % 2 == 0 ? "transparent" : "#0000000b";
  });
}

// 2. Sorting | Ordering data of HTML table

table_headings.forEach((head, i) => {
  let sort_asc = true;
  head.onclick = () => {
    table_headings.forEach((head) => head.classList.remove("active"));
    head.classList.add("active");

    document
      .querySelectorAll("td")
      .forEach((td) => td.classList.remove("active"));
    table_rows.forEach((row) => {
      row.querySelectorAll("td")[i].classList.add("active");
    });

    head.classList.toggle("asc", sort_asc);
    sort_asc = head.classList.contains("asc") ? false : true;

    sortTable(i, sort_asc);
  };
});

function sortTable(column, sort_asc) {
  [...table_rows]
    .sort((a, b) => {
      let first_row = a
          .querySelectorAll("td")
          [column].textContent.toLowerCase(),
        second_row = b.querySelectorAll("td")[column].textContent.toLowerCase();

      return sort_asc
        ? first_row < second_row
          ? 1
          : -1
        : first_row < second_row
        ? -1
        : 1;
    })
    .map((sorted_row) =>
      document.querySelector("tbody").appendChild(sorted_row)
    );
}

// 3. Converting HTML table to PDF

const pdf_btn = document.querySelector("#toPDF");
const customers_table = document.querySelector("#customers_table");

const toPDF = function (customers_table) {
  const html_code = `
    <!DOCTYPE html>
    <link rel="stylesheet" type="text/css" href="style.css">
    <main class="table" id="customers_table">${customers_table.innerHTML}</main>`;

  const new_window = window.open();
  new_window.document.write(html_code);

  setTimeout(() => {
    new_window.print();
    new_window.close();
  }, 400);
};

pdf_btn.onclick = () => {
  toPDF(customers_table);
};

// 4. Converting HTML table to JSON

const json_btn = document.querySelector("#toJSON");

const toJSON = function (table) {
  let table_data = [],
    t_head = [],
    t_headings = table.querySelectorAll("th"),
    t_rows = table.querySelectorAll("tbody tr");

  for (let t_heading of t_headings) {
    let actual_head = t_heading.textContent.trim().split(" ");

    t_head.push(
      actual_head
        .splice(0, actual_head.length - 1)
        .join(" ")
        .toLowerCase()
    );
  }

  t_rows.forEach((row) => {
    const row_object = {},
      t_cells = row.querySelectorAll("td");

    t_cells.forEach((t_cell, cell_index) => {
      const img = t_cell.querySelector("img");
      if (img) {
        row_object["customer image"] = decodeURIComponent(img.src);
      }
      row_object[t_head[cell_index]] = t_cell.textContent.trim();
    });
    table_data.push(row_object);
  });

  return JSON.stringify(table_data, null, 4);
};

json_btn.onclick = () => {
  const json = toJSON(customers_table);
  downloadFile(json, "json");
};

// 5. Converting HTML table to CSV File

const csv_btn = document.querySelector("#toCSV");

const toCSV = function (table) {
  // Code For SIMPLE TABLE
  // const t_rows = table.querySelectorAll('tr');
  // return [...t_rows].map(row => {
  //     const cells = row.querySelectorAll('th, td');
  //     return [...cells].map(cell => cell.textContent.trim()).join(',');
  // }).join('\n');

  const t_heads = table.querySelectorAll("th"),
    tbody_rows = table.querySelectorAll("tbody tr");

  const headings =
    [...t_heads]
      .map((head) => {
        let actual_head = head.textContent.trim().split(" ");
        return actual_head
          .splice(0, actual_head.length - 1)
          .join(" ")
          .toLowerCase();
      })
      .join(",") +
    "," +
    "image name";

  const table_data = [...tbody_rows]
    .map((row) => {
      const cells = row.querySelectorAll("td"),
        img = decodeURIComponent(row.querySelector("img").src),
        data_without_img = [...cells]
          .map((cell) => cell.textContent.replace(/,/g, ".").trim())
          .join(",");

      return data_without_img + "," + img;
    })
    .join("\n");

  return headings + "\n" + table_data;
};

csv_btn.onclick = () => {
  const csv = toCSV(customers_table);
  downloadFile(csv, "csv", "customer orders");
};

// 6. Converting HTML table to EXCEL File

const excel_btn = document.querySelector("#toEXCEL");

const toExcel = function (table) {
  // Code For SIMPLE TABLE
  // const t_rows = table.querySelectorAll('tr');
  // return [...t_rows].map(row => {
  //     const cells = row.querySelectorAll('th, td');
  //     return [...cells].map(cell => cell.textContent.trim()).join('\t');
  // }).join('\n');

  const t_heads = table.querySelectorAll("th"),
    tbody_rows = table.querySelectorAll("tbody tr");

  const headings =
    [...t_heads]
      .map((head) => {
        let actual_head = head.textContent.trim().split(" ");
        return actual_head
          .splice(0, actual_head.length - 1)
          .join(" ")
          .toLowerCase();
      })
      .join("\t") +
    "\t" +
    "image name";

  const table_data = [...tbody_rows]
    .map((row) => {
      const cells = row.querySelectorAll("td"),
        img = decodeURIComponent(row.querySelector("img").src),
        data_without_img = [...cells]
          .map((cell) => cell.textContent.trim())
          .join("\t");

      return data_without_img + "\t" + img;
    })
    .join("\n");

  return headings + "\n" + table_data;
};

excel_btn.onclick = () => {
  const excel = toExcel(customers_table);
  downloadFile(excel, "excel");
};

const downloadFile = function (data, fileType, fileName = "") {
  const a = document.createElement("a");
  a.download = fileName;
  const mime_types = {
    json: "application/json",
    csv: "text/csv",
    excel: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
  a.href = `
        data:${mime_types[fileType]};charset=utf-8,${encodeURIComponent(data)}
    `;
  document.body.appendChild(a);
  a.click();
  a.remove();
};
// previewFileHandle

function previewFileHendler(input, index) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imgElement = document.querySelectorAll("#image-section")[index - 1];
      imgElement.src = e.target.result; // Set the new image source
    };

    reader.readAsDataURL(file); // Convert the file to a data URL
  }
}

/** FORM INPUT **/
document.addEventListener("DOMContentLoaded", function () {
  const createProductBtn = document.getElementById("create-product-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const productForm = document.getElementById("product-form");
  const productList = document.getElementById("product-list");
  const newProductForm = document.getElementById("new-product-form");
  const productTableBody = document.getElementById("product-table-body");

  // Show form and hide product list
  createProductBtn.addEventListener("click", function () {
    productList.style.display = "none";
    productForm.style.display = "block";
  });

  // Cancel form and show product list again
  cancelBtn.addEventListener("click", function () {
    productForm.style.display = "none";
    productList.style.display = "block";
  });

  // Handle form submission
  newProductForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const productBrand = document.getElementById("productBrand").value;
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productCollection = document.getElementById("productCollection").value;
    const productSize = document.getElementById("productSize").value;
    const productDesc = document.getElementById("productDesc").value;
    const productLeftCount = document.getElementById("productLeftCount").value;

    // Update the image input to the correct file input element
    const productImageInput = document.querySelector('input[type="file"]');
    const productImageFile = productImageInput.files[0];

    // Check if a file is uploaded
    let imageUrl = "../public/img/userImages/Zinzu Chan Lee.jpg"; // Default image path
    if (productImageFile) {
      imageUrl = URL.createObjectURL(productImageFile); // Use uploaded image if available
    }

    // Create a new row in the product table
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
    <tr>
      <td>${productTableBody.rows.length + 1}</td>
      <td><img src="${imageUrl}" alt="Product Image" width="50" height="50"/></td>
      <td>${productName}</td>
      <td>${productCollection}</td>
      <td>${productSize}</td>
      <td><p class="status">Active</p></td>
      <td><strong>${productPrice}</strong></td>
    </tr>
    `;

    // Append the new row to the table
    productTableBody.appendChild(newRow);

    // Reset the form
    newProductForm.reset();

    // Hide form and show product list
    productForm.style.display = "none";
    productList.style.display = "block";
  });
});

const form = document.querySelector("form.custom-form");
const toggleBtn = document.querySelector(".create-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const tableBody = document.querySelector("tbody");

// Toggle form visibility when the "Create New Product" button is clicked
toggleBtn.addEventListener("click", () => {
  form.style.display =
    form.style.display === "none" || form.style.display === ""
      ? "block"
      : "none";
});

// Close form when "Cancel" button is clicked
cancelBtn.addEventListener("click", () => {
  form.style.display = "none";
});

// Handle form submission to add data to the table
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent actual form submission

  // Collect form input values
  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;
  const productLeftCount = document.getElementById("productLeftCount").value;
  const productType = document.getElementById("productCollection").value;
  const productSize = document.getElementById("productSize").value;

  // Update the image input to the correct file input element
  const productImageInput = document.querySelector('input[type="file"]');
  const productImageFile = productImageInput.files[0];

  // Check if a file is uploaded
  let imageUrl = "../public/img/userImages/Zinzu Chan Lee.jpg"; // Default image path
  if (productImageFile) {
    imageUrl = URL.createObjectURL(productImageFile); // Use uploaded image if available
  }

  // Generate a new row with input data
  const newRow = `
    <tr>
      <td> </td>  <!-- Increment the number dynamically as needed -->
      <td> <img src="${imageUrl}" alt="Product Image" width="50" height="50"/></td>
      <td> ${productName} </td>
      <td> ${productType} </td>
      <td> ${productSize} </td>
      <td>
        <p class="status delivered">Pending</p>
      </td>
      <td> <strong> $${productPrice} </strong></td>
    </tr>
  `;

  // Insert the new row on top of the table
  tableBody.insertAdjacentHTML("afterbegin", newRow);

  // Optionally reset form inputs
  form.reset();

  // Hide the form
  form.style.display = "none";
});

/** Might be DELETED **/

function sortTable(column, sort_asc) {
  // Get the table body element
  const tbody = document.querySelector("tbody");

  // Convert NodeList to Array for sorting
  const rowsArray = Array.from(tbody.querySelectorAll("tr"));

  // Sort the rows
  const sortedRows = rowsArray.sort((a, b) => {
    const first_row = a
      .querySelectorAll("td")
      [column].textContent.trim()
      .toLowerCase();
    const second_row = b
      .querySelectorAll("td")
      [column].textContent.trim()
      .toLowerCase();

    if (sort_asc) {
      return first_row < second_row ? -1 : first_row > second_row ? 1 : 0;
    } else {
      return first_row > second_row ? -1 : first_row < second_row ? 1 : 0;
    }
  });

  // Append the sorted rows back to the tbody
  sortedRows.forEach((row) => tbody.appendChild(row));
}

function updateTableRows() {
  table_rows = document.querySelectorAll("tbody tr");
}

// Call this function after adding/removing rows
updateTableRows();
