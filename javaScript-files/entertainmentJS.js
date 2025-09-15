

$(document).ready(function() {

    function refreshValues(openLate, market, arts, nature, sports){

        var closeLimit = 0;
        var checks = [];
    
        if(openLate){
            closeLimit = 20;
        }
        if(market){
            checks.push("market");
        }
        if(arts){
            checks.push("arts");
        }
        if(nature){
            checks.push("nature");
        }
        if(sports){
            checks.push("sports");
        }
        if(checks.length == 0){
            checks = ["market","arts","nature","sports"];
        }
    
        $.ajax({type: "GET", url: "../../json-files/entertainmentData.json", dataType: "json",
            success: function(response, status){
                var output = "";
                $.each(response.entertainment, function(i, item){
                    if(Math.round(item.rating) >= slider.value && item.closes >= closeLimit && checks.includes(item.type)){
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
                        output += "<li>" + item.hours + "</li>";
                        output += "<li>Address: " + item.address + "</li>";
                        if(item.website == "N/A"){
                            output += "<li>Website: N/A</li>";
                        } else{
                            output += "<li>Website: <a href='" + item.website + "'>" + item.website +"</a></li>";
                        }
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

    

    refreshValues($("#openLateCheck").is(":checked"), $("#marketCheck").is(":checked"), $("#artsCheck").is(":checked"), $("#natureCheck").is(":checked"), $("#sportsCheck").is(":checked"));

    slider.oninput = function() {
        sliderVal.innerHTML = slider.value;
        refreshValues($("#openLateCheck").is(":checked"), $("#marketCheck").is(":checked"), $("#artsCheck").is(":checked"), $("#natureCheck").is(":checked"), $("#sportsCheck").is(":checked"));
    }
    $(".filterCheck").change(function() {
        refreshValues($("#openLateCheck").is(":checked"), $("#marketCheck").is(":checked"), $("#artsCheck").is(":checked"), $("#natureCheck").is(":checked"), $("#sportsCheck").is(":checked"));
    });
});