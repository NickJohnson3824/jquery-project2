$(function () {
    var jsonTeams;
    var $body = $('body');
    var previousTeam = null;
    
    function loadTeams() {
        $.getJSON('js/teams.json')
        .done(function(data){
            
            jsonTeams = data;
            
            for (var i = 0; i < jsonTeams['teams'].length; i++){
                createTeamDiv(jsonTeams['teams'][i]);
            }

            
            $(".Team").on("click", function() {
             if (this === previousTeam){           
            $(this).siblings().slideToggle(300, "swing")      
             } else {
            $(".lastTeam").slideUp(300).removeClass("lastTeam"); 
            $(this).siblings().slideDown(700).addClass("lastTeam");           
            }
            previousTeam = this;
        });
            
            
        }).fail(function() {
            
           $body.append('<p>failed</p>')
        }); 
    }
    
    function createTeamDiv(jsonObject){        
        $body.append('<div><h2 class="Team">' + jsonObject.name + '</h2><img src="' + jsonObject.image + 
                     '" alt="' + jsonObject.name + '" /><h3>Top Players</h3><ul>' + createPlayers(jsonObject) + '</ul></div>' );
        

    }
    function createPlayers(jsonObject){
        var liPlayers = "";
        for (var i = 0; i < jsonObject.players.length; i++) {
            liPlayers += '<li>' + jsonObject.players[i] + '</li>';
        }  
        return liPlayers;
    }

                 
    $('p').remove();


    $body.append('<h1>Minnesota Sports Teams</h1>');
    loadTeams();
    
});