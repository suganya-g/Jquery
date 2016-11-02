$(document).ready(function(){
    var pages = 0;  //to count the number of pages    
      //to post one title per page
	$('#search-movie').on('click',function()
	{
		var title=$('#title').val();//get the title from the user  
    $('#pagin').html('');  
    $.ajax({
    	type:'GET',
    	url: 'http://www.omdbapi.com/?s='+title,
    	success: function(data)
    	{
        if(data.Response=="False")
        {
          alert("No result");
        }else
        {
          $.each(data.Search,function(index,element) //json data is passed through ajax call
        {
          //checks if the title entered by the user is true
          
         console.log("Success");
                pages++; //if true increments the page size
         $('#movies').append('<div class="record"><li><strong>TITLE : </strong>'+element.Title+'</li>'+'<li><strong>YEAR : </strong>'+element.Year+'</li>'+'<li><strong>IMDB ID : </strong>'+element.imdbID+'</li>'+'<li><strong>TYPE : </strong>'+element.Type+'</li>'+'<li><strong>POSTER :</strong></li><img src='+element.Poster+'</img></div>');
            
        });  var limit = 3;
             var pageCount =  pages/limit;
             //designs the pagination
                for(var i = 0 ; i<pageCount;i++)
                {
                  $('#pagin').addClass('text-center');
                  $('#pagin').append('<li><a href="#">'+(i+1)+'</a></li> ');
                }
                //hides the current page and shows whatever page is clicked
                $('#pagin li').first().find('a').addClass('current');
                showPage = function(page) {
                   $('.record ').hide();
                   $('.record').each(function(n) {
                         if (n >= limit * (page - 1) && n < limit * page)
                           {
                              $(this).show();
                      
                           }
                   });        
               }
               //shows the initial page
               showPage(1);
               $('#pagin li a').click(function() {
                   $('#pagin li a').removeClass("current");
                   $(this).addClass('current');
                   showPage(parseInt($(this).text())) 
               });
        }
    	},
      error:function()
      {
        alert("error loading movies");
      }
    });
});
});