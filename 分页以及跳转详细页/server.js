var http=require("http");
var fs=require("fs");
var url=require("url");

//����һ������
var server=http.createServer(function(request,response){
    //request.url
    var urlObj=url.parse(request.url,true);
    var pathname=urlObj.pathname;//��ȡurl��ַ��
    var urlQuery=urlObj.query;//��ȡurl����

    //�������ݵĽӿ�
    if(pathname==="/getInfo"){
        //��ȡ��һҳ��ÿҳ������
        var count=urlQuery.count;
        var page=urlQuery.page;
        //��ȡdata�ļ��µ�����
        var data=fs.readFileSync("./data.json","utf8");
        data=JSON.parse(data);
        //����һ������ҳ
        var totalPage=Math.ceil(data.length/count);
        var ary=[];
        //1ҳ:0-9 (page-1)*count-page*count-1;
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
    //������ϸҳ�����ݽӿ�
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