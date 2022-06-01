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
	@Path("/addevent")
    @Consumes({ "application/json" })
	public void addEvenenement(Evenement e) {
		Salle s = e.getSalle();
		Salle sa =em.find(Salle.class, s.getNom());
		e.setSalle(sa);
		em.persist(e);
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
	@Path("/listevents")
    @Produces({ "application/json" })
	public Collection<Evenement> listEvenements() {
		return em.createQuery("from Evenement", Evenement.class).getResultList();	
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

	@GET
	@Path("/listsalles")
    @Produces({ "application/json" })
	public Collection<Salle> listSalles() {
		return em.createQuery("from Salle", Salle.class).getResultList();
	}
	
	@GET
	@Path("/listTopic")
    @Produces({ "application/json" })
	public Collection<Topic> listTopic() {
		return em.createQuery("from Topic", Topic.class).getResultList();
	}
	
	
	@POST
	@Path("/addTopic")
    @Consumes({ "application/json" })
	public void addTopic(Topic t) {
		em.persist(t);
	}
	
	@POST
	@Path("/recupDonneesTopic")
	@Produces({ "application/json" })
	public Topic recupDonneesTopic(Topic t) {
		int ID = t.getId();
		System.out.println("ID DE CE TOPIC EST : " + ID);
		Topic t2 = em.find(Topic.class, ID);
		return t2;
	}
	
	@POST
	@Path("/addMessToTopic")
	@Consumes({ "application/json" })
	public Message addMessToTopic(Message m) {
		System.out.println("AVANT");
		System.out.println(m.getMessage());
		//Topic t = m.getTopic();
		System.out.println("AVANT 1");
		//t.addMessages(m);
		System.out.println("AVANT 3");
		em.persist(m);
		System.out.println("AVANT 4");
		return m;
		
	}
	
	@POST
	@Path("/jointure")
    @Consumes({ "application/json" })
	public void jointure(Jointure j) {
		Message m = em.find(Message.class, j.getMessageID());
		Topic t = em.find(Topic.class, j.getTopicID());
		m.setTopic(t);
	}
	
}
