
const addStudentsEl = document.querySelector(".add-student")
const addStudentFormEl = document.querySelector("#add-student-form")
const tbodyEl = document.querySelector("tbody")
const getStudentsEl = document.querySelector("#get-students-btn")

let currentId = null;

tbodyEl.addEventListener("click", (e) => {
  //  const td = e.target.closest("td") 
  //  const currentId = td.parentNode 
  //  const id = currentId.id

  const td = e.target.closest("td");
   
   const tr = td.parentNode;
   const id = tr.id;


  if (e.target.dataset.action === "delete") {

   

    deleteStudent(id).then(() => getStudents()).then(res => renderStudents(res))


    // if (action === "delete") {
    // deleteStudent(id).then(() => {
    //   getStudents().then(renderStudents);
    // });
  }

  if (e.target.dataset.action === "edit") {
    currentId = id
    // console.log(currentId.children[2].textContent);
    addStudentFormEl.elements[0].value = tr.children[1].textContent
    addStudentFormEl.elements[1].value = tr.children[2].textContent
    addStudentFormEl.elements[2].value = tr.children[3].textContent
    addStudentFormEl.elements[3].value = tr.children[4].textContent
    addStudentFormEl.elements[4].value = tr.children[5].textContent
    addStudentFormEl.elements[5].checked = tr.children[6].textContent === "true"

    // console.log(currentId)


    
  }
  })
  
  



  // deleteStudent(tr.id).then()
  // getStudents().then((res) => {
  //   renderStudents(res)
  // })


function getStudents() {
  return fetch("http://localhost:3000/students")
    .then((response) => response.json())
  // .then((post) => console.log(post))
  // .catch((error) => console.log(error));
}

//

function renderStudents(students) {
  const list = students.map((e) => {
    return `<tr id="${e.id}">
          <td>${e.id}</td>
          <td>${e.name}</td>
          <td>${e.age}</td>
          <td>${e.course}</td>
          <td>${e.skills}</td>
          <td>${e.email}</td>
          <td>${e.isEnrolled}</td>
          <td>
<button type="button" data-action="edit">Edit</button>
<button type="button" data-action="delete">Delete</button>
          </td></tr>`
  }).join("")

  tbodyEl.innerHTML = list



}

getStudentsEl.addEventListener("click", () => {
  getStudents().then((res) => {
    renderStudents(res)
  })
})

//

function addStudent(e) {


  const options = {
    method: "POST",

    body: JSON.stringify(e),

    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };


  return fetch("http://localhost:3000/students", options).then((res) => res.json())
}

//

const { name, age, course, skills, email, isEnrolled } = addStudentFormEl.elements;

addStudentsEl.addEventListener("click", (e) => {
  const data = {
    // id: 4,
    name: name.value,
    age: age.value,
    course: course.value,
    skills: skills.value,
    email: email.value,
    isEnrolled: isEnrolled.checked
  }

  if(currentId) {
    updateStudent(currentId, data).then(getStudents).then(res => renderStudents(res)).finally(() => {
      addStudentFormEl.reset()
      currentId = null
    });
    return
  }

  console.log(data);
  
addStudent(data)
    .then(getStudents)
    .then(res => renderStudents(res))
    .finally(() => {
      addStudentFormEl.reset();
    });

  // addStudent(data)
  //   .then(getStudents())
  //   .then(res => console.log(res)
  //   )

})


//

function updateStudent(id, data) {
  const options = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  return fetch(`http://localhost:3000/students/${id}`, options)
  .then(res => res.json())
}

// const superdata = {
//   name: "loll",
//     age: 2,
//     course: 2,
//     skills: 2,
//     email: 2,
//     isEnrolled: true
// }

// updateStudent(12, superdata)
//

function deleteStudent(id) {

  return fetch(`http://localhost:3000/students/${id}`, {

    method: "DELETE",

  })

    
}


