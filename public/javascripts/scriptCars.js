$(document).ready(function() {
    let selectBrandCars = $("#selectBrandCars");
    let selectModelCars = $("#selectModelCars");

    selectBrandCars.on("change", function() {
        $("#car-identity").hide();
        showCarsModels($(this).val());
    })

    selectModelCars.on("change", function() {
        showOneModel($(this).find(":selected").data("brand"), $(this).val());
    })

    function showCarsModels(idVal) {
        $.get(`/cars/brands/${idVal}/models/`, function(cars) {
            let carModels = cars.makes.Models; 
            let models = `<option value="" selected disabled>Veuillez chosir un modèle</option>`;
            
            /* for (const index in cars.Models) {
                models += `<option value="${cars.Models[index].model_name}" data-brand="${cars.Models[index].model_make_id}">${cars.Modeles[index].model_name}</option>`
            }  */
            
            carModels.forEach((model) => {
                models += `<option value="${model.model_name}" data-brand="${model.model_make_id}">${model.model_name}</option>`
            });

            $("#selectModelCars").html(models);
            $("#formModelCars").show();

        })
    }

    function showOneModel(idBrand, idModel) {
        $.get(`/cars/brands/${idBrand}/models/get/${idModel}`, function(result) {

            /* $("#display-car-name").html(car.nom);
            $("#display-car-finition").html(car.finition);
            $("#display-car-prix").html(car.prix);
            $("#display-car-energie").html(car.energie);
            $("#display-car-boiteDeVitesse").html(car.boiteDeVitesse);
            $("#display-car-puissance").html(car.puissance); */

            $("#display-car-name").html(result.car.Trims[0].model_name);
            $("#display-car-finition").html(result.car.Trims[0].model_body);
            $("#display-car-prix").html("-");
            $("#display-car-energie").html("-");
            $("#display-car-boiteDeVitesse").html(result.car.Trims[0].model_transmission_type);
            $("#display-car-puissance").html(result.car.Trims[0].model_engine_cyl);
            $("#car-identity").show();

        })
    }

    listCars();

})