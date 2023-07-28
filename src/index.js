import "./styles.css";
import Data from "./EmployeeData";

// document.getElementById("app").innerHTML = `
// <h1>Hello Vanilla!</h1>
// <div>
//   We use the same configuration as Parcel to bundle this sandbox, you can find more
//   info about Parcel
//   <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
// </div>
// `;
let employeeName = Data[0].name;
let employeeUnId = Data[0].emId;
let employeeDob = Data[0].dob;
let employeeEmailId = Data[0].mail;
let selected = false;
document.getElementById("ShowInfohere").innerHTML = `
<h3>${employeeName}</h3>
<div>${employeeUnId} ${employeeDob}  ${employeeEmailId}</div>
`;
NameMapping();
function NameMapping() {
  // document.getElementById('nameArrayOrder').innerHTML
  Data.map((arr, i) => {
    const node = document.createElement("li");
    node.setAttribute("id", `${arr.emId}`);
    const name = document.createElement("span");
    name.innerHTML = `${arr.name}`;
    name.setAttribute("id", `name${arr.emId}`);
    node.appendChild(name);
    const cross = document.createElement("button");
    cross.innerHTML = "X";
    cross.addEventListener("click", () => deleteEmployee(arr.emId));
    node.appendChild(cross);
    document.getElementById("nameList").appendChild(node);
    document
      .getElementById(`name${arr.emId}`)
      .addEventListener("click", () => showEmployeeInfo(arr.emId));
  });
}

const showEmployeeInfo = (employeeId) => {
  console.log("employeeId", employeeId);
  const ArrayIndex = Data.find((arr, i) => arr.emId === employeeId);
  document.getElementById("ShowInfohere").innerHTML = `
<h3>${ArrayIndex.name}</h3>
<div>${ArrayIndex.emId} ${ArrayIndex.dob}  ${ArrayIndex.mail}</div>
`;
};
const deleteEmployee = (employeeId, index) => {
  const deleteindex = Data.findIndex((element, i) => {
    return element.emId === employeeId;
  });
  if (deleteindex >= 0) {
    Data.splice(deleteindex, 1);
    nameRemap();
  }
  console.log(deleteindex, Data);
};
const nameRemap = () => {
  const ulNameLisrt = document.getElementById("nameList");
  ulNameLisrt.innerHTML = "";
  NameMapping();
  console.log(ulNameLisrt);
};
const addAMember = (e) => {
  console.log("I am cllciked");
  e.preventDefault();
  const name = document.getElementById("employeeName");
  const email = document.getElementById("employeeEmail");
  const dob = document.getElementById("employeeDob");
  const Id = document.getElementById("employeeId");
  const department = document.getElementById("employeeDepartment");
  if (
    name.value === "" ||
    email.value === "" ||
    dob.value === "" ||
    Id.value === "" ||
    department.value === ""
  ) {
    alert("Please enter all detail");
  } else {
    const object = {
      name: name.value,
      mail: email.value,
      dob: dob.value,
      department: department.value,
      emId: Id.value
    };
    Data.push(object);
    nameRemap();
    name.value = "";
    email.value = "";
    dob.value = "";
    department.value = "";
    Id.value = "";
    document.getElementById("formContainer").style.display = "none";
  }
};
document.getElementById("addAMember").addEventListener("click", () => {
  document.getElementById("formContainer").style.display = "block";
  document.getElementById("submitButton").addEventListener("click", addAMember);
});
