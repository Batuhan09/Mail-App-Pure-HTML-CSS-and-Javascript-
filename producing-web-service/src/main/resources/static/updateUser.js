
function update_user() {
    let username = document.getElementById("username2").value;
    let nameAndSurname = document.getElementById("nAnds2").value;
    let genderSelect = document.getElementById('gender2');
    let gender = String(genderSelect.options[genderSelect.selectedIndex].value);
    var xmlhttp = new XMLHttpRequest();
    try {
        xmlhttp.open("POST", "http://localhost:8080/ws", true);
    }catch (error){
        alert(error);
    }
    let str = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:gs="http://spring.io/guides/gs-producing-web-service"> '+
        '<soapenv:Header> '+
        '<wsse:Security '+
        'xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" '+
        'mustUnderstand="1"> '+
        '<wsse:UsernameToken> '+
        '<wsse:Username>'+localStorage.getItem("username")+'</wsse:Username> '+
        '<wsse:Password>'+localStorage.getItem("password")+'</wsse:Password> '+
        '</wsse:UsernameToken> '+
        '</wsse:Security> '+
        '</soapenv:Header> '+
        '<soapenv:Body> '+
        '<gs:updateUserRequest> '+
        '<gs:user> '+
        '<gs:uid>'+chosenId+'</gs:uid> '+
        '<gs:username>'+username+'</gs:username> '+
        '<gs:NameandSurname>'+nameAndSurname+'</gs:NameandSurname> '+
        '<gs:password>notimporttant</gs:password> '+
        '<gs:role>notimporttant</gs:role> '+
        '<gs:birthdate>1999-12-12</gs:birthdate> '+
        '<gs:gender>'+gender+'</gs:gender> '+
        '<gs:available>notimporttant</gs:available> '+
        '</gs:user> '+
        '</gs:updateUserRequest> '+
        '</soapenv:Body> '+
        '</soapenv:Envelope>';
    var xmlDoc;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                xmlDoc = xmlhttp.responseXML;
                let statusObject = xmlDoc.getElementsByTagName("ns2:status")[0];
                let status = statusObject.childNodes[0].nodeValue;
                if(chosenId == localStorage.getItem("uid")){
                    localStorage.setItem("username", username);
                    localStorage.setItem("nameAndSurname", nameAndSurname);
                    localStorage.setItem("gender", gender);
                }
                alert(status);
                viewAllUsers();
            }catch (error){
                console.log(error);
            }
        }
    }
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
}

function viewAllUsers() {
    document.getElementById("content").innerHTML = "";
    document.getElementById("update_user").innerHTML = "";
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    var xmlhttp = new XMLHttpRequest();
    var chosenId = -1;
    try {
        xmlhttp.open("POST", "http://localhost:8080/ws", true);
    }catch (error){
        alert(error);
    }
    let str = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:gs="http://spring.io/guides/gs-producing-web-service"> ' +
        '<soapenv:Header> '+
        '<wsse:Security '+
        'xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" '+
        'mustUnderstand="1"> '+
        '<wsse:UsernameToken> '+
        '<wsse:Username>'+username+'</wsse:Username> '+
        '<wsse:Password>'+password+'</wsse:Password> '+
        '</wsse:UsernameToken> '+
        '</wsse:Security> '+
        '</soapenv:Header> '+
        '<soapenv:Body> '+
        '<gs:allUsersRequest> '+
        '</gs:allUsersRequest> '+
        '</soapenv:Body> '+
        '</soapenv:Envelope> ';
    console.log(str);
    var xmlDoc;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                xmlDoc = xmlhttp.responseXML;
                console.log("here", xmlDoc);
                let allUsers = "<p>To update, click on the user</p>\n"+
                    "<table>\n" +
                    "  <tr>\n" +
                    "    <th>Username</th>\n" +
                    "    <th>Name and Surname</th>\n" +
                    "    <th>Availability</th>\n" +
                    "  </tr>\n";
                for (let i = 0; i < xmlDoc.getElementsByTagName('ns2:username').length; i++) {
                    let nameObject = xmlDoc.getElementsByTagName('ns2:username')[i];
                    let name = nameObject.childNodes[0].nodeValue;
                    let nameAndSurnameObject = xmlDoc.getElementsByTagName('ns2:NameandSurname')[i];
                    let nameAndSurname = nameAndSurnameObject.childNodes[0].nodeValue;
                    let availableObject = xmlDoc.getElementsByTagName('ns2:available')[i];
                    let available = availableObject.childNodes[0].nodeValue;
                    let idObject = xmlDoc.getElementsByTagName('ns2:uid')[i];
                    let id = idObject.childNodes[0].nodeValue;
                    allUsers += "  <tr onclick='assign_id("+id+")'>\n" +
                        "    <td>"+name+"</td>\n" +
                        "    <td>"+nameAndSurname+"</td>\n" +
                        "    <td>"+available+"</td>\n";
                    allUsers+="  </tr>\n";
                }
                allUsers += "</table>";
                document.getElementById("content").innerHTML = allUsers;
            }catch (error){
                console.log(error);
            }
        }
    }
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
}
function assign_id(id) {
    chosenId = id;
    document.getElementById("content").innerHTML = "";
    document.getElementById("update_user").innerHTML = "<p>update user "+id+"</p>";
    document.getElementById("update_user").innerHTML += "<div className='container'>\n"+
        "<label for=\"username2\">Username:</label><br><br>\n" +
        "<input type=\"text\" id=\"username2\" name=\"username\" required><br><br>\n" +
        "<label for=\"nAnds2\">name and surname:</label><br><br>\n" +
        "<input type=\"text\" id=\"nAnds2\" name=\"nameAndSurname\" required><br><br>\n" +
        '<label htmlFor="gender2">gender(type M for male F for female):</label>\n' +
        '<select style="width:100%;height: 30px" name="gender2" id="gender2">\n'+
        '<option value="M">M</option>\n'+
        '<option value="F">F</option>\n'+
        '</select><br>\n'+
        "</div>\n"+
        "<div className=\"container\" style=\"background-color:#f1f1f1\">\n" +
        "<button type=\"submit\" value=\"Update User\" onClick=\"update_user()\">Update User</button>\n"+
        "<button type=\"submit\" value=\"Update User\" onClick=\"viewAllUsers()\">Cancel</button>\n"+
        "</div>";
}
viewAllUsers()