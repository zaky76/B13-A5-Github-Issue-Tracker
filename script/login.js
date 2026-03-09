document.getElementById("sign-btn").addEventListener("click", function (){
    // get username
    const userName = document.getElementById("username");
    const inputUserName = userName.value;
    console.log(inputUserName);

    //get password  
    const password = document.getElementById("password");
    const inputPassword = password.value;
    console.log(inputPassword);




    //match username & password
    if(inputUserName == "admin" && inputPassword == "admin123"){
        alert('Successfully Login');
        window.location.replace("./issues.html");
    }
    else{
        alert("Login Failed")
        return;
    }




})