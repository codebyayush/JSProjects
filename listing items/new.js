//add todo on screen
function addProductOnScreen(productInfo) {
    const productList = document.getElementById("products");
    const categoryDiv = document.getElementById(productInfo.category.toLowerCase());
  
    if (!categoryDiv) {
      // Create a new category div if it doesn't exist
      const newCategoryDiv = document.createElement("div");
      newCategoryDiv.id = productInfo.category.toLowerCase();
      newCategoryDiv.innerHTML = `<h2>${productInfo.category}</h2>`;
      productList.appendChild(newCategoryDiv);
    }
    const productDiv = document.createElement("div");
  
    productDiv.innerHTML = `
      <strong>Product Name: </strong>${productInfo.name}<br>
      <strong>Price: </strong>${productInfo.price}<br>
      <strong>Category: </strong>${productInfo.category}<br>
      <button id="removebtn" onclick="tickW('${productInfo._id}', this)">REMOVE</button><hr><br>
    `;
  
    // Append the product to the corresponding category div
    const targetCategoryDiv = document.getElementById(productInfo.category.toLowerCase());
    targetCategoryDiv.appendChild(productDiv);
  }
  
  //on remove click
  function tickW(productId, button) {
    axios
      .delete(
        `https://crudcrud.com/api/f677d766f6bc4b5fa4462bb1504d2424/productinfo/${productId}`
      )
      .then((response) => {
        let removeDiv = button.parentElement;
        removeDiv.remove();
        console.log(response);
      })
      .catch((err) => console.log(err));
  }
  
  //post product
  function postProduct(name, price, category) {
    axios
      .post(
        `https://crudcrud.com/api/f677d766f6bc4b5fa4462bb1504d2424/productinfo`,
        { name, price, category }
      )
      .then((response) => addProductOnScreen(response.data))
      .catch((err) => console.error(err));
  }
  
  //submit event
  const formDetails = document.getElementById("form-container");
  formDetails.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
  
    postProduct(name, price, category);
  
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "Select";
  });
  
  //onload function
  window.onload = function () {
    axios
      .get(`https://crudcrud.com/api/f677d766f6bc4b5fa4462bb1504d2424/productinfo`)
      .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          addProductOnScreen(response.data[i]);
        }
      })
      .catch((err) => console.log(err));
  };
  