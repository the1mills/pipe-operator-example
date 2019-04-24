'use strict';


export const r2gSmokeTest = function () {
  // r2g command line app uses this exported function
  return true;
};


type SingleArgFunc<T = number, V = number> = (a: T) => V;
type SAF = SingleArgFunc;

const _piper = (a: SAF, b: SAF) => (arg: any) => b(a(arg));

const piper = (...funcs: Array<SAF>) => {

  if (funcs.length === 1) {
    funcs.push(v => v);
  }

  return (arg: any) => {
    return funcs.reduce((a, b) => b(a), arg);
  };

};


const _pipe = (a: SAF, b: SAF) => (arg: number) => b(a(arg));
const pipe = (...ops: Array<SAF>): SAF => ops.reduce(_pipe);


console.log(piper(v => 5 + v, v => v * 2)(3));
console.log(pipe(v => 5 + v, v => v * 2)(3));

