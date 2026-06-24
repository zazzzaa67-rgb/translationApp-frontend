const transBtn = document.getElementById("transBtn")
const translation = document.getElementById("theTranslation")
const select = document.getElementById("select")
transBtn.addEventListener("click" ,async function(){
        const userText = document.getElementById("userText").value.trim()
        const translang = document.getElementById("usLang").value
        let html = ''
        if(userText && translang){
            try{
            translation.innerHTML = `
            <p class="loading">Loading...</p>`
            const res= await fetch("https://translation-app-backend-five.vercel.app/api/chat" , {
                method : "POST",
                headers:  {  'Content-Type': 'application/json',
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
        translation.innerHTML = "<p class='text select'>Please,select the your text and the language</p>"


}
translation.innerHTML = `
<h3> Your transition</h3>
<div class="textCon">
    ${html} 
</div>`



})
document.addEventListener("click" , e=>{
    if(e.target.id == "Start-Over"){
        translation.innerHTML = select.innerHTML
        e.id = "transBtn"
        transBtn.textContent = "Translate"
        document.getElementById("userText").value = ''
    }
})
