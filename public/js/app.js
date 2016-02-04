$( document ).ready(function() {

  $( "button" ).on( "click", function() {
    console.log( "view cal was clicked" );
  });

  $( "button" ).on("click", function() {
    console.log( "return home btn clicked" );
    window.location.pathname = '/';
  });
});
