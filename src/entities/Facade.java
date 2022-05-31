package entities;

import java.util.Collection;

import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
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
	
	@GET
	@Path("/liststudent")
    @Produces({ "application/json" })
	public Collection<Utilisateur> listUtilisateur() {
		return em.createQuery("from Utilisateur", Utilisateur.class).getResultList();
	}

	
	@POST
	@Path("/recupeDonneesUser")
	@Produces({ "application/json" })
	@Transactional
	public Utilisateur recupeMembre(Utilisateur u) {
		String username = u.getUsername();
		Utilisateur q = em.find(Utilisateur.class, username);
		return q;
	}
	
	@POST
	@Path("/modifierDonneesUser")
	@Consumes({ "application/json" })
	public void modifierMembre(Utilisateur u) {
		String username = u.getUsername();
		Utilisateur q = em.find(Utilisateur.class, username);
		q.setPrenom(u.getPrenom());
		q.setNom(u.getNom());
		q.setMail(u.getMail());
		q.setAnnee(u.getAnnee());
		em.merge(q);
	}
	
	@POST
	@Path("/addclub")
    @Consumes({ "application/json" })
	public void addClub(Association a) {
		Utilisateur p = a.getPresident();
		Utilisateur t = a.getTresorier();
		Utilisateur prez = em.find(Utilisateur.class,p.getUsername());
		Utilisateur trez = em.find(Utilisateur.class,t.getUsername());
		a.setPresident(prez);
		a.setTresorier(trez);
		em.persist(a);
	}
	
	@POST
	@Path("/delclub")
    @Consumes({ "application/json" })
	public void delClub(Association a) {
		Association ass = em.find(Association.class,a.getNom());
		em.remove(ass);
	}
	
	@GET
	@Path("/listassoc")
    @Produces({ "application/json" })
	public Collection<Association> listAssoc() {
		return em.createQuery("from Association", Association.class).getResultList();
	}
	
	@POST
	@Path("/addsalle")
    @Consumes({ "application/json" })
	public void addSalle(Salle s) {
		em.persist(s);
	}
}
