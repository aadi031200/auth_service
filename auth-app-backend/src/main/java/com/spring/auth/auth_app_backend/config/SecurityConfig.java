package com.spring.auth.auth_app_backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.auth.auth_app_backend.dtos.ApiError;
import com.spring.auth.auth_app_backend.security.JwtAuthenticationFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.ExceptionHandlingConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Map;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    private AuthenticationSuccessHandler successHandler;

    public SecurityConfig(AuthenticationSuccessHandler successHandler) {
        this.successHandler = successHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .sessionManagement(sm ->sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS) );
        http.authorizeHttpRequests(authorizeHttpRequests ->
                        authorizeHttpRequests
//                                .requestMatchers("/api/v1/auth/register").permitAll()
//                                .requestMatchers("api/v1/auth/login").permitAll()
//                                .requestMatchers("api/v1/auth/refresh").permitAll()
//                                .requestMatchers("api/v1/auth/logout").permitAll()
//                                .requestMatchers("v3/api-docs/**","/swagger-ui.html","/swagger-ui/**").permitAll()
                                .requestMatchers(AppConstants.AUTH_PUBLIC_URLS).permitAll()
                                .anyRequest().authenticated()
        )
                .oauth2Login(oauth2 ->
                        oauth2.successHandler(successHandler)
                                .failureHandler(null)

                        )
                .logout(AbstractHttpConfigurer::disable)


                .exceptionHandling(ex ->ex.authenticationEntryPoint(((request, response, e ) ->{
                    e.printStackTrace();
                    response.setStatus(401);
                    response.setContentType("application/json");

                    String error= (String) request.getAttribute("error");
                    String message="Unauthorized Access!!"+e.getMessage();
                    if(error!=null){
                        message=error;
                    }


                    //Map<String,String> errorMap= Map.of("message",message,"statusCode",Integer.toString(401));
                    var apiError= ApiError.of(HttpStatus.UNAUTHORIZED.value(), "Unauthorized Access!!",message,request.getRequestURI(),true);
                    var objectMapper= new ObjectMapper();
                    response.   getWriter().write(objectMapper.writeValueAsString(apiError));

                })))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
                //.httpBasic(Customizer.withDefaults());

        return  http.build();
    }



    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return  configuration.getAuthenticationManager();

    }

//    @Bean
//    public UserDetailsService users(){
//       User.UserBuilder userBuilder= User.withDefaultPasswordEncoder();
//
//       UserDetails user1=userBuilder.username("Aadi").password("#divya").roles("ADMIN").build();
//       UserDetails user2=userBuilder.username("divya").password("#aadi").roles("ADMIN").build();
//
//       return new InMemoryUserDetailsManager(user1,user2);
//    }
}
