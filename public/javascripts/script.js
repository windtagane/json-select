$(document).ready(function() {
    let selectUsers = $("#selectUsers");

    selectUsers.on("change", function() {
        showOneUser($(this).val());
    })

    function showOneUser(idVal) {
        $.get(`/users/get/${idVal}`, function(user) {
            
            $("#display-user-name").html(user.nom);
            $("#display-user-age").html(user.age + " ans");
            $("#display-user-job").html("Profession: " + user.profession);
            $("#display-user-email").html("Email: " + user.email);
            $("#display-user-tel").html("Téléphone: " + user.tel);
            
        })
    }

})