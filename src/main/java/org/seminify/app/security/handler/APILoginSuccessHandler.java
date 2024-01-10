package org.seminify.app.security.handler;

import java.io.IOException;

import org.seminify.app.dto.MemberDTO;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.google.gson.Gson;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class APILoginSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        log.info(authentication);
        var memberDTO = (MemberDTO) authentication.getPrincipal();
        var claims = memberDTO.getClaims();
        claims.put("accessToken", "");
        claims.put("refreshToken", "");
        var gson = new Gson();
        var jsonStr = gson.toJson(claims);
        response.setContentType("application/json");
        var printWriter = response.getWriter();
        printWriter.println(jsonStr);
        printWriter.close();
    }
}
