package entities;

import java.util.Collection;
import java.util.Set;

import javax.persistence.*;

@Entity
public class Evenement {
	
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;

    private String nom;
    private String description;
    private String date;
    private String time;

    @ManyToMany //(cascade = {CascadeType.PERSIST})
    //@JoinTable(name = "EventUser", joinColumns = @JoinColumn(name = "id", referencedColumnName = "ID"), inverseJoinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "username"))
    Set<Utilisateur> participants ;

    @ManyToOne
    private Association asso_organisateur;
    
    @ManyToMany
    private Set<Salle> salles;

	public int getId() {
		return id;
	}

	public void setId(int id) {
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

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Set<Utilisateur> getParticipants() {
		return participants;
	}

	public void setParticipants(Set<Utilisateur> participants) {
		this.participants = participants;
	}

	public Association getAsso_organisateur() {
		return asso_organisateur;
	}

	public void setAsso_organisateur(Association asso_organisateur) {
		this.asso_organisateur = asso_organisateur;
	}

	public Set<Salle> getSalles() {
		return salles;
	}

	public void setSalles(Set<Salle> salles) {
		this.salles = salles;
	}
	
}
