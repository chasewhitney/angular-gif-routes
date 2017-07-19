myApp.controller("RandomController", function($http){
  console.log('Random Controller loaded');
  var rc = this;

    rc.gifRandomArray = [];

  rc.getRandomGif = function(){
      console.log('in randomGif');
      $http.get('https://api.giphy.com/v1/gifs/random?api_key=2a46042e894b4233bf73bf93ee7d457e&tag=&rating=G').then(function(response){
        console.log(response);
        console.log(response.data.data.image_url);

        rc.gifRandomArray = [];
        rc.gifRandomArray[0] = (response.data.data.image_url);

        //gif.gifArray[index] = response.data.data.image_url;
        //gif.gifArray.push(response.data.data.image_url);
        //gif.one = response.data.data.image_url;
        console.log(rc.gifRandomArray);
      });

    };

    rc.saveFavorite = function(url){
      console.log('in rc.saveFavorite with', url);

      $http.post('/saveFavorite',{imageUrl: url}).then(function(response){
        console.log('post response is:', response);
      });

    };

});
