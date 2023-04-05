 const URL = 'http://localhost:4400';
 let users = [];
 
 // Create logic
 // DOM element
 const form = document.getElementById('myForm');
 const user= document.getElementById('user');
 const email= document.getElementById('email');
 const result = document.getElementById('result');

 form.addEventListener('submit', async (e) => {
    e.preventDefault(); // to avoid page refresh
    let newUser = {
        username:user.value,
        email:email.value
    };
    console.log('new user=',newUser);
    let extUser  = users.find((item) => item.email === newUser.email);
        console.log('extUser',extUser);
        if(extUser) {
            alert('User email already registered');
        } else {
            await fetch(`${URL}/users`,{
                method:'POST',
                body:JSON.stringify(newUser),
                headers: {
                    'content-Type': 'application/json'
                }
            }).then(res => res.json()).then(out => {
                alert('New user created successfully');
                window.location.reload();

            }).catch(err => console.log(err.message));
        }
 });

 // to read the data on page load
 (function (){
    fetch(`${URL}/users`,{
        method:'GET',
        headers: {
            'content-Type' : 'application/json'
        }

    }).then(res => res.json())
    .then(out => {
        console.log('users =',out);
        users = out;
        printData(out);
    }).catch(err =>console.log(err.message));
 })();

 // print data 
 function printData(data) {
    data.forEach(item => {
        // console.log(item);
        result.innerHTML +=
         `<tr>
        <td>${ item.id }</td>
        <td>${item.username}</td>
        <td>${item.email}</td>
        <td>
            <a href="update.html?id=${item.id}" class="btn btn-success">Edit</a>
            <button onclick="deleteUser(${item.id})" class="btn btn-warning">Delete</button>
        </td>
        
        </tr>`;
    });
}

// To delete item
    function deleteUser(id) {
        if(window.confirm(`Are you sure to delete an id = ${id}?`)) {
            fetch(`${URL}/users/${id}`,{
                method:'DELETE',
                headers: {
                    'content-type' : 'application/json'
                }
            })
                .then(out => out.json())
                .then(res => {
                    alert('user deleted successsfully');
                    window.location.reload();
                }).catch(err => console.log(err.message));
        } else {
            alert('delete terminated');
        }
    }

