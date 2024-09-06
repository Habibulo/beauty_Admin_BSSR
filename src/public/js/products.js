// console.log("Products frontend javascript file");

// $(function () {
//   $(".product-collection").on("change", () => {
//     const selectedValue = $(".product-collection").val();

//     if (selectedValue === "DRINK") {
//       $("#product-collection").hide();
//       $("#product-volume").show();
//     } else {
//       $("#product-collection").show();
//       $("#product-volume").hide();
//     }
//   });

//   $("#process-btn").on("click", () => {
//     $(".dish-container").slideToggle(500);
//     $("#process-btn").css("display", "none");
//   });
//   $("#cancel-btn").on("click", () => {
//     $(".dish-container").slideToggle(100);
//     $("#process-btn").css("display", "flex");
//   });

//   $(".new-product-status").on("change", async (e) => {
//     const id = e.target.id;
//     const productStatus = $(`#${id}.new-product-status`).val();
//     console.log("id", id);
//     console.log("status", productStatus);

//     try {
//       const response = await axios.post(`/admin/product/${id}`, {
//         productStatus: productStatus,
//       });
//       const result = response.data;
//       console.log("javobgarlik", response.data);
//       if (result.data) {
//         console.log("Product updated!");
//         $(".new-product-status").blur();
//       } else alert("Product update failed!");
//     } catch (error) {
//       console.log(err);
//       alert("Update failed!");
//     }
//   });
// });

// const validateForm = () => {
//   const productName = $(".product-name").val();
//   const productPrice = $(".product-price").val();
//   const productLeftCount = $(".product-left-count").val();
//   const productCollection = $(".product-collection").val();
//   const productDesc = $(".product-desc").val();
//   const productStatus = $(".product-status").val();

//   if (
//     productName === "" ||
//     productPrice === "" ||
//     productLeftCount === "" ||
//     productCollection === "" ||
//     productDesc === "" ||
//     productStatus === ""
//   ) {
//     alert("Please insert all details!");
//     return false;
//   }

//   if (memberPassword !== confirmPassword) {
//     alert("The password is different,  please check!");
//     return false;
//   }

//   const memberImage = $(".member-image").get(0).files[0]
//     ? $(".member-image").get(0).files[0]?.name
//     : null;

//   if (!memberImage) {
//     alert("Please insert restaurant image");
//     return false;
//   }
// };

// function previewFileHendler(input, order) {
//   const imgClassName = input.className;

//   const file = $(`.${imgClassName}`).get(0).files[0];
//   const fileType = file["type"];
//   const validationType = ["image/jpg", "image/jpeg", "image/png"];

//   if (!validationType.includes(fileType)) {
//     alert("Only image/jpg, image/jpeg, image/png");
//   } else {
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = function () {
//         $(`#image-section-${order}`).attr("src", reader.result);
//       };

//       reader.readAsDataURL(file);
//     }
//   }
// }

/*
    Responsive HTML Table With Pure CSS - Web Design/UI Design
*/

const search = document.querySelector('.input-group input'),
    table_rows = document.querySelectorAll('tbody tr'),
    table_headings = document.querySelectorAll('thead th');

// 1. Searching for specific data of HTML table
search.addEventListener('input', searchTable);

function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
    })

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}

// 2. Sorting | Ordering data of HTML table

table_headings.forEach((head, i) => {
    let sort_asc = true;
    head.onclick = () => {
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        table_rows.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        })

        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true;

        sortTable(i, sort_asc);
    }
})


function sortTable(column, sort_asc) {
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}

// 3. Converting HTML table to PDF

const pdf_btn = document.querySelector('#toPDF');
const customers_table = document.querySelector('#customers_table');


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
}

pdf_btn.onclick = () => {
    toPDF(customers_table);
}

// 4. Converting HTML table to JSON

const json_btn = document.querySelector('#toJSON');

const toJSON = function (table) {
    let table_data = [],
        t_head = [],

        t_headings = table.querySelectorAll('th'),
        t_rows = table.querySelectorAll('tbody tr');

    for (let t_heading of t_headings) {
        let actual_head = t_heading.textContent.trim().split(' ');

        t_head.push(actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase());
    }

    t_rows.forEach(row => {
        const row_object = {},
            t_cells = row.querySelectorAll('td');

        t_cells.forEach((t_cell, cell_index) => {
            const img = t_cell.querySelector('img');
            if (img) {
                row_object['customer image'] = decodeURIComponent(img.src);
            }
            row_object[t_head[cell_index]] = t_cell.textContent.trim();
        })
        table_data.push(row_object);
    })

    return JSON.stringify(table_data, null, 4);
}

