
$(document).ready(function() {

    function refreshValues(openLate, hotel, inn, bnb, camp){

        var closeLimit = 0;
        var checks = [];
    
        if(openLate){
            closeLimit = 20;
        }
        if(hotel){
            checks.push("Hotel");
        }
        if(inn){
            checks.push("Inn");
        }
        if(bnb){
            checks.push("BnB");
        }
        if(camp){
            checks.push("Campground");
        }
        if(checks.length == 0){
            checks = ["Hotel","Inn","BnB","Campground"];
        }
    
        $.ajax({type: "GET", url: "../../json-files/accommodationData.json", dataType: "json",
            success: function(response, status){
                var output = "";
                $.each(response.accommodations, function(i, item){
                    if(Math.round(item.rating) >= slider.value && checks.includes(item.type)){
                        output += "<div class = 'dataBox'>";
                        output += "<div>";
                        output += "<h2>" + item.name + " --</h2>";
    
                        for (var i = 0; i < Math.round(item.rating); i++){
                            output += "<span class='fa fa-star checked'></span>";
                        }
    
                        for (var i = 0; i < (5 - Math.round(item.rating)); i++){
                            output += "<span class='fa fa-star'></span>";
                        }
                        output += "</div>";
                        output += "<div>";
                        output += "<ul>";
                        output += "<li>" + item.type + "</li>";
                        output += "<li>Address: " + item.address + "</li>";
                        output += "<li>Website: <a href='" + item.website + "'>" + item.website +"</a></li>";
                        output += "<li>Description: " + item.description + "</li>";
                        output += "</ul>";
                        output += "</div>";
                        output += "</div>";
                    }
                });
                $('#dataContainer').html(output);
            }
        });
    
    }
    
    var slider = document.getElementById("ratingSlider");
    var sliderVal = document.getElementById("ratingSliderVal");
    sliderVal.innerHTML = slider.value;
    

    refreshValues($("#openLateCheck").is(":checked"), $("#hotelCheck").is(":checked"), $("#innCheck").is(":checked"), $("#bnbCheck").is(":checked"), $("#campCheck").is(":checked"));

    slider.oninput = function() {
        sliderVal.innerHTML = slider.value;
        refreshValues($("#openLateCheck").is(":checked"), $("#hotelCheck").is(":checked"), $("#innCheck").is(":checked"), $("#bnbCheck").is(":checked"), $("#campCheck").is(":checked"));
    }

    $(".filterCheck").change(function() {
        refreshValues($("#openLateCheck").is(":checked"), $("#hotelCheck").is(":checked"), $("#innCheck").is(":checked"), $("#bnbCheck").is(":checked"), $("#campCheck").is(":checked"));
    });
});