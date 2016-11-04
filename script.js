$(document).ready(function(){

//----------------------------- GLOBAL VARIABLS ------------------------------//

    var fruitArray = ["orange", "apple", "banana", "pear"];
    var initialCash = 100;
    var interval;
    var intervalCounter = 0;
    var intervalLimit = 2;
    var intervalLength = 5000;
    var customer = new Customer(initialCash);
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

    interval = setInterval(updateDom, intervalLength);

    for (var i = 0; i < fruitArray.length; i++) {
      var fruit = fruitArray[i];
      setStats(fruit);
    }

    //---------------------------------- EVENT LISTENERS -----------------------------------//

    $('#fruit-container').on('click', '.buy', buyFruit);

    $('#fruit-container').on('click', '.sell', sellFruit);

    $('#liquidate-button').on('click', liquidate);

//-------------------------------- FUNCTIONS ---------------------------------//

// object constructor to create new fruits
function Customer(cash) {
    this.initialCash = cash;
    this.currentCash = cash;
    this.buy = function (fruit, price) {
        this.currentCash -= price;        console.log(this);
        this[fruit]++;
    };
    this.sell = function (fruit, price) {
        this.currentCash += price;
        this[fruit]--;
    };
  }

// object constructor to create new fruits
function Fruit(fruitType) {
    this.type = fruitType;
    this.currentPrice = Number(randomNumber(0.5, 9.99).toFixed(2));
    this.totalSold = 0;
    this.totalSoldVal = 0;
    this.sell = function () {
        this.totalSoldVal += this.currentPrice;
        this.totalSold++;
    };
    this.getAvgPrice = function () {
      if(this.totalSold === 0 || this.totalSoldVal === 0) {
        return 0;
      }
      return (this.totalSoldVal / this.totalSold).toFixed(2);
    };
}

    function buyFruit(){
      var fruit = $(this).attr("id");
      getFruit(fruit).sell();
      customer.buy(fruit, getFruit(fruit).currentPrice);
      setStats(getFruit(fruit));
    }

    function sellFruit(){
      var fruit = $(this).attr("id");
      customer.sell(fruit, getFruit(fruit).currentPrice);
      setStats(getFruit(fruit));
    }

    function updateDom(){
      for (var i = 0; i < fruitArray.length; i++) {
          fruitArray[i].currentPrice = getPrice(fruitArray[i].currentPrice);
          var fruit = fruitArray[i];
          setStats(fruit);
      }
      if (intervalCounter >= intervalLimit) {
        clearInterval(interval);
      }
      intervalCounter++;
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
        $('#fruit-row:last').append('<div class="col-md-3 fruit"><div class="inner-fruit-container"><p class="fruit-name">' + array[i].toUpperCase() +
        '</p><br />' +
        '<div class="form-group"><button class="buy btn btn-primary btn-lg" id=' + array[i] + '>Buy</button></div>' +
        '<div class="form-group"><button class="sell btn btn-secondary btn-lg" id=' + array[i] + '>Sell</button></div>' +
        // '<p>Quantity Sold: <span id="current-' + array[i] + '-quantity"></p>' +
        // '<p>Avg. Price: <span id="avg-' + array[i] + '-price"></span></p>' +
        '<p>Market Price: <span id="current-' + array[i] + '-price"</div></div>');
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
				'<div class="col-md-2" id="' + fruit.type + '-inventory-type"> <p>' + fruit.type + '</p></div>' +
				'<div class="col-md-2 quantity" id="' + fruit.type + '-inventory-quantity"> <p>' + customer[fruit] + '</p></div>' +
				'<div class="col-md-2 currency" id="' + fruit.type + '-inventory-avg-price"> <p>' + fruit.getAvgPrice() + '</p></div>' +
				'<div class="col-md-2 currency" id="' + fruit.type + '-inventory-total"> <p>' + fruit.totalSoldVal + '</p></div>' +
				'<div class="col-md-2"> <p></p></div>' +
        '</div>');

      }
    }

    function setStats(fruit) {
      $('#current-' + fruit.type + '-price').text(fruit.currentPrice.toLocaleString('en', {style: 'currency', currency: 'USD'}));

      $('#available-balance').text(customer.currentCash.toLocaleString('en', {style: 'currency', currency: 'USD'}));

      $('#' + fruit.type + '-inventory-quantity').text(customer[fruit.type]);
      $('#' + fruit.type + '-inventory-avg-price').text(fruit.getAvgPrice().toLocaleString('en', {style: 'currency', currency: 'USD'}));
      $('#' + fruit.type + '-inventory-total').text((customer[fruit.type] * fruit.getAvgPrice()).toLocaleString('en', {style: 'currency', currency: 'USD'}));
    }

    function liquidate() {
      for (var i = 0; i < fruitArray.length; i++) {
        if (customer[fruitArray[i].type] > 0) {
          customer.currentCash += customer[fruitArray[i].type] * fruitArray[i].currentPrice;
          customer[fruitArray[i].type] = 0;
          setStats(fruitArray[i]);
        }
      }
    }

    function getFruit (fruitType) {
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
