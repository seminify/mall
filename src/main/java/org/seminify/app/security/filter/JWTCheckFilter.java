package org.seminify.app.security.filter;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.seminify.app.dto.MemberDTO;
import org.seminify.app.util.JWTUtil;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.google.gson.Gson;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class JWTCheckFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        var authHeaderStr = request.getHeader("Authorization");
        try {
            var accessToken = authHeaderStr.substring(7);
            var claims = JWTUtil.validateToken(accessToken);
            log.info("JWT claims : " + claims);
            var email = (String) claims.get("email");
            var pw = (String) claims.get("pw");
            var nickname = (String) claims.get("nickname");
            var social = (Boolean) claims.get("social");
            var roleNames = (List<String>) claims.get("roleNames");
            var memberDTO = new MemberDTO(email, pw, nickname, social, roleNames);
            log.info(memberDTO);
            log.info(memberDTO.getAuthorities());
            var authenticationToken = new UsernamePasswordAuthenticationToken(memberDTO, pw,
                    memberDTO.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            log.error(e.getMessage());
            var gson = new Gson();
            var msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));
            response.setContentType("application/json");
            var printWriter = response.getWriter();
            printWriter.println(msg);
            printWriter.close();
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        if (request.getMethod().equals("OPTIONS"))
            return true;
        var path = request.getRequestURI();
        log.info("path : " + path);
        if (path.startsWith("/api/member/"))
            return true;
        if (path.startsWith("/api/products/view/"))
            return true;
        return false;
    }
}
