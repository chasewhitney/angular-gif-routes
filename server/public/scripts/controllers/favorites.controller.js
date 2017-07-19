myApp.controller("FavoritesController", function($http){
  console.log('Favorites Controller loaded');
  var fav = this;
  fav.favoritesArray = [];

  fav.getFavorites = function(){
    $http.get('/getFavorites').then(function(response){
      console.log('post response is:', response);
      fav.favoritesArray = response.data.gifs;
      console.log('fav array is', fav.favoritesArray);
    });

  fav.deleteFavorite = function(url){
    $http.delete('/deleteFavorite', {params: {url: url}}).then(function(response){
      console.log('deleted favorite', url);
      fav.getFavorites();
    });
  };

  };
});
