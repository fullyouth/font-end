## Iterator
### 概览
迭代器是一种接口，为各种不同的数据结构提供统一的访问机制。

集合：Array Object Map Set

作用：  
1. 为各种集合的数据结构提供统一的访问接口
2. 使得数据结构的成员按照某种次序排列
3. for of使用

Iterator遍历过程  
1. 创建一个指针对象，指向当前数据的起始位置。也就是说迭代器对象本质是一个指针对象
2. 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员
3. 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员
4. 不断调用指针对象的next方法，直到它指向数据结构的结束位置


每一次调用next方法, 返回一个包含value和done两个属性的对象, value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。
```js
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
```

### 默认Iterator接口
Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环 
当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。

👉 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）  
ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，  
或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）

原生具有：   
Array  
Map  
Set  
String  
TypedArray  
函数的 arguments 对象   
NodeList 对象