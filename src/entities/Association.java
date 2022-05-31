package entities;

import java.util.*;

import javax.persistence.*;

@Entity
public class Association {
	
	@Id
	private String nom;
	
	private String description;
	
	//Un seul role de president par eleve
	@OneToOne
	private Utilisateur president;
	
	@OneToOne
	private Utilisateur tresorier;
	
	@ManyToMany(fetch = FetchType.EAGER)
	private Set<Utilisateur> bureau;
	
	@ManyToMany(fetch = FetchType.EAGER)
	private Set<Utilisateur> membres;
	
	@OneToMany(fetch = FetchType.EAGER)
	private Set<Evenement> events;


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

	public Set<Utilisateur> getBureau() {
		return bureau;
	}

	public void setBureau(Set<Utilisateur> bureau) {
		this.bureau = bureau;
	}

	public Set<Utilisateur> getMembres() {
		return membres;
	}

	public void setMembres(Set<Utilisateur> membres) {
		this.membres = membres;
	}

	public Set<Evenement> getEvents() {
		return events;
	}

	public void setEvents(Set<Evenement> events) {
		this.events = events;
	}
	
}
