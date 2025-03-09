function objeys(name) {
  this.name = name;
  alert(name);
}
let obj = new objeys("john");
let obj2 = new obj.constructor("ss");

function objeys(name) {
  this.name = name;
  alert(name);
}
objeys.prototype = {};
let obj = new objeys("john");
let obj2 = new obj.constructor("ss");
//123
