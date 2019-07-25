var grid_cols = 30;
var grid_rows = 16;
var cell_height = canvas.height / grid_rows;
var cell_width = canvas.width / grid_cols;
var cwidth = 1800;
var cheight = 960;var time = 25000;
var timer;
var init_speed = 250;
var cell_pix = cell_height;
var data_1=[];
var data_2=[];
var data_3=[];
var cur = 0;
var data_draw=[];
var day_draw=1;
var person=[];
var update=0;

window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas2 = document.getElementById('canvas2');
    ctx2 = canvas2.getContext('2d');

    init();
};

function init() {
    timer = $.timer(draw);
    timer.set({time: 1000/init_speed, autostart: false});
    timer.play();
    drawFloor1();
    drawFloor2();
    for(var i=0;i<10000;i++){
        var temp={};
        temp["id"]=i+10000;
        temp["sid"]=0;
        temp["show"]=false;
        temp["out"]=false;
        temp["latest"]=-1;
        temp["floor"]=0;
        temp["x"]=0;
        temp["y"]=0;
        person.push(temp);
    }
    $.ajaxSettings.async = false;
    $.getJSON("day1.json",function(data1){
        $.getJSON("day2.json",function(data2){
            $.getJSON("day3.json",function(data3){
                data_1=data1;
                data_2=data2;
                data_3=data3;
                // for(var i=0;i<data2.length;i++)
                // {
                //     var temp={};
                //     temp["id"]=data2[i]["id"];
                //     temp["sid"]=data2[i]["sid"];
                //     temp["time"]=data2[i]["time"];
                //     temp["floor"]=data2[i]["floor"];
                //     temp["rx"]=data2[i]["rx"];
                //     temp["ry"]=data2[i]["ry"];
                //     temp["x"]=data2[i]["x"];
                //     temp["y"]=data2[i]["y"];
                //     data_2.push(temp);
                // }
            });
        });
    });
     $.ajaxSettings.async = true;
     data_draw=data_1;
     $('#usetag').change(function(){
         if(parseInt($(this).children('option:selected').val())===1){
             useTag=true;
         }
         else useTag=false;
     });
    $('#day_select').change(function()
    {
        cur=0;
        create_barchart();
        // switch(day_draw){
        //     case 1:
        //         break;
        //     case 2:
        //         break;
        //     case 3:
        //         break;
        // }
        day_draw = parseInt($(this).children('option:selected').val());
        switch(day_draw){
            case 1:
                data_draw=data_1;
                time=25000;
                break;
            case 2:
                data_draw=data_2;
                time=27000;
                break;
            case 3:
                data_draw=data_3;
                time=27000;
                break;
        }
        for(var i=0;i<person.length;i++){
            person[i].show=false;
            person[i].latest=-1;
        }
        draw();
    });
    create_barchart();createOption1();
    initOption();create_parallel();
    click_init();
    update_par();
}

