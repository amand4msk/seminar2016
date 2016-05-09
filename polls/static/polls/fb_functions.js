/**
 * Script
 */


var post={
                FB: '',
                Twitter: 'empty',
                Instagram: 'empty',
                forname: '',
                surname: '',
                name: '',
                message: '',
                created_time: '',
                id: '',
                likes: 0,
                comments: 0,
                shares: 0,
            }


var postsId = []; 


function getCookie(name) {
var cookieValue = null;
if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
        }
    }
}
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
console.log(csrftoken);

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
 
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

var accessTokeb = 'CAACEdEose0cBAC1n8ZC9XS4DJtNU79CZBsMFURg66aBhO4vHb71pJpUM6T901lSDcMe5A9xTTj027Pz8dd3Ixarqrx3w116LCH5lAPQ3kW8mTO8qALqO9uAyZCyDmZAfNlBC9E5uMg2sLYX8JpydzY8sWrBIs7IOeFO8ZC8YDxiyGaxslqizL8T6JT8D4kPPGNHrNZA25FKQZDZD';
// Only works after `FB.init` is called
function myFacebookLogin() {
  FB.login(function(){
      getMueller(); 
      
  }, {scope: 'publish_actions'});
 
}
        
        

function getMueller() {   // calls the first batch of records
     var person = document.getElementById("textbox1").value;
    
     post['FB']=person;
     
      FB.api("/"+ person,{},function(response) 
              {  procPerson(response);
               
                                                                } );
    
	 
}

function procPerson(dat)
{
    post['forname']=dat['first_name'];
    post['surname']=dat['last_name'];
    post['name']=dat['name'];
    console.log(dat['name']);
    
    $.post('/polls/savePerson/', post, function(response){
       /* if(response == 'success') { //alert('Yay!');}
        else{//alert('dump');}*/
    });
    
     FB.api("/"+ post['FB'] + "/posts",{},function(response) 
              {  procBatch(response);} );
    
}
	
var x = 0; 
function procBatch(dat) { // handle this batch, request the next batch

    //dat.data.length
    for ( i = 0; i < dat.data.length; i++ ) {
	      procRow(dat.data[i]);  // process this row
	      }

        
	   if ( typeof(dat.paging) != 'undefined') {
           
	      FB.api(dat.paging.next, {}, function(response){ procBatch(response); } );
	      } else {
          
	      alert("No more records expected");
          }
    
	   

}



function getLikes(postId)
{
    console.log("ID: "+ postId);
    FB.api("/"+ postId + "/likes?summary=true",{},function(response) { 
        console.log(response)
        //post['likes'] = response.summary['total_count'];
        callback(response.summary['total_count'])
      
     } );
    
}

function getComments(callback)
{
    FB.api("/"+ post['id'] + "/comments?summary=true",{},function(response) { 
         // post['comments'] = response.summary['total_count'];
         
         callback(response.summary['total_count'])
     } );
}




/*function startThis() {  
    var getUser = fbUser(function(model){
        console.log(model);
        startapp(model);
    }); 
};

function fbUser(callback){  
        FB.api('/me', function(response){
                callback(response);
            });
}*/

 var likes = 0;
function procRow(dat)
{

       
    post['message']= dat['message'];
    post['created_time']= dat['created_time'];
    post['id']=dat['id']; 
    
    console.log("id: " + post['id']);
    
      $.post('/polls/savePost/', post, function(response){
       if(response == 'success') { 
                saveFB(dat['id']);
       }
        
    });

}

function saveFB(postId)
{
 
    
    
     FB.api("/"+ postId + "/likes?summary=true",{},function(response) { 
        console.log(response)
            post['id']=postId; 
    console.log("fb: " + postId);
        post['likes'] = response.summary['total_count'];
          console.log("post: " + post['likes'])
          $.post('/polls/saveFB/', post, function(response){
                 
                   console.log(response);
            });
      
     } );

             
}



function initFB(){
	
	
	    FB.init({
	      appId      : '1029051753826790',
	      xfbml      : true,
	      version    : 'v2.5'
	        
	    });
	      
	      
	    FB.ui({
	  method: 'share_open_graph',
	  action_type: 'og.likes',
	  action_properties: JSON.stringify({
	    object:'https://developers.facebook.com/docs/',
	  })
	}, function(response){
	  // Debug response (optional)
	  console.log(response);
	});
  
	  
}

	  (function(d, s, id){
	     var js, fjs = d.getElementsByTagName(s)[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement(s); js.id = id;
	     js.src = "//connect.facebook.net/en_US/sdk.js";
	     fjs.parentNode.insertBefore(js, fjs);
	   }(document, 'script', 'facebook-jssdk'));

