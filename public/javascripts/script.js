$(document).ready(function() {
    let selectUsers = $("#selectUsers");

    selectUsers.on("change", function() {
        showOneUser($(this).val());
    })

    function listUsers() {
        $.get("/users/list", function(res) {
            let users = res.users;
            let optionsSelectUsers;

            users.forEach((user, index) => {
                optionsSelectUsers += `<option value="${index}">${user.nom}</option>`;
            });

            selectUsers.html(optionsSelectUsers);
            
        })
    }

    function showOneUser(idxVal) {
        $.get("/users/list", function(res) {
            let user = res.users[idxVal];
            
            $("#display-user-name").html(user.nom);
            $("#display-user-age").html(user.age + " ans");
            $("#display-user-job").html("Profession: " + user.profession);
            $("#display-user-email").html("Email: " + user.email);
            $("#display-user-tel").html("Téléphone: " + user.tel);
            
        })
    }
    
    listUsers();
})