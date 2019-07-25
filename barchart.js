var dom1 = document.getElementById("container1");
var myChart1 = echarts.init(dom1,'dark');
var app = {};
var option1 = null;
var number=[];
var names=['主会场','分会场A','分会场B','分会场C','分会场D','签到处','海报区','room1','room2','room3','room4','一楼厕所','扶梯','服务台','展厅','休闲区','room5','餐厅','room6','二楼厕所','走廊'];
function createOption1(){
    option1 = {
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    show: true
                }
            }
        },
        calculable : true,
        grid: {
            top: '12%',
            left: '1%',
            right: '10%',
            containLabel: true
        },
        xAxis: [
            {
                type : 'category',
                data : names,
                axisLine: {
                    lineStyle: {
                        color: '#aaa'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#777'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            }
        ],
        yAxis: [
            {
                type : 'value',
                name : 'number',
                axisLine: {
                    lineStyle: {
                        color: '#aaa'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#777'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            }
        ],
        dataZoom: [
            {
                show: true,
                startValue: 0,
                endValue: 20
            }
        ],
        series : [
            {
                type: 'bar',
                data: number
            }
        ]
    };
}
function create_barchart(){
    for(var i=0;i<23;i++){
        number[i]=0;
    }
    update=0;
}
function update_bar(){
    var temp = myChart1.getOption();
    if(typeof (temp)!=="undefined"){//第一次生成barchart的时候会出现undefined的情况
        option1.dataZoom[0].startValue=temp.dataZoom[0].startValue;
        option1.dataZoom[0].endValue=temp.dataZoom[0].endValue;
    }
    option1.series[0].data=number;
    myChart1.setOption(option1);
}