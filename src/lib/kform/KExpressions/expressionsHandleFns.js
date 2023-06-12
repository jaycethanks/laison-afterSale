// 加法：使用reduce方法，将数组中的每个元素相加

function SUM(arr) {
  return arr.reduce((a, b) => a + b);
}

// 减法：将第一个数减去后面所有的数

function SUBTRACT(arr) {
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result -= arr[i];
  }
  return result;
}

// 乘法：使用reduce方法，将数组中的每个元素相乘

function MULTIPLY(arr) {
  return arr.reduce((a, b) => a * b);
}

// 除法：将第一个数除以后面所有的数

function DIVIDE(arr) {
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result /= arr[i];
  }
  return result;
}

export const fns = {
  SUM,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
};

export const expressionAnalyser = function (formfieldsObj, expressions) {
  const r = expressions
    .map(({ expression }) => {
      // { key: 'sum', fn: { name: 'MULTIPLY', params: [ 'count', 'price' ] } }
      return analyse(expression);
    })
    .map(({ key, fn: { name, params } }) => ({
      [key]: fns[name].call(
        null,
        params.map((param) => formfieldsObj[param]),
      ),
    }));
  return r;
};
function analyse(str) {
  // 定义正则表达式，匹配符号中间的内容
  const reg = /[A-Z]+\((?:[A-Za-z]+,)*[A-Za-z]+\)/g;
  const _reg = /\((?:[A-Za-z]+,)*[A-Za-z]+\)/g;

  // 匹配所有符号中间的内容
  const matches = str.match(reg);
  const params = matches[0].match(_reg)[0].replace(/\(|\)/g, '').split(',');
  const match = matches[0];
  // 根据不同的符号，分别替换为不同的内容
  let result = null;
  ['SUM', 'SUBTRACT', 'MULTIPLY', 'DIVIDE'].forEach((fn) => {
    if (match.includes(fn)) {
      result = {
        key: str.split('=')[0],
        fn: {
          name: fn,
          params,
        },
      };
    }
  });
  return result;
}
