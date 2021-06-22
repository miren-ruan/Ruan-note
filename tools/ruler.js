/**
 * 迷人软(miren-ruan) 2020-12-17 南京
 * ---------------------------------
 * 刻度尺
 * --用于显示刻度，并具有基本的自适应能力
 */

export default function ruler(cormax, cormin, cornumber) {
    //先判断所有数据都相等的情况
    if (cormax == cormin) {
        //在数据相等的情况下先计算所有数为正数
        if (cormin > 0) {
            //直接求出初始间隔
            var corstep = cormax / cornumber;
        } else if (cormin < 0) {
            //当所有数为负数且相等时
            var corstep = cormax / cornumber;
            //因为间隔为负影响下面的计算，所以直接取反
            corstep = -corstep;
        }
        //求间隔corstep的数量级temp (10,100,1000)
        var temp;
        if (
            Math.pow(10, Math.trunc(Math.log(corstep) / Math.log(10))) ==
            corstep
        ) {
            temp = Math.pow(10, Math.trunc(Math.log(corstep) / Math.log(10)));
        } else {
            temp = Math.pow(
                10,
                Math.trunc(Math.log(corstep) / Math.log(10)) + 1
            );
        }
        //将间隔corstep进行归一化，求出tmpstep(tpmstep在0.1 0.2 0.25 0.5 1之间取值)
        var tmpstep;
        tmpstep = corstep / temp;
        if (tmpstep >= 0 && tmpstep <= 0.1) {
            tmpstep = 0.1;
        } else if (tmpstep >= 0.100001 && tmpstep <= 0.2) {
            tmpstep = 0.2;
        } else if (tmpstep >= 0.200001 && tmpstep <= 0.25) {
            tmpstep = 0.25;
        } else if (tmpstep >= 0.250001 && tmpstep <= 0.5) {
            tmpstep = 0.5;
        } else {
            tmpstep = 1;
        }
        //将间隔恢复，求出实际间隔距离
        tmpstep = tmpstep * temp;
        //刻度尺最小必须从0开始
        cormin = 0;
        //调整刻度尺的最大刻度
        cormax = Math.trunc(cormax / tmpstep + 1) * tmpstep;
        //求出刻度尺的间隔
        cornumber = (cormax - cormin) / tmpstep;
    } else if (cormax != cormin) {
        //根据传入的数据初步求出刻度数之间的间隔corstep
        var corstep = (cormax - cormin) / cornumber;
        //求间隔corstep的数量级temp (10,100,1000)
        var temp;
        if (Math.pow(10, Math.trunc(Math.log(corstep) / Math.log(10))) == corstep) {
            temp = Math.pow(10, Math.trunc(Math.log(corstep) / Math.log(10)));
        } else {
            temp = Math.pow(10,Math.trunc(Math.log(corstep) / Math.log(10)) + 1
            );
        }

        //将间隔corstep进行归一化，求出tmpstep(tpmstep在0.1 0.2 0.25 0.5 1之间取值)
        var tmpstep;
        tmpstep = corstep / temp;
        if (tmpstep >= 0 && tmpstep <= 0.1) {
            tmpstep = 0.1;
        } else if (tmpstep >= 0.100001 && tmpstep <= 0.2) {
            tmpstep = 0.2;
        } else if (tmpstep >= 0.200001 && tmpstep <= 0.25) {
            tmpstep = 0.25;
        } else if (tmpstep >= 0.250001 && tmpstep <= 0.5) {
            tmpstep = 0.5;
        } else {
            tmpstep = 1;
        }

        //将间隔恢复，求出实际间隔距离
        tmpstep = tmpstep * temp;

        //调整刻度尺的最小刻度
        if (Math.trunc(cormin / tmpstep) != cormin / tmpstep) {
            if (cormin < 0) {
                cormin = -1 * Math.ceil(Math.abs(cormin / tmpstep)) * tmpstep;
            } else {
                cormin = Math.trunc(Math.abs(cormin / tmpstep)) * tmpstep;
            }
        }
        //调整刻度尺的最大刻度
        cormax = Math.trunc(cormax / tmpstep + 1) * tmpstep;

        //求新的cornumber、cormax、cormin
        var tmpnumber = (cormax - cormin) / tmpstep;
        if (tmpnumber < cornumber) {
            var extranumber = cornumber - tmpnumber;
            tmpnumber = cornumber;
            if (extranumber % 2 == 0) {
                cormax = cormax + tmpstep * Math.trunc(extranumber / 2);
            } else {
                cormax = cormax + tmpstep * Math.trunc(extranumber / 2 + 1);
            }
        cormin = cormin - tmpstep * Math.trunc(extranumber / 2);
        }
        cornumber = tmpnumber;
    }

    var resultData = {
        min: cormin,
        max: cormax,
        deep: tmpstep,
        num: cornumber,
        ruler: [],
    };

    // 得出最终的刻度数组
    for (var i = 0; i <= cornumber; i++) {
        resultData.ruler.push(cormin + tmpstep * i);
    }
    return resultData;
}
