package br.alessio.dbf.web.rest;

import br.alessio.dbf.model.User;
import br.alessio.dbf.repository.UserRepository;
import org.apache.tomcat.util.http.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/")
public class UserResource {
    /*
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/teste")
    public String teste(){
       return "Olá Mundo";
    }

    @GetMapping("/usuarios")
    public List<User> listaUser(){
        return userRepository.findAll();
    }

    @GetMapping("/usuarios/{userName}")
    public ResponseEntity<User> getUsuario(@PathVariable String userName){
        User u = userRepository.findByActiveTrueAndUserName(userName);

        if( u== null){
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok().body(u);
        }
    }

    @DeleteMapping("/usuarios/{userName}")
    public User deleteUsuario(@PathVariable String userName){
        //return userRepository.delete(new User());
        return null;
    }

    @PutMapping("/usuarios")
    public ResponseEntity<User> insert(@RequestBody String userName){
        User u = new User();
        u.setUserName(userName);
        u.setActive(true);
        u.setEmail("meu@dsd.com");
        u.setName("dsdsd");
        u.setPassword("dassdsdd");
        u.setLastName("dsdsd");

        u = userRepository.save(u);
        return null;
        //return ResponseEntity.created().body(u);
    }

     */
}
