let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let sel_btn = document.getElementById("sel_sort");
let ins_btn = document.getElementById("ins_sort");
let merge_btn = document.getElementById("merge_sort");
let numOfBars = 25;
let unsorted_array = new Array(numOfBars);
let bars_container = document.getElementById("bars_container");
function createRandomArray() {
  for (let i = 0; i <= numOfBars - 1; i++) {
    unsorted_array[i] = i + 1;
  }

  for (let i = numOfBars - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = unsorted_array[i];
    unsorted_array[i] = unsorted_array[j];
    unsorted_array[j] = temp;
  }
  unsorted_array[numOfBars - 1] = numOfBars;
}

function renderBars(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * 10 + "px";
    bars_container.appendChild(bar);
  }
  bars[numOfBars - 1].style.width = 0 + "px";
  bars[numOfBars - 1].style.border = 0 + "px";
}

randomize_array.addEventListener("click", function () {
  createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubble(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    let j = 0;
    for (j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        await sleep(50);

        bars[j].style.height = array[j] * 10 + "px";
        bars[j + 1].style.height = array[j + 1] * 10 + "px";

        bars[j + 1].style.backgroundColor = "red";

        await sleep(35);
      }
      bars[j].style.backgroundColor = "aqua";
    }
  }
}

sort_btn.addEventListener("click", function () {
  bubble(unsorted_array);
});

async function selSort(arr) {
  let bars = document.getElementsByClassName("bar");
  const length = arr.length;

  for (let i = 0; i < length - 1; i++) {
    let minIndex = i;
    let j = i + 1;

    for (j = i + 1; j < length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }

      bars[j].style.backgroundColor = "red";
      bars[j - 1].style.backgroundColor = "aqua";

      await sleep(35);
    }

    if (minIndex !== i) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;

      bars[minIndex].style.height = arr[minIndex] * 10 + "px";
      bars[i].style.height = arr[i] * 10 + "px";
    }
  }
}

sel_btn.addEventListener("click", function () {
  selSort(unsorted_array);
});

async function insSort(arr) 
{
  let bars = document.getElementsByClassName("bar");

  let i,
    key,
    j,
    length = arr.length;
  for (i = 1; i < length; i++) {
    key = arr[i];
    j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      bars[j + 1].style.height = arr[j + 1] * 10 + "px";
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "aqua";

      j--;
      await sleep(50);
    }
    arr[j + 1] = key;
    bars[j + 1].style.height = key * 10 + "px";
    bars[j + 1].style.backgroundColor = "aqua";
  }
}

ins_btn.addEventListener("click", function () {
  insSort(unsorted_array);
});

async function merge(arr, l, m, r) 
{
  let bars = document.getElementsByClassName("bar");
  var n1 = m - l + 1;
  var n2 = r - m;

  var L = new Array(n1);
  var R = new Array(n2);

  for (var i = 0; i < n1; i++) {
    L[i] = arr[l + i];
  }

  for (var j = 0; j < n2; j++) {
    R[j] = arr[m + 1 + j];
  }

  var i = 0;
  var j = 0;
  var k = l;

  while (i < n1 && j < n2) 
  {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } 
    else 
    {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  while (i < n1) 
  {
    arr[k] = L[i];
    i++;
    k++;
  }

  while (j < n2) 
  {
    arr[k] = R[j];
    j++;
    k++;
  }

  for(let x = l; x <=r; x++)
  {
    bars[x].style.height = arr[x]*10 + "px";
    bars[x].style.backgroundColor = "aqua";
    bars[x+1].style.backgroundColor = "red";
    await sleep(75);
  }


}

async function mergeSort(arr, l, r) 
{
  if (l >= r) 
  {
    return;
  }
  var m = l + parseInt((r - l) / 2);
  let v=10000;
  mergeSort(arr, l, m);
  mergeSort(arr, m + 1, r);
  merge(arr, l, m, r);
}

merge_btn.addEventListener("click", function () {
  mergeSort(unsorted_array, 0, unsorted_array.length - 1);
  //console.log(sorted);
});
