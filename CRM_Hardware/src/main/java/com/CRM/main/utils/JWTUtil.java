
package com.CRM.main.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

/**
 *
 * @author Anderson
 */
@Component
public class JWTUtil {
    @Value("${security.jwt.secret}")
    private String key;

    @Value("${security.jwt.issuer}")
    private String issuer;

    @Value("${security.jwt.ttlMillis}")
    private Long ttlMillis;

   // A logger.
    private final Logger log = LoggerFactory.getLogger(JWTUtil.class);

    /**
     * Create a new token
     * @param id
     * @param subject
     * @return
     */

    public String create(String id, String subject){
        //Algortimo creado para generar el token
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        //Añade el JWT con la secret key
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(key);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        JwtBuilder builder = Jwts.builder().setId(id).setIssuedAt(now).setSubject(subject).setIssuer(issuer)
                .signWith(signatureAlgorithm,signingKey);

        if(ttlMillis >= 0){
            long expMillis = nowMillis + ttlMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }

        return builder.compact();
    }

    
    

/**
 * It takes a JWT and returns the value of the subject claim
 * 
 * @param jwt The JWT to parse.
 * @return The subject of the JWT.
 */
     public String getValue(String jwt){
         //Se retornara una excepción si el JWT no está añadido
         Claims claims = Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(key))
                 .parseClaimsJws(jwt).getBody();
         return claims.getSubject();
     }

     /**
      * The function takes a JWT as a parameter, parses it, and returns the value of the "id" claim
      * 
      * @param jwt The JWT to parse
      * @return The key is being returned.
      */
     public String getKey(String jwt){
         Claims claims = Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(key))
                 .parseClaimsJws(jwt).getBody();
         return claims.getId();
     }
}
