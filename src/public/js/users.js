console.log("Users frontend javascript file");

$(
  $(".member-status").on("change", function (e) {
    const id = e.target.id;
    const status = e.target.value;

    axios
      .post(`/admin/user/edit`, {
        _id: id,
        memberStatus: status,
      })
      .then((result) => {
        console.log(result);
        $(e.target).blur();
      })
      .catch((err) => {
        console.log(err);
      });
  })
);



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
                  <li
                    class="nav-item"
                    style="cursor: pointer"
                    onclick="return confirm('Do you really want to logout?')"
                  >
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
                 <div class="export__file-options" >
                     <label>Export As &nbsp; &#10140;</label>
                     <label for="export-file" id="toPDF">PDF <img src="../public/img/userImages/pdf.png" alt=""></label>
                     <label for="export-file" id="toJSON">JSON <img src="../public/img/userImages/json.png" alt=""></label>
                     <label for="export-file" id="toCSV">CSV <img src="../public/img/userImages/csv.png" alt=""></label>
                     <label for="export-file" id="toEXCEL">EXCEL <img src="../public/img/userImages/excel.png" alt=""></label>
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