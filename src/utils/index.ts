export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const shuffle = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

declare global {
  interface Array<T> {
    next(idx: number): T;
    previous(idx: number): T;
    deleteByValue(value: T): void;
    reject(array: number[]): number[];
  }
}

Array.prototype.next = function (idx: number) {
  if (idx === this.length - 1) {
    return this[0];
  } else {
    return this[idx + 1];
  }
};
Array.prototype.previous = function (idx: number) {
  if (idx === 0) {
    return this[this.length - 1];
  } else {
    return this[idx - 1];
  }
};

Array.prototype.deleteByValue = function (value) {
  const pos = this.indexOf(value);
  this.splice(pos, 1);
};

Array.prototype.reject = function (array) {
  return this.filter(function (ele) {
    return array.indexOf(ele) < 0 ? ele : null;
  });
};

export const swap = (x: number, y: number, arr: number[]) => {
  if (x > arr.length || y > arr.length || x === y) {
    return;
  }
  const arrCopy = arr.slice();

  const temp = arrCopy[x];
  arrCopy[x] = arrCopy[y];
  arrCopy[y] = temp;

  return arrCopy;
};
