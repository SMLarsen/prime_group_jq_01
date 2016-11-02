$(document).ready(function() {
	var fruitArray = ["apple", "orange", "banana", "grape"];

	function fruitDisplayBuilder(fruit) {
		$('.fruit-store-display').append('<div class="fruit"><div class="inner-fruit-container"><button>Buy</button><p>Avg. Price: <span id="avg-' + fruit + '-price"></span></div></div>');
		$('.fruit:last').addClass(fruit);
		$('.fruit:last').css({'background': 'url(img/' + fruit + '.jpg) no-repeat center center fixed', '-webkit-background-size': 'cover', '-moz-background-size': 'cover',
	  '-o-background-size': 'cover','background-size': 'cover'});
	}
	for (var i = 0; i < fruitArray.length; i++) {
		fruitDisplayBuilder(fruitArray[i]);
	}
});
//  function Fruit(fruitType, startPrice){
//     this.type = fruitType;
//     this.startPrice = startPrice;
//     this.currentVal = function() {};
//     this.quantSold = function(){};
//     this.totalSoldVal = function(){};
// }
//
// var Customer = {
//     initialCash:
//     currentCash:
//     fruitInventory: [][]
// };
//
// function getPrice(startPrice) {
//   var newPrice = 0;
//   newPrice = randomNumber(startPrice - 0.5, startPrice + 0.5).toFixed(2);
//   newPrice = Math.min(newPrice, 9.99);
//   newPrice = Math.max(newPrice, 0.5);
//   return newPrice;
// }
//
// function randomNumber(min, max){
//   return Math.random() * (1 + max - min) + min;
// }
