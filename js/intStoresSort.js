(function(){
  
  
jQuery.getJSON(
  "../stores/int-stores.json"
  ).fail(function(err){
     //handle fail here
    console.log('Failed: '+ err);
   }).done(function(jsondata){


  var countryData = jsondata.data;
  var countryDataCountries = countryData.country;
  //var countryLength = countryData.country.length;


/*Reusable Sort Function*/
function sortByProperty(property) {
    'use strict';
    return function (a, b) {
        var sortStatus = 0;
        if (a[property] < b[property]) {
            sortStatus = -1;
        } else if (a[property] > b[property]) {
            sortStatus = 1;
        }
 
        return sortStatus;
    };
}

 
var sortedCountries = countryDataCountries.sort(sortByProperty('name'));


  /*countryContainer - creates Country Divs and the Options to choose*/
  function countryContainer(){ 
     
      var countryTmp = '';
      var countryOptions = '<option>Select a Country:</option>';
     
     $.each(sortedCountries, function(key, country) { 
      countryTmp += '<div class="INScontainer-inner INScountry" id=\"' + country.id + '\"><h2>' + country.name +'</h2></div><div class="INScontainer-inner"></div>';
      countryOptions += '<option value=\"&#35;'+ country.id + '\">' + country.name +'</option>';
    });               
        $('.INScontainer').append(countryTmp);
        $(countryOptions).appendTo('select[name=INSdropdpown]');
      //console.log(shopString);
  }
  /*end of countyContainer*/
  

  /*storeContainer*/
  function storeContainer(){
       $.each(sortedCountries, function(key, country) {
         
         var sortedCities = country.city.sort(sortByProperty('cityName'));

               for(var i=0; i<sortedCities.length; i++){
                
                    var storeTmp = ''; /*gets reset to empty for each country before starting loop*/
                    var sortedStores = sortedCities[i].store.sort(sortByProperty('storeName')); /*sort the stores in the city*/

                      var storeCount = 0;

                      for (var j=0; j<sortedStores.length; j++){

                            if((sortedStores[j].shopInShop).toLowerCase() == 'yes'){

                                storeTmp += '<div class="INScol"><h3 class="shopInShop">' + sortedStores[j].storeName + '</h3><span class="street-address">' + sortedCities[i].cityName +'</span><br/></div>';

                              }

                            else{

                              storeTmp += '<div class="INScol"><h3>' + sortedStores[j].storeName + '</h3><span class="street-address">' + sortedCities[i].cityName +'</span><br/></div>';
                            }

                          }

                 $(storeTmp).appendTo('div#' + country.id + '+ div.INScontainer-inner');

                }  
      
            }); 
  }
  /*end of storeContainer*/
   
     countryContainer();
     storeContainer();
     console.log('Ran Successfully.');



  });
})();