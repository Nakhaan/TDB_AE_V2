package entities;

import java.util.Collection;
import java.util.Set;

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
	
//	@POST
//	@Path("/init")
//    @Consumes({ "application/json" })
//	public void init() {
//		
//		em.persist(u);
//	}
	
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

	@GET
	@Path("/listsalles")
    @Produces({ "application/json" })
	public Collection<Salle> listSalles() {
		return em.createQuery("from Salle", Salle.class).getResultList();	
	}
	
	@POST
	@Path("/recupeDonneesUser")
	@Produces({ "application/json" })
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
	
	@POST
	@Path("/addevent")
    @Consumes({ "application/json" })
	public void addEvenement(Evenement e) {
		em.persist(e);
	}
	
	@POST
	@Path("/assoc")
    @Consumes({ "application/json" })
	public Association assoc(Association a) {
		return em.find(Association.class,a.getNom());
	}
	
	@POST
	@Path("/changepres")
    @Consumes({ "application/json" })
	public void changePres(String nom,Association a) {
		Association asso =  em.find(Association.class,a.getNom());
		Utilisateur prez = em.find(Utilisateur.class, nom);
		asso.setPresident(prez);
		em.merge(asso);
	}
	
	@POST
	@Path("/changetres")
    @Consumes({ "application/json" })
	public void changeTres(String nom,Association a) {
		Association asso =  em.find(Association.class,a.getNom());
		Utilisateur trez = em.find(Utilisateur.class, nom);
		asso.setPresident(trez);
		em.merge(asso);
	}
	
	@POST
	@Path("/addbur")
    @Consumes({ "application/json" })
	public void addBur(String nom,Association a) {
		Association asso =  em.find(Association.class,a.getNom());
		Utilisateur perso = em.find(Utilisateur.class, nom);
		Set<Utilisateur> bureau = asso.getBureau();
		bureau.add(perso);
		asso.setBureau(bureau);
		em.merge(asso);
	}
	
	@POST
	@Path("/addmem")
    @Consumes({ "application/json" })
	public void addMem(String nom,Association a) {
		Association asso =  em.find(Association.class,a.getNom());
		Utilisateur perso = em.find(Utilisateur.class, nom);
		Set<Utilisateur> membres = asso.getMembres();
		membres.add(perso);
		asso.setMembres(membres);
		em.merge(asso);
	}
	
	@POST
	@Path("/delbur")
    @Consumes({ "application/json" })
	public void delBur(String nom,Association a) {
		Association asso =  em.find(Association.class,a.getNom());
		Set<Utilisateur> bureau = asso.getBureau();
		Utilisateur perso = em.find(Utilisateur.class, nom);
		bureau.remove(perso);
		asso.setBureau(bureau);
		em.merge(asso);
	}
	
	@POST
	@Path("/delmem")
    @Consumes({ "application/json" })
	public void delMem(String nom,Association a) {
		Association asso =  em.find(Association.class,a.getNom());
		Set<Utilisateur> membres = asso.getMembres();
		Utilisateur perso = em.find(Utilisateur.class, nom);
		membres.remove(perso);
		asso.setMembres(membres);
		em.merge(asso);
	}
}
