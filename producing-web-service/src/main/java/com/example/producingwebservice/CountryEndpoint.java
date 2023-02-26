package com.example.producingwebservice;

import com.sun.xml.wss.impl.callback.PasswordValidationCallback;
import io.spring.guides.gs_producing_web_service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;
import com.example.producingwebservice.Database;
import com.example.producingwebservice.WebServiceConfig;
import org.springframework.ws.soap.security.xwss.callback.SimplePasswordValidationCallbackHandler;

import javax.xml.crypto.Data;
import java.text.ParseException;
import java.util.List;

@Endpoint
public class CountryEndpoint {
    private static final String NAMESPACE_URI = "http://spring.io/guides/gs-producing-web-service";
    Database db = Database.getDatabase();

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getUserRequest")
    @ResponsePayload
    public GetUserRequest login(@RequestPayload GetUserRequest response) throws ParseException {
        GetUserRequest request = new GetUserRequest();
        User user = db.getCurrentUser(response.getUser());
        db.update_available(user.getUid(),"online");
        request.setUser(db.getCurrentUser(response.getUser()));
        return request;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "updateProfileRequest")
    @ResponsePayload
    public UpdateProfileResponse update_user(@RequestPayload UpdateProfileRequest request) throws ParseException {
        UpdateProfileResponse response = new UpdateProfileResponse();
        int id = db.getId(request.getUser().getUsername(),request.getUser().getPassword());
        try {
            if(request.getNameAndPassword().equals("") || request.getName().equals("")){
                response.setStatus("EMPYT INPUT!!");
            }
            else{
                db.update_name(id,request.getName());
                db.update_NameandSurname(id, request.getNameAndPassword());
                response.setStatus("SUCCESFUL");
            }
        }catch (Error e){
            response.setStatus("FAILED");
        }

        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "allUsersRequest")
    @ResponsePayload
    public AllUsersResponse getAllUsers(@RequestPayload  AllUsersRequest request) throws ParseException {
        AllUsersResponse response = new AllUsersResponse();
        List<User> users = db.getUsers();
        for (int i = 0; i < users.size(); i++) {
            User user = users.get(i);
            user.setPassword("");
            response.getUser().add(user);

        }
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "sendMessageRequest")
    @ResponsePayload
    public SendMessageResponse sendMessage(@RequestPayload SendMessageRequest request) throws ParseException {
        SendMessageResponse response = new SendMessageResponse();
        try {
            if(request.getMessage().getTitle().equals("") || request.getMessage().getContent().equals("")){
                response.setStatus("EMPTY INPUT!!");
            }
            else{
                db.addMessage(request.getMessage());
                response.setStatus("SUCCESFUL");
            }
        }catch (Error error){
            response.setStatus("FAILED");
        }
        return response;
    }

   @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getInboxMessagesRequest")
    @ResponsePayload
    public GetInboxMessagesResponse getInbox(@RequestPayload  GetInboxMessagesRequest request) throws ParseException {
       GetInboxMessagesResponse response = new GetInboxMessagesResponse();
        List<Message> messages = db.getInbox(request.getId());
        for (int i = 0; i < messages.size(); i++) {
            Message message = messages.get(i);
            response.getMessage().add(message);
        }
        return response;
    }
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getOutboxMessagesRequest")
    @ResponsePayload
    public GetOutboxMessagesResponse getOutbox(@RequestPayload  GetOutboxMessagesRequest request) throws ParseException {
        GetOutboxMessagesResponse response = new GetOutboxMessagesResponse();
        List<Message> messages = db.getOutbox(request.getId());
        for (int i = 0; i < messages.size(); i++) {
            Message message = messages.get(i);
            response.getMessage().add(message);
        }
        return response;
    }
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "deleteUserRequest")
    @ResponsePayload
    public DeleteUserResponse deleteUser(@RequestPayload  DeleteUserRequest request) throws ParseException {
        DeleteUserResponse response = new DeleteUserResponse();
        try {
            db.delete_row_by_id(request.getId());
            response.setStatus("SUCCESFUL");
        }catch (Error error){
            response.setStatus("FAILED");
        }
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "addUserRequest")
    @ResponsePayload
    public AddUserResponse addUser(@RequestPayload  AddUserRequest request) throws ParseException {
        AddUserResponse response = new AddUserResponse();
        try {
            if(request.getUser().getUsername().equals("") || request.getUser().getNameandSurname().equals("") || request.getUser().getPassword().equals("")){
                response.setStatus("EMPTY INPUT!!");
            }
            else{
                db.addUser(request.getUser());
                response.setStatus("SUCCESFUL");
            }
        }catch (Error e){
            response.setStatus("FAILED");
        }
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "updateUserRequest")
    @ResponsePayload
    public UpdateUserResponse updateUser(@RequestPayload  UpdateUserRequest request) throws ParseException {
        UpdateUserResponse response = new UpdateUserResponse();
        try {
            if (request.getUser().getUsername().equals("") || request.getUser().getNameandSurname().equals("")){
                response.setStatus("EMPYT INPUT!!");
            }
            else{
                User user = db.getUserbyId(request.getUser().getUid());
                db.update_user(request.getUser());
                response.setStatus("SUCCESFUL");
            }
        }catch (Error e){
            response.setStatus("FAILED");
        }
        return response;
    }
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "logoutRequest")
    @ResponsePayload
    public LogoutResponse logout(@RequestPayload  LogoutRequest request) throws ParseException {
        LogoutResponse response = new LogoutResponse();
        try {
            db.update_available(request.getId(),"offline");
            response.setStatus("SUCCESFUL");
        }catch (Error e){
            response.setStatus("FAILED");
        }
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getUserInfoRequest")
    @ResponsePayload
    public GetUserInfoResponse getInfo(@RequestPayload  GetUserInfoRequest request) throws ParseException {
        GetUserInfoResponse response = new GetUserInfoResponse();
        User user = db.getUserbyId(request.getId());
        user.setPassword("");
        response.setUser(user);
        return response;
    }
}