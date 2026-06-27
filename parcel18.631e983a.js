const addStudentsEl=document.querySelector(".add-student"),addStudentFormEl=document.querySelector("#add-student-form"),tbodyEl=document.querySelector("tbody"),getStudentsEl=document.querySelector("#get-students-btn");let currentId=null;async function getStudents(){return(await fetch("http://localhost:3000/students")).json()}function renderStudents(t){tbodyEl.innerHTML=t.map(t=>`<tr id="${t.id}">
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
          </td></tr>`).join("")}async function addStudent(t){let e={method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json; charset=UTF-8"}},d=await fetch("http://localhost:3000/students",e);return await d.json()}tbodyEl.addEventListener("click",async t=>{let e=t.target.closest("td").parentNode,d=e.id;"delete"===t.target.dataset.action&&(await deleteStudent(d),renderStudents(await getStudents())),"edit"===t.target.dataset.action&&(currentId=d,addStudentFormEl.elements[0].value=e.children[1].textContent,addStudentFormEl.elements[1].value=e.children[2].textContent,addStudentFormEl.elements[2].value=e.children[3].textContent,addStudentFormEl.elements[3].value=e.children[4].textContent,addStudentFormEl.elements[4].value=e.children[5].textContent,addStudentFormEl.elements[5].checked="true"===e.children[6].textContent)}),getStudentsEl.addEventListener("click",async()=>{try{let t=await getStudents();renderStudents(t)}catch(t){console.log(t)}});const{name:t,age:e,course:d,skills:n,email:a,isEnrolled:l}=addStudentFormEl.elements;async function updateStudent(t,e){let d={method:"PUT",body:JSON.stringify(e),headers:{"Content-Type":"application/json; charset=UTF-8"}};return(await fetch(`http://localhost:3000/students/${t}`,d)).json()}function deleteStudent(t){return fetch(`http://localhost:3000/students/${t}`,{method:"DELETE"})}addStudentsEl.addEventListener("click",async u=>{let o={name:t.value,age:e.value,course:d.value,skills:n.value,email:a.value,isEnrolled:l.checked};if(currentId){await updateStudent(currentId,o),renderStudents(await getStudents()),addStudentFormEl.reset(),currentId=null;return}console.log(o),await addStudent(o),renderStudents(await getStudents()),addStudentFormEl.reset()});
//# sourceMappingURL=parcel18.631e983a.js.map