json_btn.onclick = () => {
    const json = toJSON(customers_table);
    downloadFile(json, 'json')
}

// 5. Converting HTML table to CSV File

const csv_btn = document.querySelector('#toCSV');

const toCSV = function (table) {
    // Code For SIMPLE TABLE
    const t_rows = table.querySelectorAll('tr');
    return [...t_rows].map(row => {
        const cells = row.querySelectorAll('th, td');
        return [...cells].map(cell => cell.textContent.trim()).join(',');
    }).join('\n');

    const t_heads = table.querySelectorAll('th'),
        tbody_rows = table.querySelectorAll('tbody tr');

    const headings = [...t_heads].map(head => {
        let actual_head = head.textContent.trim().split(' ');
        return actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase();
    }).join(',') + ',' + 'image name';

    const table_data = [...tbody_rows].map(row => {
        const cells = row.querySelectorAll('td'),
            img = decodeURIComponent(row.querySelector('img').src),
            data_without_img = [...cells].map(cell => cell.textContent.replace(/,/g, ".").trim()).join(',');

        return data_without_img + ',' + img;
    }).join('\n');

    return headings + '\n' + table_data;
}

csv_btn.onclick = () => {
    const csv = toCSV(customers_table);
    downloadFile(csv, 'csv', 'customer orders');
}

// 6. Converting HTML table to EXCEL File

const excel_btn = document.querySelector('#toEXCEL');

const toExcel = function (table) {
    // Code For SIMPLE TABLE
    const t_rows = table.querySelectorAll('tr');
    return [...t_rows].map(row => {
        const cells = row.querySelectorAll('th, td');
        return [...cells].map(cell => cell.textContent.trim()).join('\t');
    }).join('\n');

    const t_heads = table.querySelectorAll('th'),
        tbody_rows = table.querySelectorAll('tbody tr');

    const headings = [...t_heads].map(head => {
        let actual_head = head.textContent.trim().split(' ');
        return actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase();
    }).join('\t') + '\t' + 'image name';

    const table_data = [...tbody_rows].map(row => {
        const cells = row.querySelectorAll('td'),
            img = decodeURIComponent(row.querySelector('img').src),
            data_without_img = [...cells].map(cell => cell.textContent.trim()).join('\t');

        return data_without_img + '\t' + img;
    }).join('\n');

    return headings + '\n' + table_data;
}

excel_btn.onclick = () => {
    const excel = toExcel(customers_table);
    downloadFile(excel, 'excel');
}

