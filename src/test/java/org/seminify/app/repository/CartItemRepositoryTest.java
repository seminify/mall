package org.seminify.app.repository;

import org.junit.jupiter.api.Test;
import org.seminify.app.domain.Cart;
import org.seminify.app.domain.CartItem;
import org.seminify.app.domain.Member;
import org.seminify.app.domain.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class CartItemRepositoryTest {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartItemRepository cartItemRepository;

    @Test
    @Commit
    @Transactional
    public void testInsertByProduct() {
        var email = "user1@aaa.com";
        var pno = 5L;
        var qty = 2;
        var cartItem = cartItemRepository.getItemOfPno(email, pno);
        if (cartItem != null) {
            cartItem.setQty(qty);
            cartItemRepository.save(cartItem);
            return;
        }
        var result = cartRepository.getCartOfMember(email);
        Cart cart = null;
        if (result.isEmpty()) {
            var member = Member.builder().email(email).build();
            var tempCart = Cart.builder().owner(member).build();
            cart = cartRepository.save(tempCart);
        } else {
            cart = result.get();
        }
        log.info(cart);
        if (cartItem == null) {
            var product = Product.builder().pno(pno).build();
            cartItem = CartItem.builder().product(product).cart(cart).qty(qty).build();
        }
        cartItemRepository.save(cartItem);
    }

    @Test
    @Commit
    public void testUpdateByCino() {
        var cino = 1L;
        var qty = 4;
        var result = cartItemRepository.findById(cino);
        var cartItem = result.orElseThrow();
        cartItem.setQty(qty);
        cartItemRepository.save(cartItem);
    }

    @Test
    public void testListOfMember() {
        var email = "user1@aaa.com";
        var cartItemList = cartItemRepository.getItemsOfCartDTOByEmail(email);
        for (var dto : cartItemList)
            log.info(dto);
    }

    @Test
    public void testDeleteThenList() {
        var cino = 1L;
        var cno = cartItemRepository.getCartFromItem(cino);
        cartItemRepository.deleteById(cino);
        var cartItemList = cartItemRepository.getItemsOfCartDTOByCart(cno);
        for (var dto : cartItemList)
            log.info(dto);
    }
}
