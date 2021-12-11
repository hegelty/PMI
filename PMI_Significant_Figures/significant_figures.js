/*
* 수가 주어졌을 때 유효숫자 자릿수와 개수를 구하는 스크립트
* 작성자 : HegelTY
* Copyright (c) 2021 hegelty
* MIT License
*/

function Significant_figures(n) {
    try{
      for(i=0;i<n.length;i++){ //숫자나 .이 아닌 문자가 있을 때
        if(n[i]!='.'&&(n[i]<'0'||n[i]>'9')) throw("Wrong Number");
      }
      n=n.split(".");
      var z_cnt=0,cnt=0,p;
  
      if(n.length>2) throw("Wrong Number"); //소숫점이 여러개 있을 때
      if(n[0].length==0) throw("Wrong Number"); //소숫점 앞에 아무것도 없을 때
  
      for(i=0;i<n[0].length;i++) { //정수부
        if('1'<=n[0][n[0].length-1-i] && n[0][n[0].length-1-i]<='9'){
          z_cnt+=i; //0이 아닌 숫자가 나오기 전까지 0 갯수
          cnt+=n[0].length-i; //일반 숫자 갯수
          break;
        }
      }
      if(n.length==2) { //소수부
        cnt+=z_cnt;
        cnt+=n[1].length;
        p=-n[1].length;
      }
      else p=z_cnt;
      return "유효숫자 : " + cnt + "개(10^"+p+" 자리)";
    }catch(e) {
      if(e=="Wrong Number") return "숫자가 올바르지 않습니다.";
      else return e;
    }
  }
  