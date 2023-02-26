package com.example.producingwebservice;

import io.spring.guides.gs_producing_web_service.User;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.ws.soap.security.callback.AbstractCallbackHandler;

import javax.security.auth.callback.Callback;
import javax.security.auth.callback.CallbackHandler;
import javax.security.auth.callback.UnsupportedCallbackException;
import java.io.IOException;
import java.text.ParseException;
import java.util.*;
import com.example.producingwebservice.Database;
import com.sun.xml.wss.impl.callback.PasswordValidationCallback;
import com.sun.xml.wss.impl.callback.TimestampValidationCallback;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.security.auth.callback.Callback;
import javax.security.auth.callback.UnsupportedCallbackException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.util.Assert;
import org.springframework.ws.soap.security.callback.AbstractCallbackHandler;
import org.springframework.ws.soap.security.xwss.callback.DefaultTimestampValidator;
import org.springframework.ws.soap.security.xwss.callback.SimplePasswordValidationCallbackHandler;

public class MyCallbackHandler extends AbstractCallbackHandler implements InitializingBean {
    private Map<String, String> users = new HashMap();

    public void setUsersMap(Map<String, String> users) {
        this.users = users;
    }



    @Override
    protected void handleInternal(Callback callback) throws IOException, UnsupportedCallbackException {
        if (callback instanceof PasswordValidationCallback) {
            PasswordValidationCallback passwordCallback = (PasswordValidationCallback)callback;
            if (passwordCallback.getRequest() instanceof PasswordValidationCallback.PlainTextPasswordRequest) {
                passwordCallback.setValidator(new MyCallbackHandler.MyPlainTextPasswordValidator());
            } else if (passwordCallback.getRequest() instanceof PasswordValidationCallback.DigestPasswordRequest) {
                PasswordValidationCallback.DigestPasswordRequest digestPasswordRequest = (PasswordValidationCallback.DigestPasswordRequest)passwordCallback.getRequest();
                String password = (String)this.users.get(digestPasswordRequest.getUsername());
                digestPasswordRequest.setPassword(password);
                passwordCallback.setValidator(new PasswordValidationCallback.DigestPasswordValidator());
            }
        } else {
            if (!(callback instanceof TimestampValidationCallback)) {
                throw new UnsupportedCallbackException(callback);
            }

            TimestampValidationCallback timestampCallback = (TimestampValidationCallback)callback;
            timestampCallback.setValidator(new DefaultTimestampValidator());
        }
        Database db = null;
        try {
            db = new Database();
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        List<User> users = db.getUsers();
        Map<String, String> u = new HashMap();
        for (int i = 0; i < users.size(); i++) {
            User user = users.get(i);
            u.put(user.getUsername(),user.getPassword());
        }
        this.users = u;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        Assert.notNull(this.users, "users is required");
    }
    private class MyPlainTextPasswordValidator implements PasswordValidationCallback.PasswordValidator {
        private MyPlainTextPasswordValidator() {
        }

        public boolean validate(PasswordValidationCallback.Request request) throws PasswordValidationCallback.PasswordValidationException {
            PasswordValidationCallback.PlainTextPasswordRequest plainTextPasswordRequest = (PasswordValidationCallback.PlainTextPasswordRequest)request;
            String password = (String)MyCallbackHandler.this.users.get(plainTextPasswordRequest.getUsername());
            return password != null && password.equals(plainTextPasswordRequest.getPassword());
        }
    }
}
