package org.seminify.app.dto;

import lombok.Data;

@Data
public class MemberModifyDTO {
    private String email;
    private String pw;
    private String nickname;
}
