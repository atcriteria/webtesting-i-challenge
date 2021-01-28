class Item {
  constructor(name){
    this.name = name;
    this.durability = 100;
    this.enhancement = 0;
  }
}

function success(item) {
  if (item.enhancement < 20){
    return { ...item,
    ["enhancement"]: item.enhancement += 1 };
  } else {
    return { ...item }
  }
}

function fail(item) {
  if (item.enhancement < 15){
    return {...item, ["durability"]: item.durability -= 5}
  } else {
    if (item.enhancement > 16) {
      return {...item, ["durability"]: item.durability -= 10, ["enhancement"]: item.enhancement -= 1}
    } 
  return {...item, ["durability"]: item.durability -=10}
  }
}

function repair(item) {
  return { ...item,
  ["durability"]: 100 };
}

function get(item) {
  let enhLevel = item.enhancement;
  let origName = item.name;
  if(enhLevel === 0) {
    return { ...item}
  } else {
    return Promise.resolve({ ...item,
    ["name"]: `[+${enhLevel}] ${origName}`})
  }
}

module.exports = {
  success,
  fail,
  repair,
  get,
  Item
};