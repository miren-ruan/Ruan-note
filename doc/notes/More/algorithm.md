#### 1、集合

**集合是由一组无序且唯一的项组成，可以理解成一个没有顺序，没有重复元素的数组**

集合的一些方法：

> add(element)：向集合添加一个新元素
>
> delete(element)：从集合中删除一个元素
>
> has(element)：如果有，返回true，没有返回false
>
> clear()：移除集合中所有元素
>
> size()：返回集合所包含项的数量，类似于数组中的length
>
> values()：返回一个包含集合中所有元素的数组

```js
add(element){
    if(!this.has(element)){
        this.items[element] = element;
        return true;
    }
    return false;
}
```

------

#### 2、递归

**递归函数**：能够直接或者间接调用自身的函数，每个递归函数都有必须的基线条件，也就是不再调用递归的条件，防止无限递归。

###### (1)递归计算阶乘

```js
//阶乘，比如：5！= 5*4*3*2*1
//5!=5*4! , 4!=4*3!
function factorial(n){
    if(n === 1 || n === 0){
        //基线条件
        return 1
    }
    return n * factorial(n-1);//递归调用
}
console.log(factorial(5)); //120
```

###### (2)斐波那契数列

```js
//由0，1，1，2，3，5，8，13，21，34...等组成的数列
function fibonacci(n){
    if(n<1) return 0;
    if(n<=2) return 1;
    return fibonacci(n-1) + fibonacci(n-2);
}
```

------

#### 3、排序算法

###### (1)冒泡排序

比较相邻的两项，如果第一个比第二个大，则交换它们，每轮都可以得到一个最大值或者最小值

```js
//从小到大
var arr = [1,45,24,16,78,10,2];
function bubbleSort(arr){
    for(let i=0;i<arr.length-1;i++){
        for(let j=i+1,j<arr.length-1;j++){
            if(arr[i]>arr[j]){
                [arr[i],arr[j] = arr[j],arr[i]]
            }
        }
    }
    return arr;
}
//第二次：[1,24,16,45,10,2,78]
//第三次：[1,16,24,10,2,45,78]
//第四次：[1,16,10,2,24,45,78]
//第五次：[1,10,2,16,24,45,78]
//第六次：[1,2,10,16,24,45,78]
```

###### (2)选择排序

每次从待排序数组选出最大(小)的元素，将它放在序列起始位置，直到结束

```js
var arr = [1,45,24,16,78,10,2];
function selectionSort(arr){
    for(let i=0;i<arr.length-1;i++){
        let minIndex = i;
        for(let j=i+1;j<arr.length;j++){
            if(arr[j]<arr[minIndex]){
                minIndex = j;
                //比较得出最小值的下标
            }
        }
        [arr[i] , arr[minIndex]] = [arr[minIndex] , arr[i]];
        //拿最小值和第一个数互换，确定最小的数
    }
    return arr;
}
```

###### (3)插入排序

我的理解是给数组的第一个元素取出来当作有序的那一部分，剩下的为无序的那部分，然后不停的从无序的数组里取出元素与有序里面的进行比较并插入

```js
var arr = [1,45,24,16,78,10,2];
function insertSort(arr){
    for(let i=1;i<arr.length;i++){
        for(let j=i-1;j>=0;j--){
            //控制新加入的元素在有序部分里的位置
            if(arr[j]>arr[j+1]){
                [arr[j] , arr[j+1]] = [arr[j+1] , arr[j]];
            }
        }
    }
    return arr;
}
```

###### (4)归并排序

将一个数组不停的进行中间划分，知道分成每个里面只有一个元素的序列，这里面可以使用递归，然后将划分成一个个单元素的序列进行比较并拼接

```js
var arr = [1,45,24,16,78,10,2];
//传入merge合并处理
function merge(left,right){
    const res = [];
    //对左右两边进行比较并放入result
    while(left.length>0 && right.length>0){
        (left[0]>right[0] ? res.push(left.shift()) : res.push(right.shift()));
    }
    return res.concat(left,right)
}

function mergeSort(arr){
    //序列长度为1是退出
    if(arr.lenght < 2){
        return arr;
    }
    //将序列分为两个子序列
    const middle = Math.floor(arr.length/2);
    const left = arr.slice(0,middle);
    const right = arr.slice(middle);
    //递归
    return merge(mergeSort(left),mergeSort(right));
}
```

###### (5)快速排序

选取一个中间数，然后遍历数组，小于中间数的放入一个新数组，大于中间数的放入一个新数组，然后不断的递归并拼接

```js
var arr = [1,45,24,16,78,10,2];
function quickSort(arr){
    //数组<=1，就返回
    if(arr.length<=1){
        return arr;
    }
    //找中间数，并从数组中删除
    var middleIndex = Math.floor(arr.length/2);
    var middle = arr.splice(middleIndex,1)[0];
    //定义左右数组
    var left = [];
    var right = [];
    
    //比middle小的放入left，比middle大的放入right
    for(var i=0;i<arr.length;i++){
        arr[i]<middle ? left.push(arr[i]) : right.push(arr[i]);
    }
    //递归
    return quickSort(left).concat([middle],quickSort(right));
}
```

