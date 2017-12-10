/**
 * utility functions
 */


function computeSignature(node) {
  let childTags = []
  for (let child of node.childNodes) {
    childTags.push(child.tagName)
  }
  return childTags.join('$')
}

function compact(array) {
  let ret = []
  for (let el of array) {
    if (el) {
      ret.push(el)
    }
  }
  return ret;
}


/**
 * a simulation of Python's Counter function
 */
function Counter(array) {
  let count = {};
  array.forEach(val => count[val] = (count[val] || 0) + 1);
  return count;
}

function removeElementTags(element, tag) {
  let b = element.getElementsByTagName(tag);
  while (b.length) {
    var parent = b[0].parentNode;
    while (b[0].firstChild) {
      parent.insertBefore(b[0].firstChild, b[0]);
    }
    parent.removeChild(b[0]);
  }
}



let largestList = null;
let largestListSize = 0;
for (let node of document.getElementsByTagName('*')) {
  let signatures = []
  for (let child of node.children) {
    child.signature = computeSignature(child)
    signatures.push(child.signature)
  }
  signatures = compact(signatures)
  let counter = Counter(signatures)
  let mostCommonSignature = null;
  let biggestCount = 1;
  for (let [signature, count] of Object.entries(counter)) {
    if (count > biggestCount) {
      mostCommonSignature = signature
      biggestCount = count
    }
  }
  if (biggestCount >= 3) {
    let listSize = node.childNodes.length
    if (listSize > largestListSize) {
      largestList = node;
      largestListSize = listSize;
    }
  }
}

removeElementTags(largestList, 'mark')
removeElementTags(largestList, 'span')


let body = '<table style="border: 1px solid; border-collapse: collapse">'

for (let row of largestList.children) {
  body += '<tr>'
  for (let element of row.getElementsByTagName('*')) {
    if (element.textContent && element.children.length == 0) {
      body += `<td style="border: 1px solid; border-collapse: collapse">${element.textContent}</td>`
      console.log(element.textContent)
    }
    if (element.tagName == 'A') {
      body += `<td style="border: 1px solid; border-collapse: collapse">${element.getAttribute('href')}</td>`
      console.log(element.getAttribute('href'))
    }
  }
  body += '</tr>'
}

body += '</table>'

console.log(body)
document.write(body)

