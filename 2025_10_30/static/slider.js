let imgIDArray = ["picture1", "picture2", "picture3"];
let currentIDX = 0;


document.getElementById("previous").addEventListener("click", function(){
  document.getElementById(imgIDArray[currentIDX]).style.display = "none";
  if(currentIDX == 0){
    currentIDX = imgIDArray.length - 1;
  }
  else{
    currentIDX = currentIDX - 1;
  }
  document.getElementById(imgIDArray[currentIDX]).style.display = "inline-block";
})

document.getElementById("next").addEventListener("click", function(){
  document.getElementById(imgIDArray[currentIDX]).style.display = "none";
  if(currentIDX == imgIDArray.length - 1){
    currentIDX = 0;
  }
  else{
    currentIDX = currentIDX + 1;
  }
  document.getElementById(imgIDArray[currentIDX]).style.display = "inline-block";
})