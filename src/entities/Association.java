package entities;

import java.util.*;

import javax.persistence.*;

@Entity
public class Association {
	
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)  
	private Long id;
	
	private String nom;
	
	private String description;
	
	//Un seul role de president par eleve
	@OneToOne
	private Utilisateur president;
	
	@OneToOne
	private Utilisateur tresorier;
	
	@ManyToMany
	private Collection<Utilisateur> bureau;
	
	@ManyToMany
	private Collection<Utilisateur> membres;
	
	@OneToMany
	private Collection<Evenement> events;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Utilisateur getPresident() {
		return president;
	}

	public void setPresident(Utilisateur president) {
		this.president = president;
	}

	public Utilisateur getTresorier() {
		return tresorier;
	}

	public void setTresorier(Utilisateur tresorier) {
		this.tresorier = tresorier;
	}

	public Collection<Utilisateur> getBureau() {
		return bureau;
	}

	public void setBureau(Collection<Utilisateur> bureau) {
		this.bureau = bureau;
	}

	public Collection<Utilisateur> getMembres() {
		return membres;
	}

	public void setMembres(Collection<Utilisateur> membres) {
		this.membres = membres;
	}

	public Collection<Evenement> getEvents() {
		return events;
	}

	public void setEvents(Collection<Evenement> events) {
		this.events = events;
	}
	
}
