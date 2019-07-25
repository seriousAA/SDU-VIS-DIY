var p_list = [];

var startX = 0, startY = 0; // 矩形选择开始坐标
// var endX = 0, endY = 0;
var draw_rect_flag = false;
var useTag=false;
function click_init()
{
    var c = canvas;
    c.onmousedown = onClick1;
    c.onmousemove = onMove1;
    c.onmouseup = onUp1;

    c = canvas2;
    c.onmousedown = onClick2;
    c.onmousemove = onMove2;
    c.onmouseup = onUp2;

}

function onClick1(e) {

    do_click(canvas, ctx, e);
}
function onMove1(e)
{
    do_move(canvas, ctx, e);
}

function onUp1(e)
{
    do_up(canvas, ctx, e, 1);
}

function onClick2(e) {
    do_click(canvas2, ctx2, e);

}
function onMove2(e)
{
    do_move(canvas2, ctx2, e);
}

function onUp2(e)
{
    do_up(canvas2, ctx2, e, 2);
}

function do_click(canvas, ctx, e)
{
    timer.pause();
    const rect = canvas.getBoundingClientRect();
    const x = parseInt((e.clientX - rect.left) * 2);
    const y = parseInt((e.clientY - rect.top) * 2);
    startX = x;
    startY = y;
    draw_rect_flag = true;
}

function do_move(canvas, ctx, e)
{
    const rect = canvas.getBoundingClientRect();
    const x = parseInt((e.clientX - rect.left) * 2);
    const y = parseInt((e.clientY - rect.top) * 2);
    if(draw_rect_flag)
    {
        var width = Math.abs(startX - x);
        var height = Math.abs(startY - y);
        draw();
        draw_rect(ctx, "#ff0000", 2, startX, startY, width, height);
    }

}

function do_up(canvas, ctx, e, floor)
{
    const rect = canvas.getBoundingClientRect();
    const x = parseInt((e.clientX - rect.left) * 2);
    const y = parseInt((e.clientY - rect.top) * 2);
    var start_x = parseInt(startX / cell_pix);
    var start_y = parseInt(startY / cell_pix);
    var end_x = parseInt(x / cell_pix);
    var end_y = parseInt(y / cell_pix);

    var choose_box = [];
    draw();
    for(var x1=start_x; x1<=end_x; x1++)
    {
        for(var y1=start_y; y1<=end_y; y1++)
        {
            var box = floor.toString() + pad(y1) + pad(x1);
            box = parseInt(box);
            choose_box.push(box);
            draw_fill_rect(ctx, "rgba(157, 206, 233,0.4)", x1*cell_pix, y1*cell_pix, cell_pix, cell_pix);
        }
    }

    get_list_boxs(choose_box);
    draw_rect_flag = false;
    draw();
    timer.play();
}


function draw_rect(ctx, color, line_width, x, y, width, height)
{
    // 画空矩形的通用方法
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = line_width;
    ctx.rect(x, y, width, height);
    ctx.stroke();
}
function draw_fill_rect(ctx, color, x, y, width, height)
{
    // 画填充矩形的通用方法
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(x, y, width, height);
    ctx.closePath();
    ctx.fill();
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function get_list_boxs(box_list)
{
    p_list=[];
    for(var i=0;i<person.length;i++){
        if(person[i].show===true){
            if(box_list.indexOf(person[i].sid)!==-1){
                p_list.push(person[i].id);
            }
        }
    }
    clear_parallel();
    for(var i=0;i<p_list.length;i++){
        draw_1.push(par_1[p_list[i]-10000]);
        draw_2.push(par_2[p_list[i]-10000]);
        draw_3.push(par_3[p_list[i]-10000]);
    }
    update_par();
}
function clear_all_tag()
{
    console.log(1);
    p_list = [];
    create_parallel();
    update_par();
    draw();
}