function draw() {
    if (time > 73000) {
        timer.pause();
    }
    //格式化时间，并且更新到标签
    $('#show_time').html(formatTime(time));
    //更新到时间轴
    $('#time_range').val(time);
    $('#show_second').html(time);
    if(cur>=data_draw.length) return;
    ctx.clearRect(0, 0, cwidth, cheight);
    ctx2.clearRect(0, 0, cwidth, cheight);
    drawFloor1();
    drawFloor2();
    drawPerson();
    if(update%30===0){
        console.log(update);
        update_bar();
    }
    time += 1;
    update += 1;
}
function drawPerson(){

    while(cur<data_draw.length && data_draw[cur].time <= time) {
        var k = data_draw[cur].id - 10000;
        var x=data_draw[cur].x;
        var y=data_draw[cur].y;
        var floor=data_draw[cur].floor;
        if(person[k].latest!==-1){
            number[person[k].latest]--;
        }
        if (floor===1 && 12<=x && x<14 && 2<=y && y<6){
            number[5]++;
            person[k].latest=5;
        }
    else if (floor===1 && 2<=x && x<4 && 1<=y && y<6){
            number[1]++;
            person[k].latest=1;
        }
    else if (floor===1 && 4<=x && x<6 && 1<=y && y<6){
        number[2]++;
            person[k].latest=2;
        }
    else if (floor===1 && 6<=x && x<8 && 1<=y && y<6){
        number[3]++;
            person[k].latest=3;
        }
    else if (floor===1 && 8<=x && x<10 && 1<=y && y<6){
        number[4]++;
            person[k].latest=4;
        }
    else if (floor===1 && 3<=x && x<10 && 7<=y && y<9){
            number[6]++;
            person[k].latest=6;
        }
    else if (floor===1 && 6<=x && x<10 && 10<=y && y<12){
            number[7]++;
            person[k].latest=7;
        }
    else if (floor===1 && 10<=x && x<12 && 10<=y && y<12){
            number[8]++;
            person[k].latest=8;
        }
    else if (floor===1 && 14<=x && x<16 && 21<=y && y<25){
            number[9]++;
            person[k].latest=9;
        }
    else if (floor===1 && 14<=x && x<16 && 25<=y && y<27){
            number[10]++;
            person[k].latest=10;
        }
    else if (floor===1 && (4<=x && x<6 && 10<=y && y<12 || 14<=x && x<16 && 27<=y && y<29)){
            number[11]++;
            person[k].latest=11;
        }
    else if ((1<=x && x<2 || 14<=x && x<15) && 10<=y && y<12){
            number[12]++;
            person[k].latest=12;
        }
    else if (floor===1 && 14<=x && x<16 && 19<=y && y<21){
            number[13]++;
            person[k].latest=13;
        }
    else if (floor===1 && 2<=x && x<12 && 15<=y && y<19){
            number[14]++;
            person[k].latest=14;
        }
    else if (floor===1 && 2<=x && x<12 && 19<=y && y<29){
            number[0]++;
            person[k].latest=0;
        }
    else if (floor===2 && 13<=x && x<16 && 0<=y && y<6){
            number[15]++;
            person[k].latest=15;
        }
    else if (floor===2 && 10<=x && x<12 && 1<=y && y<6){
            number[16]++;
            person[k].latest=16;
        }
    else if (floor===2 && 2<=x && x<10 && 1<=y && y<6){
            number[17]++;
            person[k].latest=17;
        }
    else if (floor===2 && 6<=x && x<8 && 10<=y && y<12){
            number[18]++;
            person[k].latest=18;
        }
    else if (floor===2 && 4<=x && x<6 && 10<=y && y<12){
            number[19]++;
            person[k].latest=19;
        }
    else
        {
            number[20]++;
            person[k].latest=20;
        }
        if ((floor===1 &&x === 15 && (y === 5 || y === 15 || y ===17)) || floor===1 &&x === 0 && y === 19)
            person[k].out = true;
        person[k].show = true;
        person[k].x = x+Math.random();
        person[k].y = y+Math.random();
        person[k].floor=floor;
        person[k].sid=data_draw[cur].sid;
        cur +=1;
    }
    for (var i = 0; i < person.length; i++) {
        if (person[i].show === true) {
            var x = person[i].x;
            var y = person[i].y;
            var f = person[i].floor;
            var color="red";
            if(useTag === true && p_list.indexOf(i+10000)!==-1){
                color = "green";
            }
            if(f===1){
                ctx.beginPath();
                ctx.arc( (y)* cell_pix, (x) * cell_pix, 5, 0, 2 * Math.PI);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.stroke();
            }
            else if(f===2){
                ctx2.beginPath();
                ctx2.arc( (y)* cell_pix, (x) * cell_pix, 5, 0, 2 * Math.PI);
                ctx2.fillStyle = color;
                ctx2.fill();
                ctx2.stroke();
            }
            if(person[i].out===true){
                person[i].show=false;
            }
        }
    }
}

