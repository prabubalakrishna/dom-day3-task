//getting required data through DOM API function
let paginationNumbers = document.getElementById("paginationNumber");
let firstBtn = document.getElementById("firstBtn");
let prevBtn = document.getElementById("firstBtn");
let nextBtn = document.getElementById("firstBtn");
let lastBtn = document.getElementById("firstBtn");
let list = document.getElementById("list");
let wrapper = document.querySelector(".wrapper");

//fetching data from url as json

const req = new XMLHttpRequest();
req.open(
  "GET",
  "https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json"
);
req.send();
req.addEventListener("load", request);
function request() {
  //received data stored in data
  let data = JSON.parse(this.responseText);
  let currentPage = 1;
  let rows = 10;
  //Displaying data in browser as table using list id
  function DisplayList(data, list, rows, currentPage) {
    list.innerHTML = `
      <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
    </tr>`;
    currentPage--;
    let start = rows * currentPage;
    let end = start + rows;
    let paginatedItems = data.slice(start, end);
    for (let i = 0; i < paginatedItems.length; i++) {
      let item = paginatedItems[i];
      let tr = document.createElement("tr");
      tr.classList.add("item");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      td1.textContent = item.id;
      td2.textContent = item.name;
      td3.textContent = item.email;
      tr.append(td1, td2, td3);
      list.appendChild(tr);
    }
  }
  //Displaying page no in browser as per data retrived from url
  function SetupPagination(data, paginationNumbers, rows) {
    paginationNumbers.innerHTML = "";
    let page_count = Math.ceil(data.length / rows);
    for (let i = 1; i < page_count + 1; i++) {
      let btn = PaginationButton(i, data);
      paginationNumbers.appendChild(btn);
    }
  }
  //Creating button element & updaing its style & adding onclick event to update table list
  function PaginationButton(page, data) {
    let button = document.createElement("a");
    button.classList.add("page");
    button.innerText = page;
    if (currentPage == page) button.classList.add("active");
    button.addEventListener("click", function () {
      currentPage = page;
      DisplayList(data, list, rows, currentPage);
      let allBtn = document.querySelectorAll(".page");
      allBtn.forEach((e) => e.classList.remove("active"));
      button.classList.add("active");
    });
    return button;
  }
  //adding onclick event to rest of the buttons;
  function updateBtn(currentPage) {
    let allBtn = document.querySelectorAll(".page");
    allBtn.forEach((e) => e.classList.remove("active"));
    allBtn[currentPage - 1].classList.add("active");
    DisplayList(data, list, rows, currentPage);
  }
  wrapper.addEventListener("click", (e) => {
    if (e.target.dataset.set == "fir") {
      if (currentPage != 1) {
        currentPage = 1;
        updateBtn(currentPage);
      }
    } else if (e.target.dataset.set == "lst") {
      if (currentPage != 10) {
        currentPage = 10;
        updateBtn(currentPage);
      }
    } else if (e.target.dataset.set == "pre") {
      if (currentPage != 1) {
        currentPage--;
        updateBtn(currentPage);
      }
    } else if (e.target.dataset.set == "nxt") {
      if (currentPage != 10) {
        currentPage++;
        updateBtn(currentPage);
      }
    }
  });
  // both of update/displaying function called for loading in onload time
  DisplayList(data, list, rows, currentPage);
  SetupPagination(data, paginationNumbers, rows);
}
 