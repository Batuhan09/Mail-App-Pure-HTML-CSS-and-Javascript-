package com.example.producingwebservice;

import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.io.ClassPathResource;
import org.springframework.ws.config.annotation.EnableWs;
import org.springframework.ws.config.annotation.WsConfigurerAdapter;
import org.springframework.ws.server.EndpointInterceptor;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.soap.security.xwss.XwsSecurityInterceptor;
import org.springframework.ws.soap.security.xwss.callback.SimplePasswordValidationCallbackHandler;
import org.springframework.ws.transport.http.MessageDispatcherServlet;
import org.springframework.ws.wsdl.wsdl11.DefaultWsdl11Definition;
import org.springframework.xml.xsd.SimpleXsdSchema;
import org.springframework.xml.xsd.XsdSchema;
import io.spring.guides.gs_producing_web_service.User;
import com.example.producingwebservice.Database;
import javax.security.auth.callback.CallbackHandler;
import java.text.ParseException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@EnableWs
@Configuration
public class WebServiceConfig extends WsConfigurerAdapter {
	private static WebServiceConfig obj = new WebServiceConfig();
	private MyCallbackHandler handler = new MyCallbackHandler();
	private XwsSecurityInterceptor securityInterceptor = new XwsSecurityInterceptor();
	public MyCallbackHandler getHandler(){
		return handler;
	}
	public void setHandler(MyCallbackHandler h){
		handler = h;
	}

	@Bean
	public ServletRegistrationBean<MessageDispatcherServlet> messageDispatcherServlet(ApplicationContext applicationContext) {
		MessageDispatcherServlet servlet = new MessageDispatcherServlet();
		servlet.setApplicationContext(applicationContext);
		servlet.setTransformWsdlLocations(true);
		return new ServletRegistrationBean<>(servlet, "/ws/*");
	}

	@Bean(name = "countries")
	public DefaultWsdl11Definition defaultWsdl11Definition(XsdSchema countriesSchema) {
		DefaultWsdl11Definition wsdl11Definition = new DefaultWsdl11Definition();
		wsdl11Definition.setPortTypeName("CountriesPort");
		wsdl11Definition.setLocationUri("/ws");
		wsdl11Definition.setTargetNamespace("http://spring.io/guides/gs-producing-web-service");
		wsdl11Definition.setSchema(countriesSchema);
		return wsdl11Definition;
	}
	@Bean
	public XsdSchema countriesSchema() {
		return new SimpleXsdSchema(new ClassPathResource("countries.xsd"));
	}
	//XwsSecurityInterceptor
		//Callback Handler -> SimplePasswordValidationCallbackHandler
		//Security Policy -> securityPolicy.xml
	//Interceptors.add -> XwsSecurityInterceptor
	@Bean
	public XwsSecurityInterceptor securityInterceptor() throws ParseException {

		//Callback Handler -> SimplePasswordValidationCallbackHandler
		MyCallbackHandler callbackHandler = callbackHandler();
		securityInterceptor.setCallbackHandler(callbackHandler);
		//Security Policy -> securityPolicy.xml
		securityInterceptor.setPolicyConfiguration(new ClassPathResource("securityPolicy.xml"));
		return securityInterceptor;
	}

	@Bean
	public MyCallbackHandler callbackHandler() throws ParseException {
		Database db = new Database();
		List<User> users = db.getUsers();
		Map<String, String> u = new HashMap();
		for (int i = 0; i < users.size(); i++) {
			User user = users.get(i);
			u.put(user.getUsername(),user.getPassword());
		}
		handler.setUsersMap(u);
		return handler;
	}

	//Interceptors.add -> XwsSecurityInterceptor
	@Override
	public void addInterceptors(List<EndpointInterceptor> interceptors) {
		try {
			interceptors.add(securityInterceptor());
		} catch (ParseException e) {
			throw new RuntimeException(e);
		}
	}
	public static WebServiceConfig getInstance(){
		return obj;
	}
}
