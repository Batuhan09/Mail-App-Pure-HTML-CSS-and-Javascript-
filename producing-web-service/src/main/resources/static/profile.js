
function profile() {
    document.getElementById("content").innerHTML = "";
    let username = localStorage.getItem("username");
    let gender = localStorage.getItem("gender");
    let nameAndSurname = localStorage.getItem("nameAndSurname");
    let role = localStorage.getItem("role");
    //"<td><img src=\"avatar.webp\" alt=\"Avatar\" class=\"avatar\"></td>\n";
    let str = "<img src=\"avatar.webp\" alt=\"Avatar\" style=\"height: 100px; width: 100px\">" +
        "<table>\n" +
        "<tr>\n" +
        "<td>Username</td>\n" +
        "<td>"+username+"</td>\n"+
        "</tr>\n"+
        "<tr>\n" +
        "<td>name and surname</td>\n" +
        "<td>"+nameAndSurname+"</td>\n" +
        "</tr>\n"+
        "<tr>\n" +
        "<td>gender</td>\n" +
        "<td>"+gender+"</td>\n" +
        "</tr>\n" +
        "<tr>\n" +
        "<td>role</td>\n" +
        "<td>"+role+"</td>\n" +
        "</tr>\n" +
        "</table>\n" +
        "<button onClick=\"edit()\">edit</button>";
    document.getElementById("content").innerHTML +=str;
}

function edit() {
    document.getElementById("content").innerHTML =
        "<label htmlFor=\"username\">Username:</label><br>" +
        "<input type=\"text\" id=\"uname\" name=\"username\"><br>" +
        "<label htmlFor=\"nameAndSurname\">Name and Surname</label><br>" +
        "<input type=\"text\" id=\"nAnds\" name=\"nameAndSurname\"><br>" +
        "<div class=\"container\" style=\"background-color:#f1f1f1\">\n" +
        "<button type=\"submit\" value=\"save\" onClick=\"save()\">Save</button>" +
        "<button type=\"submit\" value=\"cancel\" onClick=\"profile()\">Cancel</button><br>"+
    "</div>";
}

function save(){
    let xmlhttp = new XMLHttpRequest();
    const username = document.getElementById("uname").value;
    const nameAndSurname = document.getElementById("nAnds").value;
    try {
        xmlhttp.open("POST", "http://localhost:8080/ws", true);
    }catch (error){
        alert(error);
    }
    const str = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:gs="http://spring.io/guides/gs-producing-web-service"> ' +
        '<soapenv:Header> ' +
        '<wsse:Security ' +
        'xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" '+
        'mustUnderstand="1"> '+
        '<wsse:UsernameToken> '+
        '<wsse:Username>'+localStorage.getItem("username")+'</wsse:Username> '+
        '<wsse:Password>'+localStorage.getItem("password")+'</wsse:Password> '+
        '</wsse:UsernameToken> '+
        '</wsse:Security> '+
        '</soapenv:Header> '+
        '<soapenv:Body> '+
        '<gs:updateProfileRequest> '+
        '<gs:user> '+
        '<gs:uid>?</gs:uid> '+
        '<gs:username>'+localStorage.getItem("username")+'</gs:username> '+
        '<gs:NameandSurname>q</gs:NameandSurname> '+
        '<gs:password>'+localStorage.getItem("password")+'</gs:password> '+
        '<gs:role>?</gs:role> '+
        '<gs:birthdate>?</gs:birthdate> '+
        '<gs:gender>?</gs:gender> '+
        '<gs:available>?</gs:available> '+
        '</gs:user> '+
        '<gs:name>'+username+'</gs:name> '+
        '<gs:nameAndPassword>'+nameAndSurname+'</gs:nameAndPassword> '+
        '</gs:updateProfileRequest> '+
        '</soapenv:Body> '+
        '</soapenv:Envelope> ';
    var xmlDoc;
    try {
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    }catch (error){
        alert(error);
    }
    try{
        xmlhttp.send(str);
    }catch(error){
        alert(error)
    }
    try {
        if(username!=""){localStorage.setItem("username",username);}
        if(nameAndSurname!=""){localStorage.setItem("nameAndSurname",nameAndSurname);}
        profile();
    }catch (error){
        console.log(error);
    }
}

profile();