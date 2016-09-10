$("document").ready(function(){
 // generateColour();
var searchResults=[];
var base="https://en.wikipedia.org/w/api.php?";
var end="&callback=?"
var searchUrl="action=query&list=search&format=json&srsearch=";
var titleUrl="action=query&prop=info&format=json&inprop=url&titles="

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
            
            
            var aa=data.query.pages[key].fullurl;
            var bb=data.query.pages[key].title;
            var cc=strip(data.query.pages[key].extract.substr(0,100)+"...");
           
  var content='<br><div id="article"><div class="thumbnail"><p><a target="_blank" href="'+aa+'">'+bb+'</a></p><div class="caption"><h3>'+cc+'</h3></div></div></div><br>';
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
          
          var aa=item.title;
          var bb=item.snippet;
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
            
    var cc=data.query.pages[keys].fullurl;
  var content='<br><div id="article"><div class="thumbnail"><p><a target="_blank" href="'+cc+'">'+aa+'</a></p><div class="caption"><h3>'+bb+'</h3></div></div></div><br>';
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