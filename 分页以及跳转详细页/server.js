var http=require("http");
var fs=require("fs");
var url=require("url");

//创建一个服务
var server=http.createServer(function(request,response){
    //request.url
    var urlObj=url.parse(request.url,true);
    var pathname=urlObj.pathname;//获取url地址名
    var urlQuery=urlObj.query;//获取url参数

    //请求数据的接口
    if(pathname==="/getInfo"){
        //获取哪一页和每页的数量
        var count=urlQuery.count;
        var page=urlQuery.page;
        //读取data文件下的数据
        var data=fs.readFileSync("./data.json","utf8");
        data=JSON.parse(data);
        //计算一共多少页
        var totalPage=Math.ceil(data.length/count);
        var ary=[];
        //1页:0-9 (page-1)*count-page*count-1;
        for(var i=(page-1)*count;i<=page*count-1;i++){
            var cur=data[i];
            if(i>data.length-1){
                break;
            }
            ary.push(cur);
        }
        //response.write(ary);
        var res={
            "totalPage":totalPage,
            "list":ary

        }
        response.writeHead("200",{"content-Type":"application/json"})
        response.end(JSON.stringify(res));
        return;

    }
    if(pathname=="/index.html"){
        var content=fs.readFileSync("./index.html","utf8");
        response.writeHead("200",{"content-Type":"text/html"});
        response.end(content);
    }
    if(pathname=="/detail.html"){
        var con=fs.readFileSync("./detail.html","utf8");
        response.writeHead("200",{"content-Type":"text/html"});
        response.end(con);
    }
    //请求详细页的数据接口
    if(pathname=="/detailInfo"){
        var num=urlQuery.num;
        var cont=fs.readFileSync("./data.json","utf8");
        cont=JSON.parse(cont);


        var obj=null;
        for(var i=0;i<cont.length;i++){
            var cur=cont[i];
            if(cur.num==num){
                obj=cur;
                break;
            }
        }
        response.writeHead("200",{'content-type': 'application/json'});
        response.end(JSON.stringify(obj));
        return;


    }
});
server.listen(8080);