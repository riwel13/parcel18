const addStudentsEl=document.querySelector(".add-student"),addStudentFormEl=document.querySelector("#add-student-form"),tbodyEl=document.querySelector("tbody"),getStudentsEl=document.querySelector("#get-students-btn");let currentId=null;function getStudents(){return fetch("http://localhost:3000/students").then(t=>t.json())}function renderStudents(t){tbodyEl.innerHTML=t.map(t=>`<tr id="${t.id}">
          <td>${t.id}</td>
          <td>${t.name}</td>
          <td>${t.age}</td>
          <td>${t.course}</td>
          <td>${t.skills}</td>
          <td>${t.email}</td>
          <td>${t.isEnrolled}</td>
          <td>
<button type="button" data-action="edit">Edit</button>
<button type="button" data-action="delete">Delete</button>
          </td></tr>`).join("")}function addStudent(t){return fetch("http://localhost:3000/students",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json; charset=UTF-8"}}).then(t=>t.json())}tbodyEl.addEventListener("click",t=>{let e=t.target.closest("td").parentNode,d=e.id;"delete"===t.target.dataset.action&&deleteStudent(d).then(()=>getStudents()).then(t=>renderStudents(t)),"edit"===t.target.dataset.action&&(currentId=d,addStudentFormEl.elements[0].value=e.children[1].textContent,addStudentFormEl.elements[1].value=e.children[2].textContent,addStudentFormEl.elements[2].value=e.children[3].textContent,addStudentFormEl.elements[3].value=e.children[4].textContent,addStudentFormEl.elements[4].value=e.children[5].textContent,addStudentFormEl.elements[5].checked="true"===e.children[6].textContent)}),getStudentsEl.addEventListener("click",()=>{getStudents().then(t=>{renderStudents(t)})});const{name:t,age:e,course:d,skills:n,email:l,isEnrolled:u}=addStudentFormEl.elements;function updateStudent(t,e){return fetch(`http://localhost:3000/students/${t}`,{method:"PUT",body:JSON.stringify(e),headers:{"Content-Type":"application/json; charset=UTF-8"}}).then(t=>t.json())}function deleteStudent(t){return fetch(`http://localhost:3000/students/${t}`,{method:"DELETE"})}addStudentsEl.addEventListener("click",o=>{let r={name:t.value,age:e.value,course:d.value,skills:n.value,email:l.value,isEnrolled:u.checked};currentId?updateStudent(currentId,r).then(getStudents).then(t=>renderStudents(t)).finally(()=>{addStudentFormEl.reset(),currentId=null}):(console.log(r),addStudent(r).then(getStudents).then(t=>renderStudents(t)).finally(()=>{addStudentFormEl.reset()}))});
//# sourceMappingURL=parcel18.242f1acb.js.map
