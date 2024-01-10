package org.seminify.app.repository;

import org.seminify.app.domain.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {
    @EntityGraph(attributePaths = "memberRoleList")
    @Query("SELECT M FROM Member M WHERE M.email = :email")
    Member getWithRoles(@Param("email") String email);
}
