const name   = "minu",
      age    = 24,
      gender = "male";
      
      
const sayHi = (name: string, age: number, gender: string): string => {
    return (`Hello ${name}, you ar ${age}, you are a ${gender}!`);
};

console.log(sayHi(name, age, gender));

export{}