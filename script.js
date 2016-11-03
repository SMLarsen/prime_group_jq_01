$(document).ready(function(){

//----------------------------- GLOBAL VARIABLS ------------------------------//

    var fruitArray = ["orange", "apple", "banana", "pear"];

    var customer = {
        initialCash: 100,
        currentCash: 100,
        buy: function (price) {
            this.currentCash -= price;
        },
        sell: function (price) {
            this.currentCash += price;
        },
    };

    var currentFruit = null;

//---------------------------------- LOGIC -----------------------------------//
    pageBuilder(fruitArray);
    for (var i = 0; i < fruitArray.length; i++) {
        // creates fruit properties in customer object
        customer[fruitArray[i]] = 0;

        // calls funtion that creates fruit items on index.html
        // fruitDisplayBuilder(fruitArray[i]);

        // converts strings in fruitArray into objects
        fruitArray[i] = new Fruit (fruitArray[i]);
    }

    setInterval(setRandPrices, 15000);

    for (var i = 0; i < fruitArray.length; i++) {
      var fruit = fruitArray[i];
      $('#avg-' + fruit.type + '-price').text(fruit.getAvgPrice());
      $('#current-' + fruit.type + '-price').text(fruit.currentPrice);

      // fruitArray[i]
    }

//-------------------------------- FUNCTIONS ---------------------------------//

    // object constructor to create new fruits
    function Fruit(fruitType){
        this.type = fruitType;
        this.currentPrice = Number(randomNumber(.5, 9.99).toFixed(2));
        this.quantSold = 0;
        this.totalSoldVal = 0;
        this.sell = function () {
            this.totalSoldVal += this.currentPrice;
            this.quantSold++;
        };
        this.getAvgPrice = function () {
          if(this.quantSold === 0 || this.totalSoldVal === 0) {
            return 0;
          }
          return this.totalSoldVal / this.quantSold;
        };
    }

    // incomplete - will iterate thru every fruit with getPrice
    // may not need - getPrice function may replace this
    function setRandPrices() {
        for (var i = 0; i < fruitArray.length; i++) {
            randomNumber(.5, 9.99).toFixed(2);
            fruitArray[i];
        }
    }

    // randomly generates a new price for each fruit
    function getPrice(startPrice) {
        var newPrice = 0;
        newPrice = randomNumber(startPrice - 0.5, startPrice + 0.5).toFixed(2);
        newPrice = Math.min(newPrice, 9.99);
        newPrice = Math.max(newPrice, 0.5);
        return newPrice;
    }

    //builds each fruit item in HTML
    function pageBuilder(array) {
      for (var i = 0; i < array.length; i++) {
        //appending bootstrap column to row
        $('.row:last').append('<div class="col-md-3 fruit"><div class="inner-fruit-container"><h3>' + array[i].toUpperCase() +
        '</h3><br /><button id=' + array[i] +
        '>Buy</button><p>Avg. Price: <span id="avg-' + array[i] +
        '-price"></span></p><p>Market Price: <span id="current-' + array[i] + '-price"</div></div>');
        //add class to newly appended column
        $('.fruit:last').addClass(array[i]);
        //apply background to column
        $('.fruit:last').css({
                'background': 'url(img/' + array[i] + '.jpg) no-repeat center center fixed', '-webkit-background-size': 'cover', '-moz-background-size': 'cover', '-o-background-size': 'cover','background-size': 'cover', 'height': '400px'});

        //if 4 columns have been displayed, create new row to append to
        if ((i + 1) % 4 == 0) {
          $('.container').append('<div class="row"></div>');
        }
      }
    }

    function getSpecificFruit (fruitType) {
        for (var i = 0; i < fruitArray.length; i++) {
            if (fruitArray[i].type === fruitType){
                return fruitArray[i];
            } else {
              return false;
                alert("Not a valid fruit type");
            }
        }
    }

    // generic random number generator
    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

});
