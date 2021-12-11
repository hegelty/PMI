/*
* 화학식이 주어졌을 때 산화수를 구하는 스크립트(미완)
* 사용법 : 기억안남
* 작성자 : HegelTY
* Copyright (c) 2021 hegelty
* MIT License
*/
function   Oxidation_Number(s)
{
  var Oneja = {'H':0,'He':0,'Li':0,'Be':0,'B':0,'C':0,'N':0,'O':0,'F':0,'Ne':0,'Na':0,'Mg':0,'Al':0,'Si':0,'P':0,'S':0,'Cl':0,'Ar':0,'K':0,'Ca':0,'Sc':0,'Ti':0,'V':0,'Cr':0,'Mn':0,'Fe':0,'Co':0,'Ni':0,'Cu':0,'Zn':0,'Ga':0,'Ge':0,'As':0,'Se':0,'Br':0,'Kr':0,'Rb':0,'Sr':0,'Y':0,'Zr':0,'Nb':0,'Mo':0,'Tc':0,'Ru':0,'Rh':0,'Pd':0,'Ag':0,'Cd':0,'In':0,'Sn':0,'Sb':0,'Te':0,'I':0,'Xe':0,'Cs':0,'Ba':0,'La':0,'Ce':0,'Pr':0,'Nd':0,'Pm':0,'Sm':0,'Eu':0,'Gd':0,'Tb':0,'Dy':0,'Ho':0,'Er':0,'Tm':0,'Yb':0,'Lu':0,'Hf':0,'Ta':0,'W':0,'Re':0,'Os':0,'Ir':0,'Pt':0,'Au':0,'Hg':0,'Tl':0,'Pb':0,'Bi':0,'Po':0,'At':0,'Rn':0,'Fr':0,'Ra':0,'Ac':0,'Th':0,'Pa':0,'U':0,'Np':0,'Pu':0,'Am':0,'Cm':0,'Bk':0,'Cf':0,'Es':0,'Fm':0,'Md':0,'No':0,'Lr':0,'Rf':0,'Db':0,'Sg':0,'Bh':0,'Hs':0,'Mt':0};
  var Result = {'H':0,'He':0,'Li':0,'Be':0,'B':0,'C':0,'N':0,'O':0,'F':0,'Ne':0,'Na':0,'Mg':0,'Al':0,'Si':0,'P':0,'S':0,'Cl':0,'Ar':0,'K':0,'Ca':0,'Sc':0,'Ti':0,'V':0,'Cr':0,'Mn':0,'Fe':0,'Co':0,'Ni':0,'Cu':0,'Zn':0,'Ga':0,'Ge':0,'As':0,'Se':0,'Br':0,'Kr':0,'Rb':0,'Sr':0,'Y':0,'Zr':0,'Nb':0,'Mo':0,'Tc':0,'Ru':0,'Rh':0,'Pd':0,'Ag':0,'Cd':0,'In':0,'Sn':0,'Sb':0,'Te':0,'I':0,'Xe':0,'Cs':0,'Ba':0,'La':0,'Ce':0,'Pr':0,'Nd':0,'Pm':0,'Sm':0,'Eu':0,'Gd':0,'Tb':0,'Dy':0,'Ho':0,'Er':0,'Tm':0,'Yb':0,'Lu':0,'Hf':0,'Ta':0,'W':0,'Re':0,'Os':0,'Ir':0,'Pt':0,'Au':0,'Hg':0,'Tl':0,'Pb':0,'Bi':0,'Po':0,'At':0,'Rn':0,'Fr':0,'Ra':0,'Ac':0,'Th':0,'Pa':0,'U':0,'Np':0,'Pu':0,'Am':0,'Cm':0,'Bk':0,'Cf':0,'Es':0,'Fm':0,'Md':0,'No':0,'Lr':0,'Rf':0,'Db':0,'Sg':0,'Bh':0,'Hs':0,'Mt':0};

  var ion=0, e_cnt=0;
  //원자 갯수 기록
  for(var cnt=0;s[cnt];cnt++)
  {
    var amount=0;
    try{
      Log.debug(s[cnt]);
      if(s[cnt]>='A'&&s[cnt]<='Z'){
        if(s[cnt+1]>='a'&&s[cnt+1]<='z'){ //두글자
          t_cnt=0;
          if(Oneja.hasOwnProperty(s[cnt]+s[cnt+1])){ //원자가 맞으면
            if(isNaN(s[cnt+2])==false){ //개수
              for(i=cnt+2;isNaN(s[i]);i++){
                amount=amount*10+Number(s[i]);
                t_cnt++;
              }
              Oneja[s[cnt]+s[cnt+1]]=amount;
            }
            else Oneja[s[cnt]+s[cnt+1]]=1;
            cnt+=t_cnt+1;
            e_cnt++;
          }
          else throw("Wrong Element"); //아닐때
        }
        //한글자
        else if(Oneja.hasOwnProperty(s[cnt])){ //원자가 맞으면
          t_cnt=0;
          if(isNaN(s[cnt+1])==false){ //개수
              for(i=cnt+1;!isNaN(s[i])&&i<=s.length;i++){
                amount=amount*10+Number(s[i]);
                t_cnt++;
              }
            }
              if(amount==0) amount=1;
              Oneja[s[cnt]]=amount;
              cnt+=t_cnt;
              e_cnt++;
              Log.debug(s[cnt-1] + String(Oneja[s[cnt]]))
          }
        else throw("Wrong Element");
      }
      else if(s[cnt]=='+'){
        t_cnt=0;
        if(isNaN(s[cnt+1])==false){
          for(i=cnt+1;!isNaN(s[i])&&i<=s.length;i++){
            ion=ion*10+Number(s[i]);
            t_cnt++;
          }
        }
        if(ion==0) ion=1;
        cnt+=t_cnt;
      }
      else if(s[cnt]=='-'){
        t_cnt=0;
        if(isNaN(s[cnt++])==false){
          for(i=cnt+1;!isNaN(s[i])&&i<=s.length;i++){
            ion=ion*10-Number(s[i]);
            t_cnt++;
          }
        }
        if(ion==0) ion=-1;
        Log.debug(ion)
        cnt+=t_cnt;
      }
    }catch(e){
      if(e=="Wrong Element") return "잘못된 화학식입니다.";
      else return e;
    }
  }
  Log.debug(e_cnt)
  if(e_cnt==1){ //단원자
    Log.debug("단원자")
    if(ion==0){
      Log.debug("ni")
      for(key in Oneja){
        if(Oneja[key]>1) return key + " : 0";
      }
    }
    else{
      Log.debug("이온")
        for(key in Oneja){
        if(Oneja[key]>1) return key + " : " + (ion/Oneja[key]>0?"+"+ion/Oneja[key]:ion/Oneja[key]);
      }
    }
  }
  else{
    var jugi1 = ['Li','Na','K','Rb','Cs','Fr']; //1족
    var jugi2 = ['Be','Mg','Ca','Sr','Ba','Ra']; //2족
    var jugi17 = ['F','Cl','Br','I','At','Ts']; //17족
    if(Oneja['F']>0){ //F -1
      Result['F']=-1;
      e_cnt--;
      ion-=Oneja['F'];
    }
    for(i in jugi1){ //1족 +1
      if(Oneja[i]>0){
        Result[i]=1;
        e_cnt--;
        ion+=Oneja[i];
      }
    }
    if(e_cnt){
    for(i in jugi2){ //2족 +2
      if(Oneja[i]>0){
        Result[i]=2;
        e_cnt--;
        ion+=Oneja[i]*2;
      }
    }
    if(Oneja['Al']>0){ //Al +3
      Result['Al']=3;
      e_cnt--;
      ion+=Oneja['Al']*3;
    }
    if(e_cnt){ //H +1
    if(Oneja['H']>0){
      Result['H']=1;
      e_cnt--;
      ion+=Oneja['H'];
    }
    if(e_cnt){ //O -2
    if(Oneja['O']>0){
      Result['O']=-2;
      e_cnt--;
      ion-=Oneja['O']*2;
    }
    if(e_cnt){
    for(i in jugi17){ //17족 -1
      if(Oneja[i]>0){
        Result[i]=-1;
        e_cnt--;
        ion-=Oneja[i];
      }
    }
    if(e_cnt){ 
    if(e_cnt==1){
      for(key in Oneja){
        if(Oneja[key]>0&&Result[key]==0){
          Result[key]=-ion;
          e_cnt--;
      }
    }
  }}}}}
  }
  var Result_String="";
  for(key in Oneja){
    if(Oneja[key]>0){
      if(Result[key]==0&&e_cnt>0) Result_String+=key + " : 알 수 없음\n"; 
      else Result_String+=key + " : " + (Result[key]>0?"+"+Result[key]:Result[key]) +"\n"; 
    }
  }
  return Result_String.slice(0,-1);
  }
}