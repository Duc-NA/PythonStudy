function* g2() {
    yield 3;
    yield 4;
    }
    
    function* g1() {
      yield* [1, 2];
      yield* g2();
      yield* '56';
      yield* Array.from(arguments);
    }
    
    var iterator = g1(9, 10);
    
    console.log(iterator.next()); // {value: 1, done: false}
    console.log(iterator.next()); // {value: 2, done: false}
    console.log(iterator.next()); // {value: 3, done: false}
    console.log(iterator.next()); // {value: 4, done: false}
    console.log(iterator.next()); // {value: "5", done: false}
    console.log(iterator.next()); // {value: "6", done: false}
    console.log(iterator.next()); // {value: 9, done: false}
    console.log(iterator.next()); // {value: 10, done: false}
    console.log(iterator.next()); // {value: undefined, done: true}