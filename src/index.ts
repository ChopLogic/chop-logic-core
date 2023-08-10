type TestType = string;

export const testFunc = (arg: TestType): string => {
  console.log(arg);
  return arg;
};

testFunc("hello from index.ts");
