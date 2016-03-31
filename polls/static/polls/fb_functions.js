/**
 * Script
 */


var post={
                FB: 'es.muellert.wieder',
                message: '',
                created_time: '',
                id: '',
                likes: 0,
                comments: 0,
                shares: 0,
            }



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
	   FB.api("/es.muellert.wieder/posts?=limit=30",{},function(response) { procBatch(response) } );
}
	
function procBatch(dat) { // handle this batch, request the next batch
     procRow(dat.data[0]);
	  /* for ( i = 0; i < dat.data.length; i++ ) {
	      procRow(dat.data[i]);  // process this row
	      }*/

   // alert(dat.paging.next)
   /* FB.api(dat.paging.next,{},function(response) { test2(response) } );
    
	   if ( typeof(dat.paging) != 'undefined' ) {
	      FB.api(dat.paging.next, {}, function(response){ procBatch(response); } );
	      } else {
	      alert("No more records expected");
	      }*/
	   }

function test2(dat)
{
    
    for ( i = 0; i < dat.data.length; i++ ) {
	      procRow(dat.data[i]);  // process this row
	      }
}

function getLikes(postId)
{
    console.log("ID: "+ postId);
    FB.api("/"+ postId + "/likes?summary=true",{},function(response) { 
       
        callback(response.summary['total_count']);
        
       // saveFB(); 
     } );
    
}

function getComments(callback)
{
    FB.api("/"+ post['id'] + "/comments?summary=true",{},function(response) { 
       
        callback(response.summary['total_count']);
        
       
      
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
    //test();
    post['message']= dat['message'];
    post['created_time']= dat['created_time'];
    post['id']=dat['id']; 
    
  
    getComments(function(model){
       likes = model; 
       console.log("likes: " + likes); 
   }); 
   
    
  /*  post['likes']=getLikes(dat['id']);    
    console.log(post['likes']);
    
    post['comments']=getComments(dat['id']);
    
      saveFB();*/

}

function saveFB()
{
     $.post('/polls/saveFB/', post, function(response){
       /* if(response == 'success') { //alert('Yay!');}
        else{//alert('dump');}*/
    });
}


	
function test()
{
    
    
    var person={
        FB: 'es.muellert.wieder',
        Twitter: 'empty',
        Instagram: 'empty',
        forname: 'Thomas',
        surname: 'Mueller',
    }
    
    
    $.post('/polls/savePerson/', person, function(response){
        if(response == 'success') { alert('Yay!');}
        else{alert('dump');}
    });
    
    /*$.post('/polls/saveFB/', data, function(response){
        if(response == 'success') { alert('Yay!');}
        else{alert('dump');}
    });*/
    
  /*  var t={
        message: "This is a test message",
        name: "Maria"
    }
    var x="test"
  console.log("test")
    $.post('/polls/like_category/', t, function(response){
        if(response == 'success') { alert('Yay!');}
        else{alert('dump');}
    });*/
    
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

