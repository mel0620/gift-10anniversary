const attendance_list = document.querySelector('#attendance_list');
const form            = document.querySelector('#add-attendies-form');

function renderAttendance(doc) {
    let li   = document.createElement('li');
    let firstname = document.createElement('span');
    let lastname = document.createElement('span');
    let remove = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    firstname.textContent = doc.data().firstname;
    lastname.textContent = doc.data().lastname;
    remove.textContent = 'x'
    // age.textContent = doc.data().age;

    li.appendChild(lastname);
    li.appendChild(firstname);
    li.appendChild(remove);
    // li.appendChild(age);

    attendance_list.appendChild(li);

    // delete data
    remove.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('attendance').doc(id).delete();
    })
}

// Get data

// db.collection('attendance').get().then((snapshot) => {
// db.collection('attendance').where('name','==','Rommel Cuneta').get().then((snapshot) => {
// db.collection('attendance').orderBy('lastname').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderAttendance(doc);
//     })
// })

// Realtime listener
db.collection('attendance').orderBy('lastname').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added') {
            renderAttendance(change.doc);
        } else if (change.type == 'removed') {
            let li = attendance_list.querySelector('[data-id=' + change.doc.id + ']');
            attendance_list.removeChild(li)
        }
    })
})

// Save data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('attendance').add({
        firstname: form.firstname.value,
        lastname: form.lastname.value,
        created_at: new Date(),
        // age : form.age.value
    })
    form.firstname.value = '';
    form.lastname.value = '';
    // form.age.value  = '';
})