const downloadFile = function (data, fileType, fileName = '') {
    const a = document.createElement('a');
    a.download = fileName;
    const mime_types = {
        'json': 'application/json',
        'csv': 'text/csv',
        'excel': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }
    a.href = `
        data:${mime_types[fileType]};charset=utf-8,${encodeURIComponent(data)}
    `;
    document.body.appendChild(a);
    a.click();
    a.remove();
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
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productLeftCount = document.getElementById("productLeftCount").value;
    const productCollection = document.getElementById("productCollection").value;
    const productSize = document.getElementById("productSize").value;
    const productDesc = document.getElementById("productDesc").value;

    // Create a new row in the product table
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${productTableBody.rows.length + 1}</td>
      <td><img src="../public/img/upload.svg" alt="Product Image" /></td>
      <td>${productName}</td>
      <td>${productCollection}</td>
      <td>${productSize}</td>
      <td><p class="status">Active</p></td>
      <td>$${productPrice}</td>
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
const form = document.querySelector('form.custom-form');
const toggleBtn = document.querySelector('.create-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const tableBody = document.querySelector('tbody');

// Toggle form visibility when the "Create New Product" button is clicked
toggleBtn.addEventListener('click', () => {
  form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
});

// Close form when "Cancel" button is clicked
cancelBtn.addEventListener('click', () => {
  form.style.display = 'none';
});

// Handle form submission to add data to the table
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent actual form submission

  // Collect form input values
  const productName = document.getElementById('productName').value;
  const productPrice = document.getElementById('productPrice').value;
  const productLeftCount = document.getElementById('productLeftCount').value;
  const productType = document.getElementById('productCollection').value;
  const productSize = document.getElementById('productSize').value;

  // Generate a new row with input data
  const newRow = `
    <tr>
      <td> 1 </td>  <!-- Increment the number dynamically as needed -->
      <td> <img src="../public/img/userImages/Zinzu Chan Lee.jpg" alt=""></td>  <!-- Placeholder image, replace with actual uploaded image if available -->
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
  tableBody.insertAdjacentHTML('afterbegin', newRow);

  // Optionally reset form inputs
  form.reset();

  // Hide the form
  form.style.display = 'none';
});

/**

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Convert | Export html Table to CSV & EXCEL File</title>
  <link rel="stylesheet" type="text/css" href="../public/css/user.css">
  <!-- <link rel="stylesheet" type="text/css" href="../public/css/home.css"> -->
</head>

<body>
  <main class="table" id="customers_table">
    <div class="table">
      <div class="navigation-menu">
        <% if(!member) { %>
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link" href="/admin">Home</a>
            </li>
            <li class="nav-item" style="cursor: pointer">
              <a class="nav-link" href="/admin/signup">SignUp</a>
            </li>
            <li class="nav-item" style="cursor: pointer">
              <a class="nav-link" href="/admin/login">Login</a>
            </li>
          </ul>
          <div class="users-frame" style="color: #dddddd">
            <div class="board" style="font-size: 40px">Please login first!</div>
          </div>
          <% } else { %>
            <div class="navigation-menu">
              <ul class="nav justify-content-center">
                <li class="nav-item" style="cursor: pointer">
                  <a class="nav-link active" href="/admin/">Home</a>
                </li>
                <li class="nav-item" style="cursor: pointer">
                  <a class="nav-link" href="/admin/product/all">Menu</a>
                </li>
                <li class="nav-item" style="cursor: pointer">
                  <a class="nav-link" href="/admin/user/all">Users</a>
                </li>
                <li class="nav-item" style="cursor: pointer" onclick="return confirm('Do you really want to logout?')">
                  <a class="nav-link" href="/admin/logout">Logout</a>
                </li>
              </ul>
            </div>
            <section class="table__header">
              <h1>Customer's Orders</h1>
              <div class="input-group">
                <input type="search" placeholder="Search Data...">
                <img src="../public/img/userImages/search.png" alt="">
              </div>
              <div class="export__file">
                <label for="export-file" class="export__file-btn" title="Export File"></label>
                <input type="checkbox" id="export-file">
                <div class="export__file-options">
                  <label>Export As &nbsp; &#10140;</label>
                  <label for="export-file" id="toPDF">PDF <img src="../public/img/userImages/pdf.png" alt=""></label>
                  <label for="export-file" id="toJSON">JSON <img src="../public/img/userImages/json.png" alt=""></label>
                  <label for="export-file" id="toCSV">CSV <img src="../public/img/userImages/csv.png" alt=""></label>
                  <label for="export-file" id="toEXCEL">EXCEL <img src="../public/img/userImages/excel.png"
                      alt=""></label>
                </div>
              </div>
            </section>
            <section class="table__body">
              <table>
                <thead>
                  <tr>
                    <th> Id <span class="icon-arrow">&UpArrow;</span></th>
                    <th> Customer <span class="icon-arrow">&UpArrow;</span></th>
                    <th> Location <span class="icon-arrow">&UpArrow;</span></th>
                    <th> Order Date <span class="icon-arrow">&UpArrow;</span></th>
                    <th> Status <span class="icon-arrow">&UpArrow;</span></th>
                    <th> Amount <span class="icon-arrow">&UpArrow;</span></th>
                  </tr>
                </thead>

                <% products.map((val, key)=> {%>
                <tbody>
                  <tr>
                    <td> 1 </td>
                    <td> <img src="../public/img/userImages/Zinzu Chan Lee.jpg" alt="">Zinzu Chan Lee</td>
                    <td> Seoul </td>
                    <td> 17 Dec, 2022 </td>
                    <td>
                      <p class="status delivered">Delivered</p>
                    </td>
                    <td> <strong> $128.90 </strong></td>
                  </tr>
                  <tr>
                    <td> 2 </td>
                    <td><img src="../public/img/userImages/Jeet Saru.jpg" alt=""> Jeet Saru </td>
                    <td> Kathmandu </td>
                    <td> 27 Aug, 2023 </td>
                    <td>
                      <p class="status cancelled">Cancelled</p>
                    </td>
                    <td> <strong>$5350.50</strong> </td>
                  </tr>
                  <tr>
                    <td> 3</td>
                    <td><img src="../public/img/userImages/Sonal Gharti.jpg" alt=""> Sonal Gharti </td>
                    <td> Tokyo </td>
                    <td> 14 Mar, 2023 </td>
                    <td>
                      <p class="status shipped">Shipped</p>
                    </td>
                    <td> <strong>$210.40</strong> </td>
                  </tr>
                  <tr>
                    <td> 4</td>
                    <td><img src="../public/img/userImages/Alson GC.jpg" alt=""> Alson GC </td>
                    <td> New Delhi </td>
                    <td> 25 May, 2023 </td>
                    <td>
                      <p class="status delivered">Delivered</p>
                    </td>
                    <td> <strong>$149.70</strong> </td>
                  </tr>
                  <tr>
                    <td> 5</td>
                    <td><img src="../public/img/userImages/Sarita Limbu.jpg" alt=""> Sarita Limbu </td>
                    <td> Paris </td>
                    <td> 23 Apr, 2023 </td>
                    <td>
                      <p class="status pending">Pending</p>
                    </td>
                    <td> <strong>$399.99</strong> </td>
                  </tr>
                  <tr>
                    <td> 6</td>
                    <td><img src="../public/img/userImages//Alex Gonley.jpg" alt=""> Alex Gonley </td>
                    <td> London </td>
                    <td> 23 Apr, 2023 </td>
                    <td>
                      <p class="status cancelled">Cancelled</p>
                    </td>
                    <td> <strong>$399.99</strong> </td>
                  </tr>
                  <tr>
                    <td> 7</td>
                    <td><img src="../public/img/userImages//Alson GC.jpg" alt=""> Jeet Saru </td>
                    <td> New York </td>
                    <td> 20 May, 2023 </td>
                    <td>
                      <p class="status delivered">Delivered</p>
                    </td>
                    <td> <strong>$399.99</strong> </td>
                  </tr>
                  <tr>
                    <td> 8</td>
                    <td><img src="../public/img/userImages/Sarita Limbu.jpg" alt=""> Aayat Ali Khan </td>
                    <td> Islamabad </td>
                    <td> 30 Feb, 2023 </td>
                    <td>
                      <p class="status pending">Pending</p>
                    </td>
                    <td> <strong>$149.70</strong> </td>
                  </tr>
                  <tr>
                    <td> 9</td>
                    <td><img src="../public/img/userImages/Alex Gonley.jpg" alt=""> Alson GC </td>
                    <td> Dhaka </td>
                    <td> 22 Dec, 2023 </td>
                    <td>
                      <p class="status cancelled">Cancelled</p>
                    </td>
                    <td> <strong>$249.99</strong> </td>
                  </tr>
                  <tr>
                    <td> 9</td>
                    <td><img src="../public/img/userImages/Alex Gonley.jpg" alt=""> Alson GC </td>
                    <td> Dhaka </td>
                    <td> 22 Dec, 2023 </td>
                    <td>
                      <p class="status cancelled">Cancelled</p>
                    </td>
                    <td> <strong>$249.99</strong> </td>
                  </tr>
                  <tr>
                    <td> 9</td>
                    <td><img src="../public/img/userImages/Zinzu Chan Lee.jpg" alt=""> Alson GC </td>
                    <td> Dhaka </td>
                    <td> 22 Dec, 2023 </td>
                    <td>
                      <p class="status cancelled">Cancelled</p>
                    </td>
                    <td> <strong>$249.99</strong> </td>
                  </tr>
                  <tr>
                    <td> 9</td>
                    <td><img src="../public/img/userImages/Sarita Limbu.jpg" alt=""> Alson GC </td>
                    <td> Dhaka </td>
                    <td> 22 Dec, 2023 </td>
                    <td>
                      <p class="status cancelled">Cancelled</p>
                    </td>
                    <td> <strong>$249.99</strong> </td>
                  </tr>
                  <tr>
                    <td> 9</td>
                    <td><img src="../public/img/userImages/Alex Gonley.jpg" alt=""> Alson GC </td>
                    <td> Dhaka </td>
                    <td> 22 Dec, 2023 </td>
                    <td>
                      <p class="status cancelled">Cancelled</p>
                    </td>
                    <td> <strong>$249.99</strong> </td>
                  </tr>
                </tbody>
              </table>
            </section>
            <% } %>
      </div>
  </main>
  <script src="../public/js/user.js"></script>

</body>

</html> 
**/