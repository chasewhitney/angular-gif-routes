myApp.factory('GiphyService', function($http){
  console.log('GiphyService created');

var giphy = {}

giphy.gifArray = [];
giphy.offset = 0;
giphy.search = '';

giphy.favoritesArray = [];

giphy.getFavorites = function(){
  $http.get('/getFavorites').then(function(response){
    console.log('get response is:', response);
    giphy.favoritesArray = response.data.gifs;
    console.log('fav array is', giphy.favoritesArray);
  });
};

giphy.deleteFavorite = function(url){
  $http.delete('/deleteFavorite', {params: {url: url}}).then(function(response){
    console.log('deleted favorite', url);
    giphy.getFavorites();
  });
};

giphy.searchGifs = function(search){
  console.log(search);
  $http.get('https://api.giphy.com/v1/gifs/search?api_key=2a46042e894b4233bf73bf93ee7d457e&q=' + search +'&limit=5&offset=' + giphy.offset + '&rating=G&lang=en').then(function(response){
    console.log(response);
    //gif.gifArray = (response.data.data[0].images.original.url);
    giphy.gifRandomArray = [];
    giphy.gifArray = [];
    giphy.gifArray = response.data.data;
    console.log(response.data.data[0].images.original.url);
    giphy.search = search;
  });

};

giphy.next = function(){
    giphy.offset += 5;
    giphy.searchGifs(giphy.search);
};

giphy.previous = function(){
  if(giphy.offset == 0) {

  } else {
    giphy.offset -= 5;
    giphy.searchGifs(giphy.search);
  }
};

giphy.test = function() {
  console.log('TEST');
};

giphy.saveFavorite = function(url) {
  console.log('in giphy.saveFavorite with', url);
  $http.post('/saveFavorite',{imageUrl: url}).then(function(response){
    console.log('post response is:', response);
  });

};


giphy.gifRandomArray = [];

giphy.getRandomGif = function(){
  console.log('in randomGif');
  $http.get('https://api.giphy.com/v1/gifs/random?api_key=2a46042e894b4233bf73bf93ee7d457e&tag=&rating=G').then(function(response){
    console.log(response);
    console.log(response.data.data.image_url);

    giphy.gifRandomArray = [];
    giphy.gifRandomArray[0] = (response.data.data.image_url);

    //gif.gifArray[index] = response.data.data.image_url;
    //gif.gifArray.push(response.data.data.image_url);
    //gif.one = response.data.data.image_url;
    console.log(giphy.gifRandomArray);
  });

};

giphy.saveFavorite = function(url){
  console.log('in giphy.saveFavorite with', url);

  $http.post('/saveFavorite',{imageUrl: url}).then(function(response){
    console.log('post response is:', response);
  });

};



return giphy;

});
