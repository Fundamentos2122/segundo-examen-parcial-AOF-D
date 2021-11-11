//Variables
const taskForm = document.forms["taskForm"];//Regresa elemento de form.
const taskList = document.getElementById("tasks");
const tasksKey = "tasks";


//Llamado de funciones.
eventListener();

//Listeners
function eventListener (){
    //Agregar tweets.
    //Cachar evento.
    taskForm.addEventListener("submit", addTweet);
    
    //Cuando la pagian termine de cargar.
    document.addEventListener("DOMContentLoaded", showTweets);

    //Borrar tweets 
    taskList.addEventListener("click", removeTweet);

}

//Funciones

//Agregar Tweet
function addTweet(e){
    //Detener el envio del formulario.
    e.preventDefault();

    var data = {
        title: taskForm["title"].value,
        description: taskForm["description"].value,
        date: taskForm["date"].value,
    };

    if(data.title.value === null){
        titulo();
        return;
    }
    
    //Crear el nuevo elemento.
    const newTweet = document.createElement("div");

    //Añadir estilos y contenido.
    newTweet.className = "border-top";
    newTweet.innerHTML = 
     `<div class="border-top">
        <h5>${data.title}</h5>
        <p>${data.description}</p>
        <div class="row">
            <div class="col-6">
                <p>${data.date}</p>
            </div>
            <div class="col-6">
                <input class="button-close" type="checkbox" full="false">
                <label for="vehicle1">Completada</label>
            </div>
        </div>
     </div>`; 
    
    
    //Se añade a la lista de tweets.
    taskList.appendChild(newTweet);

    saveTweet(data);

}


//Funcion cuando no hay titulo.
function titulo(){
                           
}

//Guardar Tweet en LocalStorage
function saveTweet(data){
    console.log(data);
    let tasks = getTweets();
    console.log(tasks);
    
    //Se añade a la lista de tweets.
    tasks.push(data);
    console.log(typeof(tasks));


    var json = JSON.stringify(data);

    localStorage.setItem(tasksKey, json);
    
    //localStorage.setItem(tasksKey, JSON.stringify(tasks));

    //Guardar en LocalStorage.
    //localStorage.setItem(tasksKey, JSON.stringify(data));

}

//Obtiene los tweets de LocalStorage
function getTweets(){
    //Obtenemos los datos de localStorage.
    let tasks = localStorage.getItem(tasksKey);
    
    

    //Verificamos si ya existe al menos uno.
    if(tasks === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(tasks);
    }

    return tasks;
}

//Muestra los tweets guardados.
function showTweets(){
    let tasks = getTweets();
    //Funciones flecha, manejamos arreglos o listas, definimos como nombramos cada elemento del arreglo, luego flecha con =>, despues abrimos y cerramos con {} si es codigo grande.
    tasks.forEach(data => {
        //Crear el nuevo elemento.
        const newTweet = document.createElement("div");

        //Añadir estilos y contenido.
        newTweet.className = "border-top";
        newTweet.innerHTML = 
        `<div class="border-top">
            <h5>${data.title}</h5>
            <p>${data.description}</p>
            <div class="row">
                <div class="col-6">
                    <p>${data.date}</p>
                </div>
                <div class="col-6">
                    <input class="button-close" type="checkbox" full="false">
                    <label for="vehicle1">Completada</label>
                </div>
            </div>
        </div>`; 
        
        //Se añade a la lista de tweets.
        taskList.appendChild(newTweet);
        
    });
}

//Borrar el tweet
function removeTweet(e){
    //Comprar que el click sea sobre el boton
    if(e.target.className.includes("button-close")){
        //Obtenemos todo el DIV del tweet
        //console.log(e.target.parentElement.parentElement);

        var item = e.target.parentElement.parentElement.parentElement.parentElement;
        //Eliminar el DOM
        item.remove();
    }
}