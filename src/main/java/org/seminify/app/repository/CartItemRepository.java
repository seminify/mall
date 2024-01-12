package org.seminify.app.repository;

import java.util.List;

import org.seminify.app.domain.CartItem;
import org.seminify.app.dto.CartItemListDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Query("SELECT NEW org.seminify.app.dto.CartItemListDTO(CI.cino, CI.qty ,P.pno ,P.pname, P.price, PI.fileName) FROM CartItem CI INNER JOIN Cart C ON CI.cart = C LEFT JOIN Product P ON CI.product = P LEFT JOIN P.imageList PI WHERE C.owner.email = :email AND PI.ord = 0 ORDER BY CI.cino DESC")
    public List<CartItemListDTO> getItemsOfCartDTOByEmail(@Param("email") String email);

    @Query("SELECT CI FROM CartItem CI INNER JOIN Cart C ON CI.cart = C WHERE C.owner.email = :email AND CI.product.pno = :pno")
    public CartItem getItemOfPno(@Param("email") String email, @Param("pno") Long pno);

    @Query("SELECT C.cno FROM Cart C INNER JOIN CartItem CI ON CI.cart = C WHERE CI.cino = :cino")
    public Long getCartFromItem(@Param("cino") Long cino);

    @Query("SELECT NEW org.seminify.app.dto.CartItemListDTO(CI.cino, CI.qty, P.pno, P.pname, P.price, PI.fileName) FROM CartItem CI INNER JOIN Cart C ON CI.cart = C LEFT JOIN Product P ON CI.product = P LEFT JOIN P.imageList PI WHERE C.cno = :cno AND PI.ord = 0 ORDER BY CI.cino DESC")
    public List<CartItemListDTO> getItemsOfCartDTOByCart(@Param("cno") Long cno);
}
