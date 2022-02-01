/*------SignUp and Login----- */
function superAdminAdded() {
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var superAdmin = {
    id: 1,
    username: "SuperAdmin",
    email: "superadmin@gmail.com",
    password: "Superadmin123*",
    role: "superadmin",
  };
  users.push(superAdmin);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("superAdminAdded", "true");
}
function signUp() {
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("passwordSignUp").value;
  var confirmPassword = document.getElementById("confirmPasswordSignUp").value;
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var userId = JSON.parse(localStorage.getItem("userId") || "2");
  var connectedUser = JSON.parse(localStorage.getItem("connecteduser") || "[]");
  verifyusername = verifyLength(username, 5, 15);
  verifyEmail = validateEmail(email);
  verifyPassword = validatePassword(password);
  if (!verifyusername) {
    document.getElementById("usernameError").innerHTML =
      "Username must be between 5 and 15 characters";
    document.getElementById("usernameError").style.color = "red";
  }
  if (!verifyEmail) {
    document.getElementById("emailError").innerHTML =
      "Enter a valid email address";
    document.getElementById("emailError").style.color = "red";
  }
  if (!verifyPassword) {
    document.getElementById("passwordError").innerHTML =
      "Password must be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
    document.getElementById("passwordError").style.color = "red";
  } else if (confirmPassword != password) {
    document.getElementById("confirmPasswordError").innerHTML =
      "Password and confirm password does not match";
    document.getElementById("confirmPasswordError").style.color = "red";
  }
  var emailExist = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      emailExist = true;
      document.getElementById("emailError").innerHTML = "Email already exist";
      document.getElementById("emailError").style.color = "red";
    }
  }
  if (
    emailExist == false &&
    verifyusername &&
    verifyEmail &&
    verifyPassword &&
    password == confirmPassword
  ) {
    var myusers = {
      id: userId,
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      role: "User",
    };
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1700,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
        users.push(myusers);
        connectedUser = myusers;
        localStorage.setItem("connecteduser", JSON.stringify(connectedUser));
        localStorage.setItem("userId", JSON.stringify(userId + 1));
        localStorage.setItem("users", JSON.stringify(users));
        setTimeout(() => {
          location.replace("index.html");
        }, 1700);

        // displayUsersDashboard();
      },
    });

    Toast.fire({
      icon: "success",
      title: "Signed in successfully",
    });
  }
}
function login() {
  var emailLogin = document.getElementById("emailLogin").value;
  var passwordLogin = document.getElementById("passwordLogin").value;
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var connectedUser = JSON.parse(localStorage.getItem("connecteduser") || "[]");
  if (emailLogin == "") {
    document.getElementById("emailLoginError").innerHTML =
      "Please Insert your Email";
    document.getElementById("emailLoginError").style.color = "red";
  }
  if (passwordLogin == "") {
    document.getElementById("passwordLoginError").innerHTML =
      "Please Insert your Password";
    document.getElementById("passwordLoginError").style.color = "red";
  } else {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email == emailLogin && users[i].password == passwordLogin) {
        connectedUser = users[i];
        document.getElementById("passwordLoginError").innerHTML = "";
        if (connectedUser.role == "User") {
          location.replace("index.html");
        } else if (connectedUser.role == "superadmin") {
          location.replace("index.html");
        } else if (connectedUser.role == "Admin") {
          location.replace("index.html");
        }
        localStorage.setItem("connecteduser", JSON.stringify(connectedUser));
        break;
      } else{
        document.getElementById("passwordLoginError").innerHTML =
          "Email or Password Invalid";
        document.getElementById("passwordLoginError").style.color = "red";
      }
    }
  }
}
/*----Show & Hide Password-----*/
function password_show_hide(key1, key2, key3) {
  var x = document.getElementById(key1);
  var show_eye = document.getElementById(key2);
  var hide_eye = document.getElementById(key3);
  hide_eye.classList.remove("d-none");
  if (x.type === "password") {
    x.type = "text";
    show_eye.style.display = "none";
    hide_eye.style.display = "block";
  } else {
    x.type = "password";
    show_eye.style.display = "block";
    hide_eye.style.display = "none";
  }
}
/*----Verification-----*/
function verifyLength(ch, min, max) {
  return ch.length >= min && ch.length <= max;
}
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validatePassword(password) {
  const regExp =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  return password.match(regExp);
}
function phoneNumber(phone) {
  var phone = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/.test(phone);
  return phone;
}
/*--------Edit Profile By ConnectedUser------ */
function editProfile() {
  var connectedUser = JSON.parse(localStorage.getItem("connecteduser"));
  var editProfile = `<section oncontextmenu="return false" class="snippet-body modal" id="editProfile" tabindex="-1"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="col-lg-5 col-md-7 col-sm-11" style="width: 100%; margin: auto;">
    <div class="panel border bg-white">
      <div class="panel-heading">
        <h3 class="pt-3 font-weight-bold" style="color: #373d41; ">Edit Profile</h3>
      </div>
      <div class="panel-body p-3">
        <div>
          <div class="form-group py-2">
            <div class="input-field">
              <span class="far fa-user p-2"></span>
              <input id="usernameEditProfile" class="form-control" type="text" value="${connectedUser.username}" placeholder="Enter your Username" required/>
            </div>
            <div>
              <span id="usernameError"></span>
            </div>
          </div>
          <div class="form-group py-2">
            <div class="input-field">
              <span class="fas fa-at p-2"></span>
              <input id="emailEditProfile" class="form-control" type="email" value="${connectedUser.email}" placeholder="Enter your E-mail" required/>
            </div>
            <div>
              <span id="emailError"></span>
            </div>
          </div>
          <div class="form-group py-1 pb-2">
            <div class="input-field">
              <span class="fas fa-lock px-2"></span>
              <input id="passwordEditProfile" class="form-control" type="password" value="${connectedUser.password}" placeholder="Enter your Password" required/>
              <span onclick="password_show_hide('passwordEditProfile', 'showPasswordEditProfile', 'hidePasswordEditProfile')"><i class="far fa-eye-slash btn bg-white text-muted" id="showPasswordEditProfile" style="cursor: pointer;"></i><i class="far fa-eye display btn bg-white text-muted" id="hidePasswordEditProfile" style="cursor: pointer;"></i></span>
            </div>
            <div>
              <span id="passwordError"></span>
            </div>
          </div>
          <div class="form-group py-1 pb-2">
            <div class="input-field">
              <span class="fas fa-clipboard-check px-2"></span>
              <input id="confirmPasswordEditProfile" type="password" value="${connectedUser.confirmPassword}" class="form-control" placeholder="Confirm your Password"
                required />
              <span onclick="password_show_hide('confirmPasswordEditProfile', 'showConfirmPasswordEditProfile', 'hideConfirmPasswordEditProfile')"><i class="far fa-eye-slash btn bg-white text-muted" id="showConfirmPasswordEditProfile" style="cursor: pointer;"></i><i class="far fa-eye d-none btn bg-white text-muted" id="hideConfirmPasswordEditProfile" style="cursor: pointer;"></i></span>
            </div>
            <div>
              <span id="confirmPasswordError"></span>
            </div>
          </div>
          <div onclick="saveEditProfile()" class="btn btn-secondary btn-block mt-3">Save Edit</div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
  <script type="text/javascript"></script>
</section`;
  document.getElementById("editProfileForm").innerHTML = editProfile;
}
function saveEditProfile() {
  var usernameEdit = document.getElementById("usernameEditProfile").value;
  var emailEdit = document.getElementById("emailEditProfile").value;
  var passwordEdit = document.getElementById("passwordEditProfile").value;
  var confirmPasswordEdit = document.getElementById(
    "confirmPasswordEditProfile"
  ).value;
  var connectedUser = JSON.parse(localStorage.getItem("connecteduser"));
  var users = JSON.parse(localStorage.getItem("users"));
  var verifyEditUser = verifyLength(usernameEdit, 3, 15);
  var verifyEmail = validateEmail(emailEdit);
  var verifyPassword = validatePassword(passwordEdit);
  var verifyConfirmPassword = validatePassword(confirmPasswordEdit);
  if (!verifyEditUser) {
    document.getElementById("usernameError").innerHTML =
      "Username must be between 3 and 15 characters";
    document.getElementById("usernameError").style.color = "red";
  }
  if (!verifyEmail) {
    document.getElementById("emailError").innerHTML =
      "Please enter a valid email";
    document.getElementById("emailError").style.color = "red";
  }
  if (!verifyPassword) {
    document.getElementById("passwordError").innerHTML =
      "password must be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
    document.getElementById("passwordError").style.color = "red";
  }
  if (!verifyConfirmPassword) {
    document.getElementById("confirmPasswordError").innerHTML =
      "Password and confirm password does not match";
    document.getElementById("confirmPasswordError").style.color = "red";
  }
  if (
    verifyEditUser &&
    verifyEmail &&
    verifyPassword &&
    passwordEdit == confirmPasswordEdit
  ) {
    connectedUser.username = usernameEdit;
    connectedUser.email = emailEdit;
    connectedUser.password = passwordEdit;
    connectedUser.confirmPassword = confirmPasswordEdit;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == connectedUser.id) {
        users[i].username = usernameEdit;
        users[i].email = emailEdit;
        users[i].password = passwordEdit;
        users[i].confirmPassword = confirmPasswordEdit;
      }
    }
    localStorage.setItem("connecteduser", JSON.stringify(connectedUser));
    localStorage.setItem("users", JSON.stringify(users));
    location.reload();
  }
}
/*----Generic Search-----*/
function searchById(id, key) {
  var myobject = JSON.parse(localStorage.getItem(key));
  var foundedOBject = JSON.parse(localStorage.getItem("founded") || "[]");
  for (let i = 0; i < myobject.length; i++) {
    if (myobject[i].id == id) {
      foundedOBject = myobject[i];
      localStorage.setItem("founded", JSON.stringify(foundedOBject));
    }
  }
  return foundedOBject;
}
/*----Generic Delete-----*/
function Delete(pos, key, id) {
  var mytable = JSON.parse(localStorage.getItem(key) || "[]");
  var pos;
  for (let i = 0; i < mytable.length; i++) {
    if (mytable[i].id == id) {
      pos = i;
      Swal.fire({
        title: "Are you sure? you want to delete it ?!!",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          mytable.splice(pos, 1);
          localStorage.setItem(key, JSON.stringify(mytable));
          setTimeout(() => {
            location.reload();
          }, 1500);
        }
      });
    }
  }
  console.log(pos);
  return pos;
}
/*----Add & Display Categories-----*/
function addCategory() {
  var categories = JSON.parse(localStorage.getItem("categories") || "[]");
  var categoryId = JSON.parse(localStorage.getItem("categoryId") || "1");
  var categoryName = document.getElementById("categoryName").value;
  var connecteduser = JSON.parse(localStorage.getItem("connecteduser"));
  if (connecteduser.role == "superadmin" && categoryName != "") {
    var category = {
      id: categoryId,
      CategoryName: categoryName,
    };
    categories.push(category);
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("categoryId", JSON.stringify(categoryId + 1));
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1700,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: "Well done! Aww yeah, a new category added",
    });
    setTimeout(() => {
      location.reload();
    }, 1700);
    displayCategoriesDashboard();
    displayCategoriesShop();
  } else if (categoryName == "" && connecteduser.role == "superadmin") {
    document.getElementById("categoryNameError").innerHTML =
      "Please enter the category name";
    document.getElementById("categoryNameError").style.color = "red";
  } else {
    Swal.fire({
      imageUrl: "assets/img/restricted.png",
      imageWidth: 500,
      imageHeight: 350,
      showConfirmButton: false,
    });
    $(".swal2-modal").css("background-color", "transparent");
    setTimeout(() => {
      location.reload();
    }, 1700);
  }
}
function displayCategoriesDashboard(key) {
  var categories = JSON.parse(localStorage.getItem("categories"));
  var displayCategoriesTable = `<option selected>Choose Category</option>`;
  for (let i = 0; i < categories.length; i++) {
    displayCategoriesTable += `<option value="${categories[i].CategoryName}">${categories[i].CategoryName}</option>`;
  }
  document.getElementById(key).innerHTML = displayCategoriesTable;
}
function displayCategoriesShop() {
  var categories = JSON.parse(localStorage.getItem("categories"));
  var displayCategoriesShop = ``;
  for (let i = 0; i < categories.length; i++) {
    displayCategoriesShop += `<li><a href="categories.html#speakers" onclick="categories(${categories[i].id})">${categories[i].CategoryName}</a></li>`;
  }
  document.getElementById("displayCategoriesShop").innerHTML =
    displayCategoriesShop;
}
/*----Add & Display Coupons-----*/
function addCoupon() {
  var connectedUser = JSON.parse(localStorage.getItem("connecteduser"));
  var coupons = JSON.parse(localStorage.getItem("coupons") || "[]");
  var couponId = JSON.parse(localStorage.getItem("couponId") || "1");
  var productCategory = document.getElementById("productCategory").value;
  var productName = document.getElementById("productName").value;
  var productPrice = document.getElementById("productPrice").value;
  var discount = document.getElementById("discount").value;
  var validity = document.getElementById("validity").value;
  var description = document.getElementById("description").value;
  var productImage = document.getElementById("productImage").value;
  var image = replaceCh(productImage);
  var today = new Date();
  var minDate =
    today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
  if (
    productCategory != "Choose Category" &&
    productName != "" &&
    productPrice > 0 &&
    discount > 0 &&
    validity > minDate &&
    description != "" &&
    productImage != ""
  ) {
    var coupon = {
      id: couponId,
      adminId: connectedUser.id,
      ProductCategory: productCategory,
      ProductName: productName,
      ProductPrice: productPrice,
      Discount: discount,
      Validity: validity,
      Description: description,
      ProductImage: image,
    };
    coupons.push(coupon);
    localStorage.setItem("coupons", JSON.stringify(coupons));
    localStorage.setItem("couponId", JSON.stringify(couponId + 1));
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1700,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Well done! Aww yeah, new coupon added",
    });
    setTimeout(() => {
      location.reload();
    }, 1700);
  } else if (productCategory == "Choose Category") {
    document.getElementById("productCategoryError").innerHTML =
      "You must choose a category";
    document.getElementById("productCategoryError").style.color = "red";
  }
  if (productName == "") {
    document.getElementById("productNameError").innerHTML =
      "You must enter the product name";
    document.getElementById("productNameError").style.color = "red";
  }
  if (productPrice <= 0) {
    document.getElementById("productPriceError").innerHTML =
      "Please enter the product price";
    document.getElementById("productPriceError").style.color = "red";
  }
  if (discount <= 0) {
    document.getElementById("discountError").innerHTML =
      "Please enter the product discount";
    document.getElementById("discountError").style.color = "red";
  }
  if (validity <= minDate) {
    document.getElementById("validityError").innerHTML =
      "Please enter a valid date";
    document.getElementById("validityError").style.color = "red";
  }
  if (description == "") {
    document.getElementById("descriptionError").innerHTML =
      "You must enter a description for your product";
    document.getElementById("descriptionError").style.color = "red";
  }
  if (productImage == "") {
    document.getElementById("productImageError").innerHTML =
      "You must add an image to your product";
    document.getElementById("productImageError").style.color = "red";
  }
}
function displayCouponsDashboard() {
  var coupons = JSON.parse(localStorage.getItem("coupons"));
  var connecteduser = JSON.parse(localStorage.getItem("connecteduser"));
  var displayCouponsDashboard = `<table id="datatablesSimple">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Product Category</th>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Discount</th>
                                            <th>Validity</th>
                                            <th style="text-align:center">Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Id</th>
                                            <th>Product Category</th>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Discount</th>
                                            <th>Validity</th>
                                            <th style="text-align:center">Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>`;
  if (connecteduser.role == "superadmin") {
    for (let i = 0; i < coupons.length; i++) {
      displayCouponsDashboard += `<tr>
                                            <td>${coupons[i].id}</td>
                                            <td>${coupons[i].ProductCategory}</td>
                                            <td>${coupons[i].ProductName}</td>
                                            <td style="text-align:right">${coupons[i].ProductPrice}</td>
                                            <td style="text-align:right">${coupons[i].Discount}</td>
                                            <td style="text-align:right">${coupons[i].Validity}</td>
                                            <td style="text-align:center">
                                            <button type="button" data-toggle="modal"
                                            data-target="#displayCoupon" onclick="displayCoupon(${coupons[i].id})" class="btn btn-info btn-sm"><i class="fas fa-tv"></i></button>
                                            <button type="button" data-toggle="modal"
                                            data-target="#editCoupon" onclick="editCoupons(${coupons[i].id})" class="btn btn-secondary btn-sm"><i class="fas fa-edit"></i></button>
                                            <button type="button" onclick="Delete(${i},'coupons', ${coupons[i].id})" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>`;
    }
    `</tbody>
                                </table>`;
    document.getElementById("couponsTable").innerHTML = displayCouponsDashboard;
  } else if (connecteduser.role == "Admin") {
    for (let i = 0; i < coupons.length; i++) {
      if (connecteduser.id == coupons[i].adminId) {
        displayCouponsDashboard += `<tr>
                                            <td>${coupons[i].id}</td>
                                            <td>${coupons[i].ProductCategory}</td>
                                            <td>${coupons[i].ProductName}</td>
                                            <td style="text-align:right">${coupons[i].ProductPrice}</td>
                                            <td style="text-align:right">${coupons[i].Discount}</td>
                                            <td style="text-align:right">${coupons[i].Validity}</td>
                                            <td style="text-align:center">
                                            <button type="button" data-toggle="modal"
                                            data-target="#displayCoupon" onclick="displayCoupon(${coupons[i].id})" class="btn btn-info btn-sm"><i class="fas fa-tv"></i></button>
                                            <button type="button" data-toggle="modal"
                                            data-target="#editCoupon" onclick="editCoupons(${coupons[i].id})" class="btn btn-secondary btn-sm"><i class="fas fa-edit"></i></button>
                                            <button type="button" onclick="Delete(${i},'coupons', ${coupons[i].id})" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>`;
      }
      `</tbody>
                                </table>`;
      document.getElementById("couponsTable").innerHTML =
        displayCouponsDashboard;
    }
  } else {
    Swal.fire({
      imageUrl: "assets/img/restricted.png",
      imageWidth: 500,
      imageHeight: 350,
      showConfirmButton: false,
    });
    $(".swal2-modal").css("background-color", "transparent");
    setTimeout(() => {
      location.replace("index.html");
    }, 1700);
  }
}
function displayCouponShop() {
  var coupons = JSON.parse(localStorage.getItem("coupons"));
  var displayCouponsUser = ``;
  for (let i = 0; i < coupons.length; i++) {
    displayCouponsUser += `<div class="col-lg-4 col-md-6" ><div class="speaker" data-aos="fade-up" data-aos-delay="100">
      <img src="${
        coupons[i].ProductImage
      }" alt="Speaker 1" class="img-fluid" style="height:17rem; width:100%">
      <div class="details">
      <div style="display:flex; justify-content:space-between;"><h3 style="font-weight: none; margin-left: 7%"><a href="coupon-details.html#couponDetails" onclick="displayCouponDetails(${
        coupons[i].id
      })">${coupons[i].Discount + "% Off"}</a></h3>
      <h3 style="margin-right: 7%"><a href="coupon-details.html#couponDetails" onclick="displayCouponDetails(${
        coupons[i].id
      })">${coupons[i].ProductName}</a></h3></div>
            <div style="display:flex; justify-content:space-between;"><p style="margin-left: 7%">${newPrice(
              coupons[i].id
            )} TND</p>
            <p style="margin-right: 7%">${
              "Offer ends on " + coupons[i].Validity
            }</p></div>
            <div class="social">
            <button class="buy-tickets scrollto" onclick="getCoupon(${
              coupons[i].id
            })" type="button" id="displayLogin">Get Coupon</button>
            </div>
            </div>
          </div>          
          </div>`;
  }
  document.getElementById("productDisplay").innerHTML = displayCouponsUser;
}
/*----Display, Edit & Delete Coupons Dashboard According to ConnectedUser-----*/
function displayCoupon(id) {
  var coupons = JSON.parse(localStorage.getItem("coupons"));
  var object;
  var displayCoupon = "";
  for (let i = 0; i < coupons.length; i++) {
    if (coupons[i].id == id) {
      console.log(coupons[i]);
      object = coupons[i];
      displayCoupon += `
      <section oncontextmenu="return false" class="snippet-body modal" id="displayCoupon" tabindex="-1"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="col-lg-10 col-md-12 col-sm-12" style="width: 100%; margin: auto">
        <div class="panel border bg-white d-flex" style="align-items:center; flex-direction:column">
          <div class="panel-heading">
            <h3 class="pt-3 font-weight-bold" style="color: #373d41">
              Coupon Details
            </h3>
          </div>
          <div class="panel-body p-3 d-flex" style="justify-content:space-around; align-items:center">
            <form action="#" method="POST" class="col-6">
              <div class="form-group py-2" id="categories">
              <label style="color:gray">Product Category</label>
                <select name="Category" class="form-control-plaintext input-field" id="displayProductCategory" disabled=true style="width: 100%;" required><option>${object.ProductCategory}</option></select>
                <div><span id="productCategoryError"></span></div>
              </div>
              <div class="form-group py-2 pb-0">
              <label style="color:gray">Product Name</label>
                <div class="input-field">
                  <input type="text" class="form-control" placeholder="Product Name" disabled=true value="${object.ProductName}" required id="displayProductName" />
                </div>
                <div><span id="productNameError"></span></div>
              </div>
              <div style="display: flex;">
                <div class="form-group col-4">
                <label style="color:gray">Price</label>
                  <div class="input-field p-0">
                    <input type="number" class="form-control" placeholder="Price" disabled=true required style="width: 80%" value="${object.ProductPrice}" id="displayProductPrice" />
                    <span>TND</span>
                  </div>
                  <div><span id="productPriceError"></span></div>
                </div>
                <div class="form-group col-3">
                <label style="color:gray">Discount</label>
                  <div class="input-field p-0">
                    <input type="number" class="form-control" placeholder="Discount" disabled=true required style="width: 90%" value="${object.Discount}" id="displayDiscount" />
                    <span>%</span>
                  </div>
                  <div><span id="discountError"></span></div>
                </div>
                <div class="form-group  col-5">
                <label style="color:gray">Validity</label>
                  <div class="input-field p-0">
                    <input type="date" class="form-control" required style="width: 100%" disabled=true value="${object.Validity}" id="displayValidity" />
                  </div>
                  <div><span id="validityError"></span></div>
                </div>
              </div>
              <div class="form-group">
              <label style="color:gray">Description</label>
                <textarea class="form-control" id="displayDescription" disabled=true rows="3">${object.Description}</textarea>
                <div><span id="descriptionError"></span></div>
              </div>
            </form>
            <img src="${object.ProductImage}" alt="Speaker 1" class="img-fluid" style="height:21rem; width:21rem">
          </div>
          <a href="coupons.html" class="btn btn-secondary btn-block mt-2 mb-4 w-25">Return</a>
        </div>
      </div>

      <script type="text/javascript"></script>
    </section>`;
      document.getElementById("displayCouponForm").innerHTML = displayCoupon;
    }
  }
}
function editCoupons(id) {
  var coupons = JSON.parse(localStorage.getItem("coupons"));
  var object;
  var categories = JSON.parse(localStorage.getItem("categories"));
  var displayCoupon = "";
  for (let i = 0; i < coupons.length; i++) {
    if (coupons[i].id == id) {
      console.log(coupons[i]);
      object = coupons[i];
      displayCoupon += `
      <section oncontextmenu="return false" class="snippet-body modal" id="editCoupon" tabindex="-1"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="col-lg-10 col-md-12 col-sm-12" style="width: 100%; margin: auto">
        <div class="panel border bg-white d-flex" style="align-items:center; flex-direction:column">
          <div class="panel-heading">
            <h3 class="pt-3 font-weight-bold" style="color: #373d41">
              Coupon Details
            </h3>
          </div>
          <div class="panel-body p-3 d-flex" style="justify-content:space-around; align-items:center">
            <form action="#" method="POST" class="col-6">
              <div class="form-group py-2" id="categories">
              <label style="color:gray">Product Category</label>
                <select name="Category" class="form-control-plaintext input-field" id="editProductCategory" style="width: 100%;" required><option>${object.ProductCategory}</option>`;
      for (let i = 0; i < categories.length; i++) {
        displayCoupon += `<option value="${categories[i].CategoryName}">${categories[i].CategoryName}</option>`;
      }
      displayCoupon += `</select>
                <div><span id="productCategoryError"></span></div>
              </div>
              <div class="form-group py-2 pb-0">
              <label style="color:gray">Product Name</label>
                <div class="input-field">
                  <input type="text" class="form-control" placeholder="Product Name" value="${object.ProductName}" required id="editProductName" />
                </div>
                <div><span id="productNameError"></span></div>
              </div>
              <div style="display: flex;">
                <div class="form-group col-4">
                <label style="color:gray">Price</label>
                  <div class="input-field p-0">
                    <input type="number" class="form-control" placeholder="Price" required style="width: 80%" value="${object.ProductPrice}" id="editProductPrice" />
                    <span>TND</span>
                  </div>
                  <div><span id="productPriceError"></span></div>
                </div>
                <div class="form-group col-3">
                <label style="color:gray">Discount</label>
                  <div class="input-field p-0">
                    <input type="number" class="form-control" placeholder="Discount" required style="width: 90%" value="${object.Discount}" id="editDiscount" />
                    <span>%</span>
                  </div>
                  <div><span id="discountError"></span></div>
                </div>
                <div class="form-group  col-5">
                <label style="color:gray">Validity</label>
                  <div class="input-field p-0">
                    <input type="date" class="form-control" required style="width: 100%" value="${object.Validity}" id="editValidity" />
                  </div>
                  <div><span id="validityError"></span></div>
                </div>
              </div>
              <div class="form-group">
              <label style="color:gray">Description</label>
                <textarea class="form-control" id="editDescription" rows="3">${object.Description}</textarea>
                <div><span id="descriptionError"></span></div>
              </div>
            </form>
            <div><img src="${object.ProductImage}" alt="Speaker 1" class="img-fluid" style="height:21rem; width:21rem">
            <div class="input-field" style="border: none; display: flex; justify-content: center; width: 70%;margin: auto;">
                        <label style="cursor:pointer;"><i class="fas fa-images"></i> EDIT IMAGE PRODUCT<input type="file" class="form-control" required style="display: none;" id="editProductImage" /></label></div>
                      </div>
          </div>
          <a href="coupons.html" onclick="saveEditCoupons(${object.id})" class="btn btn-secondary btn-block mt-2 mb-4 w-25">Save Edit</a>
        </div>
      </div>

      <script type="text/javascript"></script>
    </section>`;
      document.getElementById("editCouponForm").innerHTML = displayCoupon;
    }
  }
}
function saveEditCoupons(id) {
  var editProductCategory = document.getElementById("editProductCategory").value;
  var editProductName = document.getElementById("editProductName").value;
  var editProductPrice = document.getElementById("editProductPrice").value;
  var editDiscount = document.getElementById("editDiscount").value;
  var editValidity = document.getElementById("editValidity").value;
  var editDescription = document.getElementById("editDescription").value;
  var editProductImage = document.getElementById("editProductImage").value;
  var coupon = JSON.parse(localStorage.getItem("coupons"));
  var image = replaceCh(editProductImage);
  if (
    editProductCategory != "Choose Category" &&
    editProductName != "" &&
    editProductPrice > 0 &&
    editDiscount > 0 &&
    editValidity > minDate &&
    editDescription != "" &&
    editProductImage != ""
  ){
  for (let i = 0; i < coupon.length; i++) {
    if (coupon[i].id == id) {
      coupon[i].ProductCategory = editProductCategory;
      coupon[i].ProductName = editProductName;
      coupon[i].ProductPrice = editProductPrice;
      coupon[i].Discount = editDiscount;
      coupon[i].Validity = editValidity;
      coupon[i].Description = editDescription;
      coupon[i].ProductImage = image;
    }
  }
  }
  localStorage.setItem("coupons", JSON.stringify(coupon));
  location.reload();
}
/*----Change Fakepath Image-----*/
function replaceCh(ch) {
  var newCh = ch.replace(
    "fakepath",
    "Users/MED SADDEM/Desktop/Nouveaudossier/CashBack/assets/img"
  );
  return newCh;
}
/*----Display Top Offers-----*/
function displayTopCoupon() {
  var coupons = JSON.parse(localStorage.getItem("coupons"));
  var displayTopCoupon = ``;
  coupons.sort((b, a) => a.Discount - b.Discount);
  for (let i = 0; i < coupons.length; i++) {
    if (i < 6) {
      displayTopCoupon += `<div class="col-lg-4 col-md-6" ><div class="speaker" data-aos="fade-up" data-aos-delay="100">
        <img src="${
          coupons[i].ProductImage
        }" alt="Speaker 1" class="img-fluid" style="height:17rem; width:100%">
        <div class="details">
        <div style="display:flex; justify-content:space-between;"><h3 style="font-weight: none; margin-left: 7%"><a href="coupon-details.html#couponDetails" onclick="displayCouponDetails(${
          coupons[i].id
        })">${coupons[i].Discount + "% Off"}</a></h3>
        <h3 style="margin-right: 7%"><a href="coupon-details.html#couponDetails" onclick="displayCouponDetails(${
          coupons[i].id
        })">${coupons[i].ProductName}</a></h3></div>
              <div style="display:flex; justify-content:space-between;"><p style="margin-left: 7%">${
                newPrice(coupons[i].id) + " TND"
              }</p>
              <p style="margin-right: 7%">${
                "Offer ends on " + coupons[i].Validity
              }</p></div>
              <div class="social">
              <button class="buy-tickets scrollto" onclick="getCoupon(${
                coupons[i].id
              })" type="button" id="displayLogin">Get Coupon</button>
              </div>
              </div>
            </div>          
            </div>`;
    }
  }
  document.getElementById("topCouponDisplay").innerHTML = displayTopCoupon;
}
/*----Get Coupon-----*/
function getCoupon(id) {
  var couponsSelected = JSON.parse(
    localStorage.getItem("couponsSelected") || "[]"
  );
  var selectionNumber = JSON.parse(
    localStorage.getItem("selectionNumber") || "0"
  );
  var connectedUser = JSON.parse(localStorage.getItem("connecteduser"));
  var couponSelected = searchById(id, "coupons");
  if (connectedUser) {
    couponSelected.idSelection = connectedUser.id;
  }
  couponsSelected.push(couponSelected);
  localStorage.setItem("couponsSelected", JSON.stringify(couponsSelected));
  localStorage.setItem("selectionNumber", JSON.stringify(selectionNumber + 1));
  setHeader();
  mySelection();
}
function mySelection() {
  var couponsSelected = JSON.parse(localStorage.getItem("couponsSelected"));
  var selectionNumber = JSON.parse(localStorage.getItem("selectionNumber"));
  var totalDiscount = 0;
  for (let i = 0; i < couponsSelected.length; i++) {
    totalDiscount +=
      Math.round(
        (Number(couponsSelected[i].ProductPrice) -
          (1 - Number(couponsSelected[i].Discount) / 100) *
            Number(couponsSelected[i].ProductPrice)) *
          100
      ) / 100;
  }
  var selection = `<h5 style="font-weight: bold; text-align: center;" id='test'>I print <span>${selectionNumber}</span> coupon(s), a reduction of <span>${totalDiscount}</span> TND</h5>`;
  document.getElementById("selection").innerHTML = selection;
}
function newPrice(id) {
  var coupon = searchById(id, "coupons");
  var discount = coupon.Discount / 100;
  var oldPrice = coupon.ProductPrice;
  var newPrice =
    Math.round((oldPrice * (1 - discount) + Number.EPSILON) * 100) / 100;
  return newPrice;
}
function code() {
  $("#qrCode").html(""); // <---Add this, which should clear it out on the next click
  var qrCode = new QRCode("qrCode");
  function makeCode() {
    function randomNumber(len) {
      var randomNumber;
      var n = "";
      for (var count = 0; count < len; count++) {
        randomNumber = Math.floor(Math.random() * 27);
        n += randomNumber.toString();
      }
      return n;
    }
    var value = randomNumber(17);
    var elText = value;
    qrCode.makeCode(elText);
  }
  makeCode();
}
function selectionPaper() {
  var couponsSelected = JSON.parse(localStorage.getItem("couponsSelected"));
  var connectedUser = JSON.parse(localStorage.getItem("connecteduser"));
  var invoice = ``;
  var today = new Date();
  var minDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var reference = Number(
    String(today.getFullYear()) +
      String(today.getMonth() + 1) +
      String(today.getDate()) +
      String(today.getSeconds())
  );
  invoice = `
    <div class="d-flex"><div>
        <h2 class="to" style="text-transform: capitalize;">${
          connectedUser.username
        }</h2>
        <div class="email" style="margin-bottom: 7%"><a href="mailto:${
          connectedUser.email
        }">${connectedUser.email}</a>
        </div></div>
    <div class="col invoice-details">
        <h3 class="invoice-id" id="reference" value="Increment" style="margin:0;">${
          "Selection N°" + reference
        }</h3>
        <div class="date">Date : ${minDate}</div>
    </div></div>
<table>
    <thead>
        <tr>
            <th class="text-left"><h5 style="font-weight:bold">COUPON(S)</h5></th>
            <th class="text-right unit">VALIDITY</th>
            <th class="text-right unit">DISCOUNT (%)</th>
            <th class="text-right unit" style="font-weight:bold">PRICE (TND)</th>
        </tr>
    </thead>
    <tbody>`;
  for (let i = 0; i < couponsSelected.length; i++) {
    invoice += `<tr>
            <td class="text-left"><h4>${
              couponsSelected[i].ProductName
            }</h4></td>
            <td class="unit">${couponsSelected[i].Validity}</td>
            <td class="qty">${couponsSelected[i].Discount}</td>
            <td class="unit" style="font-weight:bold">${
              Math.round(
                (couponsSelected[i].ProductPrice *
                  (1 - couponsSelected[i].Discount / 100) +
                  Number.EPSILON) *
                  100
              ) / 100
            }</td>
        </tr>
      `;
  }
  `</tbody>
</table>`;
  document.getElementById("selection").innerHTML = invoice;

  window.print();

  //   $(function () {
  //     print();
  //     var element = document.getElementById('exportPdf');
  //     html2pdf(element, {
  //         margin: 0.2,
  //         filename: 'myfile.pdf',
  //         image: { type: 'jpeg', quality: 1 },
  //         html2canvas: {scale: 5, logging: true},
  //         jsPDF: { unit: 'in', format: 'a4', orientation: 'l' }
  //     });
  // });
}
function printSelection() {
  var connectedUser = JSON.parse(localStorage.getItem("connecteduser"));
  if (connectedUser) {
    location.replace("selection-paper.html");
  } else {
    location.replace("#signUpForm");
  }
}
/*----Display Coupons By Category-----*/
function categories(id) {
  var categorySelected = searchById(id, "categories");
  location.reload();
  location.replace("categories.html#speakers");
  localStorage.setItem("categorySelected", JSON.stringify(categorySelected));
}
function displayCouponByCategory() {
  var categorySelected = JSON.parse(localStorage.getItem("categorySelected"));
  var coupons = JSON.parse(localStorage.getItem("coupons"));
  var displayCouponByCategory = `<div class="section-header"><h2>${categorySelected.CategoryName}</h2><p>Here are the coupons of ${categorySelected.CategoryName}</p></div><div class="row">`;
  for (let i = 0; i < coupons.length; i++) {
    if (coupons[i].ProductCategory == categorySelected.CategoryName) {
      displayCouponByCategory += `<div class="col-lg-4 col-md-6" ><div class="speaker" data-aos="fade-up" data-aos-delay="100">
          <img src="${
            coupons[i].ProductImage
          }" alt="Speaker 1" class="img-fluid" style="height:17rem; width:100%">
        <div class="details">
           <div style="display:flex; justify-content:space-between;"><h3 style="font-weight: none; margin-left: 7%"><a href="coupon-details.html#couponDetails" onclick="displayCouponDetails(${
             coupons[i].id
           })">${coupons[i].Discount + "% Off"}</a></h3>
           <h3 style="margin-right: 7%"><a href="coupon-details.html#couponDetails" onclick="displayCouponDetails(${
             coupons[i].id
           })">${coupons[i].ProductName}</a></h3></div>
                 <div style="display:flex; justify-content:space-between;"><p style="margin-left: 7%">${newPrice(
                   coupons[i].id
                 )} TND</p>
                 <p style="margin-right: 7%">${
                   "Offer ends on " + coupons[i].Validity
                 }</p></div>
                 <div class="social">
                 <button class="buy-tickets scrollto" onclick="getCoupon(${
                   coupons[i].id
                 })" type="button" id="displayLogin">Get Coupon</button>
                 </div>
                 </div>
               </div>          
              </div>`;
    }
  }
  document.getElementById("productDisplayByCategory").innerHTML = displayCouponByCategory;
}
/*----Display Coupon Details-----*/
function displayCouponDetails(id) {
  var couponDetails = searchById(id, "coupons");
  var coupons = JSON.parse(localStorage.getItem("coupons"));
  var displayCouponDetails = ``;
  for (let i = 0; i < coupons.length; i++) {
    if (coupons[i].id == couponDetails.id) {
      displayCouponDetails += `<div class="col-md-6">
  <img src="${
    coupons[i].ProductImage
  }" alt="Speaker 1" class="img-fluid" style="height:27rem; width:100%">
</div>
<div class="col-md-6">
  <div class="details">
    <h2>${coupons[i].ProductName}</h2>
    <div class="social">
      <h5>${coupons[i].Discount + "% Off"}</h5>
      <h5>${newPrice(coupons[i].id)} TND</h5>
      <h5>${"Offer ends on " + coupons[i].Validity}</h5>
    </div>
    <p style="text-align:justify">${coupons[i].Description}</p>
    <div class="d-flex justify-content-center">
    <button class="buy-tickets getCouponButton scrollto" onclick="getCoupon(${
      coupons[i].id
    })" type="button" id="displayLogin">Get Coupon</button>
    </div>
    
  </div>
</div>`;
    }
  }
  document.getElementById("couponDetails").innerHTML = displayCouponDetails;
}
/*----Search Coupons By Category & Input-----*/
function searchByCategory(key1, key2) {
  var categorySearch = document.getElementById(key1).value;
  var couponSearch = document.getElementById(key2).value;
  var couponSearchByInput = couponSearch.toLowerCase("").split(" ");
  var coupons = JSON.parse(localStorage.getItem("coupons"));
  var couponFounded = [];
  for (let i = 0; i < coupons.length; i++) {
    coupons[i].ProductName = coupons[i].ProductName.toLowerCase("").split(" ");
    for (let k = 0; k < coupons[i].ProductName.length; k++) {
      for (let j = 0; j < couponSearchByInput.length; j++) {
      if (categorySearch == coupons[i].ProductCategory || categorySearch == "Choose Category") {
        if (couponSearchByInput[j] == coupons[i].ProductName[k]) {
          couponFounded.push(coupons[i]);
        }
      }
    }
  }
}
  localStorage.setItem("couponFounded", JSON.stringify(couponFounded));
}
function displaySearchByCategory() {
  var coupons = JSON.parse(localStorage.getItem("coupons"));
  var couponFounded = JSON.parse(localStorage.getItem("couponFounded"));
  var displayCouponsFounded = ``;
  for (let i = 0; i < couponFounded.length; i++) {
  for (let j = 0; j < coupons.length; j++) {
    if(coupons[j].id == couponFounded[i].id){
    displayCouponsFounded += `<div class="col-lg-4 col-md-6" ><div class="speaker" data-aos="fade-up" data-aos-delay="100">
      <img src="${
        coupons[j].ProductImage
      }" alt="Speaker 1" class="img-fluid" style="height:17rem; width:100%">
      <div class="details">
      <div style="display:flex; justify-content:space-between;"><h3 style="font-weight: none; margin-left: 7%"><a href="coupon-details.html#couponDetails" onclick="displayCouponDetails(${
        coupons[j].id
      })">${coupons[j].Discount + "% Off"}</a></h3>
      <h3 style="margin-right: 7%"><a href="coupon-details.html#couponDetails" onclick="displayCouponDetails(${
        coupons[j].id
      })">${coupons[j].ProductName}</a></h3></div>
            <div style="display:flex; justify-content:space-between;"><p style="margin-left: 7%">${newPrice(
              coupons[j].id
            )} TND</p>
            <p style="margin-right: 7%">${
              "Offer ends on " + coupons[j].Validity
            }</p></div>
            <div class="social">
            <button class="buy-tickets scrollto" onclick="getCoupon(${
              coupons[j].id
            })" type="button" id="displayLogin">Get Coupon</button>
            </div>
            </div>
          </div>          
          </div>`;
    }
  }
}
  document.getElementById("searchedCoupon").innerHTML = displayCouponsFounded;
}
/*----Add Admin By SuperAdmin-----*/
function addAdmins() {
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var admin = JSON.parse(localStorage.getItem("users") || "[]");
  var userId = JSON.parse(localStorage.getItem("userId") || "2");

  verifyUsername = verifyLength(username, 3, 15);
  verifyEmail = validateEmail(email);
  verifyPassword = validatePassword(password);
  if (!verifyUsername) {
    document.getElementById("usernameAdminError").innerHTML =
      "Username must be between 3 and 15 characters";
    document.getElementById("usernameAdminError").style.color = "red";
  }
  if (!verifyEmail) {
    document.getElementById("emailAdminError").innerHTML =
      "Enter a valid email address";
    document.getElementById("emailAdminError").style.color = "red";
  }
  if (!verifyPassword) {
    document.getElementById("passwordAdminError").innerHTML =
      "Password must be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
    document.getElementById("passwordAdminError").style.color = "red";
  } else if (confirmPassword != password) {
    document.getElementById("confirmPasswordAdminError").innerHTML =
      "Password and confirm password does not match";
    document.getElementById("confirmPasswordAdminError").style.color = "red";
  }

  var emailExist = false;
  for (let i = 0; i < admin.length; i++) {
    if (admin[i].email == email) {
      emailExist = true;
      document.getElementById("emailAdminError").innerHTML =
        "Email already Exist";
      document.getElementById("emailAdminError").style.color = "red";
    }
  }

  if (
    emailExist == false &&
    verifyUsername != "" &&
    verifyEmail != "" &&
    verifyPassword &&
    verifyUsername &&
    verifyEmail &&
    verifyPassword &&
    password == confirmPassword
  ) {
    var allAdmins = {
      id: userId,
      username: username,
      email: email,
      role: "Admin",
      password: password,
      confirmPassword: confirmPassword,
    };
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Admin has been added Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    admin.push(allAdmins);
    localStorage.setItem("userId", userId + 1);
    localStorage.setItem("users", JSON.stringify(admin));
    setTimeout(() => {
      location.reload();
      location.replace("admin.html");
    }, 1500);
  }
}
/*----Display, Edit & Delete All Users Dashboard-----*/
function displayUsersDashboard(key, key1, key2) {
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var connectedUser = JSON.parse(localStorage.getItem("connecteduser"));
  var key1 = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].role == key2) {
      key1.push(users[i]);
    }
  }
  if (connectedUser.role == "superadmin") {
    var displayUsersTable = `<table id="datatablesSimple">
                                <thead>
                                    <tr>
                                    <th style="text-align:center">Id</th>
                                    <th style="text-align:center">Username</th>
                                    <th style="text-align:center">Email</th>
                                    <th style="text-align:center">Role</th>
                                    <th style="text-align:center">Password</th>
                                    <th style="text-align:center">Confirm Password</th>
                                    <th style="text-align:center">Action</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th style="text-align:center">Id</th>
                                        <th style="text-align:center">Username</th>
                                        <th style="text-align:center">Email</th>
                                        <th style="text-align:center">Role</th>
                                        <th style="text-align:center">Password</th>
                                        <th style="text-align:center">Confirm Password</th>
                                        <th style="text-align:center">Action</th>
                                    </tr>
                                </tfoot>
                                <tbody>`;
    for (let i = 0; i < key1.length; i++) {
      displayUsersTable += `<tr>
                                        <td style="text-align:center">${key1[i].id}</td>
                                        <td style="text-align:center">${key1[i].username}</td>
                                        <td style="text-align:center">${key1[i].email}</td>
                                        <td style="text-align:center">${key1[i].role}</td>
                                        <td style="text-align:center">${key1[i].password}</td>
                                        <td style="text-align:center">${key1[i].confirmPassword}</td>
                                        <td style="text-align:center">
                                        <button type="button" class="btn btn-info btn-sm" data-toggle="modal"
                                        data-target="#displayUser" onclick="displayUsers(${key1[i].id})"><i class="fas fa-tv"></i></button>
                                        <button type="button" class="btn btn-secondary btn-sm" data-toggle="modal"
                                        data-target="#editUser" onclick="editUsers(${key1[i].id})"><i class="fas fa-user-edit"></i></button>
                                        <button type="button" class="btn btn-danger btn-sm" onclick="Delete(${i},'users', ${key1[i].id})"><i class="fas fa-user-times"></i></button>
                                        </td>
                                    </tr>`;
    }
    `</tbody>
                            </table>`;
    document.getElementById(key).innerHTML = displayUsersTable;
  } else {
    document.getElementById(key).innerHTML = Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Restricted Area !!! Reserved Only for Super Admin",
    });
    setTimeout(() => {
      location.replace("dashboard.html");
    }, 2000);
  }
}
function displayUsers(id) {
  var user = searchById(id, "users");
  var displayUser = "";
  displayUser += `<section oncontextmenu="return false" class="snippet-body modal" id="displayUser" tabindex="-1"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="col-lg-5 col-md-7 col-sm-11" style="width: 100%; margin: auto;">
    <div class="panel border bg-white">
      <div class="panel-heading">
        <h3 class="pt-3 font-weight-bold" style="color: #373d41; ">Profile Details</h3>
      </div>
      <div class="panel-body p-3">
        <div>
          <div class="form-group py-2">
          <label style="color:gray">Username</label>
            <div class="input-field">
              <input id="username" class="form-control" type="text" placeholder="Enter your Username" disabled=true value="${user.username}" required/>
            </div>
            <div>
              <span id="usernameError"></span>
            </div>
          </div>
          <div class="form-group py-2">
          <label style="color:gray">E-mail</label>
            <div class="input-field">
              <input id="email" class="form-control" type="email" placeholder="Enter your E-mail" disabled=true value="${user.email}" required/>
            </div>
            <div>
              <span id="emailError"></span>
            </div>
          </div>
          <div class="form-group py-1 pb-2">
          <label style="color:gray">Password</label>
            <div class="input-field">
              <input id="passwordSignUp" class="form-control" type="text" placeholder="Enter your Password" disabled=true value="${user.password}" required/>
              
            </div>
            <div>
              <span id="passwordError"></span>
            </div>
          </div>
          <div class="form-group py-1 pb-2">
          <label style="color:gray">Confirm Password</label>
            <div class="input-field">
              <input id="confirmPasswordSignUp" type="text" class="form-control" placeholder="Confirm your Password" disabled=true value="${user.confirmPassword}"
                required />
              
            </div>
            <div>
              <span id="confirmPasswordError"></span>
            </div>
          </div>
          <a href="users.html" class="btn btn-secondary btn-block mt-3">Return</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
  <script type="text/javascript"></script>
</section>`;
  document.getElementById("displayProfileDetails").innerHTML = displayUser;
}
function editUsers(id) {
  var user = searchById(id, "users");
  var editForm = "";
  editForm += `<section oncontextmenu="return false" class="snippet-body modal" id="editUser" tabindex="-1"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="col-lg-5 col-md-7 col-sm-11" style="width: 100%; margin: auto;">
    <div class="panel border bg-white">
      <div class="panel-heading">
        <h3 class="pt-3 font-weight-bold" style="color: #373d41; ">Edit Profile</h3>
      </div>
      <div class="panel-body p-3">
        <div>
          <div class="form-group py-2">
          <label style="color:gray">Username</label>
            <div class="input-field">
              <input id="usernameEdit" class="form-control" type="text" placeholder="Enter your Username" value="${user.username}" required/>
            </div>
            <div>
              <span id="usernameError"></span>
            </div>
          </div>
          <div class="form-group py-2">
          <label style="color:gray">E-mail</label>
            <div class="input-field">
              <input id="emailEdit" class="form-control" type="email" placeholder="Enter your E-mail" value="${user.email}" required/>
            </div>
            <div>
              <span id="emailError"></span>
            </div>
          </div>
          <div class="form-group py-1 pb-2">
          <label style="color:gray">Password</label>
            <div class="input-field">
              <input id="passwordEdit" class="form-control" type="text" placeholder="Enter your Password" value="${user.password}" required/>
              
            </div>
            <div>
              <span id="passwordError"></span>
            </div>
          </div>
          <div class="form-group py-1 pb-2">
          <label style="color:gray">Confirm Password</label>
            <div class="input-field">
              <input id="confirmPasswordEdit" type="text" class="form-control" placeholder="Confirm your Password" value="${user.confirmPassword}"
                required />
              
            </div>
            <div>
              <span id="confirmPasswordError"></span>
            </div>
          </div>
          <div class="form-group py-1 pb-2">
            <div class="input-field">
            <select id="role" class="form-control" style="width:100%">
            <option selected>User</option>
            <option>Admin</option>
            </select>
            </div>
          </div>
          <a href="#" onclick="saveEdit(${user.id})"class="btn btn-secondary btn-block mt-3">Save Edit</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
  <script type="text/javascript"></script>
</section>`;
  document.getElementById("editForm").innerHTML = editForm;
}
function saveEdit(id) {
  var profileEdit = searchById(id, "users");
  var usernameEdit = document.getElementById("usernameEdit").value;
  var emailEdit = document.getElementById("emailEdit").value;
  var passwordEdit = document.getElementById("passwordEdit").value;
  var confirmPasswordEdit = document.getElementById(
    "confirmPasswordEdit"
  ).value;
  var roleEdit = document.getElementById("role").value;
  var user = JSON.parse(localStorage.getItem("users"));
  var verifyEditUser = verifyLength(usernameEdit, 3, 15);
  var verifyEmail = validateEmail(emailEdit);
  var verifyPassword = validatePassword(passwordEdit);
  var verifyConfirmPassword = validatePassword(confirmPasswordEdit);
  if (!verifyEditUser) {
    document.getElementById("usernameError").innerHTML =
      "Username must be between 3 and 15 characters";
    document.getElementById("usernameError").style.color = "red";
  }
  if (!verifyEmail) {
    document.getElementById("emailError").innerHTML =
      "Please enter a valid email";
    document.getElementById("emailError").style.color = "red";
  }
  if (!verifyPassword) {
    document.getElementById("passwordError").innerHTML =
      "password must be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
    document.getElementById("passwordError").style.color = "red";
  }
  if (!verifyConfirmPassword) {
    document.getElementById("confirmPasswordError").innerHTML =
      "Password and confirm password does not match";
    document.getElementById("confirmPasswordError").style.color = "red";
  }
  if (
    verifyEditUser &&
    verifyEmail &&
    verifyPassword &&
    passwordEdit == confirmPasswordEdit
  ) {
    for (let i = 0; i < user.length; i++) {
      if (user[i].id == profileEdit.id) {
        user[i].username = usernameEdit;
        user[i].email = emailEdit;
        user[i].password = passwordEdit;
        user[i].confirmPassword = confirmPasswordEdit;
        user[i].role = roleEdit;
      }
    }
    localStorage.setItem("users", JSON.stringify(user));
    location.reload();
  }
}
/*-----Add, Display & Send Messages----- */
function addMessages() {
  var username = document.getElementById("usernameuser").value;
  console.log(username);
  var email = document.getElementById("emailuser").value;
  console.log(email);
  var subject = document.getElementById("subject").value;
  console.log(subject);
  var message = document.getElementById("message").value;
  console.log(message);
  var messages = JSON.parse(localStorage.getItem("messages") || "[]");
  var messagesId = JSON.parse(localStorage.getItem("messagesId") || "1");
  verifyusername = verifyLength(username, 3, 15);
  verifyEmail = validateEmail(email);
  verifySubject = verifyLength(subject, 2, 30);
  verifyMessage = verifyLength(message, 5, 200);
  if (!verifyusername) {
    document.getElementById("usernameMessageError").innerHTML =
      "Username must be between 3 and 15 characters";
    document.getElementById("usernameMessageError").style.color = "red";
  }
  if (!verifyEmail) {
    document.getElementById("emailMessageError").innerHTML =
      "Please Enter a valid email address";
    document.getElementById("emailMessageError").style.color = "red";
  }
  if (!verifySubject) {
    document.getElementById("subjectError").innerHTML =
      "Subject must be between 2 and 30 characters";
    document.getElementById("subjectError").style.color = "red";
  }
  if (!verifyMessage) {
    document.getElementById("messageError").innerHTML =
      "Message must be between 5 and 200 characters";
    document.getElementById("messageError").style.color = "red";
  }
  if (verifyusername && verifyEmail && verifySubject && verifyMessage) {
    var allmessages = {
      id: messagesId,
      username: username,
      email: email,
      subject: subject,
      message: message,
      status: "waiting to answer",
    };

    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);

        messages.push(allmessages);
        localStorage.setItem("messagesId", messagesId + 1);
        localStorage.setItem("messages", JSON.stringify(messages));

        setTimeout(() => {
          location.reload();
        }, 2000);
        displayMessagesDashboard();
      },
    });

    Toast.fire({
      icon: "success",
      title: "Your message Request was Sent Successfully",
    });
  }
}
function displayMessagesDashboard() {
  var messages = JSON.parse(localStorage.getItem("messages"));
  var displayMessagesTable = "";

  displayMessagesTable += `<table id="datatablesSimple">
  <thead>
      <tr>
      <th style="text-align:center">Id</th>
      <th style="text-align:center">Username</th>
      <th style="text-align:center">Email</th>
      <th style="text-align:center">Subject</th>
      <th style="text-align:center">Message</th>
      <th style="text-align:center">Status</th>
      <th style="text-align:center">Action</th>
      </tr>
  </thead>
  <tfoot>
  <tr>
  <th style="text-align:center">Id</th>
  <th style="text-align:center">Username</th>
  <th style="text-align:center">Email</th>
  <th style="text-align:center">Subject</th>
  <th style="text-align:center">Message</th>
  <th style="text-align:center">Status</th>
  <th style="text-align:center">Action</th>
  </tr>
  </tfoot>
  <tbody>`;
  for (let i = 0; i < messages.length; i++) {
    displayMessagesTable += `<tr>
          <td style="text-align:center">${messages[i].id}</td>
          <td style="text-align:center">${messages[i].username}</td>
          <td style="text-align:center">${messages[i].email}</td>
          <td style="text-align:center">${messages[i].subject}</td>
          <td style="text-align:left">${messages[i].message}</td>
          <td style="text-align:center">${messages[i].status}</td>
          <td style="text-align:center">
          <button type="button" class="btn btn-info btn-sm" data-toggle="modal"
          data-target="#answerMessage" onclick="answerMessages(${messages[i].id})"><i class="fas fa-reply"></i></button>
          <button type="button" class="btn btn-danger btn-sm" onclick="Delete(${i},'messages', ${messages[i].id})"><i class="fas fa-trash-alt"></i></button>
          </td>
      </tr>`;
  }
  displayMessagesTable += `</tbody>
</table>`;
  document.getElementById("messagesTable").innerHTML = displayMessagesTable;
}
function answerMessages(id) {
  mymessage = searchById(id, "messages");
  var answerForm = "";
  answerForm += `<section oncontextmenu="return false" class="snippet-body modal" id="answerMessage" tabindex="-1"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="col-lg-5 col-md-7 col-sm-11" style="width: 100%; margin: auto;">
    <div class="panel border bg-white">
      <div class="panel-heading">
        <h3 class="pt-3 font-weight-bold" style="color: #373d41; ">Message Details</h3>
      </div>
      <div class="panel-body p-3">
        <div>
          <div class="form-group">
          <label style="color:gray">Username</label>
            <div class="input-field">
              <input id="usernameMessage" class="form-control" type="text" readonly=true value="${mymessage.username}"  placeholder="Enter your Username" required/>
            </div>
            <div>
              <span id="usernameError"></span>
            </div>
          </div>
          <div class="form-group">
          <label style="color:gray">E-mail</label>
            <div class="input-field">
              <input id="emailMessage" class="form-control" type="email" readonly=true value="${mymessage.email}" placeholder="Enter your E-mail" required/>
            </div>
            <div>
              <span id="emailError"></span>
            </div>
          </div>
          <div class="form-group">
          <label style="color:gray">Subject</label>
            <div class="input-field">
              <input id="subjectMessage" class="form-control" type="text" readonly=true value="${mymessage.subject}" placeholder="Enter your Password" required/>
            </div>
            <div>
              <span id="passwordError"></span>
            </div>
          </div>
          <div class="form-group">
          <label style="color:gray">Message</label>
            <div class="input-field">
              <textarea id="message" type="password" class="form-control" readonly=true value="" placeholder="Confirm your Password" required>${mymessage.message}</textarea>
    
            </div>
            
          </div>
          <div class="form-group">
            <div class="input-field">
              <textarea id="sendMessage" type="text" class="form-control" value="" placeholder="Answer message" required></textarea>

            </div>
            <div><span id="answerError"></span></div>
          </div>
          <div onclick="sendMessages(${mymessage.id})" class="btn btn-secondary btn-block mt-3">Send Answer</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
  <script type="text/javascript"></script>
</section>`;
  document.getElementById("messageDetails").innerHTML = answerForm;
}
function sendMessages(id) {
  var messageToSend = document.getElementById("sendMessage").value;
  var message = searchById(id, "messages");
  console.log(message);
  if (messageToSend == "") {
    document.getElementById("answerError").innerHTML =
      "Please Enter your Message";
    document.getElementById("answerError").style.color = "red";
  } else {
    var messages = JSON.parse(localStorage.getItem("messages"));
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].id == id) {
        messages[i].status = "answered";
      }
    }
    const Toast = Swal.mixin({
      toast: true,
      position: "top-center",
      showConfirmButton: false,
      timer: 1700,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);

        localStorage.setItem("messages", JSON.stringify(messages));
        setTimeout(() => {
          location.reload();
        }, 1700);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Your message was sent successfully",
    });
  }
}
/*------Admin Request----- */
function signupForAdmin() {
  var username = document.getElementById("userNameAdmin").value;
  var email = document.getElementById("emailAdmin").value;
  var password = document.getElementById("passwordAdmin").value;
  var confirmPassword = document.getElementById("confirmPasswordAdmin").value;
  var phone = document.getElementById("phoneAdmin").value;
  var requestAdmin = JSON.parse(localStorage.getItem("users"));
  var userId = JSON.parse(localStorage.getItem("userId"));
  var verifyusername = verifyLength(username, 3, 15);
  var verifyEmail = validateEmail(email);
  var verifyPassword = validatePassword(password);
  var verifyPhoneNumber = phoneNumber(phone);
  if (!verifyusername) {
    document.getElementById("userNameAdminError").innerHTML =
      "username must be between 3 and 15 characters";
    document.getElementById("userNameAdminError").style.color = "red";
  }
  if (!verifyEmail) {
    document.getElementById("emailAdminError").innerHTML =
      "Please Enter a valid Email";
    document.getElementById("emailAdminError").style.color = "red";
  }
  if (!verifyPassword) {
    document.getElementById("passwordAdminError").innerHTML =
      "Password must be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
    document.getElementById("passwordAdminError").style.color = "red";
  }
  if (password != confirmPassword) {
    document.getElementById("confirmPasswordAdminError").innerHTML =
      "Password and confirm password does not match";
    document.getElementById("confirmPasswordAdminError").style.color = "red";
  }
  if (!verifyPhoneNumber) {
    document.getElementById("phoneAdminError").innerHTML =
      "Please Enter a valid Phone Number";
    document.getElementById("phoneAdminError").style.color = "red";
  }
  if (
    verifyusername &&
    verifyEmail &&
    verifyPassword &&
    password == confirmPassword &&
    verifyPhoneNumber
  ) {
    var allRequestAdmin = {
      id: userId,
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      phone: phone,
      role: "Request Admin",
    };
    requestAdmin.push(allRequestAdmin);
    localStorage.setItem("userId", userId + 1);
    localStorage.setItem("users", JSON.stringify(requestAdmin));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your request was successfully sent",
      showConfirmButton: false,
      timer: 2500,
    });
    setTimeout(() => {
      location.reload();
    }, 2300);
  }
}
function displayBusinessRequest() {
  var businessRequestAdmin = JSON.parse(localStorage.getItem("users"));
  var connectedUser = JSON.parse(localStorage.getItem("connecteduser"));
  var adminRequest = [];
  for (let i = 0; i < businessRequestAdmin.length; i++) {
    if (businessRequestAdmin[i].role === "Request Admin") {
      adminRequest.push(businessRequestAdmin[i]);
    }
  }
  if (connectedUser.role == "superadmin") {
    var displayBusinessRequestTable = "";

    displayBusinessRequestTable += `<table id="datatablesSimple">
  <thead>
      <tr>
      <th style="text-align:center">Id</th>
      <th style="text-align:center">Username</th>
      <th style="text-align:center">Email</th>
      <th style="text-align:center">Password</th>
      <th style="text-align:center">Confirm Password</th>
      <th style="text-align:center">Phone</th>
      <th style="text-align:center">Role</th>
      <th style="text-align:center">Action</th>
      </tr>
  </thead>
  <tfoot>
  <tr>
      <th style="text-align:center">Id</th>
      <th style="text-align:center">User Name</th>
      <th style="text-align:center">Email</th>
      <th style="text-align:center">Password</th>
      <th style="text-align:center">Confirm Password</th>
      <th style="text-align:center">Phone</th>
      <th style="text-align:center">Role</th>
      <th style="text-align:center">Action</th>
      </tr>
  </tfoot>
  <tbody>`;
    for (let i = 0; i < adminRequest.length; i++) {
      displayBusinessRequestTable += `<tr>
          <td style="text-align:center">${adminRequest[i].id}</td>
          <td style="text-align:center">${adminRequest[i].username}</td>
          <td style="text-align:center">${adminRequest[i].email}</td>
          <td style="text-align:center">${adminRequest[i].password}</td>
          <td style="text-align:center">${adminRequest[i].confirmPassword}</td>
          <td style="text-align:center">${adminRequest[i].phone}</td>
          <td style="text-align:center">${adminRequest[i].role}</td>
          <td style="text-align:center">
          <button type="button" class="btn btn-info btn-sm" onclick="answerRequest(${adminRequest[i].id})"><i class="fas fa-user-plus"></i></button>
          <button type="button" class="btn btn-danger btn-sm" onclick="Delete(${i},'users', ${adminRequest[i].id})"><i class="fas fa-trash-alt"></i></button>
          </td>
      </tr>`;
    }
    displayBusinessRequestTable += `</tbody>
</table>`;
    document.getElementById("businessRequestTable").innerHTML =
      displayBusinessRequestTable;
  } else if (connectedUser.role == "Admin") {
    document.getElementById("businessRequestTable").innerHTML = Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "District Area !!! Reserved Only for Super Admin",
    });
    setTimeout(() => {
      location.replace("dashboard.html");
    }, 2000);
  }
}
function answerRequest(id) {
  var answerAdmin = searchById(id, "users");
  var users = JSON.parse(localStorage.getItem("users"));
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == answerAdmin.id) {
      users[i].role = "Admin";
      Swal.fire({
        position: "center",
        icon: "success",
        title: "You added a new Admin",
        showConfirmButton: false,
        timer: 2500,
      });
      setTimeout(() => {
        location.reload();
      }, 2300);
    }
  }
  localStorage.setItem("users", JSON.stringify(users));
}
/*--------Set Header------ */
function setHeader() {
  var connectedUser = JSON.parse(localStorage.getItem("connecteduser"));
  var categories = JSON.parse(localStorage.getItem("categories"));
  var selectionNumber = JSON.parse(localStorage.getItem("selectionNumber"));
  var header = "";
  if (connectedUser) {
    if (connectedUser.role == "User") {
      header += `
    <ul>
      <li><a class="nav-link scrollto" href="index.html">Home</a></li>
      <li><a class="nav-link scrollto" href="index.html#about">About</a></li>
      <li><a class="nav-link scrollto" href="index.html#works">How It Works</a></li>
      <li><a class="nav-link scrollto" href="index.html#topOffers">Top Offers</a></li>
      <li class="dropdown"><a href="shop.html"><span>Categories</span> <i class="bi bi-chevron-down"></i></a>
            <ul id="displayCategoriesShop">`;
      for (let i = 0; i < categories.length; i++) {
        header += `<li><a href="categories.html#speakers" onclick="categories(${categories[i].id})">${categories[i].CategoryName}</a></li>`;
      }
      header += `</ul>
          </li>
          <li><a class="nav-link scrollto" href="#subscribe">Add Your Business</a></li>
          <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
            <li><a class="buy-tickets scrollto" href="#" type="button" data-toggle="modal" data-target="#mySelection">My Selection<span style="margin-left: 5px;" id="mySelectionNumber">${selectionNumber}</span></a></li>
      <li class="nav-item dropdown"><a href="#" aria-expanded="false" data-bs-toggle="dropdown"><span>${connectedUser.username}</span> <i class="bi bi-chevron-down"></i></a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" style="right: 0;left:auto">
          <li><a class="dropdown-item" href="" data-toggle="modal"
          data-target="#editProfile">Edit Profile</a></li>
          <li><a class="dropdown-item" href="#buy-tickets" type="button" onclick="logout()">Logout</a></li>
        </ul>
      </li>
    </ul> `;
    } else if (connectedUser.role == "Admin") {
      header += `
      <ul>
      <li><a class="nav-link scrollto" href="index.html">Home</a></li>
      <li><a class="nav-link scrollto" href="index.html#about">About</a></li>
      <li><a class="nav-link scrollto" href="index.html#works">How It Works</a></li>
      <li><a class="nav-link scrollto" href="index.html#topOffers">Top Offers</a></li>
      <li class="dropdown"><a href="shop.html"><span>Categories</span> <i class="bi bi-chevron-down"></i></a>
            <ul id="displayCategoriesShop">`;
      for (let i = 0; i < categories.length; i++) {
        header += `<li><a href="categories.html#speakers" onclick="categories(${categories[i].id})">${categories[i].CategoryName}</a></li>`;
      }
      header += `</ul>
          </li>
          <li><a class="nav-link scrollto" href="coupons.html">Dashboard</a></li>
          <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
      <li class="dropdown"><a href="#"><span>${connectedUser.username}</span> <i class="bi bi-chevron-down"></i></a>
        <ul class="dropdown" style="right: 0;left:auto">
          <li class="dropdown"><a href="" data-toggle="modal"
          data-target="#editProfile">Edit Profile</a></li>
          <li><a class="dropdown" href="#buy-tickets" type="button" onclick="logout()">Logout</a></li>
        </ul>
      </li>
    </ul> `;
    } else if (connectedUser.role == "superadmin") {
      header += `
      <ul>
      <li><a class="nav-link scrollto" href="index.html">Home</a></li>
      <li><a class="nav-link scrollto" href="index.html#about">About</a></li>
      <li><a class="nav-link scrollto" href="index.html#works">How It Works</a></li>
      <li><a class="nav-link scrollto" href="index.html#topOffers">Top Offers</a></li>
      <li class="dropdown"><a href="shop.html"><span>Categories</span> <i class="bi bi-chevron-down"></i></a>
            <ul id="displayCategoriesShop">`;
      for (let i = 0; i < categories.length; i++) {
        header += `<li><a href="categories.html#speakers" onclick="categories(${categories[i].id})">${categories[i].CategoryName}</a></li>`;
      }
      header += `</ul>
          </li>
          <li><a class="nav-link scrollto" href="messages.html">Dashboard</a></li>
          <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
      <li class="dropdown"><a href="#"><span>${connectedUser.username}</span> <i class="bi bi-chevron-down"></i></a>
        <ul class="dropdown" style="right: 0;left:auto">
          <li class="dropdown"><a href="" data-toggle="modal"
          data-target="#editProfile">Edit Profile</a></li>
          <li><a class="dropdown" href="#buy-tickets" type="button" onclick="logout()">Logout</a></li>
        </ul>
      </li>
    </ul>`;
    }
  } else {
    header += `
    <ul>
      <li><a class="nav-link scrollto" href="index.html">Home</a></li>
      <li><a class="nav-link scrollto" href="index.html#about">About</a></li>
      <li><a class="nav-link scrollto" href="index.html#works">How It Works</a></li>
      <li><a class="nav-link scrollto" href="index.html#topOffers">Top Offers</a></li>
      <li class="dropdown"><a href="shop.html"><span>Categories</span> <i class="bi bi-chevron-down"></i></a>
            <ul id="displayCategoriesShop">`;
    for (let i = 0; i < categories.length; i++) {
      header += `<li><a href="categories.html#speakers" onclick="categories(${categories[i].id})">${categories[i].CategoryName}</a></li>`;
    }
    header += `</ul>
          </li>
          <li><a class="nav-link scrollto" href="#subscribe">Add Your Business</a></li>
          <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
          <li><a class="buy-tickets scrollto" href="#buy-tickets" type="button" id="displayLogin" data-toggle="modal"
              data-target="#loginForm">Log In/Sign Up</a></li>
            <li><a class="buy-tickets scrollto" href="#" type="button" data-toggle="modal" data-target="#mySelection">My Selection<span style="margin-left: 5px;" id="mySelectionNumber">${selectionNumber}</span></a></li>
      </li>
    </ul>`;
  }
  document.getElementById("navbar").innerHTML = header;
  document.getElementById("mySelectionNumber").innerHTML = selectionNumber;
}
function setHeaderAdmin() {
  var connectedUser = JSON.parse(localStorage.getItem("connecteduser"));
  var header = ``;
  if (connectedUser.role == "superadmin") {
    header += `<nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
  <div class="sb-sidenav-menu">
          <div class="nav">
          <div class="sb-sidenav-menu-heading"></div>
            <a class="nav-link collapsed" href="index.html" aria-expanded="false" aria-controls="collapsePages">
                <div class="sb-nav-link-icon"><i class="fas fa-home"></i></div>
                Home
            </a>
          <div class="sb-sidenav-menu-heading">Interaction</div>
          <a class="nav-link collapsed" href="messages.html" aria-expanded="false" aria-controls="collapsePages">
              <div class="sb-nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mailbox" viewBox="0 0 16 16">
                  <path d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z"/>
                  <path d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z"/>
                </svg></div>
              Messages
          </a>
          <a class="nav-link collapsed" href="business.html" aria-expanded="false" aria-controls="collapsePages">
              <div class="sb-nav-link-icon"><i class="fas fa-briefcase"></i></div>
              Business Request
          </a>
          <div class="sb-sidenav-menu-heading">Interface</div>
          <a class="nav-link collapsed" href="users.html" aria-expanded="false" aria-controls="collapsePages">
              <div class="sb-nav-link-icon"><i class="fas fa-users"></i></div>
              Users
          </a>
          <a class="nav-link collapsed" href="coupons.html" aria-expanded="false" aria-controls="collapsePages">
              <div class="sb-nav-link-icon"><i class="fas fa-tags"></i></i></div>
              Coupons
          </a>
          <a class="nav-link collapsed" href="admin.html" aria-expanded="false" aria-controls="collapsePages">
              <div class="sb-nav-link-icon"><i class="fas fa-user-tie"></i></div>
              Admins
          </a>
          
          <div class="sb-sidenav-menu-heading"></div>
          <a class="nav-link" onclick="logout()" style="cursor:pointer">
              <div class="sb-nav-link-icon"><i class="fas fa-sign-out-alt"></i></div>
              Logout
          </a>
      </div>
  </div>
  <div class="sb-sidenav-footer py-3" style="font-size: 120%; background-color: #040919 !important;">
      <div class="small">${"Logged in as : " +connectedUser.username}</div>
  </div>
</nav>`;
  } else {
    header += `<nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
    <div class="sb-sidenav-menu">
        <div class="nav">
            
            <div class="sb-sidenav-menu-heading">Interface</div>
            <a class="nav-link collapsed" href="index.html" aria-expanded="false" aria-controls="collapsePages">
                <div class="sb-nav-link-icon"><i class="fas fa-home"></i></div>
                Home
            </a>
            <div class="sb-sidenav-menu-heading"></div>

            <a class="nav-link collapsed" href="coupons.html" aria-expanded="false" aria-controls="collapsePages">
                <div class="sb-nav-link-icon"><i class="fas fa-tags"></i></i></div>
                Coupons
            </a>
            <div class="sb-sidenav-menu-heading"></div>

            <a class="nav-link collapsed" href="index.html#topOffers" aria-expanded="false" aria-controls="collapsePages">
                <div class="sb-nav-link-icon"><i class="fas fa-chart-line"></i></div>
                Top Offers
            </a>
            <div class="sb-sidenav-menu-heading"></div>
            <a class="nav-link collapsed" href="index.html#contact" aria-expanded="false" aria-controls="collapsePages">
                <div class="sb-nav-link-icon"><i class="far fa-address-card"></i></div>
                Contact
            </a>
            <div class="sb-sidenav-menu-heading"></div>
          <a class="nav-link" onclick="logout()" style="cursor:pointer">
              <div class="sb-nav-link-icon"><i class="fas fa-sign-out-alt"></i></div>
              Logout
          </a>
        </div>
    </div>
    <div class="sb-sidenav-footer" style="font-size: 120%;background-color: #040919 !important;">
        <div class="small">${"Logged in as : " + connectedUser.username}</div>
    </div>
  </nav>`;
  }
  document.getElementById("layoutSidenav_nav").innerHTML = header;
}
/*-------Logout-------- */
function logout() {
  var connectedUser = JSON.parse(localStorage.getItem("connecteduser"));
  if (connectedUser) {
    localStorage.removeItem("selectionNumber");
    localStorage.removeItem("couponsSelected");
    localStorage.removeItem("connecteduser");
    location.replace("index.html");
  }
}
