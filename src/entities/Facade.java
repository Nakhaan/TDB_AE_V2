package entities;

import java.util.Collection;

import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import entities.Utilisateur;

@Singleton
@Path("/")
public class Facade {
	
	@PersistenceContext
	EntityManager em;
	
	@POST
	@Path("/addutilisateur")
    @Consumes({ "application/json" })
	public void addUtilisateur(Utilisateur u) {
		System.out.println("coucou");
		em.persist(u);
	}
	
	@POST
	@Path("/loginutilisateur")
    @Consumes({ "application/json" })
	public void verifierMembre(Utilisateur u) {
		String password = u.getPassword();
		String username = u.getUsername();
		Utilisateur q = em.createQuery("SELECT m FROM Utilisateur m where username=:username AND password=:password", 
				Utilisateur.class).setParameter("username", username).setParameter("password", password).getSingleResult();
		
	}
	
	

}
