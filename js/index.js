$("document").ready(function(){
 // generateColour();
var searchResults=[];
var base="https://en.wikipedia.org/w/api.php?";
var end="&callback=?"
var searchUrl="action=query&list=search&format=json&srsearch=";
var titleUrl="action=query&prop=info&format=json&inprop=url&titles="
var Entry=function(){
  this.title;
  this.fullUrl;
  this.snippet;
}
var keyword;
  $('#search-text').keypress(function(e){
      if(e.keyCode==13)
      $('#butt').click();
    });
$("#butt").click(function(){
  searchResults=[];
$(".results").html("");
keyword=$("#search-text").val();
  
  storeResult(keyword);



});
  $("#random").click(function(){
    searchResults=[];
$(".results").html("");
    random();
    
    
  });
  function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}
  function random()
  {
      for(var i=0;i<10;i++)
       { 
        $.ajax({
          url : 'https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&grnlimit=1&prop=info|extracts&inprop=url&format=json'+end,
          dataType: 'json',
          async:false,
          success:function(data){
           
            var key=Object.keys(data.query.pages);
            
            searchResults[i]=new Entry();
            searchResults[i].fullUrl=data.query.pages[key].fullurl;
            searchResults[i].title=data.query.pages[key].title;
            searchResults[i].snippet=strip(data.query.pages[key].extract.substr(0,100)+"...");
           
  var content='<br><div id="article"><div class="thumbnail"><p><a target="_blank" href="'+searchResults[i].fullUrl+'">'+searchResults[i].title+'</a></p><div class="caption"><h3>'+searchResults[i].snippet+'</h3></div></div></div><br>';
      $(content).appendTo(".results");
            
        }
        });
         
       }
        
  }
  function storeResult(val)
  {
    
    $.ajax({
      
      url: base+searchUrl+val+end ,
      dataType: 'json',
      async:false,
      success: function(data){
        $.each(data["query"]["search"],function(i,item){
          searchResults[i]=new Entry();
          searchResults[i].title=item.title;
          searchResults[i].snippet=item.snippet;
          $.ajax({
            
            url:base+titleUrl+item.title+end,
            dataType: 'json',
           async:false,
            success: function(data)
            {
              var keys;
             // console.log(data);
//               $.each(data,function(j,value){
//               searchResults[i].fullUrl=value.fullurl;
              
//     })
              
              keys=Object.keys(data.query.pages);
            
    searchResults[i].fullUrl=data.query.pages[keys].fullurl;
  var content='<br><div id="article"><div class="thumbnail"><p><a target="_blank" href="'+searchResults[i].fullUrl+'">'+searchResults[i].title+'</a></p><div class="caption"><h3>'+searchResults[i].snippet+'</h3></div></div></div><br>';
      $(content).appendTo(".results");
            }
          });
        });
      }
    });
  }
  
  
});
function generateColour() {
    var hex = '#';
    var range = 'ABCDEF0123456789';

    for (var i = 0; i < 6; i++ ) {
      hex += range.charAt(Math.floor(Math.random() * range.length));
    }
  $("body").attr("style","background-color:"+hex+";");
  return hex;
  }