package entities;

import java.util.Collection;
import java.util.Set;

import javax.management.relation.Role;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
public class Utilisateur {
	
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)  
	private Long id;
	
	private String username;

	private String password;
	
	private String nom;
	
	private String prenom;
    
    private int annee;
    
    private String mail;
    
    @ManyToMany
    Collection<Association> associations;

    @ManyToMany(mappedBy = "participants")
    Collection<Evenement> evenements;
    
    @ManyToMany(mappedBy= "acces")
    Collection<Salle> salles_accessibles;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public int getAnnee() {
		return annee;
	}

	public void setAnnee(int annee) {
		this.annee = annee;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public Collection<Evenement> getEvenements() {
		return evenements;
	}

	public void setEvenements(Collection<Evenement> evenements) {
		this.evenements = evenements;
	}

	public Collection<Salle> getSalles_accessibles() {
		return salles_accessibles;
	}

	public void setSalles_accessibles(Collection<Salle> salles_accessibles) {
		this.salles_accessibles = salles_accessibles;
	}
    
    
}
