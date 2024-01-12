package org.seminify.app.service;

import org.seminify.app.dto.MemberDTO;

public interface MemberService {
    MemberDTO getKakaoMember(String accessToken);
}
