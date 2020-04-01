$(document).ready(function() {
    let selectBrandCars = $("#selectBrandCars");
    let selectModelCars = $("#selectModelCars");

    selectBrandCars.on("change", function() {
        $("#car-identity").hide();
        showCarsModels($(this).val());
    })

    selectModelCars.on("change", function() {
        //console.log($(this).find(":selected").data("brand"));
        showOneModel($(this).find(":selected").data("brand"), $(this).val());
    })

    function showCarsModels(idVal) {
        $.get(`/cars/brands/${idVal}/models/`, function(cars) {

            let models = `<option value="" selected disabled>Veuillez chosir un modèle</option>`;
            
            for (const index in cars.modeles) {
                models += `<option value="${cars.modeles[index].id}" data-brand="${cars.id}">${cars.modeles[index].nom}</option>`
            } 
            
            $("#selectModelCars").html(models);
            $("#formModelCars").show();

        })
    }

    function showOneModel(idBrand, idModel) {
        $.get(`/cars/brands/${idBrand}/models/get/${idModel}`, function(car) {

            $("#display-car-name").html(car.nom);
            $("#display-car-finition").html(car.finition);
            $("#display-car-prix").html(car.prix);
            $("#display-car-energie").html(car.energie);
            $("#display-car-boiteDeVitesse").html(car.boiteDeVitesse);
            $("#display-car-puissance").html(car.puissance);
            $("#car-identity").show();

        })
    }

})