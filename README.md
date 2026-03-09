1️⃣ What is the difference between var, let, and const?
Answer: var:- It is function-scoped, meaning if we declare it outside a function, it "rules" the entire window. we can redeclare it with the same name over and over, which often leads to messy bugs and confusion in larger projects.
let:- This is much more disciplined. we can change the value inside the box whenever you want, but you are not allowed to declare another box with the exact same name in the same block.
const:- it’s set in stone and cannot be changed. However, there’s a small catch: while you can't replace the whole if the box contains an object or an array, you can still change the items inside them.


2️⃣ What is the spread operator (...)?
Answer: The Spread Operator is like opening a sealed package and spreading everything inside it out so you can use it elsewhere. It allows you to quickly "unpack" or copy all the elements from an array or an object.

3️⃣ What is the difference between map(), filter(), and forEach()?
Answer: map()	goal to transform or modify data. returen will	new modified array. filter() goal to find items that match a criteria & returen new filtered array. forEach() goal to execute a side effect log, save etc. and	returen nothing.




