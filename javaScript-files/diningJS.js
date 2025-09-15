
$(document).ready(function() {

    function refreshValues(openLate, bbq, asian, italian, diner, bar){

        var closeLimit = 0;
        var checks = [];
    
        if(openLate){
            closeLimit = 20;
        }
        if(bbq){
            checks.push("barbeque");
        }
        if(asian){
            checks.push("asian");
        }
        if(italian){
            checks.push("italian");
        }
        if(diner){
            checks.push("diner");
        }
        if(bar){
            checks.push("bar");
        }
        if(checks.length == 0){
            checks = ["barbeque","asian","italian","diner","bar"];
        }
    
        $.ajax({type: "GET", url: "../../json-files/diningData.json", dataType: "json",
            success: function(response, status){
                var output = "";
                $.each(response.restaurants, function(i, item){
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
                        output += "<li>Hours: " + item.hours + "</li>";
                        output += "<li>Address: " + item.address + "</li>";
                        output += "<li>Phone Number: " + item.contact + "</li>";
                        if(item.website == "N/A"){
                            output += "<li>Website: N/A</li>";
                        } else{
                            output += "<li>Website: <a href='" + item.website + "'>" + item.website +"</a></li>";
                        }
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

    

    refreshValues($("#openLateCheck").is(":checked"), $("#bbqCheck").is(":checked"), $("#asianCheck").is(":checked"), $("#italyCheck").is(":checked"), $("#dinerCheck").is(":checked"), $("#barCheck").is(":checked"));

    slider.oninput = function() {
        sliderVal.innerHTML = slider.value;
        refreshValues($("#openLateCheck").is(":checked"), $("#bbqCheck").is(":checked"), $("#asianCheck").is(":checked"), $("#italyCheck").is(":checked"), $("#dinerCheck").is(":checked"), $("#barCheck").is(":checked"));
    }
    $(".filterCheck").change(function() {
        refreshValues($("#openLateCheck").is(":checked"), $("#bbqCheck").is(":checked"), $("#asianCheck").is(":checked"), $("#italyCheck").is(":checked"), $("#dinerCheck").is(":checked"), $("#barCheck").is(":checked"));
    });
});