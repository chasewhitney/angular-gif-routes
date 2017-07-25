myApp.controller("SearchController", function($http, GiphyService){
  console.log('Search Controller loaded');
  var gif = this;

  gif.giphyService = GiphyService;

    // gif.searchGifs = function(search){
    //   console.log(search);
    //   $http.get('https://api.giphy.com/v1/gifs/search?api_key=2a46042e894b4233bf73bf93ee7d457e&q=' + search +'&limit=5&offset=' + gif.offset + '&rating=G&lang=en').then(function(response){
    //     console.log(response);
    //     //gif.gifArray = (response.data.data[0].images.original.url);
    //     gif.gifRandomArray = [];
    //     gif.gifArray = [];
    //     gif.gifArray = response.data.data;
    //     console.log(response.data.data[0].images.original.url);
    //     gif.search = search;
    //   });
    //
    // };
    //
    // gif.next = function(){
    //     gif.offset += 5;
    //     gif.searchGifs(gif.search);
    // };
    //
    // gif.previous = function(){
    //   if(gif.offset == 0) {
    //
    //   } else {
    //     gif.offset -= 5;
    //     gif.searchGifs(gif.search);
    //   }
    // };
    //
    // gif.test = function() {
    //   console.log('TEST');
    // };
    //
    // gif.saveFavorite = function(url) {
    //   console.log('in gif.saveFavorite with', url);
    //   $http.post('/saveFavorite',{imageUrl: url}).then(function(response){
    //     console.log('post response is:', response);
    //   });
    //
    // };

});
