$(document).ready(function(){

//----------------------------- GLOBAL VARIABLS ------------------------------//

    var fruitArray = ["orange", "apple", "banana", "pear"];
    var interval;
    var intervalCounter = 0;
    var intervalLimit = 5;

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

    fruitBuilder(fruitArray);
    for (var i = 0; i < fruitArray.length; i++) {
        // creates fruit properties in customer object
        customer[fruitArray[i]] = 0;

        // calls funtion that creates fruit items on index.html
        // fruitDisplayBuilder(fruitArray[i]);

        // converts strings in fruitArray into objects
        fruitArray[i] = new Fruit (fruitArray[i]);
    }
    inventoryBuilder(fruitArray);

      interval = setInterval(updateDom, 5000);

    // interval = setInterval(updateDom, 3000);

    // console.log('Initial values:');
    // console.log(fruitArray);

    for (var i = 0; i < fruitArray.length; i++) {
      var fruit = fruitArray[i];
      setFruitStats(fruit);
    }

    $('#fruit-container').on('click', 'button', buyFruit);

//-------------------------------- FUNCTIONS ---------------------------------//

    function buyFruit(){
      var fruit = $(this).attr("id");
      console.log(fruit);
      getSpecificFruit(fruit).sell();
      customer.buy(getSpecificFruit(fruit).currentPrice);
      // console.log(type of customer.currentCash);
      setFruitStats(getSpecificFruit(fruit));
    }

    function updateDom(){
      for (var i = 0; i < fruitArray.length; i++) {
          fruitArray[i].currentPrice = getPrice(fruitArray[i].currentPrice);
          var fruit = fruitArray[i];
          setFruitStats(fruit);
      }
      if (intervalCounter >= intervalLimit) {
        clearInterval(interval);
      }
      intervalCounter++;
    }

    // object constructor to create new fruits
    function Fruit(fruitType){
        this.type = fruitType;
        this.currentPrice = Number(randomNumber(0.5, 9.99).toFixed(2));
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

    // randomly generates a new price for each fruit
    function getPrice(startPrice) {
        var newPrice = 0;
        newPrice = randomNumber(startPrice - 0.5, startPrice + 0.5).toFixed(2);
        newPrice = Math.min(newPrice, 9.99);
        newPrice = Math.max(newPrice, 0.5);
        return newPrice;
    }

    //builds each fruit item in HTML
    function fruitBuilder(array) {
      for (var i = 0; i < array.length; i++) {
        //appending bootstrap column to fruit-fruit-row
        $('#fruit-row:last').append('<div class="col-md-3 fruit"><div class="inner-fruit-container"><p>' + array[i].toUpperCase() +
        '</p><br /><button id=' + array[i] +
        '>Buy</button><button id=' + array[i] +
        '-sell">Sell</button><p>Quantity Sold: <span id="current-' + array[i] + '-quantity"></p><p>Avg. Price: <span id="avg-' + array[i] +
        '-price"></span></p><p>Market Price: <span id="current-' + array[i] + '-price"</div></div>');
        //add class to newly appended column
        $('.fruit:last').addClass(array[i]);
        //apply background to column
        $('.fruit:last').css({
                'background': 'url(img/' + array[i] + '.jpg) no-repeat center center fixed', '-webkit-background-size': 'cover', '-moz-background-size': 'cover', '-o-background-size': 'cover','background-size': 'cover', 'height': '400px'});

        //if 4 columns have been displayed, create new fruit-fruit-row to append to
        if ((i + 1) % 4 === 0) {
          $('#fruit-container').append('<div class="fruit-row"></div>');
        }
      }
    }

        //builds each fruit item in HTML
        function inventoryBuilder(array) {
          for (var i = 0; i < array.length; i++) {
            var fruit = array[i];
            $('#inventory-container').append('<div class="row" id="inventory-row">' +
  					'<div class="col-md-2"> <p></p></div>' +
  					'<div class="col-md-2"> <p>' + fruit.type + '</p></div>' +
  					'<div class="col-md-2"> <p>' + fruit.quantSold + '</p></div>' +
  					'<div class="col-md-2"> <p>' + fruit.getAvgPrice() + '</p></div>' +
  					'<div class="col-md-2"> <p>' + fruit.totalSoldVal + '</p></div>' +
  					'<div class="col-md-2"> <p></p></div>' +
            '</div>');

          }
        }

    function setFruitStats(fruit) {
      $('#avg-' + fruit.type + '-price').text(fruit.getAvgPrice().toLocaleString('en', {style: 'currency', currency: 'USD'}));
      $('#current-' + fruit.type + '-price').text(fruit.currentPrice.toLocaleString('en', {style: 'currency', currency: 'USD'}));
      $('#current-' + fruit.type + '-quantity').text(fruit.quantSold);
      $('#available-balance').text(customer.currentCash.toLocaleString('en', {style: 'currency', currency: 'USD'}));
    }

    function getSpecificFruit (fruitType) {
        for (var i = 0; i < fruitArray.length; i++) {
            if (fruitArray[i].type === fruitType){
                return fruitArray[i];
            }
        }
    }

    // generic random number generator
    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }



});
