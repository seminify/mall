package org.seminify.app.repository;

import java.util.Optional;

import org.seminify.app.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT P, PI FROM  Product P LEFT JOIN P.imageList PI WHERE PI.ord = 0 AND P.delFlag = false")
    Page<Object[]> selectList(Pageable pageable);

    @EntityGraph(attributePaths = "imageList")
    @Query("SELECT P FROM Product P WHERE P.pno = :pno")
    Optional<Product> selectOne(@Param("pno") Long pno);

    @Modifying
    @Query("UPDATE Product P SET P.delFlag = :delFlag WHERE  P.pno = :pno")
    void updateToDelete(@Param("pno") Long pno, @Param("delFlag") boolean delFlag);
}
