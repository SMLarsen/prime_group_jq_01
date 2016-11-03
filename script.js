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

    for (var i = 0; i < fruitArray.length; i++) {
        // creates fruit properties in customer object
        customer[fruitArray[i]] = 0;

        // calls funtion that creates fruit items on index.html
        fruitDisplayBuilder(fruitArray[i]);

        // converts strings in fruitArray into objects
        fruitArray[i] = new Fruit (fruitArray[i]);
    }

    setInterval(setRandPrices, 15000);



//-------------------------------- FUNCTIONS ---------------------------------//

    // object constructor to create new fruits
    function Fruit(fruitType){
        this.type = fruitType;
        this.currentPrice = randomNumber(.5, 9.99).toFixed(2);
        this.quantSold = 0;
        this.totalSoldVal = 0;
        this.sell = function () {
            this.totalSoldVal += this.currentPrice;
            this.quantSold++;
        };
        this.getAvgPrice = function () {
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
    function fruitDisplayBuilder(fruit) {
		$('.fruit-store-display').append(
            '<div class="fruit"><div class="inner-fruit-container"><button>Buy</button><p>Avg. Price: <span id="avg-' + fruit + '-price"></span></p></div></div>');

		$('.fruit:last').addClass(fruit);

		$('.fruit:last').css({
            'background': 'url(img/' + fruit + '.jpg) no-repeat center center fixed', '-webkit-background-size': 'cover', '-moz-background-size': 'cover', '-o-background-size': 'cover','background-size': 'cover'});
	}

    function getSpecificFruit (fruitType) {
        for (var i = 0; i < fruitArray.length; i++) {
            if (fruitArray[i].type === fruitType){
                return fruitArray[i];
            } else {
                alert("Not a valid fruit type");
            }
        }
    }

    // generic random number generator
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (1 + max - min) + min);
    }

});