function drawFloor1() {


//描绘背景
    var pre_alpha = ctx.globalAlpha;


    var grid_cols = 30;
    var grid_rows = 16;
    var cell_height = canvas.height / grid_rows;
    var cell_width = canvas.width / grid_cols;
    var cell_pix = cell_height;

    // ctx.fillStyle = '#F5F5F5';
    // ctx.fillRect(0, 0, cwidth, cheight);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";
    ctx.font = "36pt Arial";
    //结束边框描绘
    ctx.beginPath();
    //准备画横线
    for (var col = 0; col <= grid_cols; col++) {
        var x = col * cell_width;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }
    //准备画竖线
    for (var row = 0; row <= grid_rows; row++) {
        var y = row * cell_height;
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }


    ctx.fillStyle = "#d1cfd2";  //填充颜色
    ctx.fillRect(0 * cell_pix, 0 * cell_pix, 19 * cell_pix, 1 * cell_pix);
    ctx.fillRect(20 * cell_pix, 0 * cell_pix, 10 * cell_pix, 1 * cell_pix);
    ctx.fillRect(0 * cell_pix, 1 * cell_pix, 10 * cell_pix, 1 * cell_pix);
    ctx.fillRect(0 * cell_pix, 2 * cell_pix, 1 * cell_pix, 11 * cell_pix);
    ctx.fillRect(1 * cell_pix, 10 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx.fillRect(29 * cell_pix, 0 * cell_pix, 1 * cell_pix, 16 * cell_pix);
    ctx.fillRect(12 * cell_pix, 2 * cell_pix, 3 * cell_pix, 10 * cell_pix);
    ctx.fillRect(0 * cell_pix, 14 * cell_pix, 1 * cell_pix, 2 * cell_pix);
    ctx.fillRect(1 * cell_pix, 15 * cell_pix, 1 * cell_pix, 1 * cell_pix);
    ctx.fillRect(3 * cell_pix, 15 * cell_pix, 1 * cell_pix, 1 * cell_pix);
    ctx.fillRect(6 * cell_pix, 15 * cell_pix, 1 * cell_pix, 1 * cell_pix);
    ctx.fillRect(16 * cell_pix, 15 * cell_pix, 1 * cell_pix, 1 * cell_pix);
    ctx.fillRect(18 * cell_pix, 15 * cell_pix, 1 * cell_pix, 1 * cell_pix);
    ctx.fillRect(8 * cell_pix, 15 * cell_pix, 7 * cell_pix, 1 * cell_pix);

    //分会场A
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.fillRect(1 * cell_pix, 2 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(1 * cell_pix, 2 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("分会场A", 2 * cell_pix, 3.3 * cell_pix, 5 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //分会场B
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.fillRect(1 * cell_pix, 4 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(1 * cell_pix, 4 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("分会场B", 2 * cell_pix, 5.3 * cell_pix, 5 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //分会场C
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.fillRect(1 * cell_pix, 6 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(1 * cell_pix, 6 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("分会场C", 2 * cell_pix, 7.3 * cell_pix, 5 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //分会场D
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.fillRect(1 * cell_pix, 8 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(1 * cell_pix, 8 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("分会场D", 2 * cell_pix, 9.3 * cell_pix, 5 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //签到处
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.fillRect(2 * cell_pix, 12 * cell_pix, 4 * cell_pix, 2 * cell_pix);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(2 * cell_pix, 12 * cell_pix, 4 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("签到处", 2.9 * cell_pix, 13.3 * cell_pix, 5 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //海报区
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.fillRect(7 * cell_pix, 3 * cell_pix, 2 * cell_pix, 7 * cell_pix);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(7 * cell_pix, 3 * cell_pix, 2 * cell_pix, 7 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("海报区", 7 * cell_pix, 7 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //厕所1
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.fillRect(10 * cell_pix, 4 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(10 * cell_pix, 4 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("厕所1", 10 * cell_pix, 5.2 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //room1
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.fillRect(10 * cell_pix, 6 * cell_pix, 2 * cell_pix, 4 * cell_pix);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(10 * cell_pix, 6 * cell_pix, 2 * cell_pix, 4 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("room1", 10 * cell_pix, 8.2 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //room2
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.fillRect(10 * cell_pix, 10 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(10 * cell_pix, 10 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("room2", 10 * cell_pix, 11.2 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //服务台
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.fillRect(19 * cell_pix, 14 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(19 * cell_pix, 14 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("服务台", 19 * cell_pix, 15.2 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //room3
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.fillRect(21 * cell_pix, 14 * cell_pix, 4 * cell_pix, 2 * cell_pix);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(21 * cell_pix, 14 * cell_pix, 4 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("room3", 22 * cell_pix, 15.2 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //room4
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.fillRect(25 * cell_pix, 14 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(25 * cell_pix, 14 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("room4", 25 * cell_pix, 15.2 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //厕所2
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.fillRect(27 * cell_pix, 14 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(27 * cell_pix, 14 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("厕所2", 27 * cell_pix, 15.2 * cell_pix, 2 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //展厅
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.fillRect(15 * cell_pix, 2 * cell_pix, 4 * cell_pix, 10 * cell_pix);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(15 * cell_pix, 2 * cell_pix, 4 * cell_pix, 10 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("展厅", 16.2 * cell_pix, 7 * cell_pix, 5 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //主会场
    ctx.fillRect(19 * cell_pix, 2 * cell_pix, 10 * cell_pix, 10 * cell_pix);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(19 * cell_pix, 2 * cell_pix, 10 * cell_pix, 10 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("主会场", 22.5 * cell_pix, 7 * cell_pix, 4 * cell_pix);
    ctx.fillStyle = "rgb(158,183,214)";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    //扶梯
    ctx.fillStyle = "rgb(254,183,67)";
    ctx.fillRect(10 * cell_pix, 1 * cell_pix, 2 * cell_pix, 1 * cell_pix);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(10 * cell_pix, 1 * cell_pix, 2 * cell_pix, 1 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("扶梯", 10.2 * cell_pix, 1.8 * cell_pix, 2 * cell_pix);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";


    ctx.fillStyle = "rgb(254,183,67)";
    ctx.fillRect(10 * cell_pix, 14 * cell_pix, 2 * cell_pix, 1 * cell_pix);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(10 * cell_pix, 14 * cell_pix, 2 * cell_pix, 1 * cell_pix);
    ctx.fillStyle = "rgb(1,1,1)";
    ctx.fillText("扶梯", 10.2 * cell_pix, 14.8 * cell_pix, 2 * cell_pix);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";

    ctx.stroke();

    drawArrow(ctx, 2.5 * cell_pix, 16 * cell_pix, 2.5 * cell_pix, 15 * cell_pix, 20, 0.3 * cell_pix, 10, '#FEB743');
    drawArrow(ctx, 4.5 * cell_pix, 16 * cell_pix, 4.5 * cell_pix, 15 * cell_pix, 20, 0.3 * cell_pix, 10, '#FEB743');
    drawArrow(ctx, 7.5 * cell_pix, 16 * cell_pix, 7.5 * cell_pix, 15 * cell_pix, 20, 0.3 * cell_pix, 10, '#FEB743');

    drawArrow(ctx, 19.5 * cell_pix, 1.3 * cell_pix, 19.5 * cell_pix, 0.3 * cell_pix, 20, 0.3 * cell_pix, 10, '#FEB743');

    //下箭头
    drawArrow(ctx, 5.5 * cell_pix, 14.7 * cell_pix, 5.5 * cell_pix, 15.7 * cell_pix, 20, 0.3 * cell_pix, 10, '#FEB743');
    drawArrow(ctx, 15.5 * cell_pix, 14.7 * cell_pix, 15.5 * cell_pix, 15.7 * cell_pix, 20, 0.3 * cell_pix, 10, '#FEB743');
    drawArrow(ctx, 17.5 * cell_pix, 14.7 * cell_pix, 17.5 * cell_pix, 15.7 * cell_pix, 20, 0.3 * cell_pix, 10, '#FEB743');


    //右箭头
    drawArrow(ctx, 0 * cell_pix, 13.5 * cell_pix, 1 * cell_pix, 13.5 * cell_pix, 20, 0.3 * cell_pix, 10, '#FEB743');


}

function drawFloor2() {
    //描绘背景
    var pre_alpha = ctx2.globalAlpha;


    var grid_cols = 30;
    var grid_rows = 16;
    var cell_height = canvas.height / grid_rows;
    var cell_width = canvas.width / grid_cols;
    var cell_pix = cell_height;

    ctx2.lineWidth = 1;
    ctx2.strokeStyle = "#a0a0a0";
    ctx2.font = "36pt Arial";
    //结束边框描绘
    ctx2.beginPath();
    //准备画横线
    for (var col = 0; col <= grid_cols; col++) {
        var x = col * cell_width;
        ctx2.moveTo(x, 0);
        ctx2.lineTo(x, canvas.height);
    }
    //准备画竖线
    for (var row = 0; row <= grid_rows; row++) {
        var y = row * cell_height;
        ctx2.moveTo(0, y);
        ctx2.lineTo(canvas.width, y);
    }

    ctx2.fillStyle = "#d1cfd2";  //填充颜色
    ctx2.fillRect(0 * cell_pix, 0 * cell_pix, 10 * cell_pix, 2 * cell_pix);
    ctx2.fillRect(10 * cell_pix, 0 * cell_pix, 2 * cell_pix, 1 * cell_pix);
    ctx2.fillRect(12 * cell_pix, 0 * cell_pix, 18 * cell_pix, 16 * cell_pix);
    ctx2.fillRect(0 * cell_pix, 2 * cell_pix, 1 * cell_pix, 10 * cell_pix);
    ctx2.fillRect(0 * cell_pix, 12 * cell_pix, 6 * cell_pix, 1 * cell_pix);
    ctx2.fillRect(10 * cell_pix, 8 * cell_pix, 2 * cell_pix, 4 * cell_pix);
    ctx2.fillRect(6 * cell_pix, 15 * cell_pix, 6 * cell_pix, 1 * cell_pix);

    //餐厅
    ctx2.fillStyle = "rgb(158,183,214)";
    ctx2.fillRect(1 * cell_pix, 2 * cell_pix, 5 * cell_pix, 8 * cell_pix);
    ctx2.lineWidth = 5;
    ctx2.strokeStyle = "rgb(0,0,0)";
    ctx2.strokeRect(1 * cell_pix, 2 * cell_pix, 5 * cell_pix, 8 * cell_pix);
    ctx2.fillStyle = "rgb(1,1,1)";
    ctx2.fillText("餐厅", 2.5 * cell_pix, 6.2 * cell_pix, 4 * cell_pix);
    ctx2.fillStyle = "rgb(158,183,214)";
    ctx2.lineWidth = 1;
    ctx2.strokeStyle = "#a0a0a0";

    //room5
    ctx2.fillStyle = "rgb(158,183,214)";
    ctx2.fillRect(1 * cell_pix, 10 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx2.lineWidth = 5;
    ctx2.strokeStyle = "rgb(0,0,0)";
    ctx2.strokeRect(1 * cell_pix, 10 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx2.fillStyle = "rgb(1,1,1)";
    ctx2.fillText("room5", 2.2 * cell_pix, 11.2 * cell_pix, 4 * cell_pix);
    ctx2.fillStyle = "rgb(158,183,214)";
    ctx2.lineWidth = 1;
    ctx2.strokeStyle = "#a0a0a0";

    //休闲区
    ctx2.fillStyle = "rgb(158,183,214)";
    ctx2.fillRect(0 * cell_pix, 13 * cell_pix, 6 * cell_pix, 3 * cell_pix);
    ctx2.lineWidth = 5;
    ctx2.strokeStyle = "rgb(0,0,0)";
    ctx2.strokeRect(0 * cell_pix, 13 * cell_pix, 6 * cell_pix, 3 * cell_pix);
    ctx2.fillStyle = "rgb(1,1,1)";
    ctx2.fillText("休闲区", 1.8 * cell_pix, 14.8 * cell_pix, 4 * cell_pix);
    ctx2.fillStyle = "rgb(158,183,214)";
    ctx2.lineWidth = 1;
    ctx2.strokeStyle = "#a0a0a0";


    //厕所3
    ctx2.fillStyle = "rgb(158,183,214)";
    ctx2.fillRect(10 * cell_pix, 4 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx2.lineWidth = 5;
    ctx2.strokeStyle = "rgb(0,0,0)";
    ctx2.strokeRect(10 * cell_pix, 4 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx2.fillStyle = "rgb(1,1,1)";
    ctx2.fillText("厕所3", 10 * cell_pix, 5.2 * cell_pix, 4 * cell_pix);
    ctx2.fillStyle = "rgb(158,183,214)";
    ctx2.lineWidth = 1;
    ctx2.strokeStyle = "#a0a0a0";

    //room6
    ctx2.fillStyle = "rgb(158,183,214)";
    ctx2.fillRect(10 * cell_pix, 6 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx2.lineWidth = 5;
    ctx2.strokeStyle = "rgb(0,0,0)";
    ctx2.strokeRect(10 * cell_pix, 6 * cell_pix, 2 * cell_pix, 2 * cell_pix);
    ctx2.fillStyle = "rgb(1,1,1)";
    ctx2.fillText("room6", 10 * cell_pix, 7.2 * cell_pix, 2 * cell_pix);
    ctx2.fillStyle = "rgb(158,183,214)";
    ctx2.lineWidth = 1;
    ctx2.strokeStyle = "#a0a0a0";

    //扶梯
    ctx2.fillStyle = "rgb(254,183,67)";
    ctx2.fillRect(10 * cell_pix, 1 * cell_pix, 2 * cell_pix, 1 * cell_pix);
    ctx2.lineWidth = 2;
    ctx2.strokeStyle = "rgb(0,0,0)";
    ctx2.strokeRect(10 * cell_pix, 1 * cell_pix, 2 * cell_pix, 1 * cell_pix);
    ctx2.fillStyle = "rgb(1,1,1)";
    ctx2.fillText("扶梯", 10.2 * cell_pix, 1.8 * cell_pix, 2 * cell_pix);
    ctx2.lineWidth = 1;
    ctx2.strokeStyle = "#a0a0a0";


    ctx2.fillStyle = "rgb(254,183,67)";
    ctx2.fillRect(10 * cell_pix, 14 * cell_pix, 2 * cell_pix, 1 * cell_pix);
    ctx2.lineWidth = 2;
    ctx2.strokeStyle = "rgb(0,0,0)";
    ctx2.strokeRect(10 * cell_pix, 14 * cell_pix, 2 * cell_pix, 1 * cell_pix);
    ctx2.fillStyle = "rgb(1,1,1)";
    ctx2.fillText("扶梯", 10.2 * cell_pix, 14.8 * cell_pix, 2 * cell_pix);
    ctx2.lineWidth = 1;
    ctx2.strokeStyle = "#a0a0a0";

    ctx2.stroke();

}

function drawArrow(ctx, fromX, fromY, toX, toY, theta, headlen, width, color) {

    theta = typeof (theta) != 'undefined' ? theta : 30;
    headlen = typeof (theta) != 'undefined' ? headlen : 10;
    width = typeof (width) != 'undefined' ? width : 1;
    color = typeof (color) != 'color' ? color : '#000';

    // 计算各角度和对应的P2,P3坐标
    var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
        angle1 = (angle + theta) * Math.PI / 180,
        angle2 = (angle - theta) * Math.PI / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);

    ctx.save();
    ctx.beginPath();

    var arrowX = fromX - topX,
        arrowY = fromY - topY;

    ctx.moveTo(arrowX, arrowY);
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    arrowX = toX + topX;
    arrowY = toY + topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(toX, toY);
    arrowX = toX + botX;
    arrowY = toY + botY;
    ctx.lineTo(arrowX, arrowY);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.restore();
}

function change_time() {

    time = parseInt($('#time_range').val());
    $('#show_time').html(formatTime(time));
    $('#show_second').html(time);
    cur=0;//重新从头筛选需要展示的人员
    create_barchart();
    for(var i=0;i<person.length;i++){
        person[i].show=false;
        person[i].latest=-1;
    }
    draw();
}

function formatTime(time) {
    var hour = Math.floor(time / 3600);
    var min = Math.floor((time % 3600) / 60);
    var second = Math.floor((time % 3600) % 60);
    if (hour <= 9) {
        hour = '0' + hour
    }
    if (min <= 9) {
        min = '0' + min
    }
    if (second <= 9) {
        second = '0' + second
    }

    return hour + ' : ' + min + ' : ' + second;
}

function stop_button() {
    if (timer.isActive) {
        timer.pause();
        $('#stop_button').val("Start");
    } else {
        timer.play();
        $('#stop_button').val("Stop");
    }

}

