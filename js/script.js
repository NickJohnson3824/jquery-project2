$(function () {
    var jsonTeams;
    var $body = $('body');
    var previousTeam = null;
    
    // loadTeams function.  getJSON method attemptes to load json data from file.
    // If succesful the function within the done method is executed.  If unsuccesful the function in the fail method is executed
    function loadTeams() {
        $.getJSON('js/teams.json')
        .done(function(data) {            
            // assign json data to variable
            jsonTeams = data;
            
            // loop through each object in array and call the createTeamDiv function to create the html elements
            for (var i = 0; i < jsonTeams['teams'].length; i++){
                createTeamDiv(jsonTeams['teams'][i]);
            }

            // Click event handler for elements with Team class
            $(".Team").on("click", function() {
             if (this === previousTeam){           
            $(this).siblings().slideToggle(300, "swing")      
             } else {
            $(".lastTeam").slideUp(300).removeClass("lastTeam"); 
            $(this).siblings().slideDown(700).addClass("lastTeam");           
            }
            previousTeam = this;
        });
            
        // This method is executed if json data fails to load
        }).fail(function() {
            
           $body.append('<p>An error occured loading the Team Information</p>')
        }); 
    }
    
    // function used to create html elements from the json Object passed to it
    function createTeamDiv(jsonObject){        
        $body.append('<div><h2 class="Team">' + jsonObject.name + '</h2><img src="' + jsonObject.image + 
                     '" alt="' + jsonObject.name + '" /><div class="players"><h3>Top Players</h3><ul>' + createPlayers(jsonObject) + '</ul></div></div>' );
    }
    
    // function used to create list item elements from the json Objects players array
    // returns the list items
    function createPlayers(jsonObject){
        var liPlayers = "";
        for (var i = 0; i < jsonObject.players.length; i++) {
            liPlayers += '<li>' + jsonObject.players[i] + '</li>';
        }  
        return liPlayers;
    }

    // remove existing p element             
    $('p').remove();

    // Add a heading to the body
    $body.append('<h1>Minnesota Sports Teams</h1>');
    
    // call the loadTeams function to load the json data and create the html elements
    loadTeams();  
});