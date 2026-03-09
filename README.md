1️⃣ What is the difference between var, let, and const?
Answer: var:- It is function-scoped, meaning if we declare it outside a function, it "rules" the entire window. we can redeclare it with the same name over and over, which often leads to messy bugs and confusion in larger projects.
let:- This is much more disciplined. we can change the value inside the box whenever you want, but you are not allowed to declare another box with the exact same name in the same block.
const:- it’s set in stone and cannot be changed. However, there’s a small catch: while you can't replace the whole if the box contains an object or an array, you can still change the items inside them.



