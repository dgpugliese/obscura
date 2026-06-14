const types = { length: 1, 0: "Files" };

function testOld() {
  let count = 0;
  for (let i = 0; i < 1000000; i++) {
    if (Array.from(types || []).includes("Files")) {
      count++;
    }
  }
  return count;
}

function testNew() {
  let count = 0;
  for (let i = 0; i < 1000000; i++) {
    if (Array.prototype.includes.call(types || [], "Files")) {
      count++;
    }
  }
  return count;
}

console.time("Old");
testOld();
console.timeEnd("Old");

console.time("New");
testNew();
console.timeEnd("New");
