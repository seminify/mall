package org.seminify.app.repository;

import java.util.Optional;

import org.seminify.app.domain.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    @Query("SELECT C FROM Cart C WHERE C.owner.email = :email")
    public Optional<Cart> getCartOfMember(@Param("email") String email);
}
