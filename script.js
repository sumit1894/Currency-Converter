// BASE_URL = "https://api.exchangerate-api.com/v4/latest/USD";
BASE_URL = "https://api.exchangerate-api.com/v5/latest/USD";

const dropdowns= document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr=document.querySelector(".form select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for (currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name === "from" && currCode==="USD"){
            newOption.selected="selected"
        }
        else if (select.name === "to" && currCode==="INR"){
            newOption.selected="selected"
        }
        select.append(newOption);
    }  
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}


const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img =element.parentElement.querySelector("img");
    img.src=newSrc;           
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount =document.querySelector(".amount input");
    let amtvlu=amount.value;
    console.log(amtvlu);
    if(amtvlu===""||amtvlu==="0"){
        alert("Please enter a valid amount");
        amount.value="1";
    }

    const url=`https://api.exchangerate-api.com/v4/latest/USD`;
    let responce=await fetch(url);
    console.log(fromCurr.value,toCurr.value);
    let data= await responce.json();
    let rate=data.rates[toCurr.value];
    msg.innerText=`Converted Amount: ${amtvlu*rate} ${toCurr.value}`;
    console.log(amtvlu*rate);
    console.log(toCurr.value);
})
