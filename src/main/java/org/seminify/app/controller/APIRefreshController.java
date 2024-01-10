package org.seminify.app.controller;

import java.util.Date;
import java.util.Map;

import org.seminify.app.util.CustomJWTException;
import org.seminify.app.util.JWTUtil;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
public class APIRefreshController {
    private boolean checkExpiredToken(String token) {
        try {
            JWTUtil.validateToken(token);
        } catch (CustomJWTException e) {
            if (e.getMessage().equals("Expired"))
                return true;
        }
        return false;
    }

    private boolean checkTime(Integer exp) {
        var expDate = new Date((long) exp * (1000));
        var gap = expDate.getTime() - System.currentTimeMillis();
        var leftMin = gap / (1000 * 60);
        return leftMin < 60;
    }

    @RequestMapping("api/member/refresh")
    public Map<String, Object> refresh(@RequestHeader("Authorization") String authHeader, String refreshToken) {
        if (refreshToken == null)
            throw new CustomJWTException("NULL_REFREASH");
        if (authHeader == null || authHeader.length() < 7)
            throw new CustomJWTException("INVALID_STRING");
        var accessToken = authHeader.substring(7);
        if (checkExpiredToken(accessToken) == false)
            return Map.of("accessToken", accessToken, "refreshToken", refreshToken);
        var claims = JWTUtil.validateToken(refreshToken);
        log.info("refresh ... claims : " + claims);
        var newAccessToken = JWTUtil.generateToken(claims, 10);
        var newRefreshToken = checkTime((Integer) claims.get("exp")) == true ? JWTUtil.generateToken(claims, 60 * 24)
                : refreshToken;
        return Map.of("accessToken", newAccessToken, "refreshToken", newRefreshToken);
    }
}
