#### **1、冒泡排序算法**

```javascript
//比较相邻两个元素，前一个比后一个大则交换位置
//第一轮结束会确定一个最大的在最后
//时间复杂度O(n*n)
function bubbleSort(arr){
  for(let i=0;i<arr.length;i++){  //控制轮数
    for(let j=0;j<arr.length;j++){  //控制每轮比较的次数
      if(arr[j]>arr[j+1]){
        [j,j+1] = [j+1,j]
      }
    }
  }
}
```

------

#### **2、快速排序**

```javascript
//先将数据分成两部分，左边一部分都比右边一部分数据都小
//然后进行递归调用
function quickSort(arr){
  if(arr.length <= 1){
    return arr;
  }
  var middle = Math.floor(arr.length/2);
  var middleData = arr.spice(middle,1)[0];
  var left = [];
  var right = [];
  for(var i=0;i<arr.length;i++){
    if(arr[i]<middleData){
      left.push(arr[i]);
    }else{
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([middleData],quickSort(right))
}
```

------

#### **3、插入排序**

```javascript
//从后向前扫描，找到位置并插入
//空间复杂度为O(1)
function insertSort(arr){
  for(var i=1;i<=arr.length;i++){
    var temp = arr[i];
    var j = i-1;
    while(j>=0&&arr[j]>temp){
      arr[j+1] = arr[j];
      j--;
    }
    arr[j+1] = temp;
  }
  return arr;
}
```

------

#### **4、斐波那契数列**

```javascript
function Fibonacc (n, num1 = 1 , num2 = 1){
  if(n<=1){
    return num2;
  }
  return Fibonacc(n-1 , num2 , num1+num2);
}
```

------

#### **5、是否回文**

```javascript
//回文指正反相同的字符串序列
//先进行拆分，然后倒叙，最后拼接比较
function isHuiWen(str){
  return str == str.split("").reverse().join("");
}
```

------

#### **6、数组去重**

```javascript
//1、利用includes
let newArr = [];
for(var i=0 ; i<arr.length ; i++){
  if(!newArr.includes(arr[i])){
    newArr.push(arr[i]);
  }
}
```

```javascript
//2、利用splice
for(var i=0 ; i<arr.length ; i++){
  var temp = arr[i];
  for(var j=i+1 ; j<arr.length ; j++){
    var compare = arr[j];
    if(temp == compare){
      arr.splice(j,1);
      j--;
    }
  }
}
```

```javascript
//3、利用set
let newArr = new Set(arr);
```

```javascript
//4、利用indexOf
var newArr = [];
for(var i=0 ; i<arr.length ; i++){
  if(newArr.indexOf(arr[i] == -1)){
    newArr.push(arr[i]);
  }
}
```

