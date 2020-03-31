$(document).ready(function() {
    let selectUsers = $("#selectUsers");

    selectUsers.on("change", function() {
        showOneUser($(this).val());
    })

    function showOneUser(idVal) {
        $.get(`/users/get/${idVal}`, function(user) {

            $("#display-user-name").html(user.nom);
            $("#display-user-age").html(user.age);
            $("#display-user-job").html(user.profession);
            $("#display-user-email").html(user.email);
            $("#display-user-tel").html(user.tel);
            $("#user-identity").show();
            
        })
    }

})