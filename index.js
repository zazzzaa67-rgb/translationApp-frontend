const transBtn = document.getElementById("transBtn")
const translation = document.getElementById("theTranslation")
const select = document.getElementById("select")
transBtn.addEventListener("click" ,async function(){
        const userText = document.getElementById("userText").value.trim()
        const translang = document.getElementById("usLang").value
        let html = ''
        if(userText && translang){
        try{
        html = `
        <p class="loading">Loading...</p>`
        const res= await fetch("https://translation-app-backend-five.vercel.app/api/chat" , {
            method : "POST",
            headers:  {  'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN_HERE',
        'X-Custom-Header': 'CustomValue'},
            body : JSON.stringify({prompt :userText,lang : translang})
        })
        const data = await res.json()
        console.log(data)
        html = data.replay
        transBtn.textContent = "Start Over"
        transBtn.id = "Start-Over"
        
        
    }catch(error){
            console.error("An error occurred")
            html = "</p class='wrong text'>Opps , server proplem</p>"
        }
    }else{
        html = "<p class='text select'>Please,select the land or your text"


}
translation.innerHTML = `
<h3> Your transition</h3>
<div class="textCon">
    ${html} 
</div>`



})
document.addEventListener("click" , e=>{
    if(e.target.id == "Start-Over"){
        translation.innerHTML = select
        e.id = "transBtn"
    }
})