const advancedOptions = document.getElementsByClassName("advancedOptions")[0];
const form = document.getElementById("mainForm");
const toggleButton = document.getElementById("hideDiv");
const submitButton = document.getElementById("submit");

toggleButton.addEventListener("click",(event) => {
    console.log(advancedOptions.style.display);
    if(advancedOptions.style.display==="none" || advancedOptions.style.display===""){
        advancedOptions.style.display = "flex";
    }else{
        advancedOptions.style.display = "none";
    }
});

submitButton.addEventListener("click",(event) => {
    form.submit();
});