var prevPos = {top:0, left:0};

var animation = undefined;

function getLabledIMG(url){
    urlParts = url.split(".");
    newURL =  urlParts[0] + "sl." + urlParts[1];
    return newURL
}

function makeNewPosition(){
    //console.log(x + "|" + y);
    return [(((Math.random()*5)-2.5) + prevPos.top), (((Math.random()*5)-2.5) + prevPos.left)];
}

function startHoverA(){
    var pos = makeNewPosition();
    animation = $("#previewHov").animate({top: pos[0]+"px", left: pos[1]+"px" }, 500, "linear", function(){
        startHoverA();
    });
}

function stopA(){
    if(animation !== undefined){animation.stop();}
}

$(document).ready(function(){
    $("#accordion").accordion({beforeActivate: function( event, ui ) {
        //remove gui effects before animation
        $("#previewHov").css("display", "none");
    }});

    $(".preview").hover(function(){
        if(animation !== undefined){animation.stop();}
        var pos = $(this).position();

        // .outerWidth() takes into account border and padding.

        imgURL = $(this).find("img").attr("src")

        var top = (pos.top - 200);
        var left = pos.left;

        //show the menu directly over the placeholder
        $("#previewHov").css({
            top:  top + "px",
            left: left + "px"
            //display:"inline"
        }).show().find("img").attr("src", getLabledIMG(imgURL));
        prevPos = {left:left,top:top};
        startHoverA();
    });
});
